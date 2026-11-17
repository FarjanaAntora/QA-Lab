export type ToolboxGroup = {
  category: string;
  core: string[];
  supporting: string[];
  quiet?: boolean;
};

export const toolbox: ToolboxGroup[] = [
  {
    category: "Manual Testing",
    core: ["Functional", "Regression", "Exploratory", "UAT"],
    supporting: ["Multi-tenant isolation", "RBAC"],
  },
  {
    category: "Mobile Testing",
    core: ["iOS", "Android"],
    supporting: ["Real devices", "BrowserStack", "Browser DevTools"],
  },
  {
    category: "Automation",
    core: ["Playwright"],
    supporting: ["Selenium", "Pytest"],
  },
  {
    category: "API Testing",
    core: ["Postman"],
    supporting: ["Swagger"],
  },
  {
    category: "CI/CD & Engineering",
    core: ["GitHub Actions"],
    supporting: ["GitLab CI"],
  },
  {
    category: "AI-Assisted QA",
    core: ["DeepEval", "LangSmith"],
    supporting: [],
  },
  {
    category: "Languages",
    core: ["Python"],
    supporting: ["JavaScript", "SQL"],
  },
  {
    category: "Performance",
    core: [],
    supporting: ["JMeter", "k6"],
  },
  {
    category: "Security",
    core: [],
    supporting: ["OWASP ZAP", "Burp Suite"],
  },
];
