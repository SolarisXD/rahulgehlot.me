/**
 * RAG Ingestion Script
 *
 * Reads markdown files from Docs/rag-knowledge-base/rag/ (as defined in MANIFEST.md),
 * chunks them according to each file's strategy, embeds with Gemini, and upserts
 * into Supabase pgvector.
 *
 * Idempotent - safe to re-run after content changes.
 *
 * Usage:
 *   npm run ingest
 */

import { createClient } from "@supabase/supabase-js";
import { GoogleGenAI } from "@google/genai";
import * as fs from "fs";
import * as path from "path";
import WebSocket from "ws";

// Load .env.local for standalone script use
const envPath = path.resolve(__dirname, "../.env.local");
const envRaw = fs.readFileSync(envPath, "utf-8");
for (const line of envRaw.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eqIdx = trimmed.indexOf("=");
  if (eqIdx === -1) continue;
  const key = trimmed.slice(0, eqIdx).trim();
  const value = trimmed.slice(eqIdx + 1).trim();
  if (!process.env[key]) process.env[key] = value;
}

// ─── Types ───────────────────────────────────────────────────────────

interface Chunk {
  source: string;
  title: string;
  content: string;
}

interface ManifestEntry {
  path: string;
  source: string;
  strategy: "single" | "section" | "paragraph" | "qa-pair";
}

// ─── Config ──────────────────────────────────────────────────────────

const API_KEY = process.env.GOOGLE_AI_API_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const EMBEDDING_MODEL = "gemini-embedding-2";
const KB_DIR = path.resolve(__dirname, "../Docs/rag-knowledge-base");

function fail(msg: string): never {
  console.error(`❌ ${msg}`);
  process.exit(1);
}

// ─── 1. Parse MANIFEST ───────────────────────────────────────────────

function parseManifest(): ManifestEntry[] {
  const manifestPath = path.join(KB_DIR, "rag/MANIFEST.md");
  const raw = fs.readFileSync(manifestPath, "utf-8");

  const entries: ManifestEntry[] = [];
  const fileRegex = /^\s+-\s+path:\s+(.+)$/gm;
  const sourceRegex = /^\s+source:\s+(.+)$/gm;
  const strategyRegex = /^\s+strategy:\s+(.+)$/gm;

  const lines = raw.split("\n");
  let current: Partial<ManifestEntry> = {};

  for (const line of lines) {
    const pathMatch = line.match(/^\s+-\s+path:\s+(.+)$/);
    const sourceMatch = line.match(/^\s+source:\s+(.+)$/);
    const strategyMatch = line.match(/^\s+strategy:\s+(.+)$/);

    if (pathMatch) {
      if (current.path && current.source && current.strategy) {
        entries.push(current as ManifestEntry);
      }
      current = { path: pathMatch[1].trim() };
    } else if (sourceMatch && current.path) {
      current.source = sourceMatch[1].trim();
    } else if (strategyMatch && current.path) {
      current.strategy = strategyMatch[1].trim() as ManifestEntry["strategy"];
    }
  }

  // Push last entry
  if (current.path && current.source && current.strategy) {
    entries.push(current as ManifestEntry);
  }

  return entries;
}

// ─── 2. Chunk files by strategy ──────────────────────────────────────

function readMarkdown(filePath: string): string {
  const fullPath = path.join(KB_DIR, filePath);
  return fs.readFileSync(fullPath, "utf-8");
}

