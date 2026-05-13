export type ExperienceEntry = {
  role: string;
  org: string;
  location: string;
  period: string;
  type: "freelance" | "contract" | "full-time" | "internship";
  bullets: string[];
  stack: string[];
  link?: string;
};

export const experience: ExperienceEntry[] = [
  {
    role: "Freelance Web Developer",
    org: "Self-employed",
    location: "Remote",
    period: "2024 – present",
    type: "freelance",
    bullets: [
      "Built a Node.js + Playwright scraper to extract local business leads from Google Maps and flag targets with no website",
      "Demo-first strategy: built a working site before first contact, pitched via WhatsApp with live link attached",
      "Delivered full-stack Next.js + Vercel sites; handed off with GitHub repo and domain transfer",
      "Built custom outreach tooling to automate lead qualification from Justdial and Google search results",
    ],
    stack: ["Next.js", "Node.js", "Tailwind", "Playwright", "Vercel"],
  },
];
