export type CaseStudy = {
  why: string;
  decision: string;
  outcome?: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  period: string;
  stack: string[];
  github?: string;
  demo?: string;
  status: "live" | "in-development" | "halt" | "archived";
  tags: string[];
  featured: boolean;
  semiFeatured?: boolean;
  showCaseStudy?: boolean;
  caseStudy?: CaseStudy;
};

export const projects: Project[] = [
  {
    id: 'hisaab-pro',
    title: 'Hisaab Pro',
    description: 'Offline-first double-entry accounting with 9 core business modules - automated ledger transactions, GST-ready invoicing, and 6 financial reports (Balance Sheets, P&L, aging schedules). AES-256 encrypted SQLite with WAL mode for crash-safe USB portability. Automated payroll from daily attendance data with 475 Jest tests.',
    period: 'Jan 2026 - Apr 2026',
    stack: ['Node.js', 'Express.js', 'SQLite', 'JavaScript', 'Jest'],
    github: 'https://github.com/SolarisXD/Hisaab-Pro',
    demo: 'https://hisaab-pro.vercel.app',
    status: 'live',
    tags: ['full-stack', 'desktop', 'tools'],
    featured: true,
    caseStudy: {
      why: 'Small businesses still manage accounts in physical registers or pirated Tally copies. I wanted an offline-first alternative that works without internet, doesn\'t charge a subscription, and handles GST invoicing without a second tool.',
      decision: 'Used AES-256 encrypted SQLite (not plain SQLite) and Write-Ahead Logging - because client financial data at rest with no encryption is unacceptable, and WAL protects against corruption during USB drive removal in exactly the environments these businesses work in.',
      outcome: 'Shipped to real clients across 2+ product versions. Built 475 Jest tests - not because it was required, but because silently wrong accounting is worse than no accounting at all.',
    },
  },
  {
    id: 'skillence',
    title: 'Skillence',
    description: 'Full-stack career platform with a 3-stage recommendation pipeline mapping 692 skills to 894 occupations (~1ms inference). PyTorch-trained ML models with custom NumPy inference layer for zero-crash deployment. Automated campus placement engine with 4-variable algorithmic scoring. Job market analytics processing 30,000+ postings with ML salary prediction across 25+ countries.',
    period: 'Jul 2025 - Mar 2026',
    stack: ['React 19', 'FastAPI', 'PyTorch', 'NumPy', 'Gemini API', 'Azure AI'],
    github: 'https://github.com/SolarisXD/Skillence',
    demo: 'https://skillence-pi.vercel.app',
    status: 'live',
    tags: ['AI', 'full-stack', 'ML'],
    featured: false,
    caseStudy: {
      why: 'Campus placement processes are slow, manual, and disconnected from actual job market data. I wanted a platform that could match students to occupations based on real skill gaps - not just keyword matching.',
      decision: 'Replaced the PyTorch inference layer with a custom pure NumPy implementation for production. PyTorch adds significant overhead for serving a trained model - the NumPy layer reduced backend crashes to near-zero while keeping inference accurate and adding ~0ms latency (~1ms total). Most people wouldn\'t write their own inference layer. I did because deployment reliability mattered more than convenience.',
      outcome: 'Processing 30,000+ job postings. ML salary predictor and offer evaluator benchmarked across 25+ countries. Built as a capstone with the scale I\'d want in a real product.',
    },
  },
  {
    id: 'swaphub',
    title: 'SwapHub',
    description: 'Campus marketplace for students to buy, sell, donate, and rent items. Full-stack with Express REST APIs, MongoDB/Mongoose data persistence, and Passport.js session auth with secure password hashing. Modular React components with product grids, image upload, client-side validation, and category carousels.',
    period: 'Feb 2024 - May 2024',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'TailwindCSS', 'Passport.js'],
    github: 'https://github.com/SolarisXD/SwapHub',
    demo: 'https://swaphubx.vercel.app/',
    status: 'live',
    tags: ['full-stack'],
    featured: false,
  },
  {
    id: 'portfolio',
    title: 'This portfolio',
    description: 'Interactive portfolio with an embedded RAG chatbot - Gemini 1.5 Flash, Supabase pgvector, hybrid search, Langfuse tracing. All free tier.',
    period: 'Ongoing',
    stack: ['Next.js', 'Gemini', 'pgvector', 'Langfuse', 'Tailwind'],
    github: 'https://github.com/SolarisXD/rahulgehlot.me',
    demo: 'https://rahulgehlot.me',
    status: 'live',
    tags: ['AI', 'full-stack'],
    featured: false,
  },
  {
    id: 'pulsesense',
    title: 'PulseSense',
    description: 'Offline-first, 100% private health companion - track vitals, manage medical info (conditions, allergies, medications, emergency contacts), and navigate emergencies with a deterministic rule-based triage engine. 17.8K LOC of TypeScript across 127 files, 13 SQLite tables, 10 triage rules evaluating 18 symptom flags, 69 drug interaction pairs, PDF/CSV export, dark mode. All fully offline, no accounts, no data ever leaves the device.',
    period: 'May 2026',
    stack: ['React Native', 'Expo', 'TypeScript', 'SQLite', 'Zustand', 'Jest'],
    github: 'https://github.com/SolarisXD/PulseSense',
    status: 'in-development',
    tags: ['mobile', 'health', 'offline-first'],
    featured: false,
    semiFeatured: true,
    showCaseStudy: false,
    caseStudy: {
      why: 'Health apps either require accounts, lock features behind subscriptions, or need internet. PulseSense was built for privacy-conscious users and caregivers who need a health data manager with emergency triage that works entirely offline - no data ever leaves the device.',
      decision: 'Used a static deterministic rule engine (not ML) for the triage system. ML introduces false positives and unpredictability in health guidance - a deterministic system is trivially testable (29 test cases), generates no surprises, and can\'t learn bad patterns. Exactly what you want when someone uses it during a medical event.',
      outcome: 'Shipped 17,834 lines of TypeScript across 127 files in 5 active days. 48 runtime dependencies, zero external accounts, zero cloud dependencies. Rule engine handles 18 symptom flags across 10 rules with 4 severity levels. Drug interaction database covers 69 pairs. PDF/CSV exports generated entirely on-device via HTML-to-PDF.',
    },
  },
  {
    id: 'forge',
    title: 'FORGE',
    description: 'Voice-first desktop control system for Windows. Wake-word activated (EDITH/FRIDAY) with Whisper STT, 8 desktop actions (terminal, browser, volume, lock, etc.), AI fallback via OpenRouter, multi-engine TTS cascade, and optional speaker verification via SpeechBrain ECAPA-TDNN. 2,006 lines of tests across 15 files. All in Python 3.12.',
    period: 'Sept 2025 - Halt/Ongoing',
    stack: ['Python', 'Whisper', 'SpeechBrain', 'OpenRouter', 'SQLite', 'pytest'],
    github: 'https://github.com/SolarisXD/FORGE',
    status: 'halt',
    tags: ['voice', 'desktop', 'python', 'AI'],
    featured: false,
    semiFeatured: false,
    caseStudy: {
      why: 'Desktop voice control is either cloud-dependent, limited to specific apps, or requires constant manual activation. FORGE was built as a fully local voice-first system - wake-word activated, directly executing system actions, with no cloud dependency beyond optional AI fallback.',
      decision: 'Used sliding-window Whisper for wake-word detection instead of a dedicated engine (Porcupine/Snowboy). This keeps the entire pipeline on a single model - Whisper handles both wake-word and transcription, avoiding two separate audio ML pipelines. Trade-off: higher power usage for simpler architecture.',
    },
  },
  {
    id: 'image-captioning',
    title: 'Image Captioning',
    description: 'Encoder-decoder model using ResNet50 + LSTM trained on 1,500 Flickr images. Flask web app with OpenCV processing for real-time AI-generated image captions.',
    period: 'Feb 2024 - May 2024',
    stack: ['Python', 'Flask', 'OpenCV', 'TensorFlow', 'ResNet50', 'LSTM'],
    github: 'https://github.com/SolarisXD/Image-Captioning',
    status: 'archived',
    tags: ['AI', 'ML', 'computer-vision'],
    featured: false,
  },
  {
    id: 'pyrush',
    title: 'PyRush',
    description: '2D platformer with a Mario Maker-inspired level editor - users create, save, and play 100+ custom levels boosting engagement by 40%. Advanced enemy AI, camera tracking, and animation systems with 15% faster level loads.',
    period: 'Aug 2023 - Nov 2023',
    stack: ['Python', 'Pygame'],
    github: 'https://github.com/SolarisXD/PyRush',
    status: 'archived',
    tags: ['game-dev', 'python'],
    featured: false,
  },
];

