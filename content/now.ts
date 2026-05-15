export type NowItem = {
  label: string;
  value: string;
  link?: string;
};

export const now: NowItem[] = [
  {
    label: "Building",
    value: "Hisaab Pro — desktop accounting for small businesses",
    link: "#projects",
  },
  {
    label: "Learning",
    value: "LLM evaluation frameworks — Langfuse, RAGAS",
  },
  {
    label: "Reading",
    value: "The Pragmatic Programmer",
  },
  {
    label: "Thinking about",
    value: "Whether RAG or fine-tuning is the right call for domain-specific tasks",
  },
  {
    label: 'Available for',
    value: 'Internships and freelance projects. I respond same day.',
  },
];

export const nowLastUpdated = "2026-05-08";
