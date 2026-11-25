export type ToolboxData = {
  core: string[];
  supporting: string[];
  testingTypes: string[];
};

/**
 * Weight only — every tool stays. Core is what the case studies lean on;
 * Also used is familiarity. Testing types stay a quiet line, not a skills wall.
 */
export const toolbox: ToolboxData = {
  core: [
    "Playwright",
    "Selenium",
    "Python",
    "Postman",
    "Swagger",
    "GitHub Actions",
    "SQL",
    "DeepEval",
    "LangSmith",
    "LLM-as-judge",
    "Hallucination detection",
  ],
  supporting: [
    "Cypress",
    "Pytest",
    "JavaScript",
    "TypeScript",
    "C#",
    "GitLab CI",
    "Jenkins",
    "Docker",
    "Git",
    "JMeter",
    "k6",
    "OWASP ZAP",
    "Burp Suite",
    "BrowserStack",
  ],
  testingTypes: [
    "Functional",
    "Regression",
    "Exploratory",
    "UAT",
    "Integration",
    "Mobile (iOS / Android)",
    "Multi-tenant isolation",
    "RBAC",
  ],
};
