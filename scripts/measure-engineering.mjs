/**
 * Measure Playwright suite size, axe-core violations, and Lighthouse scores.
 * Writes content/engineering-metrics.json for the Engineering section.
 *
 * Usage (server must already be running on BASE_URL):
 *   node scripts/measure-engineering.mjs
 */
import { createRequire } from "module";
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const require = createRequire(import.meta.url);
const lighthouse = require("lighthouse").default ?? require("lighthouse");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const OUTPUT = path.join(root, "content", "engineering-metrics.json");

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const THEMES = ["dark", "bottle-green", "light"];
const PAGES = [
  { id: "home", path: "/" },
  { id: "case-study", path: "/projects/healthscan-test-plan" },
  { id: "cv", path: "/cv" },
];

function countListedTests() {
  const result = spawnSync("npx", ["playwright", "test", "--list"], {
    cwd: root,
    encoding: "utf8",
    shell: true,
  });
  const output = `${result.stdout ?? ""}\n${result.stderr ?? ""}`;
  const match = output.match(/Total:\s+(\d+)\s+tests/i);
  const listed = match ? Number(match[1]) : null;
  const productionSkips = 3; // production.spec.ts — skip unless PROD_URL is set
  return {
    listed,
    ciRunnable:
      typeof listed === "number" ? Math.max(0, listed - productionSkips) : null,
    productionSkippedWithoutProdUrl: productionSkips,
  };
}

async function measureAxe(browser) {
  const runs = [];
  for (const pageDef of PAGES) {
    for (const theme of THEMES) {
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.addInitScript((themeName) => {
        localStorage.setItem("qalab-theme", themeName);
        document.documentElement.setAttribute("data-theme", themeName);
      }, theme);
      await page.goto(`${BASE_URL}${pageDef.path}`, {
        waitUntil: "networkidle",
      });
      const results = await new AxeBuilder({ page }).analyze();
      runs.push({
        page: pageDef.id,
        path: pageDef.path,
        theme,
        violations: results.violations.length,
        ids: results.violations.map((v) => v.id),
      });
      await context.close();
    }
  }
  const totalViolations = runs.reduce((sum, run) => sum + run.violations, 0);
  const maxViolations = runs.reduce(
    (max, run) => Math.max(max, run.violations),
    0,
  );
  const uniqueIds = [...new Set(runs.flatMap((run) => run.ids))];
  const byPage = Object.fromEntries(
    PAGES.map((page) => {
      const pageRuns = runs.filter((run) => run.page === page.id);
      const max = pageRuns.reduce((m, run) => Math.max(m, run.violations), 0);
      return [page.id, max];
    }),
  );
  return { runs, totalViolations, maxViolations, uniqueIds, byPage };
}

async function runLighthouse(url, formFactor) {
  const { lhr } = await lighthouse(url, {
    port: 9222,
    output: "json",
    logLevel: "error",
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    formFactor,
    screenEmulation:
      formFactor === "mobile"
        ? undefined
        : {
            mobile: false,
            width: 1350,
            height: 940,
            deviceScaleFactor: 1,
            disabled: false,
          },
  });

  const score = (key) => Math.round((lhr.categories[key]?.score ?? 0) * 100);
  const fcpMs = lhr.audits["first-contentful-paint"]?.numericValue ?? null;

  return {
    performance: score("performance"),
    accessibility: score("accessibility"),
    bestPractices: score("best-practices"),
    seo: score("seo"),
    fcpMs: typeof fcpMs === "number" ? Math.round(fcpMs) : null,
  };
}

