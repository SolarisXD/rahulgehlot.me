export type CaseStudy = {
  why: string;
  decision: string;
  outcome?: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  stack: string[];
  github?: string;
  demo?: string;
  status: "live" | "in-development" | "archived";
  tags: string[];
  featured: boolean;
  caseStudy?: CaseStudy;
};

export const projects: Project[] = [
  {
    id: "hisaab-pro",
    title: "Hisaab Pro",
    description:
      "Desktop accounting for small businesses that can't afford Tally. Local-first, encrypted, audit-logged.",
    stack: ["Electron", "React", "SQLite", "TypeScript", "Node.js"],
    status: "in-development",
    tags: ["full-stack", "desktop", "AI"],
    featured: true,
    caseStudy: {
      why: "Small businesses in India still manage accounts in physical registers or pirated Tally copies. I wanted a local-first alternative with no subscription, no internet dependency, and actual encryption.",
      decision:
        "Chose SQLCipher over plain SQLite — client financial data at rest with no encryption is unacceptable, even for a desktop app. Added Argon2 auth, append-only audit logs so no transaction can be silently edited, and RBAC so owners can give staff limited access without exposing everything.",
      outcome:
        "Still building. The security architecture turned into a standalone case study because the decisions generalise beyond accounting software.",
    },
  },
  {
    id: "swaphub",
    title: "SwapHub",
    description:
      "[What problem does SwapHub solve? Write it here — one sentence.]",
    stack: ["Next.js", "Node.js", "MongoDB", "Tailwind"],
    github: "https://github.com/...",
    demo: "https://...",
    status: "live",
    tags: ["full-stack"],
    featured: true,
    caseStudy: {
      why: "[Why did SwapHub need to exist? What were people doing before it?]",
      decision:
        "[What was the most interesting decision — architecture, tech choice, UX trade-off?]",
    },
  },
  {
    id: "image-captioning",
    title: "Image Captioning",
    description:
      "CNN + Transformer pipeline that generates natural language descriptions of images.",
    stack: ["Python", "PyTorch", "Transformers"],
    github: "https://github.com/...",
    status: "archived",
    tags: ["AI"],
    featured: false,
  },
  {
    id: "lead-scraper",
    title: "Lead scraper",
    description:
      "Extracts local business leads from Google Maps and Justdial, flags targets with no website for outreach.",
    stack: ["Node.js", "Playwright", "Google Places API"],
    status: "live",
    tags: ["tools", "full-stack"],
    featured: false,
  },
  {
    id: "portfolio",
    title: "This portfolio",
    description:
      "Interactive portfolio with an embedded RAG chatbot — Gemini Flash, Supabase pgvector, hybrid search, Langfuse tracing.",
    stack: ["Next.js", "Gemini", "pgvector", "Langfuse", "Tailwind"],
    github: "https://github.com/...",
    status: "live",
    tags: ["AI", "full-stack"],
    featured: false,
  },
];
