export type SkillGroup = {
  domain: string;
  note?: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    domain: "Frontend",
    note: "what I reach for first",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    domain: "Backend",
    items: ["Node.js", "Express", "REST APIs", "PostgreSQL", "MongoDB"],
  },
  {
    domain: "AI / ML",
    note: "increasingly where I spend my time",
    items: [
      "Gemini API",
      "RAG pipelines",
      "pgvector",
      "Langfuse",
      "Python",
      "PyTorch",
    ],
  },
  {
    domain: "Tools & infra",
    items: [
      "Git",
      "Vercel",
      "Supabase",
      "Electron",
      "Playwright",
      "Figma",
      "Docker",
    ],
  },
];
