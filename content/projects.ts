export type ProjectStatus = "live" | "coming-soon";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  role: string;
  status: ProjectStatus;
  category: string;
  technologies: string[];
  summary: string;
  problem: string;
  approach: string[];
  challenge: string;
  outcome: string;
  github: string | null;
};

export const projects: Project[] = [
  {
    slug: "playwright-ai-qa-framework",
    title: "Playwright + AI Evaluation Framework",
    tagline:
      "Production-grade automation with hallucination detection built in.",
    role: "Framework Architect & Author",
    status: "live",
    category: "Automation Framework",
    technologies: [
      "Playwright",
      "Python",
      "DeepEval",
      "LangSmith",
      "GitHub Actions",
      "Docker",
    ],
    summary:
      "An open-source QA automation framework that combines Playwright E2E testing with an AI evaluation layer - hallucination detection, LLM-as-judge scoring, and output consistency checks - integrated into a CI/CD pipeline that runs on every push.",
    problem:
      'Most automation frameworks are built for deterministic software. When the system under test is an LLM, traditional assertion logic breaks down. The same input can produce different outputs. What does "pass" even mean?',
    approach: [
      "Playwright for E2E web automation with Page Object Model",
      "DeepEval for LLM output scoring - faithfulness, answer relevance, hallucination rate",
      "LangSmith for tracing LLM call chains and detecting output drift in production",
      "GitHub Actions CI pipeline with separate test tiers: smoke on PR, full regression nightly",
      "Docker Compose for local environment setup",
    ],
    challenge:
      'Replacing binary pass/fail assertions with probabilistic quality thresholds. Instead of expect(response).toBe("exact string"), the framework uses expect(faithfulnessScore).toBeGreaterThan(0.85).',
    outcome:
      "Hallucination testing framework adopted as standard practice across all AI products at GHIT. CI pipeline reduced manual regression overhead completely.",
    github:
      "https://github.com/aktia-antora/playwright-ai-qa-framework",
  },
  {
    slug: "healthscan-test-plan",
    title: "Hppy AI - Enterprise Test Plan",
    tagline: "88 user stories. 23 epics. Zero assumptions.",
    role: "Lead QA Engineer",
    status: "live",
    category: "Test Strategy",
    technologies: [
      "Test Strategy",
      "Neo4j",
      "API Testing",
      "AI Validation",
      "GDPR Compliance",
      "Playwright",
    ],
    summary:
      "Comprehensive test plan for a healthcare AI document intelligence platform - architecture-risk traceability across 88 stories, covering OCR pipelines, LLM extraction validation, human-in-the-loop verification, consent compliance, and entitlement gating.",
    problem:
      "The system processes real patient medical records using AI. A wrong extraction or an ungrounded AI answer has real-world consequences. Standard QA approaches were insufficient.",
    approach: [
      "Architecture-risk to acceptance-criteria traceability matrix for all 88 stories",
      "Adversarial security test suite: cross-user isolation, JWT tampering, Cypher injection via chat",
      "AI chat safety scenarios: hallucination, diagnosis refusal, cross-user data leakage",
      "Audit log completeness verification for every write event type",
      "4 end-to-end journey tests covering the complete patient flow",
      "Compliance controls: TLS verification, encryption checks, consent capture audit",
    ],
    challenge:
      'Testing AI outputs that must never fabricate data, never diagnose, and always cite their source. Designing test cases for non-deterministic systems where "correct" is probabilistic.',
    outcome:
      "Test plan adopted by the engineering team as the quality standard for MVP launch. Identified 10 gap categories in the original plan and added 40+ new test cases.",
    github: null,
  },
  {
    slug: "mhm-ehr-qa",
    title: "Memorial Houston Medical - EHR Quality Ownership",
    tagline: "Sole QA engineer. Five modules. One identity layer.",
    role: "Sole QA Engineer",
    status: "live",
    category: "Healthcare ERP",
    technologies: [
      "Selenium",
      "Python",
      "API Testing",
      "Regression Testing",
      "Functional Testing",
      "Integration Testing",
      "EHR",
      "Healthcare ERP",
      "Data Validation",
      "Security Testing",
      "Jira",
    ],
    summary:
      "Sole QA ownership for a US hospital ERP spanning UIS, PIS, EHR, BMS, and Appointment Management. Patient identity stays in UIS and travels as an External ID. I covered functional, integration, and regression work, plus Selenium/Python automation for login, registration, and EHR.",
    problem:
      "Five modules share a patient without sharing a copy of that patient. If UIS identity and the External ID drift, clinical and operational records disagree. Quality has to prove the boundary, not just the screen.",
    approach: [
      "Functional, end-to-end, regression, and integration testing across UIS, PIS, EHR, BMS, and appointments",
      "API and data validation where modules exchange the External ID instead of raw identity",
      "Security and data-segregation checks on module-level isolation",
      "Cross-module workflow validation for registration, clinical record, bed, and appointment paths",
      "Defect identification, documentation, and verification through Jira",
      "Python + Selenium regression for login/authentication, patient registration, and EHR",
    ],
    challenge:
      "Owning quality alone across a hospital platform. Coverage had to follow the identity model and the workflows that actually move patient data, not a catalogue of every possible click.",
    outcome:
      "Identified and drove resolution of 2,000+ defects across the platform. Selenium/Python regression held login, registration, and EHR paths in place as the modules changed.",
    github: null,
  },
  {
    slug: "bd-government-qa",
    title: "Bangladesh Government Systems - QA Portfolio",
    tagline: "Public sector delivery. Zero tolerance for failure.",
    role: "Lead QA Engineer",
    status: "live",
    category: "Government / GovTech",
    technologies: [
      "Selenium",
      "Postman",
      "JMeter",
      "SQL",
      "Manual Testing",
      "OWASP ZAP",
    ],
    summary:
      "QA delivery across multiple national-scale Bangladesh government systems: Satellite Billing Module, Bangladesh Rice Research Institute digital platform, and a national Conferencing Booking Portal.",
    problem:
      "Government systems serve millions of citizens. Downtime or data errors are public failures. Each system had unique compliance requirements and zero tolerance for production defects.",
    approach: [
      "Risk-based test prioritisation - highest-impact flows tested first",
      "SQL database-level data integrity verification for billing accuracy",
      "API validation across all government service integrations",
      "Performance and load testing for expected citizen traffic volumes",
      "Security scanning for public-facing endpoints",
      "UAT coordination and formal sign-off processes",
    ],
    challenge:
      "Coordinating QA across three simultaneous government project deliveries with different stakeholders, compliance requirements, and release windows.",
    outcome:
      "All three systems delivered to government clients without production incidents. UAT sign-off achieved on schedule.",
    github: null,
  },
];
