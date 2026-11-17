import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const PLAYWRIGHT_JSON = path.join(root, "test-results", "playwright-results.json");
const AXE_SUMMARY = path.join(root, "test-results", "axe-summary.json");
const LIGHTHOUSE_DIR = path.join(root, ".lighthouseci");
const OUTPUT = path.join(root, "content", "engineering-metrics.json");

function readJson(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function countPlaywrightPassed(report) {
  if (!report?.stats) return null;
  // Playwright JSON: `expected` = passed (non-flaky) results.
  if (typeof report.stats.expected === "number") {
    const total =
      (report.stats.expected ?? 0) +
      (report.stats.unexpected ?? 0) +
      (report.stats.flaky ?? 0) +
      (report.stats.skipped ?? 0);
    // No executable report → do not invent a zero.
    if (total === 0 && !(report.suites?.length > 0)) return null;
    return report.stats.expected;
  }

  let passed = 0;
  let found = false;

  function walk(suite) {
    for (const spec of suite.specs ?? []) {
      found = true;
      const ok = (spec.tests ?? []).some((test) =>
        (test.results ?? []).some(
          (result) => result.status === "passed" || result.status === "expected",
        ),
      );
      if (ok || spec.ok) passed += 1;
    }
    for (const child of suite.suites ?? []) walk(child);
  }

  for (const suite of report.suites ?? []) walk(suite);
  return found ? passed : null;
}

function readAxeViolations(summary) {
  if (!summary || typeof summary.violations !== "number") return null;
  return summary.violations;
}

function scoreFromLhr(lhr, category) {
  const value = lhr?.categories?.[category]?.score;
  if (typeof value !== "number") return null;
  return Math.round(value * 100);
}

function readLighthouseScores() {
  if (!fs.existsSync(LIGHTHOUSE_DIR)) return null;

  const files = fs
    .readdirSync(LIGHTHOUSE_DIR)
    .filter((name) => name.startsWith("lhr-") && name.endsWith(".json"))
    .sort();

  if (files.length === 0) return null;

  const lhr = readJson(path.join(LIGHTHOUSE_DIR, files[files.length - 1]));
  const performance = scoreFromLhr(lhr, "performance");
  const accessibility = scoreFromLhr(lhr, "accessibility");
  const bestPractices = scoreFromLhr(lhr, "best-practices");
  const seo = scoreFromLhr(lhr, "seo");

  if (
    performance == null ||
    accessibility == null ||
    bestPractices == null ||
    seo == null
  ) {
    return null;
  }

  return { performance, accessibility, bestPractices, seo };
}

function main() {
  const playwrightPassed = countPlaywrightPassed(readJson(PLAYWRIGHT_JSON));
  const axeViolations = readAxeViolations(readJson(AXE_SUMMARY));
  const lighthouse = readLighthouseScores();

  const metrics = {
    updatedAt: new Date().toISOString(),
    playwrightPassed,
    axeViolations,
    lighthouse,
  };

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, `${JSON.stringify(metrics, null, 2)}\n`, "utf8");

  console.log("Wrote", OUTPUT);
  console.log(JSON.stringify(metrics, null, 2));
}

main();
