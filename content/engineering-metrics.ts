import raw from "@/content/engineering-metrics.json";

export type LighthouseScores = {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
};

export type EngineeringMetrics = {
  updatedAt: string | null;
  playwrightPassed: number | null;
  axeViolations: number | null;
  lighthouse: LighthouseScores | null;
};

export type EngineeringCard = {
  label: string;
  value: string;
  note: string;
  live?: boolean;
};

export const engineeringMetrics = raw as EngineeringMetrics;

/** Stack facts — not measured scores. */
const stackCards: EngineeringCard[] = [
  {
    label: "FRAMEWORKS",
    value: "Next.js 16",
    note: "App Router | TypeScript | Tailwind",
  },
  {
    label: "DEPLOYMENT",
    value: "Vercel",
    note: "CI/CD via GitHub Actions",
  },
];

export function getEngineeringCards(
  metrics: EngineeringMetrics = engineeringMetrics,
): EngineeringCard[] {
  const cards: EngineeringCard[] = [];

  if (typeof metrics.playwrightPassed === "number") {
    cards.push({
      label: "PLAYWRIGHT TESTS",
      value: String(metrics.playwrightPassed),
      note: "passed checks from the latest CI JSON report",
      live: true,
    });
  }

  if (metrics.lighthouse) {
    const { performance, accessibility, seo } = metrics.lighthouse;
    cards.push({
      label: "LIGHTHOUSE SCORE",
      value: `${performance} · ${accessibility} · ${seo}`,
      note: "performance · accessibility · SEO (Lighthouse CI)",
    });
  }

  cards.push(...stackCards);

  if (typeof metrics.axeViolations === "number") {
    cards.push({
      label: "ACCESSIBILITY",
      value: String(metrics.axeViolations),
      note: "axe-core violations on the home page",
    });
  }

  return cards;
}
