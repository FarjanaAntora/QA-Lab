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
    period: "Oct 2024 - Present",
    summary:
      "Lead SQA across healthcare, multi-tenant SaaS, booking, and government platforms — manual depth first, automation and AI-assisted QA as extensions.",
    responsibilities: [
      "Sole QA for Memorial Houston Medical across five modules, with 150–700 defects found per module; validated data flows, forms, UI behaviour, API and SQL results",
      "Multi-tenant SaaS testing for MHM and Healthcare RCM: tenant isolation, configuration, RBAC, and proof-of-concept client onboarding",
      "Validated 140+ mathematical formulas for Hppy AI against ground truth and international-standard thresholds",
      "Turned stable manual regression into Selenium/Python coverage for MHM; Playwright, Postman/Swagger, and CI health checks (GitHub Actions, GitLab CI)",
      "AI-assisted test preparation with Claude, human-verified end to end; DeepEval and LangSmith evaluation on Hppy AI products",
      "Designing a human-in-the-loop AI validation workflow for FamilySearch manuscript digitisation; mentor junior QA engineers",
    ],
    technologies: [
      "Manual Testing",
      "Selenium",
      "Playwright",
      "Python",
      "Postman",
      "DeepEval",
      "LangSmith",
      "GitHub Actions",
      "GitLab CI",
      "Jira",
    ],
    highlight:
      "Manual coverage first. Automation and AI-assisted checks extend that coverage — they do not replace it.",
  },
  {
    id: "echologyx",
    role: "SQA Engineer",
    company: "Echologyx / Echotex",
    companyShort: "Echologyx / Echotex",
    period: "Dec 2022 - Oct 2024",
    summary:
      "Sole QA owner across 5 ERP modules and 15+ clients over about two years, including mobile and A/B analytics checking.",
    responsibilities: [
      "Uncovered 2,000+ defects across the ERP, including its API",
      "Mobile testing on iOS and Android with real devices, DevTools and BrowserStack",
      "A/B tests and web analytics checking for global luxury and automotive brands — a checking role, not a lead role",
      "SRS, SOP and test documentation; defect lifecycle in Jira with development teams",
    ],
    technologies: [
      "Manual Testing",
      "Mobile Testing",
      "BrowserStack",
      "Postman",
      "Jira",
      "SQL",
    ],
    highlight:
      "Sole QA owner of 5 modules across 15+ clients. 2,000+ defects across the ERP, including API defects.",
  },
  {
    id: "nordic",
    role: "Web Developer / QA",
    company: "Digital Agency Nordic",
    companyShort: "Nordic",
    period: "Nov 2021 - Dec 2022",
    summary:
      "QA testing and cross-browser validation for web applications, alongside WordPress development and client communication.",
    responsibilities: [
      "QA testing and cross-browser validation for web applications",
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
    period: "Jan 2020 - Oct 2021",
    summary:
      "Team management (team of 80), requirements analysis, QA oversight and quality reporting for international outsourcing clients.",
    responsibilities: [
      "Team management across a team of 80",
      "Requirements analysis, QA oversight and quality reporting for international clients",
    ],
    technologies: ["Jira", "Excel", "Manual Testing"],
    highlight: null,
  },
  {
    id: "ipdc",
    role: "Business Transformation Analyst",
    company: "IPDC Finance",
    companyShort: "IPDC",
    period: "Jan 2018 - May 2019",
    summary:
      "Built the Collateral Data Management System end to end in C# (.NET); created test environments and executed UAT.",
    responsibilities: [
      "End-to-end development of Collateral Data Management System in C# (.NET)",
      "Created test environments and executed UAT",
    ],
    technologies: ["C#", ".NET", "SQL Server"],
    highlight:
      "Full-stack C# development — the foundation for deep system understanding in QA.",
  },
];
