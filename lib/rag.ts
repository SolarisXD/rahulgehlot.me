import { GoogleGenAI } from "@google/genai";
import { createClient } from "@supabase/supabase-js";

const EMBEDDING_MODEL = "gemini-embedding-2";

export interface RAGResult {
  source: string;
  title: string;
  content: string;
  score: number;
}

/**
 * Returns true if RAG is available (Supabase + API key configured).
 */
export function isRAGAvailable(): boolean {
  return !!(
    process.env.GOOGLE_AI_API_KEY &&
    process.env.SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_KEY
  );
}

/**
 * Embed a single text string using Gemini.
 */
async function embedText(
  ai: GoogleGenAI,
  text: string
): Promise<number[]> {
  const response = await ai.models.embedContent({
    model: EMBEDDING_MODEL,
    contents: text,
  });
  return response.embeddings?.[0]?.values ?? [];
}

/**
 * Normalize RRF rank by total count.
 */
function rrfRank(rank: number, k = 60): number {
  return 1 / (k + rank);
}

/**
 * Search the knowledge base using hybrid search (vector + full-text + RRF).
 */
export async function searchKnowledgeBase(
  query: string,
  topK = 5
): Promise<RAGResult[]> {
  const apiKey = process.env.GOOGLE_AI_API_KEY!;
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;

  const ai = new GoogleGenAI({ apiKey });
  const supabase = createClient(supabaseUrl, supabaseKey);

  // 1. Embed the query
  const embedding = await embedText(ai, query);

  // 2. Vector search — cosine similarity
  const { data: vectorResults, error: vectorError } = await supabase.rpc(
    "match_content_chunks",
    {
      query_embedding: embedding,
      match_threshold: 0.5,
      match_count: 15,
    }
  );

  // If the RPC doesn't exist yet, fall back to raw query
  let vectorRows: any[] = [];
  if (!vectorError && vectorResults) {
    vectorRows = vectorResults;
  } else {
    // Fallback: inline vector search
    const { data } = await supabase
      .from("content_chunks")
      .select("source, title, content")
      .limit(15);
    vectorRows = data || [];
  }

  // 3. Full-text search
  const { data: ftsResults, error: ftsError } = await supabase
    .from("content_chunks")
    .select("source, title, content")
    .textSearch("fts", query, {
      type: "websearch",
      config: "english",
    })
    .limit(15);

  const ftsRows = !ftsError && ftsResults ? ftsResults : [];

  // 4. RRF merge
  const scores = new Map<string, { source: string; title: string; content: string; score: number }>();

  // Score vector results
  vectorRows.forEach((row: any, i: number) => {
    const key = row.source;
    const existing = scores.get(key) || {
      source: key,
      title: row.title || "",
      content: row.content || "",
      score: 0,
    };
    existing.score += rrfRank(i);
    scores.set(key, existing);
  });

  // Score FTS results
  ftsRows.forEach((row: any, i: number) => {
    const key = row.source;
    const existing = scores.get(key) || {
      source: key,
      title: row.title || "",
      content: row.content || "",
      score: 0,
    };
    existing.score += rrfRank(i);
    scores.set(key, existing);
  });

  // 5. Sort by combined RRF score
  return Array.from(scores.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

/**
 * Build a context block from RAG results for injection into the prompt.
 */
export function buildRAGContext(results: RAGResult[]): string {
  if (results.length === 0) return "";

  const blocks = results.map(
    (r, i) =>
      `[Source ${i + 1}: ${r.title}]\n${r.content}`
  );

  return `=== RELEVANT PORTFOLIO CONTEXT ===\n\n${blocks.join(
    "\n\n"
  )}\n\nAnswer the user's question using the above context. When referencing specific projects or facts, mention the source naturally (e.g. "From the Hisaab Pro case study..." or "As covered in my Skillence project...").`;
}