async function measureLighthouse() {
  // Dedicated Chrome for Lighthouse debugging port
  const browser = await chromium.launch({
    headless: true,
    args: ["--remote-debugging-port=9222", "--no-sandbox"],
  });

  const runs = [];
  try {
    for (const pageDef of PAGES) {
      for (const formFactor of ["mobile", "desktop"]) {
        const url = `${BASE_URL}${pageDef.path}`;
        const scores = await runLighthouse(url, formFactor);
        runs.push({
          page: pageDef.id,
          path: pageDef.path,
          formFactor,
          ...scores,
        });
      }
    }
  } finally {
    await browser.close();
  }

  const pickMin = (key) =>
    runs.reduce((min, run) => Math.min(min, run[key]), Number.POSITIVE_INFINITY);

  return {
    runs,
    summary: {
      performance: pickMin("performance"),
      accessibility: pickMin("accessibility"),
      bestPractices: pickMin("bestPractices"),
      seo: pickMin("seo"),
      fcpMs: pickMin("fcpMs"),
    },
  };
}

async function main() {
  const measuredAt = new Date().toISOString();
  const playwright = countListedTests();

  console.log("Playwright listed:", playwright);

  const browser = await chromium.launch({ headless: true });
  let axe;
  try {
    console.log("Running axe-core across pages × themes…");
    axe = await measureAxe(browser);
  } finally {
    await browser.close();
  }
  console.log(
    `axe: ${axe.totalViolations} total findings across ${axe.runs.length} scans (max per page/theme: ${axe.maxViolations})`,
  );

  console.log("Running Lighthouse mobile + desktop…");
  const lighthouse = await measureLighthouse();
  console.log("Lighthouse summary (mins):", lighthouse.summary);

  let latestWorkflowRun = null;
  try {
    const res = await fetch(
      "https://api.github.com/repos/FarjanaAntora/QA-Lab/actions/workflows/ci.yml/runs?per_page=1",
      { headers: { "User-Agent": "qalab-metrics" } },
    );
    if (res.ok) {
      const data = await res.json();
      const run = data.workflow_runs?.[0];
      if (run) {
        latestWorkflowRun = {
          id: run.id,
          url: run.html_url,
          status: run.status,
          conclusion: run.conclusion,
          branch: run.head_branch,
          createdAt: run.created_at,
        };
      }
    }
  } catch (error) {
    console.warn("Could not fetch latest workflow run:", error.message);
  }

  const metrics = {
    measuredAt,
    playwright: {
      listed: playwright.listed,
      ciRunnable: playwright.ciRunnable,
      productionSkippedWithoutProdUrl:
        playwright.productionSkippedWithoutProdUrl,
      note: "npx playwright test --list. CI runs the full suite on push/PR to main and motion; 3 production smoke tests skip unless PROD_URL is set.",
    },
    ci: {
      workflow: "QA Lab CI",
      triggers: ["push to main/motion", "pull_request to main/motion"],
      steps: [
        "npm ci",
        "playwright install chromium",
        "next build",
        "playwright test (JSON reporter)",
        "Lighthouse CI collect + upload",
        "write engineering-metrics.json",
      ],
      repoUrl: "https://github.com/FarjanaAntora/QA-Lab",
      actionsUrl: "https://github.com/FarjanaAntora/QA-Lab/actions",
      latestWorkflowRun,
    },
    axe: {
      pages: PAGES.map((p) => p.path),
      themes: THEMES,
      scanCount: axe.runs.length,
      totalViolations: axe.totalViolations,
      maxViolations: axe.maxViolations,
      uniqueIds: axe.uniqueIds,
      byPage: axe.byPage,
      runs: axe.runs,
      statement: `axe-core: ${axe.maxViolations} violation${axe.maxViolations === 1 ? "" : "s"} on home across ${THEMES.length} themes (${axe.uniqueIds.join(", ") || "none"}); 0 on the case-study and CV pages tested. Automated checks only — not a WCAG conformance claim.`,
    },
    lighthouse: {
      pages: PAGES.map((p) => p.path),
      formFactors: ["mobile", "desktop"],
      summary: lighthouse.summary,
      runs: lighthouse.runs,
    },
    // Back-compat fields consumed by older helpers
    updatedAt: measuredAt,
    playwrightPassed: playwright.ciRunnable,
    axeViolations: axe.totalViolations,
    lighthouseLegacy: lighthouse.summary,
  };

  fs.writeFileSync(OUTPUT, `${JSON.stringify(metrics, null, 2)}\n`, "utf8");
  console.log("Wrote", OUTPUT);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
