# TRD - Technical Requirements Document

## 1. Overview

This document defines the technical structure for the portfolio website and chatbot system. The goal is to keep the first version simple enough to ship, while ensuring the architecture can grow into a full RAG-based assistant later.

## 2. Stack

### Frontend
- Next.js App Router.
- TypeScript.
- Tailwind CSS.
- next-themes for dark mode.
- Framer Motion for later scroll animations.
- lucide-react for icons.

### Backend
- Next.js route handlers.
- Server-side generation for chat.
- Streaming responses.
- Later: retrieval endpoints for RAG.

### AI layer
- Gemini Flash for generation.
- Google embeddings for semantic search.
- Supabase pgvector for vector storage.
- Langfuse for tracing.
- Future eval scripts in GitHub Actions.

### Deployment
- Vercel.

## 3. Architecture overview

The system is split into three layers:

1. **Presentation layer**  
   The visible portfolio website: sections, cards, navigation, and chat button.

2. **Content layer**  
   Typed data files holding copy, projects, experience, skills, opinions, and “now” updates.

3. **AI layer**  
   A chatbot that first uses prompt-based responses, then retrieval, then RAG.

This separation is important because the same content files can later feed the chatbot ingestion pipeline.

## 4. Folder structure

Recommended structure:

```txt
app/
  layout.tsx
  page.tsx
  globals.css

components/
  layout/
    Navbar.tsx
    Footer.tsx
  sections/
    Hero.tsx
    About.tsx
    Now.tsx
    Experience.tsx
    Education.tsx
    Process.tsx
    Projects.tsx
    StackDecisions.tsx
    Skills.tsx
    MicroOpinions.tsx
    Contact.tsx
  ui/
    SectionHeader.tsx
    ProjectCard.tsx
    CaseStudyCard.tsx
    TechBadge.tsx
    DarkModeToggle.tsx
  chat/
    FloatingChat.tsx

content/
  copy.ts
  now.ts
  projects.ts
  experience.ts
  education.ts
  skills.ts
  stack-decisions.ts
  micro-opinions.ts

lib/
  utils.ts

public/
  avatar.jpg
  og-image.png
```

## 5. Content-first rule

All real text should live in `content/*.ts` files before component work begins. This ensures:
- easier editing,
- consistent voice,
- simpler future ingestion for RAG,
- fewer hardcoded strings in components.

## 6. Data model requirements

### copy.ts
Holds the main prose for hero, about, contact, and process.

### now.ts
Holds live snapshot data:
- label
- value
- optional link
- last updated date

### projects.ts
Holds projects and case study metadata:
- title
- description
- stack
- github
- demo
- status
- tags
- featured
- caseStudy
- why
- decision
- outcome

### experience.ts
Holds work entries:
- role
- org
- location
- period
- type
- bullets
- stack
- link

### education.ts
Holds education and certifications.

### skills.ts
Holds grouped skills by domain.

### stack-decisions.ts
Holds opinions about technical tradeoffs.

### micro-opinions.ts
Holds short one-liner or two-liner beliefs.

## 7. UI component rules

### Section components
Each section component should:
- take content from data files,
- own layout and spacing,
- not contain business logic,
- not contain large amounts of copy directly.

### UI components
UI components should be dumb and reusable:
- SectionHeader,
- TechBadge,
- ProjectCard,
- CaseStudyCard,
- DarkModeToggle.

## 8. Chatbot technical plan

## Phase 1: Chat shell
- Button opens a modal or panel.
- User can type a question.
- The system responds with a streamed answer.
- The answer can come from a prompt and limited portfolio context.

### Phase 1 route
Use a Next.js route handler, not a separate service.

### Phase 1 response style
- Short, useful, confident.
- No fake “AI assistant” personality.
- Should sound like the portfolio owner.

## Phase 2: Retrieval
Add retrieval over content files and optional markdown docs.

Flow:
1. Receive user message.
2. Embed the query.
3. Search Supabase pgvector for relevant chunks.
4. Pass top chunks into the generation prompt.
5. Stream the answer back.

## Phase 3: RAG
Add a proper document ingestion pipeline.

Sources:
- content files.
- project notes.
- case study docs.
- future blog posts.

Pipeline:
1. Extract text.
2. Chunk content.
3. Generate embeddings.
4. Store chunks in Supabase.
5. Retrieve and rank relevant chunks.
6. Generate final answer.

## Phase 4: Observability and evals
- Log queries and responses with Langfuse.
- Track retrieval quality.
- Add eval scripts in GitHub Actions.
- Test jailbreak resistance.
- Add rate limiting.

## 9. Deployment requirements

The project should deploy cleanly on Vercel with no paid infrastructure required in Phase 1.

Requirements:
- Build passes on push.
- Dark mode works on first load.
- Mobile layout works at 375px width.
- Floating chat remains usable on small screens.

## 10. Performance requirements

- Fast initial load.
- Minimal JS for the static portfolio.
- Chat should be isolated from the rest of the page.
- Avoid heavy animation libraries in Phase 1 unless needed.

## 11. Accessibility requirements

- Semantic HTML.
- Proper heading order.
- Visible focus states.
- Sufficient color contrast.
- Buttons and links must be keyboard accessible.
- Chat panel must be accessible by keyboard.

## 12. Security requirements

For the chatbot:
- Validate input length.
- Prevent arbitrary tool execution.
- Avoid exposing system prompts.
- Keep secrets server-side only.
- Add rate limiting later.

## 13. Observability requirements

Once RAG is added:
- Store chat logs.
- Track failed retrieval.
- Track confidence or citation coverage.
- Capture prompt versions.
- Capture eval results.

## 14. Future expansion

The architecture should allow:
- adding more content documents,
- adding blog posts,
- adding project notes,
- adding citations in chat answers,
- adding analytics,
- adding feedback signals.

## 15. Build constraints

- Do not depend on paid AI subscriptions.
- Do not overbuild phase 1.
- Do not hardcode content in components.
- Do not introduce unnecessary backend complexity before the site is live.

## 16. Acceptance criteria

The technical implementation is successful if:
- The site ships live.
- Content is easy to update.
- The chatbot can later ingest the same content structure.
- The system remains maintainable.
- The free-tier stack is enough for the first version.