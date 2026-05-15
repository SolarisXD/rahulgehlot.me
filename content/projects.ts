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
    id: 'hisaab-pro',
    title: 'Hisaab Pro',
    description: 'Offline-first double-entry accounting for small businesses — 9 business modules, AES-256 encrypted SQLite, GST-ready invoicing, and a 350-test suite.',
    stack: ['Node.js', 'Express.js', 'SQLite', 'JavaScript', 'Jest'],
    github: 'https://github.com/SolarisXD/...',
    demo: 'https://...',
    status: 'live',
    tags: ['full-stack', 'desktop', 'tools'],
    featured: true,
    caseStudy: {
      why: 'Small businesses still manage accounts in physical registers or pirated Tally copies. I wanted an offline-first alternative that works without internet, doesn\'t charge a subscription, and handles GST invoicing without a second tool.',
      decision: 'Used AES-256 encrypted SQLite (not plain SQLite) and Write-Ahead Logging — because client financial data at rest with no encryption is unacceptable, and WAL protects against corruption during USB drive removal in exactly the environments these businesses work in.',
      outcome: 'Shipped to real clients across 2+ product versions. Built 350+ Jest tests across 18 files — not because it was required, but because silently wrong accounting is worse than no accounting at all.',
    },
  },
  {
    id: 'skillence',
    title: 'Skillence',
    description: 'AI-powered career platform — PyTorch recommendation model mapping 692 skills to 894 occupations with ~1ms inference. Campus placement engine with zero LLM dependency.',
    stack: ['React 19', 'FastAPI', 'PyTorch', 'NumPy', 'Gemini API', 'Azure AI'],
    github: 'https://github.com/SolarisXD/...',
    demo: 'https://...',
    status: 'live',
    tags: ['AI', 'full-stack', 'ML'],
    featured: true,
    caseStudy: {
      why: 'Campus placement processes are slow, manual, and disconnected from actual job market data. I wanted a platform that could match students to occupations based on real skill gaps — not just keyword matching.',
      decision: 'Replaced the PyTorch inference layer with a custom pure NumPy implementation for production. PyTorch adds significant overhead for serving a trained model — the NumPy layer reduced backend crashes to near-zero while keeping inference accurate and adding ~0ms latency (~1ms total). Most people wouldn\'t write their own inference layer. I did because deployment reliability mattered more than convenience.',
      outcome: 'Processing 30,000+ job postings. ML salary predictor and offer evaluator benchmarked across 25+ countries. Built as a capstone with the scale I\'d want in a real product.',
    },
  },
  {
    id: 'swaphub',
    title: 'SwapHub',
    description: 'Campus marketplace for students to buy, sell, donate, and rent items — full-stack with Express REST APIs, MongoDB/Mongoose, and Passport.js session auth.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'TailwindCSS', 'Passport.js'],
    github: 'https://github.com/SolarisXD/...',
    demo: 'https://...',
    status: 'live',
    tags: ['full-stack'],
    featured: false,
  },
  {
    id: 'portfolio',
    title: 'This portfolio',
    description: 'Interactive portfolio with an embedded RAG chatbot — Gemini 1.5 Flash, Supabase pgvector, hybrid search, Langfuse tracing. All free tier.',
    stack: ['Next.js', 'Gemini', 'pgvector', 'Langfuse', 'Tailwind'],
    github: 'https://github.com/SolarisXD/...',
    status: 'in-development',
    tags: ['AI', 'full-stack'],
    featured: false,
  },
];
