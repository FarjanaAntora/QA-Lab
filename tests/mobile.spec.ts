import { test, expect } from "@playwright/test";

test.describe("mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("page loads and hero text is visible", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
    await expect(page.locator("#hero")).toBeVisible();
    await expect(page.locator("#hero")).toContainText("I BREAK");
    await expect(page.locator("#hero")).toContainText("SOFTWARE");
  });

  test("hamburger opens the mobile menu", async ({ page }) => {
    await page.goto("/");

    const openMenu = page.getByRole("button", { name: "Open menu" });
    await expect(openMenu).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "Primary" }),
    ).toBeHidden();

    await openMenu.click();

    const mobileNav = page.getByRole("navigation", { name: "Mobile" });
    await expect(mobileNav).toBeVisible();
    await expect(mobileNav.getByRole("link", { name: "ME" })).toBeVisible();
    await expect(
      mobileNav.getByRole("link", { name: "CONTACT" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Close menu" }),
    ).toBeVisible();
  });

  test("section headings remain readable on mobile", async ({ page }) => {
    await page.goto("/");

    const headings = page.locator("h2.text-h2, h1.text-display, h1.text-h1");
    const count = await headings.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i += 1) {
      const heading = headings.nth(i);
      if (!(await heading.isVisible())) continue;

      const fontSize = await heading.evaluate((el) => {
        return parseFloat(getComputedStyle(el).fontSize);
      });

      expect(fontSize).toBeGreaterThanOrEqual(18);
    }
  });
});
