export type FocalProject = {
  id: string;
  slug: string | null;
  label: string;
  title: string;
  positioning: string;
  summary: string;
  role: string;
  metric: { value: string; note: string } | null;
  capabilities: string[];
  technologies: string[];
};

export const hppyFocal: FocalProject = {
  id: "hppy",
  slug: "healthscan-test-plan",
  label: "Focal project",
  title: "Hppy AI",
  positioning: "Healthcare document intelligence. Quality with no assumptions.",
  summary:
    "A healthcare AI platform that reads clinical documents and has to stay grounded in the source. I owned the test plan: architecture-risk traceability across 88 stories and 23 epics, covering extraction, human review, consent, and access control. The work was about what must never happen in a patient record, not a demo script.",
  role: "Lead QA Engineer",
  metric: {
    value: "88 / 23",
    note: "user stories / epics in the test plan",
  },
  capabilities: [
    "Architecture-risk to acceptance-criteria traceability",
    "AI output validation and chat safety scenarios",
    "Adversarial checks for isolation and access control",
    "End-to-end journeys across the patient document flow",
  ],
  technologies: [
    "Test Strategy",
    "API Testing",
    "AI Validation",
    "GDPR Compliance",
    "Playwright",
    "Neo4j",
  ],
};

export const mhmFocal: FocalProject = {
  id: "mhm",
  slug: "mhm-ehr-qa",
  label: "Focal project",
  title: "Memorial Houston Medical",
  positioning: "Healthcare ERP / Medical Information Platform. Sole QA.",
  summary:
    "A modular hospital platform around patient identity, clinical records, appointments, and bed operations. I was the only QA: functional and integration paths, API and data checks, identity-boundary security, and regression on the workflows that move patient data.",
  role: "Sole QA / SQA Engineer",
  metric: {
    value: "2,000+",
    note: "defects identified and driven to resolution",
  },
  capabilities: [
    "Functional, E2E, regression, and integration testing",
    "API and data validation across module boundaries",
    "Security checks on the External ID model",
    "Python + Selenium regression for login, registration, and EHR",
  ],
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
};

export const abTestingFocal: FocalProject = {
  id: "global-ab",
  slug: null,
  label: "Focal project",
  title: "Global Brand A/B Testing",
  positioning:
    "A/B testing and QA for premium global brands. The full lifecycle, not just execution.",
  summary:
    "I led A/B testing across a portfolio of high-end global clients. I owned the path end to end: taking the brief, writing the technical documentation, moving designs through approval, and QA on the experiments themselves. Client-facing BA, documentation, and quality in one seat, at the standard those brands expect.",
  role: "Client-facing BA & QA",
  metric: null,
  capabilities: [
    "Requirements gathering and translation for each engagement",
    "Technical documentation for experiment build and QA",
    "Design approval workflow management",
    "QA across the A/B test lifecycle, including UAT and cross-browser checks",
    "Stakeholder communication through to ship",
  ],
  technologies: [
    "A/B Testing",
    "Client Requirements Gathering",
    "Technical Documentation",
    "Design Approval Workflows",
    "QA",
    "Cross-Browser Testing",
    "UAT",
    "Test Case Design",
    "Stakeholder Communication",
  ],
};

export const echotexFocal: FocalProject = {
  id: "echotex-erp",
  slug: null,
  label: "Focal project",
  title: "Echotex ERP",
  positioning: "ERP platform. Sole tester. Full quality ownership.",
  summary:
    "I was the only QA engineer on an ERP system at Echotex. Test planning, execution, and defect management sat with me — there was no QA team to split the modules across.",
  role: "Sole QA / Tester",
  metric: null,
  capabilities: [
    "Functional testing across ERP modules",
    "Test case design",
    "Defect tracking",
    "Regression coverage",
    "Independent ownership of the quality process",
  ],
  technologies: [
    "ERP Testing",
    "Functional Testing",
    "Regression Testing",
    "Test Case Design",
    "Defect Tracking",
    "Solo QA Ownership",
  ],
};

export const brandRoster = [
  { name: "Louis Vuitton", src: "/brands/louis-vuitton.svg" },
  { name: "TAG Heuer", src: "/brands/tag-heuer.svg", emblem: true },
  { name: "Dior", src: "/brands/dior.svg" },
  { name: "Sephora", src: "/brands/sephora.svg" },
  { name: "Fenty Beauty", src: "/brands/fenty-beauty.svg" },
  { name: "Victoria Beckham", src: "/brands/victoria-beckham.svg" },
  { name: "Heavenly", src: "/brands/heavenly.svg", emblem: true },
  { name: "Sole", src: "/brands/sole.svg", emblem: true },
  { name: "Schöffel", src: "/brands/schoffel.svg" },
  { name: "Strauss", src: "/brands/strauss.svg", emblem: true },
  { name: "Batch LDN", src: "/brands/batch-ldn.svg" },
  { name: "UK Oak Doors", src: "/brands/uk-oak-doors.svg", emblem: true },
  { name: "Guess the Test", src: "/brands/guess-the-test.svg", emblem: true },
  { name: "Freddie's Flowers", src: "/brands/freddies-flowers.svg", emblem: true },
  { name: "Rimowa", src: "/brands/rimowa.svg" },
  { name: "Chinti & Parker", src: "/brands/chinti.svg" },
  { name: "Wax London", src: "/brands/wax.svg", emblem: true },
  { name: "Loop", src: "/brands/loop.svg", emblem: true },
] as const;

export const echotexLoop = [
  { step: "Plan", note: "Test planning" },
  { step: "Execute", note: "Functional testing" },
  { step: "Defects", note: "Defect tracking" },
  { step: "Regression", note: "Regression coverage" },
] as const;
