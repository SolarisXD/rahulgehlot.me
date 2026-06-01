# Backend Schema - Content and RAG Data Model

## 1. Purpose

This document defines the content structure for the portfolio and the future chatbot knowledge base.

The backend should start with typed content files and later expand into a retrieval system without changing the user-facing structure too much.

## 2. Content file schema

### copy.ts
Contains the main prose blocks.

Suggested shape:
```ts
export const copy = {
  hero: {
    greeting: string,
    roles: string[],
    primaryCta: string,
    secondaryCta: string
  },
  about: string,
  contact: {
    heading: string,
    subheading: string,
    emailLabel: string
  },
  process: Array<{
    number: string,
    title: string,
    body: string
  }>
}
```

### now.ts
Suggested shape:
```ts
export type NowItem = {
  label: string
  value: string
  link?: string
}

export const now: NowItem[] = []
export const lastUpdated = "YYYY-MM-DD"
```

### projects.ts
Suggested shape:
```ts
export type Project = {
  title: string
  description: string
  stack: string[]
  github?: string
  demo?: string
  status: "live" | "in-development" | "archived" | "sold"
  tags: string[]
  featured: boolean
  caseStudy?: {
    why: string
    decision: string
    outcome?: string
  }
}
```

### experience.ts
Suggested shape:
```ts
export type ExperienceEntry = {
  role: string
  org: string
  location: string
  period: string
  type: "full-time" | "freelance" | "contract" | "internship"
  bullets: string[]
  stack: string[]
  link?: string
}
```

### education.ts
Suggested shape:
```ts
export type EducationEntry = {
  institution: string
  degree: string
  field: string
  period: string
  grade?: string
  highlights?: string[]
}
```

### skills.ts
Suggested shape:
```ts
export type SkillGroup = {
  domain: string
  note?: string
  items: string[]
}
```

### stack-decisions.ts
Suggested shape:
```ts
export type StackDecision = {
  choice: string
  alternative: string
  reasoning: string
}
```

### micro-opinions.ts
Suggested shape:
```ts
export const microOpinions: string[] = []
```

## 3. RAG content source model

The chatbot should eventually index the following sources:
- content files,
- project case study notes,
- future markdown docs,
- optional blog posts,
- optional README excerpts.

## 4. Document ingestion model

Each source document should be normalized into chunks.

Suggested chunk record:
```ts
export type DocChunk = {
  id: string
  source: string
  title: string
  content: string
  chunkIndex: number
  chunkCount: number
  embedding?: number[]
  metadata: Record<string, string | number | boolean>
}
```

## 5. Proposed Supabase tables

### documents
Stores source-level metadata.

Fields:
- id
- slug
- title
- source_type
- version
- created_at
- updated_at

### document_chunks
Stores chunked text.

Fields:
- id
- document_id
- chunk_index
- content
- token_count
- metadata
- embedding

### chat_sessions
Stores conversation-level metadata.

Fields:
- id
- user_identifier
- created_at
- updated_at

### chat_messages
Stores user and assistant messages.

Fields:
- id
- session_id
- role
- content
- created_at

### retrieval_logs
Stores retrieval diagnostics.

Fields:
- id
- session_id
- query
- top_sources
- similarity_scores
- created_at

### eval_runs
Stores evaluation results.

Fields:
- id
- prompt_version
- metric_name
- score
- notes
- created_at

## 6. Vector search model

The vector search should support:
- semantic matching,
- keyword or hybrid retrieval later,
- ranking by relevance,
- source metadata filtering.

Hybrid retrieval should eventually combine:
- vector similarity,
- lexical match,
- recency or section priority.

## 7. Chat response model

A response should ideally include:
- answer text,
- optional sources,
- optional confidence hints for internal use only,
- optional citations in future versions.

Suggested shape:
```ts
export type ChatAnswer = {
  answer: string
  sources?: {
    title: string
    source: string
  }[]
}
```

## 8. Security model

The backend should:
- keep API keys server-side,
- validate chat input,
- limit request size,
- avoid prompt leakage,
- limit abusive use later with rate limiting.

## 9. Prompting model

The chatbot prompt should instruct the model to:
- speak in the developer’s voice,
- stay grounded in portfolio facts,
- avoid making up project details,
- admit uncertainty when needed,
- keep answers concise unless a deeper explanation is requested.

## 10. RAG quality rules

The retrieval layer should:
- prefer exact project matches for project questions,
- prefer stack decision chunks for architecture questions,
- prefer about/now chunks for personal or current-focus questions,
- use project-specific case studies when available.

## 11. Versioning rules

Content should be versioned so updates do not break the chatbot or indexing pipeline.

Recommended practice:
- keep content in typed files,
- export a `lastUpdated` value where useful,
- re-index after meaningful changes.

## 12. Future expansion

Potential additions:
- blog posts,
- project writeups,
- CV PDF ingestion,
- GitHub README ingestion,
- more detailed case study docs,
- FAQ documents.

## 13. Backend success criteria

The backend is successful if:
- content is structured cleanly,
- the chatbot can ingest the same source material,
- the data model is easy to extend,
- retrieval can be improved without rewriting everything.