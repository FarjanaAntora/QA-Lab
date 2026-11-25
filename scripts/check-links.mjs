import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const base = process.env.LINK_CHECK_BASE ?? "http://127.0.0.1:3000";
const siteOrigin = "https://qa-lab-eight.vercel.app";

const staticAssets = [
  "/cv-antora.pdf",
  "/og-image.jpg",
  "/icon.svg",
  ...fs
    .readdirSync(path.join(root, "public", "brands"))
    .filter((name) => name.endsWith(".svg"))
    .map((name) => `/brands/${name}`),
];

const seedPaths = [
  "/",
  "/cv",
  "/projects/healthscan-test-plan",
  "/projects/mhm-ehr-qa",
  "/projects/enterprise-erp-qa",
  "/projects/bd-government-qa",
  "/projects/playwright-ai-qa-framework",
  "/opengraph-image",
  "/twitter-image",
  ...[
    "healthscan-test-plan",
    "mhm-ehr-qa",
    "enterprise-erp-qa",
    "bd-government-qa",
    "playwright-ai-qa-framework",
  ].flatMap((slug) => [
    `/projects/${slug}/opengraph-image`,
    `/projects/${slug}/twitter-image`,
  ]),
  ...staticAssets,
];

const hrefRe =
  /(?:href|src)=["']([^"'#]+)["']/gi;

function normalize(url, from) {
  if (url.startsWith("mailto:") || url.startsWith("tel:")) return null;
  if (url.startsWith("data:")) return null;
  try {
    const absolute = new URL(url, from);
    // Canonical/og URLs use the public origin; check them against the local server.
    if (absolute.origin === siteOrigin) {
      return new URL(`${absolute.pathname}${absolute.search}`, base).href;
    }
    return absolute.href;
  } catch {
    return null;
  }
}

async function headOrGet(url) {
  try {
    let res = await fetch(url, { method: "HEAD", redirect: "follow" });
    if (res.status === 405 || res.status === 501) {
      res = await fetch(url, { method: "GET", redirect: "follow" });
    }
    return { ok: res.ok, status: res.status };
  } catch (error) {
    return { ok: false, status: 0, error: String(error) };
  }
}

const visited = new Set();
const failures = [];
const checked = [];

async function check(url) {
  if (visited.has(url)) return;
  visited.add(url);
  const result = await headOrGet(url);
  checked.push({ url, ...result });
  if (!result.ok) {
    failures.push({ url, ...result });
  }
}

const htmlPages = [];

for (const seed of seedPaths) {
  const url = new URL(seed, base).href;
  await check(url);
  if (seed.startsWith("/projects") || seed === "/" || seed === "/cv") {
    htmlPages.push(url);
  }
}

for (const pageUrl of htmlPages) {
  const page = await fetch(pageUrl);
  if (!page.ok) continue;
  const html = await page.text();
  let match;
  while ((match = hrefRe.exec(html))) {
    const absolute = normalize(match[1], pageUrl);
    if (!absolute) continue;
    await check(absolute);
  }
}

const report = {
  base,
  checked: checked.length,
  failures: failures.length,
  failed: failures,
};

console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exit(1);
