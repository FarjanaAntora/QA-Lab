import raw from "@/content/engineering-metrics.json";

export type LighthouseScores = {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  fcpMs?: number | null;
};

export type EngineeringMetrics = {
  measuredAt: string | null;
  updatedAt?: string | null;
  playwright: {
    listed: number | null;
    ciRunnable: number | null;
    productionSkippedWithoutProdUrl: number;
    note: string;
  } | null;
  ci: {
    workflow: string;
    triggers: string[];
    steps: string[];
    repoUrl: string;
    actionsUrl: string;
    latestWorkflowRun: {
      id: number;
      url: string;
      status: string;
      conclusion: string | null;
      branch: string;
      createdAt: string;
    } | null;
  } | null;
  axe: {
    pages: string[];
    themes: string[];
    scanCount: number;
    totalViolations: number;
    maxViolations: number;
    statement: string;
  } | null;
  lighthouse: {
    pages: string[];
    formFactors: string[];
    summary: LighthouseScores;
  } | null;
  // legacy
  playwrightPassed?: number | null;
  axeViolations?: number | null;
};

export const engineeringMetrics = raw as EngineeringMetrics;

export function formatMeasuredDate(iso: string | null | undefined): string {
  if (!iso) return "not yet measured";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatFcp(ms: number | null | undefined): string | null {
  if (typeof ms !== "number" || !Number.isFinite(ms)) return null;
  if (ms < 1000) return `${Math.round(ms)} ms FCP`;
  return `${(ms / 1000).toFixed(1)} s FCP`;
}
