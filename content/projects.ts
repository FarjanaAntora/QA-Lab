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
    title: "HealthScan - Enterprise Test Plan",
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
      "Comprehensive test plan for a healthcare AI document intelligence platform - architecture-risk traceability across 88 Phase 1 MVP stories, covering OCR pipelines, LLM extraction validation, human-in-the-loop verification, consent compliance, and entitlement gating.",
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
      "Test plan adopted by the engineering team as the quality standard for Phase 1 MVP launch. Identified 10 gap categories in the original plan and added 40+ new test cases.",
    github: null,
  },
  {
    slug: "mhm-ehr-qa",
    title: "Memorial Houston Medical - EHR Quality Ownership",
    tagline: "Sole QA engineer. US hospital system. No safety net.",
    role: "Sole QA Engineer",
    status: "live",
    category: "Healthcare QA",
    technologies: [
      "Playwright",
      "Postman",
      "SQL",
      "JMeter",
      "OWASP ZAP",
      "Manual Testing",
    ],
    summary:
      "End-to-end quality ownership for a US hospital platform covering Electronic Health Records, Patient Information System, and Appointment Scheduler - as the sole QA engineer on the project.",
    problem:
      "Patient data flows across three interconnected modules. A data integrity failure in one module cascades across all three. Clinical errors have real-world consequences.",
    approach: [
      "Complete data flow validation across EHR → PIS → Scheduler module boundaries",
      "Form validation, UI alignment, and functional testing across all clinical workflows",
      "API testing with Postman for all backend service integrations",
      "SQL-based back-end data integrity verification after every write operation",
      "Playwright automation baseline for login flow and first clinical module",
      "Performance testing with JMeter; security scanning with OWASP ZAP",
    ],
    challenge:
      "Testing a system where a missed defect could affect patient care. Prioritising coverage across three complex modules as the only QA engineer, with no team to delegate to.",
    outcome:
      "Zero critical defects reached production during the engagement. Playwright automation baseline established for ongoing regression coverage.",
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