function chunkSingle(content: string, source: string): Chunk[] {
  // First line (# Title) becomes the title, rest is content
  const lines = content.split("\n");
  const title = lines[0].replace(/^#+\s*/, "").trim();
  const body = lines.slice(1).join("\n").trim();
  return [{ source, title, content: body || title }];
}

function chunkBySection(content: string, source: string): Chunk[] {
  // Split on any markdown heading (## or ### etc)
  const sections = content.split(/\n(?=#{2,}\s)/);
  return sections.map((section) => {
    const lines = section.split("\n");
    const heading = lines[0].replace(/^#+\s*/, "").trim();
    // If the first chunk has no heading (it's the intro before the first ##), use the file's # title
    const title = heading || source;
    const body = lines.slice(heading ? 1 : 0).join("\n").trim();
    return {
      source: `${source}:${slugify(title)}`,
      title,
      content: body || section.trim(),
    };
  });
}

function chunkQAPairs(content: string, source: string): Chunk[] {
  // Split by "**Q:" or "**Are you" etc - Q&A pairs in the FAQ
  const pairs = content.split(/\n(?=\*\*)/).filter((p) => p.trim());
  return pairs.map((pair, i) => {
    const firstLine = pair.split("\n")[0].replace(/\*\*/g, "").trim();
    return {
      source: `${source}:${i}`,
      title: firstLine.slice(0, 80),
      content: pair.trim(),
    };
  });
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 50);
}

function chunkFile(entry: ManifestEntry): Chunk[] {
  const content = readMarkdown(entry.path);

  switch (entry.strategy) {
    case "single":
      return chunkSingle(content, entry.source);
    case "section":
    case "paragraph":
      return chunkBySection(content, entry.source);
    case "qa-pair":
      return chunkQAPairs(content, entry.source);
    default:
      return chunkSingle(content, entry.source);
  }
}

// ─── 3. Embed chunks ────────────────────────────────────────────────

async function embedChunks(
  ai: GoogleGenAI,
  chunks: Chunk[]
): Promise<Array<Chunk & { embedding: number[] }>> {
  const batchSize = 10;
  const result: Array<Chunk & { embedding: number[] }> = [];

  console.log(`\nEmbedding ${chunks.length} chunks in batches of ${batchSize}...`);

  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize);
    console.log(
      `  Batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(chunks.length / batchSize)}`
    );

    for (const chunk of batch) {
      try {
        const response = await ai.models.embedContent({
          model: EMBEDDING_MODEL,
          contents: chunk.content,
        });
        result.push({
          ...chunk,
          embedding: response.embeddings?.[0]?.values ?? [],
        });
      } catch (err) {
        console.error(
          `  ⚠ Failed to embed "${chunk.title}": ${err instanceof Error ? err.message : err}`
        );
        result.push({ ...chunk, embedding: [] });
      }
    }

    // Delay between batches to avoid rate limits
    if (i + batchSize < chunks.length) {
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  return result;
}

// ─── 4. Upsert into Supabase ─────────────────────────────────────────

async function upsertChunks(
  supabase: ReturnType<typeof createClient>,
  chunks: Array<Chunk & { embedding: number[] }>
) {
  console.log("\nUpserting to Supabase...");

  let success = 0;
  let skip = 0;

  for (const chunk of chunks) {
    if (chunk.embedding.length === 0) {
      console.warn(`  ⚠ Skipping "${chunk.title}" - no embedding`);
      skip++;
      continue;
    }

    const { error } = await supabase.from("content_chunks").upsert(
      {
        source: chunk.source,
        title: chunk.title,
        content: chunk.content,
        embedding: chunk.embedding,
      },
      { onConflict: "source" }
    );

    if (error) {
      console.error(`  ⚠ Failed "${chunk.title}": ${error.message}`);
      skip++;
    } else {
      success++;
    }
  }

  console.log(`\n✅ Done - ${success} upserted, ${skip} skipped`);
}

// ─── Main ────────────────────────────────────────────────────────────

async function main() {
  console.log("╔══════════════════════════════╗");
  console.log("║  Portfolio RAG Ingestion     ║");
  console.log("╚══════════════════════════════╝");

  // Validate env
  if (!API_KEY) fail("GOOGLE_AI_API_KEY is not set");
  if (!SUPABASE_URL) fail("SUPABASE_URL is not set");
  if (!SUPABASE_SERVICE_KEY) fail("SUPABASE_SERVICE_KEY is not set");

  // Init clients
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    realtime: { transport: WebSocket },
  });

  // Step 1: Parse manifest
  console.log("\n📋 Reading manifest...");
  const entries = parseManifest();
  console.log(`  Found ${entries.length} file entries`);

  // Step 2: Chunk all files
  console.log("\n📦 Chunking content...");
  const allChunks: Chunk[] = [];
  for (const entry of entries) {
    const chunks = chunkFile(entry);
    allChunks.push(...chunks);
    console.log(`  ${entry.path} → ${chunks.length} chunk(s)`);
  }
  console.log(`  Total: ${allChunks.length} chunks`);

  // Step 3: Embed
  const embedded = await embedChunks(ai, allChunks);

  // Step 4: Upsert
  await upsertChunks(supabase, embedded);

  console.log("\n🎉 Ingestion complete! Your knowledge base is live.");
  console.log("   Re-run `npm run ingest` whenever you update the markdown files.");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
