export type ToolboxCategory = {
  category: string;
  items: string[];
};

export const toolbox: ToolboxCategory[] = [
  {
    category: "Automation",
    items: ["Playwright", "Selenium", "Cypress", "Pytest"],
  },
  {
    category: "API Testing",
    items: ["Postman", "Swagger", "REST API Automation"],
  },
  {
    category: "CI/CD & Engineering",
    items: ["GitHub Actions", "GitLab CI", "Jenkins", "Docker", "Git"],
  },
  {
    category: "Performance",
    items: ["JMeter", "k6"],
  },
  {
    category: "Security",
    items: ["OWASP ZAP", "Burp Suite"],
  },
  {
    category: "AI Testing",
    items: [
      "DeepEval",
      "LangSmith",
      "LLM-as-judge",
      "Hallucination Detection",
    ],
  },
  {
    category: "Testing Types",
    items: [
      "Functional",
      "Regression",
      "Integration",
      "UAT",
      "Exploratory",
      "A/B Testing",
      "Performance",
      "Security",
    ],
  },
  {
    category: "Languages",
    items: ["Python", "JavaScript", "TypeScript", "C#", "SQL"],
  },
];
