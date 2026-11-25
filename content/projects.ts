export type ProjectStatus = "live" | "coming-soon" | "delivered" | null;

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
  outcome?: string;
  github: string | null;
  decision?: {
    title: string;
    steps: { label: string; body: string }[];
    related?: { href: string; label: string };
  };
  related?: { href: string; label: string };
};

export const projects: Project[] = [
  {
    slug: "healthscan-test-plan",
    title: "Hppy AI - Enterprise Test Plan",
    tagline: "88 user stories. 23 epics. Zero assumptions.",
    role: "Lead QA Engineer",
    status: null,
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
      "Identified 10 gap categories in the original plan and added 40+ test cases. The engineering team used this plan for the MVP launch.",
    github: null,
    decision: {
      title: "When there is no exact answer",
      related: {
        href: "/projects/playwright-ai-qa-framework",
        label: "Playwright + AI Evaluation Framework",
      },
      steps: [
        {
          label: "Risk",
          body: "The model can return an answer that sounds medically plausible and is unsupported by the record. A pass/fail assertion on the wording misses that.",
        },
        {
          label: "Question",
          body: "How do you test “correct” when the same input can come back in different words, and there is no single string to assert?",
        },
        {
          label: "Decision",
          body: "Split the problem. Extraction accuracy and formula results have a correct value, so they stay on deterministic checks. Whether an answer is grounded, faithful, and relevant is a different problem, and it needs a different test.",
        },
        {
          label: "Implementation",
          body: "DeepEval scores the output against ground-truth benchmarks for faithfulness, answer relevance, and hallucination rate. An LLM-as-judge scores denial reasoning, appeals recommendations, and risk scores. The gate is a threshold on that score. LangSmith traces the call. On the extraction path, a person still verifies what the model pulled from the document. This is the same system as the Playwright + AI Evaluation Framework, running on these products.",
        },
        {
          label: "Failure",
          body: "The first gate asserted the answer text. A supported answer in different words failed the fixture. A fluent answer was never compared with the source.",
        },
        {
          label: "Response",
          body: "Model answers moved off string match. Faithfulness, relevance, and hallucination rate became the semantic gate. Denial reasoning, appeals, and risk scores go through the judge. Extraction and the formula suite stayed on exact checks, because those outputs have a correct value. LangSmith holds the trace when the prompt or the model changes, including the switch between GPT-4 and Gemini.",
        },
        {
          label: "Result",
          body: "Green means the journey ran and the faithfulness score cleared its threshold against the ground truth. A weak score fails the build. Beside that score, the product rules still hold: do not fabricate, do not diagnose, cite the source.",
        },
      ],
    },
  },
  {
    slug: "mhm-ehr-qa",
    title: "Memorial Houston Medical - EHR Quality Ownership",
    tagline: "Sole QA engineer. Five modules. One identity layer.",
    role: "Sole QA Engineer",
    status: null,
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
      "Sole QA ownership for a US hospital ERP spanning UIS, PIS, EHR, BMS, and Appointment Management. Echologyx and Echotex were the same company under different management, so this sits in one continuous ERP engagement: 15+ clients across 2 years. Patient identity stays in UIS and travels as an External ID. I covered functional, integration, and regression work, plus Selenium/Python automation for login, registration, and EHR.",
    problem:
      "Five modules share a patient without sharing a copy of that patient. If UIS identity and the External ID drift, clinical and operational records disagree. Quality has to prove the boundary, not just the screen.",
    approach: [
      "Functional, end-to-end, regression, and integration coverage followed the identity model: UIS holds the patient, other modules carry the External ID",
      "API and data validation where modules exchange the External ID instead of raw identity",
      "Security and data-segregation checks on module isolation, with the patient record staying in UIS",
      "The paths that move that patient: registration, clinical record, beds, and appointments",
      "Defect identification, documentation, and verification through Jira",
      "Python + Selenium regression on login, registration, and EHR, holding those paths as the modules changed",
    ],
    challenge:
      "Owning quality alone across a hospital platform. Coverage had to follow the identity model and the workflows that actually move patient data, not a catalogue of every possible click.",
    outcome:
      "457+ defects per module, across five modules. 2,000+ total defects across the ERP, including API-level defects — the 2,000+ is the aggregate that per-module count rolls up into, not a second unrelated total. Selenium/Python regression held login, registration, and EHR paths in place as the modules changed.",
    github: null,
  },
  {
    slug: "enterprise-erp-qa",
    title: "Enterprise ERP QA",
    tagline:
      "Sole QA ownership across a multi-client ERP engagement. Fifteen-plus clients. One continuous platform.",
    role: "Sole QA / SQA Engineer",
    status: null,
    category: "Enterprise ERP",
    technologies: [
      "Manual Testing",
      "API Testing",
      "Selenium",
      "Python",
      "Postman",
      "Mobile Testing",
      "BrowserStack",
      "Jira",
      "SQL",
    ],
    summary:
      "SQA for Echologyx / Echotex across a shared ERP serving 15+ clients over about two years. Same company under different management — one continuous engagement, not two unrelated jobs. Coverage spanned API, functional, regression and integration work, with mobile checks on real devices and BrowserStack. Memorial Houston Medical sits inside this engagement as the deepest module-ownership case.",
    problem:
      "A shared ERP serving many clients cannot be treated as one happy path. Each client configuration still has to hold on the same platform, and defects in identity, API, or module boundaries multiply across the portfolio.",
    approach: [
      "Sole QA ownership across shared ERP modules for a multi-client portfolio",
      "API, functional, regression and integration coverage on a live enterprise platform",
      "Mobile testing on iOS and Android with real devices, DevTools and BrowserStack",
      "Defect lifecycle in Jira with development teams; SRS and SOP documentation",
      "Continuous engagement across Echologyx and Echotex under different management",
    ],
    challenge:
      "Owning quality alone across a multi-client ERP without losing the module boundaries, client configuration differences, or the paths that actually move patient and operational data.",
    outcome:
      "2,000+ defects uncovered across the ERP, including its API — with Memorial Houston as the five-module ownership case inside the same engagement.",
    github: null,
    related: {
      href: "/projects/mhm-ehr-qa",
      label: "Memorial Houston Medical — the five-module ownership case",
    },
  },
  {
    slug: "bd-government-qa",
    title: "Bangladesh Government Systems - QA Portfolio",
    tagline:
      "Public-sector delivery where a wrong figure is a public failure.",
    role: "Lead QA Engineer",
    status: "delivered",
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
      "QA delivery across multiple national-scale Bangladesh government systems: Satellite Billing Module, Bangladesh Rice Research Institute digital platform, and a national Conferencing Booking Portal — with a low tolerance for production defects.",
    problem:
      "Government systems serve millions of citizens. An outage or a wrong figure is visible to the public, not only to the team. Each system had its own compliance rules and its own release window.",
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
      "All three systems were delivered to government clients; UAT sign-off was achieved on schedule.",
    github: null,
  },
  {
    slug: "playwright-ai-qa-framework",
    title: "Playwright + AI Evaluation Framework",
    tagline: "Playwright E2E with an AI evaluation layer, gated in CI.",
    role: "Framework Architect & Author",
    status: "coming-soon",
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
      "Playwright drives the user journey through a Page Object Model. DeepEval scores the model output for faithfulness, answer relevance, and hallucination rate. LangSmith traces the call chain. GitHub Actions runs smoke on pull request and the full regression nightly.",
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
      "Hallucination testing adopted across the Hppy AI products at GHIT. CI runs smoke tests on every pull request and the full regression nightly.",
    github: null,
    related: {
      href: "/projects/healthscan-test-plan#decision",
      label: "Hppy AI — the decision this gate is for",
    },
  },
];
