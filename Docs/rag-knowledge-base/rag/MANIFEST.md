# RAG Ingestion Manifest
# Maps each content file to its source, chunk strategy, and metadata tags.
# Used by scripts/ingest.ts to process and embed the knowledge base.

files:
  - path: rag/bio.md
    source: bio
    strategy: single          # short enough to be one chunk
    tags: [identity, contact, overview]

  - path: rag/projects/hisaab-pro.md
    source: project:hisaab-pro
    strategy: section         # chunk by ## heading
    tags: [project, full-stack, accounting, sqlite, testing]

  - path: rag/projects/skillence.md
    source: project:skillence
    strategy: section         # chunk by ## heading
    tags: [project, AI, ML, pytorch, numpy, career-platform]

  - path: rag/projects/other.md
    source: project:other
    strategy: section
    tags: [project, swaphub, portfolio, github]

  - path: rag/skills.md
    source: skills
    strategy: section         # chunk by ## heading (one per skill domain)
    tags: [skills, tech-stack, languages, frameworks]

  - path: rag/education.md
    source: education
    strategy: single
    tags: [education, vit, cgpa, certifications]

  - path: rag/process.md
    source: process
    strategy: paragraph       # each ## heading = one chunk
    tags: [process, working-style, decisions, philosophy]

  - path: rag/decisions.md
    source: decisions
    strategy: section         # each --- separated decision = one chunk
    tags: [decisions, technical, reasoning, architecture]

  - path: rag/faq.md
    source: faq
    strategy: qa-pair         # each Q+A block = one chunk
    tags: [faq, availability, contact, hiring]

# Chunk settings
chunk_size: 500               # tokens per chunk
chunk_overlap: 50             # token overlap between adjacent chunks
embedding_model: gemini-embedding-2
embedding_dimension: 3072
