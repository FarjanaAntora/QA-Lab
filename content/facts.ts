export type CaseStudyFacts = {
  slug: string;
  title: string;
  /** One-line positioning for OG images and meta description. */
  positioning: string;
  ogTitle: string;
  ogDescription: string;
};

export const caseStudyFacts: CaseStudyFacts[] = [
  {
    slug: "healthscan-test-plan",
    title: "Hppy AI - Enterprise Test Plan",
    positioning:
      "Enterprise test plan and live product QA. Some of it shipped. Some of it is still in flight.",
    ogTitle: "Hppy AI - Enterprise Test Plan | Aktia Farjana Antora",
    ogDescription:
      "Enterprise test plan and live product QA. Some of it shipped. Some of it is still in flight.",
  },
  {
    slug: "mhm-ehr-qa",
    title: "Memorial Houston Medical - EHR Quality Ownership",
    positioning: "EHR quality ownership. Five modules. One identity layer. Sole QA.",
    ogTitle:
      "Memorial Houston Medical - EHR Quality Ownership | Aktia Farjana Antora",
    ogDescription:
      "EHR quality ownership. Five modules. One identity layer. Sole QA.",
  },
  {
    slug: "enterprise-erp-qa",
    title: "Enterprise ERP QA",
    positioning:
      "Sole QA ownership across a multi-client ERP engagement. Fifteen-plus clients. One continuous platform.",
    ogTitle: "Enterprise ERP QA | Aktia Farjana Antora",
    ogDescription:
      "Sole QA ownership across a multi-client ERP engagement. Fifteen-plus clients. One continuous platform.",
  },
  {
    slug: "bd-government-qa",
    title: "Bangladesh Government Systems - QA Portfolio",
    positioning:
      "Public-sector delivery where a wrong figure is a public failure.",
    ogTitle:
      "Bangladesh Government Systems - QA Portfolio | Aktia Farjana Antora",
    ogDescription:
      "Public-sector delivery where a wrong figure is a public failure.",
  },
  {
    slug: "playwright-ai-qa-framework",
    title: "Playwright + AI Evaluation Framework",
    positioning: "Playwright E2E with an AI evaluation layer, gated in CI.",
    ogTitle: "Playwright + AI Evaluation Framework | Aktia Farjana Antora",
    ogDescription: "Playwright E2E with an AI evaluation layer, gated in CI.",
  },
];

export function getCaseStudyFacts(slug: string): CaseStudyFacts | undefined {
  return caseStudyFacts.find((item) => item.slug === slug);
}
