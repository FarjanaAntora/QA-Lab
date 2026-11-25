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
  judgment?: string;
  anchor?: string;
};

export const hppyFocal: FocalProject = {
  id: "hppy",
  slug: "healthscan-test-plan",
  label: "Focal project",
  title: "Hppy AI",
  positioning:
    "Enterprise test plan and live product QA. Some of it shipped. Some of it is still in flight.",
  summary:
    "Hppy AI is a family of healthcare products — document intelligence, ClaimReady math, Hppy RX, and HppyFx. I owned the enterprise test plan: 88 stories and 23 epics, plus 140+ formulas. Four end-to-end journeys, ten gap categories, and 40+ cases added. A wrong extraction or an ungrounded number has real-world consequences.",
  role: "Lead QA Engineer",
  metric: {
    value: "88 / 23",
    note: "user stories / epics in the test plan",
  },
  capabilities: [
    "Architecture-risk to acceptance-criteria across all 88 stories",
    "OCR and LLM extraction stay on exact checks, with a person verifying the pull before it is written",
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
  judgment:
    "Under the counts: exact checks for extraction and formulas, and a faithfulness score for answers that have no single correct string.",
  anchor: "#decision",
};

export const hppyMetrics = [
  { value: "88", note: "User stories" },
  { value: "23", note: "Epics" },
  { value: "140+", note: "Formulas validated" },
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
    "Sole QA for a US hospital ERP spanning UIS, PIS, EHR, BMS, and Appointment Management. This is one continuous ERP engagement: Echologyx and Echotex were the same company under different management, and 15+ clients were served across those 2 years. Patient identity stays in UIS and travels as an External ID — five modules share a patient without copying the record. I covered functional and integration paths, identity-boundary security, API defects, and Selenium/Python regression for login, registration, and EHR.",
  role: "Sole QA / SQA Engineer",
  metric: null,
  capabilities: [
    "Functional, end-to-end, and integration coverage followed the identity boundary: UIS holds the patient, other modules use the External ID",
    "API and data checks where the External ID crosses a boundary",
    "Security and isolation on the identity model",
    "Paths that move the patient across modules: registration, clinical record, beds, appointments",
    "Python + Selenium regression held login, registration, and EHR as the modules changed",
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

export const mhmFigures = [
  {
    value: "5",
    note: "modules, 150-700 defects found per module",
  },
] as const;

export const enterpriseErpFocal: FocalProject = {
  id: "enterprise-erp",
  slug: "enterprise-erp-qa",
  label: "Focal project",
  title: "Enterprise ERP QA",
  positioning:
    "Sole QA ownership across a multi-client ERP engagement. Fifteen-plus clients. One continuous platform.",
  summary:
    "SQA for Echologyx / Echotex across a shared ERP serving 15+ clients over about two years. Same company under different management — one continuous engagement, not two unrelated jobs. Coverage spanned API, functional, regression and integration work, with mobile checks on real devices and BrowserStack. Memorial Houston Medical sits inside this engagement as the deepest module-ownership case.",
  role: "Sole QA / SQA Engineer",
  metric: {
    value: "15+",
    note: "clients served across about two years on one ERP engagement",
  },
  capabilities: [
    "Sole QA ownership across shared ERP modules for a multi-client portfolio",
    "API, functional, regression and integration coverage on a live enterprise platform",
    "Mobile testing on iOS and Android with real devices, DevTools and BrowserStack",
    "Defect lifecycle in Jira with development teams; SRS and SOP documentation",
    "Continuous engagement across Echologyx and Echotex under different management",
  ],
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
  highlight:
    "2,000+ defects uncovered across the ERP, including its API — with Memorial Houston as the five-module ownership case inside the same engagement.",
};

export const abTestingFocal: FocalProject = {
  id: "global-ab",
  slug: null,
  label: "Selected work",
  title: "A/B Analytics QA",
  positioning:
    "QA and analytics checking for premium global brands.",
  summary:
    "QA and analytics checking on A/B tests for premium global brands: checking experiments, traffic and web analytics, event tracking and user journeys.",
  role: "QA and analytics checking",
  metric: null,
  capabilities: [
    "Each client brief was translated into the technical documentation before the experiment was built and tested",
    "Technical documentation for experiment build and QA",
    "Design approval workflow management",
    "QA across the full lifecycle of each experiment, from the brief through UAT and cross-browser checks",
    "Client-facing communication through to ship, in the same seat as the brief and the QA",
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

export const abContrasts = [
  {
    value: "160+",
    note: "defects found in one A/B testing engagement.",
  },
  {
    value: "2",
    note: "defects found in a separate 120-hour project, on a different system.",
  },
] as const;

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

