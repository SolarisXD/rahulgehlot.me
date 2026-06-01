# Technical Decisions & Reasoning

This document captures the key technical decisions Rahul has made across his projects, with the reasoning behind each. These are real decisions made under real constraints - not hypothetical comparisons.

---

## AES-256 encrypted SQLite over plain SQLite (Hisaab Pro)

**What:** Hisaab Pro stores all accounting data in an AES-256 encrypted SQLite database, not a plain SQLite file.

**Why not plain SQLite:** Client financial data at rest with no encryption is unacceptable. Hisaab Pro runs on the client's own machine - hardware that Rahul doesn't control. That machine might not have full-disk encryption. It might be shared. The USB drive it's on might be removed and handed to someone else. Page-level AES-256 encryption means the data is protected regardless of what happens to the storage medium.

**Why not application-layer encryption:** Rolling your own crypto for file-level protection creates a custom code path that can be wrong in subtle ways. Page-level encryption in the database engine is battle-tested and has no custom code path.

---

## Write-Ahead Logging (WAL) for SQLite (Hisaab Pro)

**What:** Hisaab Pro uses SQLite's WAL journal mode instead of the default DELETE journal mode.

**Why:** Small retail businesses - the target users for Hisaab Pro - frequently work on machines where USB drives get removed without proper unmounting. In default journal mode, this can corrupt the database. WAL mode keeps the database consistent even during unclean shutdowns because changes are written to a separate WAL file before being applied to the main database. Even if the process is killed mid-write, the main database file remains in a valid state.

---

## Custom NumPy inference layer over PyTorch serving (Skillence)

**What:** Skillence's recommendation model was trained in PyTorch but is served in production using a custom-written pure NumPy forward pass, not the PyTorch model.predict() call.

**Why:** PyTorch carries significant runtime overhead for inference. Loading the PyTorch runtime, initialising the computation graph, and loading model weights into memory on each request was causing backend crashes under load. The actual forward pass - the inference computation - is just matrix multiplications and activation functions. NumPy can do this with no PyTorch dependency, faster initialisation, and near-zero crashes.

**The tradeoff:** Writing the forward pass manually in NumPy requires understanding the model architecture well enough to reimplement it layer by layer. This is more work than calling model.predict(). Rahul judged this worth it because deployment reliability was more important than implementation convenience.

**Result:** Backend deployment crashes reduced to near-zero. Inference latency approximately 1ms.

---

## Zero LLM dependency in the campus placement engine (Skillence)

**What:** The campus placement engine in Skillence - which parses academic grade histories and applies a 4-variable scoring model to shortlist students - was deliberately built without using any LLM.

**Why:** LLMs are expensive per-call, add latency, are non-deterministic (the same input can produce different outputs), and are harder to audit. An algorithmic scoring model based on 4 variables produces the same result every time on the same input, costs nothing to run, runs in microseconds, and is fully auditable. For a placement engine where the output needs to be defensible and consistent, algorithmic scoring is clearly better.

**The principle:** Use LLMs where language understanding or generation is genuinely required. Use algorithms where deterministic, auditable scoring is what's needed.

---

## 475 Jest tests (Hisaab Pro)

**What:** Hisaab Pro's backend has 475 unit and integration tests written with Jest.

**Why:** Silent wrong accounting is worse than a visible crash. If the application crashes, the client knows and reports it. If the payroll module silently processes a salary transaction twice, the client might not notice for weeks - and by then the books are wrong in ways that are hard to trace. The test suite makes it impossible to deploy a change that breaks payroll logic, ledger balancing, or transaction processing without it failing in CI first.

---

## Gemini Flash over OpenAI for the portfolio chatbot

**What:** The portfolio RAG chatbot uses Google's Gemini 1.5 Flash model instead of OpenAI's GPT-3.5 or GPT-4.

**Why:** Gemini Flash has a free tier of 1,500 requests per day and 1 million tokens per day with no credit card required. For a portfolio chatbot with unknown and likely low traffic, starting on a free tier and upgrading only when there's a demonstrated reason to is the correct default. The quality difference between Gemini Flash and GPT-3.5 is negligible for a Q&A chatbot answering questions about a developer's background.

---

## pgvector over Pinecone for vector storage (portfolio chatbot)

**What:** The portfolio chatbot's knowledge base is stored in Supabase with the pgvector extension, not a dedicated vector database like Pinecone or Weaviate.

**Why:** pgvector inside Postgres means one less service to manage. Supabase also supports full-text search natively - so hybrid search (combining vector cosine similarity with BM25 full-text matching) can be done in a single SQL query without hitting two separate services. The Supabase free tier (500MB) is more than enough for a portfolio chatbot's knowledge base. Adding a dedicated vector database would add complexity with no benefit at this scale.

---

## React 19 for Skillence frontend

**What:** Skillence used React 19, not the more widely deployed React 18.

**Why:** As a capstone project, using the latest stable React version was appropriate - there was no legacy codebase to maintain compatibility with. React 19 introduces improved concurrent rendering and server component patterns that Rahul wanted to work with directly.
