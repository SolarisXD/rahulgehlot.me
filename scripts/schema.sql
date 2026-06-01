-- Run this in Supabase SQL Editor (Dashboard → SQL Editor)
-- One-time setup for the RAG pipeline.
-- 1. Enable pgvector extension
create extension if not exists vector with schema public;
-- 2. Content chunks table
create table if not exists content_chunks (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  -- e.g. "project:hisaab-pro", "bio", "experience:0"
  title text not null default '',
  -- human-readable label for citations
  content text not null,
  embedding vector(3072),
  -- gemini-embedding-2 (default 3072d)
  fts tsvector generated always as (to_tsvector('english', content)) stored,
  created_at timestamptz default now()
);
-- No vector index needed - ~15 chunks, exact search is instant.
-- 4. Full-text search index
create index if not exists idx_content_chunks_fts on content_chunks using gin (fts);
-- 5. Unique constraint to make re-runs safe (upsert by source)
create unique index if not exists idx_content_chunks_source on content_chunks (source);
-- 6. Grant permissions (service_role key used by ingestion script)
grant all on table content_chunks to service_role;
grant select on table content_chunks to anon;
grant execute on function match_content_chunks(vector(3072), float, int) to service_role;
grant execute on function match_content_chunks(vector(3072), float, int) to anon;
-- 7. Vector search function (used by the API route)
create or replace function match_content_chunks(
    query_embedding vector(3072),
    match_threshold float,
    match_count int
  ) returns table (
    source text,
    title text,
    content text,
    similarity float
  ) language plpgsql as $$ begin return query
select cc.source,
  cc.title,
  cc.content,
  1 - (cc.embedding <=> query_embedding) as similarity
from content_chunks cc
where 1 - (cc.embedding <=> query_embedding) > match_threshold
order by cc.embedding <=> query_embedding
limit match_count;
end;
$$;