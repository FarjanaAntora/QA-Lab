export type FocalProject = {
  id: string;
  slug: string;
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
  positioning: "Healthcare document intelligence. Phase 1 quality, no assumptions.",
  summary:
    "A healthcare AI platform that reads clinical documents and has to stay grounded in the source. I owned the Phase 1 test plan: architecture-risk traceability across 88 stories and 23 epics, covering extraction, human review, consent, and access control. The work was about what must never happen in a patient record, not a demo script.",
  role: "Lead QA Engineer",
  metric: {
    value: "88 / 23",
    note: "user stories / epics in the Phase 1 plan",
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
  positioning:
    "Healthcare ERP / Medical Information Platform. Sole QA on Phase 1.",
  summary:
    "MHM is a modular hospital platform around patient identity, clinical records, appointments, and bed operations. I was the only QA engineer on Phase 1. Quality sat with me: functional and end-to-end paths, integration across modules, API and data checks, security around identity boundaries, and regression on the workflows that move patient data.",
  role: "Sole QA / SQA Engineer",
  metric: {
    value: "2,000+",
    note: "defects identified and driven to resolution",
  },
  capabilities: [
    "Functional, E2E, regression, and integration testing",
    "API and data validation across module boundaries",
    "Security and data-segregation checks on the External ID model",
    "Cross-module workflow validation and defect lifecycle ownership",
    "Python + Selenium regression for login, patient registration, and EHR",
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
