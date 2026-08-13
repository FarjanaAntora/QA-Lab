import { test, expect } from "@playwright/test";

const prodUrl = process.env.PROD_URL;

test.describe("production", () => {
  test.beforeEach(() => {
    test.skip(
      !prodUrl,
      "Set PROD_URL to run production smoke tests against the live site",
    );
  });

  test("live site loads successfully", async ({ page }) => {
    const response = await page.goto(prodUrl!);
    expect(response).not.toBeNull();
    expect(response!.status()).toBeLessThan(400);
    await expect(page).toHaveTitle(/THE QA LAB/i);
  });

  test("hero headline is visible", async ({ page }) => {
    await page.goto(prodUrl!);
    const hero = page.locator("#hero");
    await expect(hero).toBeVisible();
    await expect(hero).toContainText(/I BREAK/);
    await expect(hero).toContainText(/SOFTWARE/);
  });

  test("easter egg trigger exists", async ({ page }) => {
    await page.goto(prodUrl!);
    await expect(
      page.getByRole("button", { name: "Hidden interaction" }),
    ).toBeVisible();
    await expect(page.getByText("[ DO NOT CLICK ]")).toBeVisible();
  });
});
