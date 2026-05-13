export type StackDecision = {
  choice: string;
  alternative: string;
  reasoning: string;
};

export const stackDecisions: StackDecision[] = [
  {
    choice: "Next.js over Vite + React",
    alternative: "Vite + React Router",
    reasoning:
      "Next.js gives SSR, next/image, and API routes in one project. The Vercel deploy story is also simpler — one git push and everything works, including edge functions.",
  },
  {
    choice: "SQLCipher over plain SQLite",
    alternative: "SQLite + application-layer encryption",
    reasoning:
      "Application-layer encryption means rolling your own crypto. SQLCipher encrypts at the page level with AES-256 — battle-tested, no custom code path to get wrong. Non-negotiable for financial data.",
  },
  {
    choice: "Gemini Flash over GPT-3.5 or Mistral",
    alternative: "OpenAI, Groq, Mistral",
    reasoning:
      "Gemini Flash has a genuinely useful free tier (1,500 req/day, 1M tokens/day) with no credit card required. Right default when traffic is unknown. Swap to paid when there's a reason to.",
  },
  {
    choice: "Supabase pgvector over Pinecone",
    alternative: "Pinecone, Weaviate, Chroma",
    reasoning:
      "pgvector inside Postgres means one less service, SQL-native hybrid search in one query, and the free tier is enough for a portfolio chatbot. I'll add complexity when complexity is needed.",
  },
];
