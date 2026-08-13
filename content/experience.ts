export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  companyShort: string;
  period: string;
  summary: string;
  responsibilities: string[];
  technologies: string[];
  highlight: string | null;
};

export const experience: ExperienceItem[] = [
  {
    id: "ghit",
    role: "Lead SQA Engineer",
    company: "Golden Harvest Infotech Ltd",
    companyShort: "GHIT",
    period: "Oct 2024 – Present",
    summary:
      "Leading quality across AI healthcare products, US hospital systems, and government platforms — simultaneously.",
    responsibilities: [
      "Architected and maintained Playwright automation suites integrated into CI/CD pipelines for 6+ concurrent client projects",
      "Built AI agent testing framework from scratch using DeepEval and LangSmith — hallucination detection, LLM-as-judge evaluation, output consistency testing",
      "Sole QA engineer for Memorial Houston Medical — full EHR, PIS, and Appointment Scheduler quality ownership for a US hospital system",
      "Delivered QA across Bangladesh government platforms: Satellite Billing Module, BRRI digital platform, Conferencing Portal",
      "Conducted UAE market analysis across 10 AI competitors; authored product specifications and technical reference documentation",
      "Trained and mentored junior QA engineers; established team-wide QA frameworks and standards",
    ],
    technologies: [
      "Playwright",
      "Python",
      "Selenium",
      "DeepEval",
      "LangSmith",
      "Postman",
      "JMeter",
      "OWASP ZAP",
      "GitHub Actions",
      "GitLab CI",
    ],
    highlight:
      "First in the organisation to build a production AI agent hallucination testing framework.",
  },
  {
    id: "echologyx",
    role: "SQA Engineer",
    company: "Echologyx",
    companyShort: "Echologyx",
    period: "Dec 2022 – Oct 2024",
    summary:
      "Dedicated QA engineer for enterprise ERP systems serving UK and EU international clients.",
    responsibilities: [
      "API, functional, regression, integration, and A/B testing across complex multi-module ERP platforms",
      "Created and maintained SRS, SOP, and structured test documentation",
      "Managed full defect lifecycle in Jira across cross-functional international teams",
    ],
    technologies: ["Selenium", "Postman", "Jira", "SQL Server", "MySQL"],
    highlight:
      "Delivered quality for UK and EU enterprise clients across complex ERP systems.",
  },
  {
    id: "nordic",
    role: "Web Developer / QA",
    company: "Digital Agency Nordic",
    companyShort: "Nordic",
    period: "Nov 2021 – Dec 2022",
    summary: "QA testing and WordPress development for international agency clients.",
    responsibilities: [
      "QA testing across web applications including cross-browser and UI validation",
      "WordPress development and client communication",
    ],
    technologies: ["WordPress", "JavaScript", "Manual Testing"],
    highlight: null,
  },
  {
    id: "quantanite",
    role: "Business Analyst & QA Manager",
    company: "Quantanite",
    companyShort: "Quantanite",
    period: "Jan 2020 – Oct 2021",
    summary:
      "Team management, requirements analysis, and QA oversight for international outsourcing clients.",
    responsibilities: [
      "Team management and QA oversight across international client projects",
      "Requirements analysis and structured quality reporting",
    ],
    technologies: ["Jira", "Excel", "Manual Testing"],
    highlight: null,
  },
  {
    id: "ipdc",
    role: "Business Transformation Analyst",
    company: "IPDC Finance",
    companyShort: "IPDC",
    period: "Jan 2018 – May 2019",
    summary:
      "In-house software development and UAT. Built a Collateral Data Management System end-to-end in C#.",
    responsibilities: [
      "End-to-end development of Collateral Data Management System in C# (.NET)",
      "UAT execution and test environment creation",
    ],
    technologies: ["C#", ".NET", "SQL Server"],
    highlight:
      "Full-stack C# development — the foundation for deep system understanding in QA.",
  },
];
