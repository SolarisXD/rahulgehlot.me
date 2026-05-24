# Rahul Gehlot

**Product builder. Applied AI architect. Someone who replaces PyTorch with NumPy for production because crashes matter more than convenience.**

This is not a static portfolio. It is an interactive product that embeds a hybrid RAG chatbot into its own architecture — you can ask it questions about the person who built it, and it answers from a knowledge base he curated, using a pipeline he wrote, secured with jailbreak detection he implemented, traced with observability he configured, all on the free tier. Most portfolios are lists. This one is a working system.

Visit [rahulgehlot.me](https://rahulgehlot.me), click the chat button, and see for yourself.

---

## What makes this different

Most engineering portfolios are a grid of screenshot cards with GitHub links. This one is built like a product. The chatbot is not a widget bolted on at the end — it is the centerpiece. It demonstrates engineering judgment at every layer of the stack.

**The system prompt is not hardcoded.** It is assembled from the same TypeScript data files that render the UI. When a project entry or skill is updated, the chatbot's knowledge updates with it. No duplication, no drift.

**The RAG pipeline uses hybrid search.** User queries are embedded via Gemini Embedding 2 and searched against Supabase pgvector (cosine similarity) while a parallel PostgreSQL full-text search (tsvector) runs against the same content. Results are merged via Reciprocal Rank Fusion. The top five chunks are injected into the LLM context. This means the chatbot answers from curated content, not from the model's training data.

**Security is not an afterthought.** 17 regex patterns detect prompt injection attempts server-side. A canary token embedded in the system prompt is verified in every model output — if the token surfaces, the system prompt was leaked. Inputs are capped at 500 characters. Rate limiting runs at the edge (10 requests per 60 seconds per IP). Jailbreak attempts trigger email alerts via Resend.

**Observability is built in, not bolted on.** Every chat request creates a Langfuse trace with spans for RAG search and Gemini generation. The system knows when it breaks and why.

**475 tests is not a flex. It is a requirement.** Hisaab Pro — the offline accounting system that shares this portfolio's DNA — has 475 Jest tests because silent financial bugs are worse than visible crashes. That philosophy carries into everything here.

---

## Featured Projects

**Hisaab Pro** — Offline-first double-entry accounting shipped to real small business clients. AES-256 encrypted SQLite with WAL mode for crash-safe USB portability. Payroll automation, GST invoicing, 6 financial reports. 475 Jest tests. Two product versions. Real users.

**Skillence** — Career platform mapping 692 skills to 894 occupations at ~1ms inference. PyTorch-trained model replaced with a custom pure NumPy inference layer for production because PyTorch's runtime overhead caused crashes. Campus placement engine with zero LLM dependency. 30,000+ job postings analyzed across 25+ countries.

**This portfolio** — Interactive portfolio with an embedded RAG chatbot. Gemini 1.5 Flash, Supabase pgvector, hybrid search, Langfuse tracing. All free tier. Everything you see here runs without a paid API key.

See all projects at [rahulgehlot.me](https://rahulgehlot.me).

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI | Radix UI, shadcn/ui, Phosphor Icons, Lucide Icons |
| Animations | Framer Motion |
| LLM | Google Gemini 1.5 Flash (chat), Gemini Embedding 2 (embeddings) |
| Vector Store | Supabase pgvector (3072 dimensions) |
| Search | Hybrid: vector cosine similarity + PostgreSQL tsvector full-text + RRF merge |
| Observability | Langfuse |
| Email | Resend |
| Database | Supabase (PostgreSQL) |
| Hosting | Vercel |
| Fonts | Inter, JetBrains Mono (self-hosted woff2) |

---

## Architecture

```
User Browser
    |
    |-- Static pages (portfolio sections, about, resume)
    |-- FloatingChat component
           |
           v
    POST /api/chat (SSE stream)
           |
           v
    Edge rate limiter (proxy.ts) — 10 req / 60s per IP
           |
           v
    API Route: api/chat/route.ts
        |-- Jailbreak detection (17 regex patterns)
        |-- Langfuse trace start
        |-- RAG pipeline:
        |       |-- embed query via Gemini Embedding 2
        |       |-- vector search (pgvector cosine similarity)
        |       |-- full-text search (tsvector)
        |       |-- RRF merge (k=60) -> top 5 chunks
        |-- Gemini 1.5 Flash: startChat with system instruction
        |-- SSE stream back to client
        |-- Canary token verification
        |-- Langfuse trace finalize
```

The data layer lives in `content/`. Every section on the site and every piece of knowledge the chatbot retrieves originates from these same TypeScript files.

---

## Getting Started

```bash
git clone https://github.com/SolarisXD/portfolio.git
cd portfolio
npm install
cp .env.example .env.local   # fill in your keys
npm run dev                   # opens at http://localhost:3000
```

For the RAG knowledge base to work locally, you need a Supabase project with the schema from `scripts/schema.sql` applied:

```bash
npm run ingest
```

This reads markdown from `Docs/rag-knowledge-base/rag/`, chunks by strategy, embeds via Gemini Embedding 2, and upserts into Supabase pgvector.

---

## Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `GOOGLE_AI_API_KEY` | Yes | Gemini API key for chat + embeddings |
| `SUPABASE_URL` | Yes | Supabase project URL |
| `SUPABASE_SERVICE_KEY` | Yes | Supabase service_role key |
| `LANGFUSE_PUBLIC_KEY` | No | Langfuse observability |
| `LANGFUSE_SECRET_KEY` | No | Langfuse observability |
| `LANGFUSE_BASE_URL` | No | Langfuse base URL |
| `RESEND_API_KEY` | No | Contact form + security alerts |
| `CONTACT_FROM` | No | Contact sender address |
| `CONTACT_TO` | No | Contact recipient address |
| `ALERT_TO` | No | Jailbreak alert recipient |
| `ALERT_FROM` | No | Jailbreak alert sender |

---

## Project Structure

```
├── app/                        # Next.js App Router
│   ├── api/chat/route.ts       # Chat endpoint with RAG + security
│   ├── api/contact/route.ts    # Contact form submission
│   ├── api/visitors/route.ts   # Visitor counter
│   ├── about/page.tsx          # Detailed about page
│   ├── resume/page.tsx         # PDF resume with zoom controls
│   ├── og/route.tsx            # Dynamic OG image generation
│   ├── privacy/page.tsx        # Privacy policy
│   ├── layout.tsx              # Root layout with theme + fonts
│   └── page.tsx                # Homepage — 12 sections
│
├── components/
│   ├── chat/FloatingChat.tsx   # Chatbot UI with SSE streaming
│   ├── layout/                 # Navbar, Footer
│   ├── sections/               # Hero, About, Projects, etc.
│   └── ui/                     # Reusable components
│
├── content/                    # Single source of truth
│   ├── projects.ts             # 6 projects with case studies
│   ├── copy.ts                 # Hero, about, process copy
│   ├── education.ts            # Education + certifications
│   ├── experience.ts           # Work experience
│   ├── skills.ts               # Languages, tech stack
│   ├── now.ts                  # Current focus
│   ├── stack-decisions.ts      # Key technical decisions
│   ├── micro-opinions.ts       # Engineering perspectives
│   └── faq.md                  # FAQ for RAG knowledge base
│
├── lib/
│   ├── rag.ts                  # Hybrid search pipeline
│   ├── security.ts             # Jailbreak detection + canary
│   ├── system-prompt.ts        # Dynamic system prompt builder
│   ├── langfuse.ts             # Observability wrapper
│   ├── alert.ts                # Security alert emails
│   ├── rate-limit.ts           # Contact form cooldown
│   ├── validation.ts           # Form validators
│   ├── visitors.ts             # Supabase visitor counter
│   └── hooks.ts                # useActiveSection, useHydrated
│
├── scripts/
│   ├── ingest.ts               # RAG knowledge base ingestion
│   └── schema.sql              # Supabase pgvector schema
│
├── Docs/rag-knowledge-base/    # RAG source markdown files
├── fonts/                      # Self-hosted web fonts
└── public/                     # Static assets
```

---

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/chat` | Chat with AI assistant (SSE stream) |
| POST | `/api/contact` | Submit contact form with rate limiting |
| GET | `/api/visitors` | Retrieve visitor count |
| POST | `/api/visitors` | Increment visitor count |

---

## RAG Knowledge Base

The chatbot retrieves context from markdown files stored in `Docs/rag-knowledge-base/rag/`. Each file uses a chunking strategy suited to its content type:

| File | Source ID | Strategy |
|------|-----------|----------|
| `rag/bio.md` | `bio` | Single |
| `rag/projects/hisaab-pro.md` | `project:hisaab-pro` | Section |
| `rag/projects/skillence.md` | `project:skillence` | Section |
| `rag/projects/other.md` | `project:other` | Section |
| `rag/skills.md` | `skills` | Section |
| `rag/education.md` | `education` | Single |
| `rag/process.md` | `process` | Paragraph |
| `rag/decisions.md` | `decisions` | Section |
| `rag/faq.md` | `faq` | QA pair |

After editing, re-run `npm run ingest` to re-embed and upsert.

---

## Deployment

Designed for Vercel. Push to GitHub, import the repo, set environment variables, deploy.

```bash
npm i -g vercel
vercel
vercel env add GOOGLE_AI_API_KEY   # repeat for each variable
```

The site is configured for `rahulgehlot.me`. Add the custom domain in Vercel project settings and update DNS at your registrar.

---

## Engineering Decisions

Five key decisions that shaped this portfolio and the projects it showcases:

- **AES-256 encrypted SQLite over plain SQLite.** Client financial data at rest with no encryption is unacceptable. Page-level AES-256 encryption leaves no attack surface written by the developer.

- **Write-Ahead Logging for SQLite.** USB drives get removed mid-operation in the environments these tools run in. WAL mode keeps the database consistent through unclean shutdowns.

- **Pure NumPy inference over PyTorch serving.** PyTorch runtime overhead caused backend crashes. A hand-written NumPy forward pass cut them to near-zero. More work upfront, zero crashes in production.

- **475 Jest tests.** Silent wrong accounting is worse than a crash. The test suite ensures any change that breaks payroll logic fails before it reaches a client's books.

- **Gemini Flash over paid LLM APIs.** 1,500 req/day and 1M tokens/day on the free tier, no credit card required. For an unknown-traffic portfolio chatbot, starting free and upgrading when there is a reason to is the only rational default.

---

## License

MIT — see [LICENSE](./LICENSE).

Covers the code, components, utilities, and architecture. If you fork this, replace the following with your own:

- `content/` — all portfolio data, bio, projects, experience, skills
- `public/` — images, resume PDF, favicon
- `app/layout.tsx` — metadata, site name
- `app/about/page.tsx` — personal information

The MIT license does not cover these personal assets.
