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
  highlight: string | null;
};

export const hppyFocal: FocalProject = {
  id: "hppy",
  slug: "healthscan-test-plan",
  label: "Focal project",
  title: "Hppy AI",
  positioning:
    "Enterprise test plan and live product QA. Some of it shipped. Some of it is still in flight.",
  summary:
    "Hppy AI is a family of healthcare products — document intelligence, ClaimReady math, Hppy RX, and HppyFx. I owned the enterprise test plan: 88 stories and 23 epics, plus 45 formulas mapped across 8 clinical stories. Four end-to-end journeys, ten gap categories, and 40+ cases added. A wrong extraction or an ungrounded number has real-world consequences.",
  role: "Lead QA Engineer",
  metric: {
    value: "88 / 23",
    note: "user stories / epics in the test plan",
  },
  capabilities: [
    "Architecture-risk to acceptance-criteria across all 88 stories",
    "OCR, LLM extraction, and human-in-the-loop verification",
    "Chat safety: hallucination, diagnosis refusal, isolation",
    "Adversarial checks for access control and data leakage",
    "Consent, entitlement, and audit completeness",
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
  highlight:
    "HealthScan plan adopted for MVP. Claim formula suite validated. HppyFx economics POC still in flight.",
};

export const hppyMetrics = [
  { value: "88", note: "User stories" },
  { value: "23", note: "Epics" },
  { value: "45", note: "Formulas validated" },
  { value: "8", note: "Clinical stories" },
  { value: "4", note: "E2E journeys" },
  { value: "10", note: "Gap categories" },
  { value: "40+", note: "Cases added" },
  { value: "3", note: "AI products" },
] as const;

export const mhmFocal: FocalProject = {
  id: "mhm",
  slug: "mhm-ehr-qa",
  label: "Focal project",
  title: "Memorial Houston Medical",
  positioning:
    "EHR quality ownership. Five modules. One identity layer. Sole QA.",
  summary:
    "Sole QA for a US hospital ERP spanning UIS, PIS, EHR, BMS, and Appointment Management. Patient identity stays in UIS and travels as an External ID — five modules share a patient without copying the record. I covered functional and integration paths, identity-boundary security, and Selenium/Python regression for login, registration, and EHR.",
  role: "Sole QA / SQA Engineer",
  metric: {
    value: "2,000+",
    note: "defects identified and driven to resolution",
  },
  capabilities: [
    "Functional, E2E, and integration across UIS, PIS, EHR, BMS, and appointments",
    "API and data checks where the External ID crosses a boundary",
    "Security and isolation on the identity model",
    "Cross-module paths: registration, clinical record, beds, appointments",
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
  highlight:
    "Selenium/Python regression held login, registration, and EHR as the modules changed.",
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
  highlight: null,
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

