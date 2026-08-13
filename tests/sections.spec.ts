import { test, expect } from "@playwright/test";

test.describe("sections", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("hero is visible and contains BREAK and SOFTWARE", async ({ page }) => {
    const hero = page.locator("#hero");
    await expect(hero).toBeVisible();
    await expect(hero).toContainText(/BREAK/);
    await expect(hero).toContainText(/SOFTWARE/);
  });

  test("me section is visible with key copy", async ({ page }) => {
    const section = page.locator("#me");
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
    await expect(section).toContainText("Quality is not a phase");
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
  });

  test("cv section is visible and contains Aktia", async ({ page }) => {
    const section = page.locator("#cv");
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
    await expect(section).toContainText("Aktia");
  });

  test("contact section is visible with closing copy", async ({ page }) => {
    const section = page.locator("#contact");
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
    await expect(section).toContainText("interesting to break");
  });
});
