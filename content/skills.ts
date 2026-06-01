export type LanguageEntry = {
  name: string;
  level: string;
  detail?: string;
};

export type TechStackGroup = {
  title: string;
  icon?: string;
  note?: string;
  items: TechStackItem[];
};

export type TechStackItem = {
  label: string;
  icon?: string;
};

export type SkillsContent = {
  languages: LanguageEntry[];
  softSkills: string[];
  techStack: TechStackGroup[];
};

export const skillsContent: SkillsContent = {
  languages: [
    { name: 'Hindi', level: 'Native' },
    { name: 'English', level: 'Professional proficiency' },
  ],
  softSkills: [
    'Communication',
    'Leadership',
    'Systems Thinking',
    'E2E Ownership',
    'Bias for Action',
    'Influence w/o Authority',
    'Dealing with Ambiguity',
  ],
  techStack: [
    {
      title: 'Dev',
      icon: 'squares',
      items: [
        { label: 'React 19', icon: 'react' },
        { label: 'Next.js', icon: 'next' },
        { label: 'TailwindCSS', icon: 'tailwind' },
        { label: 'REST APIs', icon: 'api' },
        { label: 'React Native', icon: 'react' },
        { label: 'Expo', icon: 'expo' },
        { label: 'Zustand', icon: 'zustand' },
        { label: 'Node.js', icon: 'node' },
        { label: 'Express.js', icon: 'express' },
        { label: 'FastAPI', icon: 'fastapi' },
        { label: 'SQLite', icon: 'sqlite' },
        { label: 'MongoDB', icon: 'mongo' },
        { label: 'MySQL', icon: 'mysql' },
        { label: 'JavaScript', icon: 'javascript' },
        { label: 'TypeScript', icon: 'typescript' },
        { label: 'Python', icon: 'python' },
        { label: 'C++', icon: 'cpp' },
      ],
    },
    {
      title: 'AI / ML',
      icon: 'brain',
      items: [
        { label: 'PyTorch', icon: 'pytorch' },
        { label: 'NumPy', icon: 'numpy' },
        { label: 'scikit-learn', icon: 'sklearn' },
        { label: 'Pandas', icon: 'pandas' },
        { label: 'Gemini API', icon: 'gemini' },
        { label: 'Azure AI', icon: 'azure' },
        { label: 'OpenCode', icon: 'opencode' },
        { label: 'Claude', icon: 'claude' },
      ],
    },
    {
      title: 'Tools',
      icon: 'tools',
      items: [
        { label: 'Git', icon: 'git' },
        { label: 'GitHub', icon: 'github' },
        { label: 'Jest', icon: 'jest' },
        { label: 'VS Code', icon: 'vscode' },
        { label: 'AntiGravity', icon: 'antigravity' },
      ],
    },
    {
      title: 'Design',
      icon: 'idea',
      items: [
        { label: 'Stitch', icon: 'stitch' },
        { label: 'Figma', icon: 'figma' },
      ],
    },
    {
      title: 'Infra',
      icon: 'cloud',
      items: [
        { label: 'Vercel', icon: 'vercel' },
        { label: 'Render', icon: 'render' },
      ],
    },
  ],
};
