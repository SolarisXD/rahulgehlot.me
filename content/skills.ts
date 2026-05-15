export type SkillGroup = {
  domain: string;
  note?: string;
  items: string[];
};

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
];
