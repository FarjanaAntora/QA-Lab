import { test, expect } from "@playwright/test";

const sectionLinks = [
  { label: "ME", section: "#me" },
  { label: "EXPERIENCE", section: "#experience" },
  { label: "PROJECTS", section: "#projects" },
  { label: "THE LAB", section: "#the-lab" },
  { label: "CONTACT", section: "#contact" },
] as const;

test.describe("navigation", () => {
  test("page loads successfully with THE QA LAB title", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/Aktia Farjana Antora/i);
  });

  test("nav contains primary section links", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" });

    for (const link of sectionLinks) {
      const item = nav.getByRole("link", { name: link.label });
      await expect(item).toBeVisible();
      await expect(item).toHaveAttribute("href", `/${link.section}`);
    }

    const cv = nav.getByRole("link", { name: "CV" });
    await expect(cv).toBeVisible();
    await expect(cv).toHaveAttribute("href", "/cv");
  });

  test("clicking each section link scrolls to the matching section", async ({
    page,
  }) => {
    await page.goto("/");

    for (const link of sectionLinks) {
      await page
        .getByRole("navigation", { name: "Primary" })
        .getByRole("link", { name: link.label })
        .click();

      const section = page.locator(link.section);
      await expect(section).toBeVisible();
      await expect(section).toBeInViewport();
    }
  });

  test("CV nav link opens the dedicated CV page with a download action", async ({
    page,
  }) => {
    await page.goto("/");
    await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "CV" })
      .click();

    await expect(page).toHaveURL(/\/cv\/?$/);
    await expect(
      page.getByRole("heading", { name: "Aktia Farjana Antora" }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /DOWNLOAD PDF/i })).toHaveAttribute(
      "href",
      "/cv-antora.pdf",
    );
  });

  test("nav background changes after scrolling past 100px", async ({
    page,
  }) => {
    await page.goto("/");
    const header = page.locator("header").first();

    const before = await header.evaluate((el) => ({
      className: el.className,
      background: getComputedStyle(el).backgroundColor,
      border: getComputedStyle(el).borderBottomColor,
    }));

    await page.evaluate(() => window.scrollTo(0, 100));
    await page.waitForTimeout(300);

    const after = await header.evaluate((el) => ({
      className: el.className,
      background: getComputedStyle(el).backgroundColor,
      border: getComputedStyle(el).borderBottomColor,
    }));

    expect(after.className).toMatch(/navScrolled/);
    expect(after.background).not.toBe(before.background);
    expect(after.border).not.toBe(before.border);
  });
});
