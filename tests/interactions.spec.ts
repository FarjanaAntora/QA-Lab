import { test, expect } from "@playwright/test";

test.describe("interactions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("easter egg reveals terminal card", async ({ page }) => {
    await page.getByRole("button", { name: "Hidden interaction" }).click();
    const card = page.getByRole("status");
    await expect(card).toBeVisible();
    await expect(card).toContainText("running assertion...");
    await expect(card).toContainText("good. you passed the first test.");
  });

  test("experience timeline expands responsibilities", async ({ page }) => {
    const experience = page.locator("#experience");
    await experience.scrollIntoViewIfNeeded();

    const firstRole = experience
      .getByRole("button")
      .filter({ hasText: "Lead SQA Engineer" });

    await expect(
      experience.getByText(
        "Architected and maintained Playwright automation suites",
        { exact: false },
      ),
    ).toHaveCount(0);

    await firstRole.click();

    await expect(
      experience.getByText(
        "Architected and maintained Playwright automation suites",
        { exact: false },
      ),
    ).toBeVisible();
  });

  test("how i think BOUNDARY mode updates the panel", async ({ page }) => {
    const section = page.locator("#how-i-think");
    await section.scrollIntoViewIfNeeded();

    await expect(
      section.getByText("Does it do what it's supposed to do?"),
    ).toBeVisible();

    await section.getByRole("tab", { name: "BOUNDARY" }).click();

    await expect(
      section.getByText("What happens at the edges?"),
    ).toBeVisible();
    await expect(
      section.getByText("Unicode characters in the email field"),
    ).toBeVisible();
  });

  test("lab experiment 01 detects XSS input", async ({ page }) => {
    const lab = page.locator("#the-lab");
    await lab.scrollIntoViewIfNeeded();

    await lab.getByLabel("Experiment input").fill("<script>alert('xss')</script>");
    await lab.getByRole("button", { name: "SUBMIT" }).click();

    await expect(lab.getByText("XSS attempt detected")).toBeVisible();
  });

  test("lab experiment 03 reveals the checkout bug", async ({ page }) => {
    const lab = page.locator("#the-lab");
    await lab.scrollIntoViewIfNeeded();

    const totalRow = lab.getByTestId("checkout-total");
    const beforeColor = await totalRow.evaluate(
      (el) => getComputedStyle(el).color,
    );

    await lab.getByRole("button", { name: "REVEAL THE BUG" }).click();

    await expect
      .poll(async () => totalRow.evaluate((el) => getComputedStyle(el).color))
      .not.toBe(beforeColor);

    await expect(lab.getByText("A calculation error of £1.99")).toBeVisible();
  });

  test("lab experiment 04 shows plain-English explanation", async ({
    page,
  }) => {
    const lab = page.locator("#the-lab");
    await lab.scrollIntoViewIfNeeded();

    await lab.getByRole("button", { name: "SHOW EXPLANATION" }).click();
    await expect(lab.getByText("Open the login page")).toBeVisible();
    await expect(
      lab.getByText("Six lines. Six assertions.", { exact: false }),
    ).toBeVisible();
  });

  test("cv download button points to /cv-antora.pdf", async ({ page }) => {
    const cv = page.locator("#cv");
    await cv.scrollIntoViewIfNeeded();

    const download = cv.getByRole("link", { name: "DOWNLOAD CV (PDF)" });
    await expect(download).toBeVisible();
    await expect(download).toHaveAttribute("href", "/cv-antora.pdf");
  });
});
