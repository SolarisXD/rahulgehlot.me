export type EducationEntry = {
  institution: string;
  degree: string;
  field: string;
  period: string;
  grade?: string;
  highlights?: string[];
};

export type Certification = {
  name: string;
  issuer: string;
  year: string;
  link?: string;
};

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
];

export const certifications: Certification[] = [
  {
    name: 'Blockchain Developer Certification',
    issuer: 'IBM Career Education Program',
    year: '2024',
  },
  {
    name: 'Adobe UI & UX — Graphic Design',
    issuer: 'Ethnus via Codemithra',
    year: '2024',
  },
  {
    name: 'HTML, CSS & JavaScript for Web Developers',
    issuer: 'Johns Hopkins University (Coursera)',
    year: '2023',
    link: 'https://coursera.org/verify/...',
  },
];
