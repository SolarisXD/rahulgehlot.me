export type EducationEntry = {
  institution: string;
  degree: string;
  field?: string;
  period: string;
  grade?: string;
  summary?: string;
  linkLabel?: string;
  linkUrl?: string;
  quote?: string;
  highlights?: string[];
};

export type Certification = {
  name: string;
  issuer: string;
  year: string;
  link?: string;
  badge?: string;
};

export const education: EducationEntry[] = [
  {
    institution: 'Vellore Institute of Technology, Bhopal',
    degree: 'B.Tech',
    field: 'Computer Science & Engineering (AI-ML Specialisation)',
    period: 'July 2026',
    grade: 'CGPA 8.67 / 10.0',
    highlights: [
      'Data Structures',
      'Computer Networks',
      'Algorithms',
      'Database Management Systems',
      'Machine Learning',
      'Deep Learning',
      'Computer Vision',
      'Natural Language Processing',
      'Operating Systems',
    ],
  },
  {
    institution: "K.S. Lodha Public Sr. Sec. School, Falna",
    degree: 'Higher Senior Secondary Education (XIIth)',
    period: 'July 2021',
    grade: 'CGPA 8.84 / 10.0',
  },
  {
    institution: "St. Paul's Sr. Sec. School, Falna",
    degree: 'Higher Secondary Education (Xth)',
    period: 'May 2019',
    grade: 'CGPA 9.46 / 10.0',
  },
];

export const certifications: Certification[] = [
  {
    name: 'Claude Code 101',
    issuer: 'Anthropic',
    year: '2026',
    link: 'https://verify.skilljar.com/c/zub2sc2odyc5',
  },
  {
    name: 'Claude 101',
    issuer: 'Anthropic',
    year: '2026',
    link: 'https://verify.skilljar.com/c/fmtf7brpn27d',
  },
  {
    name: 'AI Fluency for Small Businesses',
    issuer: 'Anthropic',
    year: '2026',
    link: 'https://verify.skilljar.com/c/hah6r3gpuf6b',
  },
  {
    name: 'Blockchain Developer Certification',
    issuer: 'IBM Career Education Program',
    year: '2024',
    link: 'https://courses.ibmcep.cognitiveclass.ai/certificates/604dc8a488ff46ad83b5ae72dbf0b5bb',
  },
  {
    name: 'Adobe UI & UX - Graphic Design',
    issuer: 'Ethnus via Codemithra',
    year: '2024',
    link: 'https://drive.google.com/file/d/1wdYV4wxlgb92Duawd3zZ2H7sh54xPZqT/view',
  },
  {
    name: 'HTML, CSS & JavaScript for Web Developers',
    issuer: 'Johns Hopkins University (Coursera)',
    year: '2023',
    link: 'https://www.coursera.org/account/accomplishments/verify/GRXRFLVRJPTQ',
  },
];
