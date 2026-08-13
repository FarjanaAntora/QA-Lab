export type CVData = {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  summary: string;
  education: {
    degree: string;
    university: string;
    year: string;
    grade: string;
  };
};

export const cvData: CVData = {
  name: "Aktia Farjana Antora",
  title: "Senior QA Automation Engineer",
  email: "farjana1319ontu@gmail.com",
  phone: "+880 1686057143",
  location: "Dhaka, Bangladesh",
  linkedin: "linkedin.com/in/aktia-farjana-antora",
  github: "github.com/aktia-antora",
  summary:
    "Lead SQA Engineer with 8 years of experience across QA automation, AI system testing, healthcare informatics, and government platforms. Specialising in Playwright CI/CD automation, LLM hallucination testing, and full-spectrum quality engineering.",
  education: {
    degree: "BSc in Computer Science & Engineering",
    university: "American International University — Bangladesh",
    year: "2014 – 2018",
    grade: "CGPA 3.65",
  },
};
