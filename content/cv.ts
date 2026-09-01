export type CVSkillGroup = {
  category: string;
  items: string;
};

export type CVExperienceGroup = {
  heading: string;
  bullets: string[];
};

export type CVExperienceRole = {
  role: string;
  company: string;
  period: string;
  groups?: CVExperienceGroup[];
  bullets?: string[];
};

export type CVReferee = {
  name: string;
  title: string;
  email: string;
  phone: string;
};

export type CVData = {
  name: string;
  title: string;
  specialty: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  pdfHref: string;
  pdfDownloadName: string;
  experienceHeading: string;
  experience: CVExperienceRole[];
  skills: CVSkillGroup[];
  achievements: string[];
  education: {
    degree: string;
    university: string;
    year: string;
    grade: string;
  };
  referees: CVReferee[];
};

export const cvData: CVData = {
  name: "Aktia Farjana Antora",
  title: "AI Quality Engineer",
  specialty:
    "Playwright E2E Automation · DeepEval · LangSmith · Claude · GPT · CI/CD",
  email: "farjana1319ontu@gmail.com",
  phone: "+880 1686057143",
  location: "Dhaka, Bangladesh",
  linkedin: "linkedin.com/in/aktia-farjana-antora",
  github: "github.com/aktia-antora",
  pdfHref: "/cv-antora.pdf",
  pdfDownloadName: "Aktia Farjana Antora.pdf",
  experienceHeading: "AI Quality Engineering Experience",
  experience: [
    {
      role: "Lead AI Quality Engineer",
      company: "Golden Harvest Infotech Ltd · Hppy AI Products",
      period: "Oct 2024 – Present",
      groups: [
        {
          heading: "Playwright E2E Automation Framework",
          bullets: [
            "Designed, developed, executed, and maintained Playwright automated test suites for web applications across three AI-driven healthcare products (ClaimReady AI, Hppy RX, HppyFx)",
            "Built scalable, maintainable E2E automation frameworks covering critical business workflows, regression scenarios, and edge cases; created reusable testing components and Page Object patterns",
            "Used Claude Sonnet 4.6 and Claude Opus 4.6 as AI coding assistants to generate Playwright test script scaffolding, accelerate framework development, and refine automated test coverage",
            "Integrated Playwright suites into CI/CD pipelines (GitHub Actions) for continuous regression testing and scheduled server health checks — automated gate enforcement with zero manual triggers",
          ],
        },
        {
          heading: "AI & Machine Learning Quality Assurance",
          bullets: [
            "Translated complex AI/ML requirements into structured test cases and automation strategies for LLM-backed clinical and administrative modules",
            "Used DeepEval to build evaluation test suites validating AI output quality against ground-truth benchmarks — measuring faithfulness, answer relevance, contextual precision, and hallucination rate",
            "Applied LLM-as-judge methodology to score and validate AI-generated outputs (denial reasoning, appeals recommendations, risk scores) for accuracy, compliance, and business logic correctness",
            "Used LangSmith to trace and debug LLM call chains in production — monitoring prompt performance, latency, output drift, and quality regressions across multi-agent workflows",
            "Tested across OpenAI GPT-4 (primary) and Gemini (fallback) — cross-model output comparison and consistency validation; ensured stable behaviour across model switches",
          ],
        },
        {
          heading: "AI-Assisted Test Development",
          bullets: [
            "Leveraged Claude Sonnet 4.6 and Claude Opus 4.6 to accelerate automation development: generated test scaffolding, built reusable framework components, and used AI to identify edge cases beyond manual analysis",
            "Refined AI-generated test cases to maximise coverage and reliability — reviewed, corrected, and extended AI suggestions with domain-specific healthcare accuracy requirements",
            "Improved testing productivity through intelligent automation workflows: AI-assisted generation of test data, schema validation patterns, and API mock definitions",
          ],
        },
        {
          heading: "API Testing & Validation",
          bullets: [
            "Performed comprehensive testing of RESTful APIs using Postman and Swagger — validated functionality, reliability, performance, and data integrity across request/response lifecycle",
            "Validated API integrations for AI model endpoints: tested inference calls, response schemas, error handling, and timeout behaviour across OpenAI and Gemini API integrations",
            "Ensured data integrity across multiple systems and integrations — SQL-based back-end validation across SQL Server and MySQL",
          ],
        },
        {
          heading: "Additional Platform QA",
          bullets: [
            "Memorial Houston Medical (US EHR/PIS/Scheduler) — Sole QA engineer; built Playwright automation baseline; full functional, API, and manual testing ownership for US hospital system",
            "Bangladesh government platforms (Satellite Billing, BRRI, Conferencing Portal) and international ecotourism booking portals (Ecoventura, Galapagos)",
          ],
        },
      ],
    },
    {
      role: "SQA Engineer",
      company: "Echologyx",
      period: "Dec 2022 – Oct 2024",
      bullets: [
        "QA for enterprise ERP systems (UK/EU clients) — API, functional, regression, integration testing; Jira defect lifecycle management; SRS and SOP documentation",
      ],
    },
    {
      role: "Business Analyst & QA Manager",
      company: "Quantanite",
      period: "Jan 2020 – Oct 2021",
      bullets: [
        "Team management, requirements analysis, QA oversight for international clients",
      ],
    },
    {
      role: "Business Transformation Analyst",
      company: "IPDC Finance",
      period: "Jan 2018 – May 2019",
      bullets: [
        "UAT execution; end-to-end C# (.NET) development of Collateral Data Management System",
      ],
    },
  ],
  skills: [
    {
      category: "AI Coding Assistants",
      items:
        "Claude Sonnet 4.6 · Claude Opus 4.6 · GPT-4 / GPT-5.4 · AI-assisted test generation · scaffold refinement",
    },
    {
      category: "AI Eval Frameworks",
      items:
        "DeepEval · LangSmith · LLM-as-judge · hallucination detection · faithfulness scoring · output consistency",
    },
    {
      category: "LLM Platforms Tested",
      items:
        "OpenAI GPT-4 · Gemini · Claude (Anthropic) · multi-model validation · cross-model comparison",
    },
    {
      category: "Playwright & Automation",
      items:
        "Playwright (primary) · E2E framework design · reusable components · Page Object Model · Selenium · Pytest",
    },
    {
      category: "CI/CD Pipelines",
      items:
        "GitHub Actions · GitLab CI · Jenkins (familiar) · automated regression gates · scheduled health checks",
    },
    {
      category: "API & REST Testing",
      items:
        "Postman · Swagger · RESTful API validation · request/response lifecycle · HTTP methods · data integrity",
    },
    {
      category: "Languages",
      items:
        "Python · JavaScript · TypeScript (familiar) · C# (.NET — prior dev background)",
    },
    {
      category: "Testing Types",
      items:
        "E2E · Functional · Regression · Integration · API · UAT · Exploratory · AI/ML output validation",
    },
    {
      category: "Performance & Security",
      items: "JMeter · OWASP ZAP · Burp Suite",
    },
    {
      category: "Tools & Tracking",
      items: "Jira · ClickUp · Notion · Agile · Scrum · SDLC · STLC",
    },
  ],
  achievements: [
    "First at GHIT to implement production AI output validation using DeepEval and LangSmith — hallucination testing framework adopted as standard across all Hppy AI products",
    "Actively uses Claude Sonnet 4.6 and Claude Opus 4.6 in daily QA work — generating Playwright test scaffolding, building reusable components, and refining AI-generated test cases for healthcare accuracy standards",
    "Built Playwright CI/CD automation pipeline from scratch — regression and health checks run continuously across 6+ concurrent projects with zero manual triggers",
    "Validated 45 AI-generated mathematical formulas across 8 clinical user stories using statistical output verification — ensuring AI solution accuracy, compliance, and business logic correctness",
    "Sole QA for Memorial Houston Medical (US EHR/PIS platform) — full test strategy, API validation, and Playwright automation baseline built independently",
    "8-year career from C# development to AI Quality Engineering — one of the few QA engineers combining traditional automation depth with production LLM evaluation experience",
  ],
  education: {
    degree: "BSc in Computer Science & Engineering",
    university: "American International University Bangladesh",
    year: "2014 – 2018",
    grade: "CGPA 3.65",
  },
  referees: [
    {
      name: "Ariful Islam",
      title: "CTO · Golden Harvest Infotech Ltd",
      email: "arif@ghitbd.com",
      phone: "+880 1713459598",
    },
    {
      name: "Sadia Ahmed",
      title: "Senior SQA Engineer · Echologyx",
      email: "sadia@echologyx.com",
      phone: "+880 1747982381",
    },
  ],
};
