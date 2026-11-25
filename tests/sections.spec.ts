import { test, expect } from "@playwright/test";

test.describe("sections", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("hero is visible and shows the QA title", async ({ page }) => {
    const hero = page.locator("#hero");
    await expect(hero).toBeVisible();
    await expect(hero).toContainText("I'm not here to break things.");
    await expect(hero).toContainText(
      "I'm here to make sure our users don't.",
    );
  });

  test("me section is visible with key copy", async ({ page }) => {
    const section = page.locator("#me");
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
    await expect(section).toContainText("Quality is not a phase");
    await expect(section).toContainText("junior QA engineers");
    await expect(section).toContainText("QA Manager at Quantanite");
  });

  test("experience section is visible and contains GHIT", async ({ page }) => {
    const section = page.locator("#experience");
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
    await expect(section).toContainText("GHIT");
  });

  test("toolbox section is visible and contains Playwright", async ({
    page,
  }) => {
    const section = page.locator("#toolbox");
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
    await expect(section).toContainText("Playwright");
  });

  test("projects section is visible", async ({ page }) => {
    const section = page.locator("#projects");
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
    await expect(section).toContainText("Hppy AI");
    await expect(section).toContainText("Enterprise test plan");
    await expect(section).toContainText("140+");
    await expect(section).toContainText("Formulas validated");
    await expect(section).toContainText("40+");
    await expect(section).toContainText("faithfulness score");
    await expect(section).toContainText("Memorial Houston Medical");
    await expect(section).toContainText("EHR quality ownership");
    await expect(section).toContainText("5");
    await expect(section).toContainText("150-700 defects found per module");
    await expect(section).toContainText("Enterprise ERP QA");
    await expect(section).toContainText("15+");
    await expect(section).toContainText("A/B Analytics QA");
    await expect(section).toContainText("QA and analytics checking");
    await expect(section).toContainText("160+");
    await expect(section).toContainText("120-hour");
    await expect(section).toContainText("Different systems");
    await expect(section).toContainText("IN PROGRESS");
    await expect(section.getByRole("img", { name: "Dior" })).toBeVisible();
    await expect(
      section.getByRole("img", { name: "Louis Vuitton" }),
    ).toBeVisible();
    await expect(section.getByRole("img", { name: "Heavenly" })).toBeVisible();
    await expect(section.getByRole("img", { name: "Sole" })).toBeVisible();
    await expect(section).toContainText("Manuscript Digitisation QA (in progress)");
    await expect(section).toContainText("The Journey");
    await expect(section).toContainText("Premium booking path");
    await expect(section).toContainText(
      "Bangladesh Government Systems - QA Portfolio",
    );
    await expect(section).toContainText("DELIVERED");
    await expect(section).toContainText("Playwright + AI Evaluation Framework");
    await expect(section.getByText("LIVE", { exact: true })).toHaveCount(0);
    await expect(section).toContainText("Also in the work");
    await expect(section).toContainText("Data · Web Platforms · QA");
    await expect(section).toContainText("WordPress · Web QA · Client Projects");
    await expect(section).toContainText("QA Leadership · Process · Training");
  });

  test("how-i-think section is visible", async ({ page }) => {
    const section = page.locator("#how-i-think");
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
  });

  test("the-lab section is visible", async ({ page }) => {
    const section = page.locator("#the-lab");
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
  });

  test("engineering section is visible", async ({ page }) => {
    const section = page.locator("#engineering");
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
    await expect(section).toContainText("Playwright tests");
    await expect(section).toContainText("axe-core");
    await expect(section).not.toContainText("WCAG AA");
    await expect(
      section.getByRole("link", { name: /Public repo/i }),
    ).toHaveAttribute("href", "https://github.com/FarjanaAntora/QA-Lab");
    await expect(
      section.getByRole("link", { name: /Latest CI run/i }),
    ).toBeVisible();
  });

  test("cv section is visible with download actions", async ({ page }) => {
    const section = page.locator("#cv");
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
    await expect(section).toContainText("VIEW CV");
    await expect(section).toContainText("DOWNLOAD PDF");
  });

  test("contact section is visible with closing copy", async ({ page }) => {
    const section = page.locator("#contact");
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
    await expect(section).toContainText("interesting to break");
  });
});
