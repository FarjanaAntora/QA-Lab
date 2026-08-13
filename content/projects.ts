export type Project = {
  title: string;
  description: string;
  role: string;
  technologies: string[];
  slug: string;
  status: "live" | "coming-soon";
};

export const projects: Project[] = [
  {
    title: "Playwright AI QA Framework",
    description:
      "A production-grade open-source automation framework combining Playwright E2E testing with AI output validation, hallucination detection, and CI/CD integration.",
    role: "Framework Architect & Author",
    technologies: [
      "Playwright",
      "Python",
      "DeepEval",
      "LangSmith",
      "GitHub Actions",
      "Docker",
    ],
    slug: "playwright-ai-qa-framework",
    status: "live" as const,
  },
  {
    title: "HealthScan — Phase 1 Test Plan",
    description:
      "Comprehensive test strategy for a healthcare AI document intelligence platform — 88 user stories, architecture-risk traceability, and full compliance test coverage.",
    role: "Lead QA Engineer",
    technologies: [
      "Test Strategy",
      "Neo4j",
      "API Testing",
      "AI Validation",
      "Compliance",
    ],
    slug: "healthscan-test-plan",
    status: "live" as const,
  },
  {
    title: "Memorial Houston Medical — EHR QA",
    description:
      "Sole QA engineer for a US hospital system covering EHR, Patient Information System, and Appointment Scheduler. Built the first Playwright automation baseline.",
    role: "Sole QA Engineer",
    technologies: ["Playwright", "Postman", "SQL", "Healthcare", "EHR"],
    slug: "mhm-ehr-qa",
    status: "coming-soon" as const,
  },
];
