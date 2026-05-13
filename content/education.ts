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
    institution: "VIT",
    degree: "B.Tech",
    field: "Computer Science & Engineering",
    period: "2022 – 2026",
    grade: "CGPA 8.60",
    highlights: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Machine Learning",
      "Operating Systems",
      "Computer Networks",
    ],
  },
];

export const certifications: Certification[] = [];
