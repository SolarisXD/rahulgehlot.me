# Portfolio Content
> Source of truth for all content/*.ts and content/*.md files.
> Copy from here into the actual data files when building.
> Every word here maps to a specific file in the content/ directory.

---

## Meta - `content/copy.ts → meta`

```ts
name: 'Rahul Gehlot'
email: 'rahulgehlot6044@gmail.com'
github: 'https://github.com/SolarisXD'
linkedin: 'https://linkedin.com/in/rahulgehlot'
site: 'https://rahulgehlot.me'
```

---

## Hero - `content/copy.ts → hero`

**Greeting:**
```
Hi, I'm Rahul.
```

**Cycling roles (3 strings, 3s each, crossfade):**
```
"I build AI systems that do real work."
"I build full-stack products people actually use."
"I find a problem and don't stop until it's gone."
```

**Why these:** The first signals ML/AI depth. The second signals delivery. The third signals drive. All three are verifiable from the resume - Skillence is an AI system, Hisaab Pro shipped to clients, and the Jest test suite (475 tests) signals someone who finishes things properly.

**CTA buttons:**
```
Primary:   "See my work"      → scrolls to #projects
Secondary: "Ask the bot →"    → opens FloatingChat
```

---

## About - `content/copy.ts → about`

```
Paragraph 1:
"B.Tech CSE student at VIT Bhopal (AI-ML specialisation, graduating July 2026,
CGPA 8.67). I build full-stack web apps and machine learning systems - sometimes
separately, increasingly together. Hisaab Pro is an offline accounting system I
built and shipped to real clients. Skillence is a career platform with a
custom PyTorch model and a pure NumPy inference layer I wrote to cut backend
deployment crashes to near-zero."

Paragraph 2:
"I write a lot of tests. Hisaab Pro has 475 Jest tests -
not because someone told me to, but because client financial data has no room
for silent bugs. That instinct follows me into everything I build."
```

**What makes this work:**
- Specific numbers (475 tests, 8.67, 692 skills, 894 occupations)
- Two real projects with one specific technical decision each
- The last paragraph turns a resume bullet into a point of view

---

## Now - `content/now.ts`

```ts
export const now: NowItem[] = [
  {
    label: 'Building',
    value: 'This portfolio - with a RAG chatbot powered by Gemini and pgvector',
  },
  {
    label: 'Exploring',
    value: 'LLM evaluation - Langfuse, RAGAS, and building eval pipelines that catch regressions',
  },
  {
    label: 'Reflecting on',
    value: 'Skillence - what worked in the ML pipeline and what I'd architect differently',
  },
  {
    label: 'Available for',
    value: 'Internships and freelance projects. I respond same day.',
  },
]

export const nowLastUpdated = '2026-05-08'
```

---

## Experience - `content/experience.ts`

> Rahul's resume has no listed work experience. The honest move is to have
> no Experience section rather than a thin/empty one. Replace it with a
> "Projects" section that does the heavy lifting, and a small "What I've
> built" framing note in the About.
>
> If you have any freelance clients, college club roles, or part-time work
> not on the resume - add them here. Even one real entry is better than none.

**Placeholder until you add real entries:**
```ts
export const experience: ExperienceEntry[] = [
  // Add freelance clients, internships, or club leadership here.
  // If none exist yet, remove the Experience section from page.tsx entirely.
  // An empty section is worse than no section.
]
```

**If you have freelance clients from Hisaab Pro deployments, add:**
```ts
{
  role: 'Freelance Developer',
  org: 'Hisaab Pro clients',
  location: 'Remote',
  period: '2026',
  type: 'freelance',
  bullets: [
    'Deployed Hisaab Pro to [N] small business clients across [state/region]',
    'Iterated across 2+ product versions based on client feedback - added payroll automation and client-side PDF export',
    'Supported real-world deployment with offline-first architecture ensuring data integrity on USB drive removal',
  ],
  stack: ['Node.js', 'Express.js', 'SQLite', 'Jest'],
}
```

---

## Education - `content/education.ts`

```ts
export const education: EducationEntry[] = [
  {
    institution: 'VIT Bhopal',
    degree: 'B.Tech',
    field: 'Computer Science & Engineering (AI-ML Specialisation)',
    period: 'October 2022 – July 2026',
    grade: 'CGPA 8.67 / 10.0',
    highlights: [
      'AI & Machine Learning specialisation',
      'PyTorch, NumPy, scikit-learn, Pandas',
      'Data Structures & Algorithms',
      'Database Management Systems',
      'Full-stack Web Development',
    ],
  },
]

export const certifications: Certification[] = [
  {
    name: 'Blockchain Developer Certification',
    issuer: 'IBM Career Education Program',
    year: '2024',             // verify year from your cert
  },
  {
    name: 'Adobe UI & UX - Graphic Design',
    issuer: 'Ethnus via Codemithra',
    year: '2024',             // verify
  },
  {
    name: 'HTML, CSS & JavaScript for Web Developers',
    issuer: 'Johns Hopkins University (Coursera)',
    year: '2023',             // verify
    link: 'https://coursera.org/verify/...',  // add verify link if you have it
  },
]
```

---

## Projects - `content/projects.ts`

### Hisaab Pro - CASE STUDY (featured)

```ts
{
  id: 'hisaab-pro',
  title: 'Hisaab Pro',
  description: 'Offline-first double-entry accounting for small businesses - 9 business modules, AES-256 encrypted SQLite, GST-ready invoicing, and a 475-test suite.',
  stack: ['Node.js', 'Express.js', 'SQLite', 'JavaScript', 'Jest'],
  github: 'https://github.com/SolarisXD/...',    // fill in exact repo URL
  demo: 'https://...',                            // product page link from resume
  status: 'live',
  tags: ['full-stack', 'desktop', 'tools'],
  featured: true,
  caseStudy: {
    why: 'Small businesses still manage accounts in physical registers or pirated Tally copies. I wanted an offline-first alternative that works without internet, doesn\'t charge a subscription, and handles GST invoicing without a second tool.',
    decision: 'Used AES-256 encrypted SQLite (not plain SQLite) and Write-Ahead Logging - because client financial data at rest with no encryption is unacceptable, and WAL protects against corruption during USB drive removal in exactly the environments these businesses work in.',
    outcome: 'Shipped to real clients across 2+ product versions. Built 475 Jest tests - not because it was required, but because silently wrong accounting is worse than no accounting at all.',
  },
}
```

### Skillence - CASE STUDY (featured)

```ts
{
  id: 'skillence',
  title: 'Skillence',
  description: 'AI-powered career platform - PyTorch recommendation model mapping 692 skills to 894 occupations with ~1ms inference. Campus placement engine with zero LLM dependency.',
  stack: ['React 19', 'FastAPI', 'PyTorch', 'NumPy', 'Gemini API', 'Azure AI'],
  github: 'https://github.com/SolarisXD/...',    // fill in
  demo: 'https://...',                            // live site from resume
  status: 'live',
  tags: ['AI', 'full-stack', 'ML'],
  featured: true,
  caseStudy: {
    why: 'Campus placement processes are slow, manual, and disconnected from actual job market data. I wanted a platform that could match students to occupations based on real skill gaps - not just keyword matching.',
    decision: 'Replaced the PyTorch inference layer with a custom pure NumPy implementation for production. PyTorch adds significant overhead for serving a trained model - the NumPy layer reduced backend crashes to near-zero while keeping inference accurate and adding ~0ms latency (~1ms total). Most people wouldn\'t write their own inference layer. I did because deployment reliability mattered more than convenience.',
    outcome: 'Processing 30,000+ job postings. ML salary predictor and offer evaluator benchmarked across 25+ countries. Built as a capstone with the scale I\'d want in a real product.',
  },
}
```

### SwapHub - standard card

```ts
{
  id: 'swaphub',
  title: 'SwapHub',
  description: 'Campus marketplace for students to buy, sell, donate, and rent items - full-stack with Express REST APIs, MongoDB/Mongoose, and Passport.js session auth.',
  stack: ['React', 'Node.js', 'Express', 'MongoDB', 'TailwindCSS', 'Passport.js'],
  github: 'https://github.com/SolarisXD/...',    // fill in
  demo: 'https://...',                            // live site
  status: 'live',
  tags: ['full-stack'],
  featured: false,
}
```

### This portfolio - standard card

```ts
{
  id: 'portfolio',
  title: 'This portfolio',
  description: 'Interactive portfolio with an embedded RAG chatbot - Gemini 1.5 Flash, Supabase pgvector, hybrid search, Langfuse tracing. All free tier.',
  stack: ['Next.js', 'Gemini', 'pgvector', 'Langfuse', 'Tailwind'],
  github: 'https://github.com/SolarisXD/...',
  status: 'in-development',
  tags: ['AI', 'full-stack'],
  featured: false,
}
```

---

## Skills - `content/skills.ts`

```ts
export const skills: SkillGroup[] = [
  {
    domain: 'Frontend',
    note: 'what I reach for first',
    items: ['React', 'React 19', 'Next.js', 'TailwindCSS', 'REST APIs'],
  },
  {
    domain: 'Backend',
    items: ['Node.js', 'Express.js', 'FastAPI', 'SQLite', 'MongoDB', 'MySQL'],
  },
  {
    domain: 'AI / ML',
    note: 'where I spend most of my thinking',
    items: ['PyTorch', 'NumPy', 'scikit-learn', 'Pandas', 'Gemini API', 'Azure AI'],
  },
  {
    domain: 'Languages',
    items: ['JavaScript', 'Python', 'C++'],
  },
  {
    domain: 'Tools',
    items: ['Git', 'GitHub', 'Jest', 'VS Code'],
  },
]
```

---

## Stack decisions - `content/stack-decisions.ts`

These come directly from real decisions made in your projects. Specific and verifiable.

```ts
export const stackDecisions: StackDecision[] = [
  {
    choice: 'AES-256 encrypted SQLite over plain SQLite',
    alternative: 'Unencrypted SQLite or application-layer encryption',
    reasoning: 'Client financial data at rest with no encryption is unacceptable - especially for a desktop app running on hardware you don\'t control. Application-layer encryption means rolling your own crypto. Page-level AES-256 encryption is battle-tested and leaves no attack surface I wrote myself.',
  },
  {
    choice: 'Write-Ahead Logging (WAL) for Hisaab Pro',
    alternative: 'Default SQLite journal mode',
    reasoning: 'The businesses using Hisaab Pro work in environments where USB drives get removed mid-operation. WAL mode keeps the database consistent even in unclean shutdowns. Default journal mode doesn\'t give the same guarantee for that exact failure pattern.',
  },
  {
    choice: 'Pure NumPy inference over PyTorch serving',
    alternative: 'Serve the PyTorch model directly in production',
    reasoning: 'PyTorch carries significant overhead when you just need to run a trained model - loading the runtime, the model weights, the graph. A pure NumPy forward pass is faster to initialise, crash-resistant, and requires no PyTorch in the prod environment. Reduced backend crashes to near-zero.',
  },
  {
    choice: '475 Jest tests for Hisaab Pro',
    alternative: 'Manual QA or fewer unit tests',
    reasoning: 'Silent wrong accounting is worse than a crash. A crash is visible. A ledger that silently processes a transaction twice is not. The test suite exists so any change that breaks payroll logic fails before it reaches a client\'s books.',
  },
  {
    choice: 'Gemini Flash over OpenAI for the portfolio chatbot',
    alternative: 'OpenAI GPT-3.5, Mistral, Groq',
    reasoning: 'Gemini Flash has a free tier (1,500 req/day, 1M tokens/day) with no credit card required. For a portfolio chatbot with unknown traffic, starting free and upgrading when there\'s a reason to is the only rational default.',
  },
]
```

---

## Micro-opinions - `content/micro-opinions.ts`

These should sound like you. Replace any that don't.

```ts
export const microOpinions: string[] = [
  "If the accounting ledger silently processes a transaction twice, no one knows until it's too late. That's why I wrote 475 tests for it.",

  "A pure NumPy inference layer is more work than serving the PyTorch model directly. It's also the reason production didn't crash.",

  "CGPA tells you how well someone performs in a controlled environment. The test suite tells you how seriously they take the uncontrolled one.",

  "The best decision I made on Skillence was designing the campus placement engine with zero LLM dependency. LLMs are expensive, slow, and unpredictable. Algorithmic scoring is none of those things.",

  "'Just use the ORM' is fine until you need to understand why your queries are slow. I read the SQL.",

  "I don't trust a feature I haven't written a test for. Especially when it touches money.",

  "A 692-skill vocabulary mapped against 894 occupations at 1ms inference isn't magic. It's knowing when to stop using the heavy tool and write the lightweight one.",
]
```

---

## Process - `content/copy.ts → process`

Based on how you actually built Hisaab Pro and Skillence:

```ts
process: [
  {
    number: '01',
    title: 'Understand the failure mode first',
    body: 'Before writing code, I figure out what the worst possible outcome looks like. For Hisaab Pro it was silent data corruption on a client\'s books. For Skillence it was backend crashes under inference load. The architecture follows from the failure mode, not the feature list.',
  },
  {
    number: '02',
    title: 'Write tests before they\'re required',
    body: 'I don\'t write tests because someone told me to. I write them because I\'ve worked on enough systems to know that silent bugs in business logic are worse than visible crashes. Hisaab Pro has 475 tests. Every payroll and ledger path is covered.',
  },
  {
    number: '03',
    title: 'Replace the heavy tool when it costs you',
    body: 'I used PyTorch to train the Skillence model. I replaced it with a pure NumPy inference layer for production because PyTorch\'s runtime overhead was causing crashes. The right tool for training isn\'t always the right tool for serving.',
  },
  {
    number: '04',
    title: 'Ship with real data, then iterate',
    body: 'Hisaab Pro was deployed to real clients and went through two product versions. Real-world feedback (payroll edge cases, PDF exports, USB removal crashes) shaped every iteration. Controlled environments don\'t teach you what clients do.',
  },
],
```

---

## Contact - `content/copy.ts → contact`

```ts
contact: {
  heading: 'Get in touch',
  body: 'Open to internships, freelance projects, and full-time roles after July 2026. If you\'ve got a problem that needs an ML system or a full-stack product, I respond same day.',
  emailLabel: 'rahulgehlot6044@gmail.com',
}
```

---

## FAQ - `content/faq.md`

Used by the RAG chatbot ingestion script. Write answers as you'd actually say them.

```markdown
Q: Are you available for internships?
A: Yes - actively looking for internships through July 2026, and open to remote opportunities before graduation.

Q: What are you graduating in?
A: B.Tech in Computer Science & Engineering with an AI-ML specialisation from VIT Bhopal, July 2026. CGPA 8.67.

Q: What is Hisaab Pro?
A: Hisaab Pro is an offline-first double-entry accounting system for small businesses. It has 9 business modules, AES-256 encrypted SQLite storage, GST-ready invoicing, payroll automation, and 475 Jest tests. It was shipped to real clients across 2 product versions.

Q: What is Skillence?
A: Skillence is a full-stack career platform I built as a capstone project. It has a PyTorch-trained recommendation model that maps 692 skills to 894 occupations. For production inference I replaced the PyTorch runtime with a pure NumPy forward pass - this cut crashes to near-zero and kept latency at ~1ms. It also has a campus placement engine built with zero LLM dependency, and a job market analytics dashboard processing 30,000+ job postings.

Q: What tech do you work with?
A: JavaScript and Python are my primary languages. On the frontend: React, Next.js, TailwindCSS. Backend: Node.js, Express.js, FastAPI. ML: PyTorch, NumPy, scikit-learn, Pandas, Gemini API. Databases: SQLite, MongoDB, MySQL. Tools: Git, Jest.

Q: Do you have ML/AI experience?
A: Yes. I trained a PyTorch recommendation model for Skillence, wrote a custom NumPy inference layer for production serving, and built an algorithmic campus placement engine. I'm now working on RAG pipelines using Gemini and pgvector - this chatbot is part of that.

Q: What's your GitHub?
A: github.com/SolarisXD

Q: What certifications do you have?
A: IBM Blockchain Developer Certification, Adobe UI & UX (Graphic Design) from Ethnus via Codemithra, and HTML/CSS/JS for Web Developers from Johns Hopkins University via Coursera.

Q: Why did you write a custom NumPy inference layer instead of serving PyTorch directly?
A: PyTorch carries significant runtime overhead when you just need forward-pass inference on a trained model. Loading the PyTorch runtime, the computation graph, and the model weights was causing production backend crashes. A pure NumPy forward pass is lighter, faster to initialise, and requires no PyTorch in the production environment. The tradeoff was more implementation work upfront - worth it for near-zero crashes.

Q: Why 475 tests for Hisaab Pro?
A: Silent wrong accounting is worse than a crash. A crash is visible - someone reports it. A ledger that silently processes a payroll transaction twice isn't visible until the client reviews their books. The test suite exists so any code change that breaks that logic fails immediately, before it reaches anyone's real data.
```

---

## Sections to remove or hold

**Experience section:**
If you have no freelance clients or part-time work you can describe with specific outcomes, remove the Experience section from `page.tsx` entirely for Phase 1. A section with no entries, or weak entries, is worse than no section. Add it when you have real content to fill it - Hisaab Pro client deployments would be the first candidate.

**Now section:**
Update `nowLastUpdated` every 2–4 weeks. A stale Now section actively harms credibility - it signals the portfolio is abandoned.

---

## Things to fill in before building

- [ ] Hisaab Pro GitHub repo URL (exact)
- [ ] Hisaab Pro product page URL
- [ ] Skillence GitHub repo URL (exact)
- [ ] Skillence live site URL
- [ ] SwapHub GitHub repo URL (exact)
- [ ] SwapHub live site URL
- [ ] Certification years (verify from actual cert PDFs)
- [ ] Coursera verify link for Johns Hopkins cert
- [ ] Avatar photo (square crop, min 400×400px)
- [ ] OG image (1200×630px - make in Figma or Canva)
- [ ] Final domain name (update `site` in meta + `layout.tsx`)
- [ ] Number of Hisaab Pro clients deployed to (if you have this number, use it)
- [ ] Any freelance work to add to Experience section