# Implementation Plan — Portfolio + Chatbot

## 1. Goal

Build the portfolio in a way that gets the site live quickly, then layer in chatbot capability later without redoing the whole app.

## 2. Build strategy

The plan is intentionally staged:
1. content first,
2. site shell second,
3. sections third,
4. polish fourth,
5. chatbot after the portfolio is stable.

## 3. Phase 1: Content setup

### Tasks
- Create the Next.js app.
- Set up TypeScript and Tailwind.
- Create the `content/` folder.
- Write all content files:
  - `copy.ts`
  - `now.ts`
  - `projects.ts`
  - `experience.ts`
  - `education.ts`
  - `skills.ts`
  - `stack-decisions.ts`
  - `micro-opinions.ts`

### Output
At the end of this phase, the project should already contain the real words for the site.

## 4. Phase 2: Core layout

### Tasks
- Build `layout.tsx`.
- Add global styles.
- Add font setup.
- Add metadata.
- Add dark mode provider.
- Create `Navbar.tsx`.
- Create `Footer.tsx`.
- Create `SectionHeader.tsx`.
- Create `TechBadge.tsx`.
- Create `DarkModeToggle.tsx`.

### Output
The app should already feel like a real design system, even before all sections are built.

## 5. Phase 3: Top of page

### Tasks
- Build `Hero.tsx`.
- Build `About.tsx`.
- Build `Now.tsx`.

### Output
These three sections should define the tone of the entire site.

## 6. Phase 4: Proof sections

### Tasks
- Build `Experience.tsx`.
- Build `Education.tsx`.
- Build `Process.tsx`.

### Output
These sections should build credibility and show how the developer works.

## 7. Phase 5: Work sections

### Tasks
- Build `Projects.tsx`.
- Build `ProjectCard.tsx`.
- Build `CaseStudyCard.tsx`.
- Build `StackDecisions.tsx`.

### Output
This is the strongest proof part of the page and should be carefully polished.

## 8. Phase 6: Personality and contact

### Tasks
- Build `Skills.tsx`.
- Build `MicroOpinions.tsx`.
- Build `Contact.tsx`.
- Refine `Footer.tsx`.

### Output
This adds judgment, personality, and clear contact intent.

## 9. Phase 7: Floating chat shell

### Tasks
- Build `FloatingChat.tsx`.
- Add open/close behavior.
- Add quick prompt chips.
- Add placeholder response UI.
- Keep the first version simple.

### Output
A working chat shell exists, even before retrieval is added.

## 10. Phase 8: Deploy

### Tasks
- Push to GitHub.
- Deploy on Vercel.
- Test dark mode.
- Test mobile.
- Verify content spacing.
- Check CTA links.
- Fix layout issues.

### Output
A live portfolio is online.

## 11. Phase 9: Chat Phase 1

### Tasks
- Add a route handler for chat.
- Connect a model response.
- Stream output to the client.
- Use portfolio content in the prompt.

### Output
The chatbot can answer basic questions about your work.

## 12. Phase 10: Retrieval

### Tasks
- Create ingestion scripts.
- Chunk content.
- Generate embeddings.
- Store vectors in Supabase pgvector.
- Retrieve relevant chunks.
- Inject them into responses.

### Output
The chatbot becomes grounded in your actual content.

## 13. Phase 11: Observability

### Tasks
- Add Langfuse tracing.
- Track query/response quality.
- Record retrieval results.
- Add basic evaluation scripts.

### Output
You can see what the chatbot is doing and improve it systematically.

## 14. Phase 12: Hardening

### Tasks
- Add rate limiting.
- Add prompt injection protection.
- Add canary or safety checks.
- Improve fallback behavior.
- Refine performance.

### Output
The chatbot becomes safer and more production-like.

## 15. Suggested order of work

Recommended order:
1. Write all content.
2. Build layout and theme.
3. Build hero/about/now.
4. Build proof sections.
5. Build project sections.
6. Build personality/contact sections.
7. Deploy the portfolio.
8. Add chatbot shell.
9. Add retrieval.
10. Add observability and hardening.

## 16. Timeboxing suggestion

### Week 1
- Content files.
- Site shell.
- Core sections.
- First deploy.

### Week 2
- Chat shell.
- Basic chat API.
- Prompt tuning.
- Mobile polish.

### Week 3
- Retrieval and vector search.
- RAG integration.
- Tracing and evals.

## 17. Definition of done

The project is done when:
- the portfolio is live,
- the content sounds like you,
- the sections are readable and intentional,
- the chatbot can answer useful questions,
- the whole thing feels specific and credible.

## 18. Final principle

Do not wait for the chatbot to be perfect before shipping the portfolio. The site itself is already the main product. The chatbot is the second layer.