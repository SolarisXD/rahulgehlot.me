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
    role: 'Freelance Developer',
    org: 'Hisaab Pro clients',
    location: 'Remote',
    period: '2026',
    type: 'freelance',
    bullets: [
      'Deployed Hisaab Pro to small business clients',
      'Iterated across 2+ product versions based on client feedback - added payroll automation and client-side PDF export',
      'Supported real-world deployment with offline-first architecture ensuring data integrity on USB drive removal',
    ],
    stack: ['Node.js', 'Express.js', 'SQLite', 'Jest'],
  }
];
