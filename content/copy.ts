export const copy = {
  hero: {
    greeting: "Hi, I'm Rahul.",
    roles: [
      "Product Builder",
      "Hisaab-Pro Creator",
      "Applied AI Architect",
      "Developer",
      "Problem Solver",
    ],
    primaryCta: "See my work",
  },

  about: [
    `B.Tech CSE student at VIT Bhopal (AI-ML specialisation, graduating July 2026, CGPA 8.67). I build full-stack web apps and machine learning systems - sometimes separately, increasingly together. Hisaab Pro is an offline accounting system I built and shipped to real clients. Skillence is a career platform with a custom PyTorch model and a pure NumPy inference layer I wrote to cut backend deployment crashes to near-zero.`,

    `I write a lot of tests. Hisaab Pro has 475 Jest tests - not because someone told me to, but because client financial data has no room for silent bugs. That instinct follows me into everything I build.`,
  ],

  process: [
    {
      number: "01",
      title: "Understand the failure mode first",
      body: "Before writing code, I figure out what the worst possible outcome looks like. For Hisaab Pro it was silent data corruption on a client's books. For Skillence it was backend crashes under inference load. The architecture follows from the failure mode, not the feature list.",
    },
    {
      number: "02",
      title: "Write tests before they're required",
      body: "I don't write tests because someone told me to. I write them because I've worked on enough systems to know that silent bugs in business logic are worse than visible crashes. Hisaab Pro has 475 tests. Every payroll and ledger path is covered.",
    },
    {
      number: "03",
      title: "Replace the heavy tool when it costs you",
      body: "I used PyTorch to train the Skillence model. I replaced it with a pure NumPy inference layer for production because PyTorch's runtime overhead was causing crashes. The right tool for training isn't always the right tool for serving.",
    },
    {
      number: "04",
      title: "Ship with real data, then iterate",
      body: "Hisaab Pro was deployed to real clients and went through two product versions. Real-world feedback (payroll edge cases, PDF exports, USB removal crashes) shaped every iteration. Controlled environments don't teach you what clients do.",
    },
  ],

  contact: {
    heading: "Get in touch",
    body: "Open to internships, freelance projects, and full-time roles after July 2026. If you've got a problem that needs an ML system or a full-stack product, I respond same day.",
    emailLabel: "rahulgehlot6044@gmail.com",
  },
};
