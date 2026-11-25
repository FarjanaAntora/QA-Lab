import { GITHUB_URL, LINKEDIN_URL, SITE_URL } from "@/lib/site";

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

export type CVData = {
  name: string;
  title: string;
  specialty: string;
  email: string;
  location: string;
  website: string;
  websiteHref: string;
  github: string;
  githubHref: string;
  linkedin: string;
  linkedinHref: string;
  referencesNote: string;
  pdfHref: string;
  pdfDownloadName: string;
  experienceHeading: string;
  experience: CVExperienceRole[];
  achievements: string[];
  skills: CVSkillGroup[];
  education: {
    degree: string;
    university: string;
    year: string;
    grade: string;
  };
};

/** Part B headline — used on the CV page and in /cv meta description. */
export const CV_HEADLINE =
  "Lead SQA Engineer. Manual testing first, with automation and AI-assisted QA.";

export const cvData: CVData = {
  name: "Aktia Farjana Antora",
  title: CV_HEADLINE,
  specialty:
    "Playwright E2E Automation · DeepEval · LangSmith · AI coding assistants (Claude, GPT) · CI/CD",
  email: "farjana1319ontu@gmail.com",
  location: "Dhaka, Bangladesh",
  website: "qa-lab-eight.vercel.app",
  websiteHref: SITE_URL,
  github: "github.com/FarjanaAntora",
  githubHref: GITHUB_URL,
  linkedin: "linkedin.com/in/aktia-farjana-antora",
  linkedinHref: LINKEDIN_URL,
  referencesNote: "References available on request.",
  pdfHref: "/cv-antora.pdf",
  pdfDownloadName: "Aktia Farjana Antora.pdf",
  experienceHeading: "Experience",
  experience: [
    {
      role: "Lead SQA Engineer",
      company: "Golden Harvest Infotech Ltd (GHIT)",
      period: "Oct 2024 – Present",
      groups: [
        {
          heading: "Manual and functional testing",
          bullets: [
            "Memorial Houston Medical (US hospital platform): sole QA across five modules — manual testing plus a Selenium/Python regression suite for login, registration and EHR; 150–700 defects found per module; validated data flows, forms, UI behaviour and API and SQL results",
            "Multi-tenant SaaS (MHM, Healthcare RCM): tested tenant data isolation, per-tenant configuration, configurability and role-based access control; supported a client tenant onboarded at proof-of-concept stage",
            "Booking platform with an embedded third-party payment form and a middleware layer syncing with WordPress (booking numbers, seat counts): covered all-or-nothing package, charter and bulk bookings and payment through live and other channels",
            "Bangladesh government platforms (Satellite Billing, BRRI, Conferencing Portal): risk-based test coverage, SQL verification and UAT support",
            "Validated 140+ formulas with computed expected values as ground truth for Hppy AI, against international-standard thresholds",
            "Wrote test plans, scenarios and test cases from requirements and acceptance criteria; owned defect reporting, severity and priority triage and retesting with developers",
          ],
        },
        {
          heading: "Automation as an extension of manual coverage",
          bullets: [
            "Turned stable manual regression cases into a Selenium/Python regression suite for Memorial Houston Medical (login, registration and EHR), so manual time goes to exploratory and new-feature testing",
            "Scheduled CI/CD runs and server health checks (GitHub Actions, GitLab CI); Playwright automation on web projects; Postman and Swagger API checks",
          ],
        },
        {
          heading: "AI-assisted test preparation, human-verified",
          bullets: [
            "Use AI coding assistants (Claude, GPT) to draft test cases, test data and bug reports, then verify every output by hand: execute the tests, check the database and application output, review logs and error messages, capture screenshots, and validate API responses",
          ],
        },
        {
          heading: "AI-assisted QA (in progress)",
          bullets: [
            "Designing an AI-assisted, human-in-the-loop validation workflow for a manuscript digitisation project (FamilySearch) as QA Lead and Project Manager: agents draft checks from the requirements, observe test runs, and compare image-quality, metadata and cloud results against evidence, with a human making the final sign-off. Architecture is defined; components are under development",
            "Evaluate LLM outputs on Hppy AI products with DeepEval, LangSmith and LLM-as-judge methods; mentor junior QA engineers",
          ],
        },
      ],
    },
    {
      role: "SQA Engineer",
      company: "Echologyx / Echotex",
      period: "Dec 2022 – Oct 2024",
      bullets: [
        "Same company under different management — one continuous ERP engagement spanning UIS, PIS, EHR, BMS and Appointment Management for 15+ clients across about two years, including Memorial Houston Medical",
        "Sole QA owner of 5 ERP modules; uncovered 2,000+ defects across the ERP, including its API",
        "API, functional, regression and integration testing across the multi-module platform; patient identity stays in UIS and travels as an External ID",
        "Tested mobile applications on iOS and Android using real devices, browser developer tools and BrowserStack for wide device and browser coverage",
        "Checked A/B tests and web analytics (tracking, event and funnel analytics, session behaviour) for global luxury and automotive brand clients — a checking role, not a lead role; 160+ defects in one engagement, and 2 defects in a separate 120-hour project",
        "Wrote SRS, SOP and test documentation; managed the defect lifecycle in Jira with development teams",
      ],
    },
    {
      role: "Web Developer / QA",
      company: "Digital Agency Nordic",
      period: "Nov 2021 – Dec 2022",
      bullets: [
        "QA testing and WordPress development for international agency clients, including cross-browser and UI validation",
      ],
    },
    {
      role: "Business Analyst & QA Manager",
      company: "Quantanite",
      period: "Jan 2020 – Oct 2021",
      bullets: [
        "Team management (team of 80), requirements analysis, QA oversight and quality reporting for international outsourcing clients",
      ],
    },
    {
      role: "Business Transformation Analyst",
      company: "IPDC Finance",
      period: "Jan 2018 – May 2019",
      bullets: [
        "Built the Collateral Data Management System end to end in C# (.NET); created test environments and executed UAT",
      ],
    },
  ],
  achievements: [
    "First at GHIT to implement production AI output validation using DeepEval and LangSmith — hallucination testing framework adopted as standard across all Hppy AI products",
    "Uses AI coding assistants (Claude, GPT) in daily QA work — generating Playwright test scaffolding, building reusable components, and refining AI-generated test cases for healthcare accuracy standards",
    "Built Playwright CI/CD automation pipeline from scratch — regression and health checks triggered automatically on every push and on a schedule across 6+ concurrent projects in the Hppy AI / GHIT portfolio",
    "140+ formulas validated, with computed expected values as ground truth — ensuring AI solution accuracy, compliance, and business logic correctness",
    "Sole QA for Memorial Houston Medical (US EHR/PIS platform) — full test strategy, API validation, and manual testing plus a Selenium/Python regression suite for login, registration and EHR",
  ],
  skills: [
    {
      category: "Manual Testing",
      items:
        "Functional · regression · exploratory · UAT · end-to-end · cross-browser · multi-tenant isolation and RBAC testing",
    },
    {
      category: "Mobile Testing",
      items:
        "iOS and Android on real devices · BrowserStack · browser DevTools device emulation",
    },
    {
      category: "Test Design",
      items:
        "Requirements analysis · test plans, scenarios and cases · boundary value analysis · equivalence partitioning · risk-based testing",
    },
    {
      category: "Defect Management",
      items:
        "Jira · ClickUp · Notion · severity and priority triage · root-cause discussion · retesting and closure",
    },
    {
      category: "API & Data",
      items:
        "Postman · Swagger · REST API validation · SQL data integrity checks",
    },
    {
      category: "Automation (extension)",
      items:
        "Selenium (Python) · Playwright · Pytest · GitHub Actions · GitLab CI",
    },
    {
      category: "AI-Assisted QA",
      items:
        "AI coding assistants (Claude, GPT) for drafting test cases, data and reports (human-verified) · DeepEval · LangSmith · LLM-as-judge · agent-based validation design (in progress)",
    },
    {
      category: "Performance & Security",
      items: "k6 · JMeter · OWASP ZAP · Burp Suite",
    },
    {
      category: "Languages & Process",
      items:
        "Python · JavaScript · C# (development background) · Agile/Scrum · SDLC · STLC",
    },
  ],
  education: {
    degree: "BSc in Computer Science & Engineering",
    university: "American International University — Bangladesh",
    year: "2014 – 2018",
    grade: "CGPA 3.65",
  },
};
