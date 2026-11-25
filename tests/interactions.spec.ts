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

  test("hovering the hidden trigger reveals the glitch line", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Hidden interaction" }).hover();
    await expect(page.getByTestId("glitch-line")).toBeVisible();
    await expect(page.getByTestId("glitch-line")).toContainText(
      "Found the glitch in the matrix.",
    );
    await expect(page.getByText("[ DO NOT CLICK ]")).toBeVisible();
  });

  test("experience timeline expands responsibilities", async ({ page }) => {
    const experience = page.locator("#experience");
    await experience.scrollIntoViewIfNeeded();

    const firstRole = experience
      .getByRole("button")
      .filter({ hasText: "Lead SQA Engineer" });

    await expect(
      experience.getByText(
        "Sole QA for Memorial Houston Medical across five modules",
        { exact: false },
      ),
    ).toHaveCount(0);

    await firstRole.click();

    await expect(
      experience.getByText(
        "Sole QA for Memorial Houston Medical across five modules",
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

  test("how i think can switch to AI document extraction", async ({ page }) => {
    const section = page.locator("#how-i-think");
    await section.scrollIntoViewIfNeeded();

    await section
      .getByRole("radio", { name: "AI document extraction" })
      .click();

    await expect(
      section.getByText(
        "What does a correct extraction look like, end to end?",
      ),
    ).toBeVisible();
    await expect(section.getByText("no source span")).toBeVisible();

    await section.getByRole("tab", { name: "NEGATIVE" }).click();
    await expect(
      section.getByText("Corrupted files", { exact: false }),
    ).toBeVisible();

    await section.getByRole("tab", { name: "SECURITY" }).click();
    await expect(
      section.getByRole("heading", {
        name: /Can one user's document ever surface for another/,
      }),
    ).toBeVisible();

    await section.getByRole("tab", { name: "AI BEHAVIOUR" }).click();
    await expect(
      section.getByText("plausible but unsupported", { exact: false }),
    ).toBeVisible();

    await section.getByRole("tab", { name: "OBSERVABILITY" }).click();
    await expect(
      section.getByText("before a user complained", { exact: false }),
    ).toBeVisible();

    await section.getByRole("radio", { name: "Login form" }).click();
    await section.getByRole("tab", { name: "FUNCTIONAL" }).click();
    await expect(
      section.getByText("Does it do what it's supposed to do?"),
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
      lab.getByText("Role- and label-based locators", { exact: false }),
    ).toBeVisible();
    await expect(lab.getByText("getByLabel", { exact: false }).first()).toBeVisible();
    await expect(
      lab.getByText("E2E_USER_EMAIL", { exact: false }).first(),
    ).toBeVisible();
  });

  test("selected work expands a project story", async ({ page }) => {
    const projects = page.locator("#projects");
    await projects.scrollIntoViewIfNeeded();

    const selected = projects.locator("#selected-work");
    await selected.scrollIntoViewIfNeeded();

    const interesting =
      "The source was a physical object. Quality had to survive every step after the photograph.";

    await expect(selected.getByText(interesting)).toHaveCount(0);

    await selected
      .getByRole("button", { name: /Manuscript Digitisation QA/i })
      .click();

    await expect(selected.getByText(interesting)).toBeVisible();
    await expect(selected.getByText("Challenge")).toBeVisible();
    await expect(selected.getByText("What I tested")).toBeVisible();
  });

  test("project cards link to case study pages", async ({ page }) => {
    const projects = page.locator("#projects");
    await projects.scrollIntoViewIfNeeded();

    const cards = projects.getByRole("link");
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i += 1) {
      await expect(cards.nth(i)).toHaveAttribute("href", /\/projects\//);
    }

    await expect(
      projects.locator('a[href="/projects/enterprise-erp-qa"]'),
    ).toBeVisible();
  });

  test("case study prev/next chain includes ERP and wraps", async ({
    page,
  }) => {
    await page.goto("/projects/enterprise-erp-qa");
    await expect(page.getByRole("heading", { name: "Enterprise ERP QA" })).toBeVisible();
    await expect(page.getByText("STATUS", { exact: true })).toHaveCount(0);
    await expect(page.getByText("LIVE", { exact: true })).toHaveCount(0);

    await page
      .getByRole("link", {
        name: /Bangladesh Government Systems - QA Portfolio/i,
      })
      .click();
    await expect(page.getByText("DELIVERED", { exact: true })).toBeVisible();

    await page
      .getByRole("link", { name: /Playwright \+ AI Evaluation Framework/i })
      .last()
      .click();
    await expect(page.getByText("IN PROGRESS", { exact: true })).toBeVisible();
    await expect(page.getByText("LIVE", { exact: true })).toHaveCount(0);

    await page
      .getByRole("link", { name: /Hppy AI - Enterprise Test Plan/i })
      .last()
      .click();
    await expect(
      page.getByRole("heading", { name: /Hppy AI/ }),
    ).toBeVisible();
  });

  test("cv section links to interactive cv and pdf", async ({ page }) => {
    const cv = page.locator("#cv");
    await cv.scrollIntoViewIfNeeded();

    const interactive = cv.getByRole("link", { name: "VIEW CV" });
    await expect(interactive).toBeVisible();
    await expect(interactive).toHaveAttribute("href", "/cv");

    const download = cv.getByRole("link", { name: "DOWNLOAD PDF" });
    await expect(download).toBeVisible();
    await expect(download).toHaveAttribute("href", "/cv-antora.pdf");
    await expect(download).toHaveAttribute(
      "download",
      "Aktia Farjana Antora.pdf",
    );
  });
});
