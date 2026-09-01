import { test, expect } from "@playwright/test";

test.describe("static CV page", () => {
  test("renders the HTML CV without a PDF viewer", async ({ page }) => {
    await page.goto("/cv");

    await expect(
      page.getByRole("heading", { name: "Aktia Farjana Antora" }),
    ).toBeVisible();
    await expect(page.getByText("AI Quality Engineer").first()).toBeVisible();
    await expect(page.getByText("Hppy AI Products").first()).toBeVisible();
    await expect(
      page.getByText("Memorial Houston Medical", { exact: false }).first(),
    ).toBeVisible();
    await expect(page.getByText("Playwright", { exact: false }).first()).toBeVisible();
    await expect(page.getByText("DeepEval", { exact: false }).first()).toBeVisible();

    await expect(page.locator("iframe")).toHaveCount(0);
    await expect(page.locator("embed, object")).toHaveCount(0);
    await expect(page.getByText("INITIALIZING...")).toHaveCount(0);
    await expect(page.getByText("ACCESS CV")).toHaveCount(0);
    await expect(page.locator("[data-cv-stage] [data-matrix-rain]")).toBeVisible();
  });

  test("download and print use the provided PDF", async ({ page }) => {
    await page.goto("/cv");

    const download = page.getByRole("link", { name: /DOWNLOAD PDF/i });
    await expect(download).toBeVisible();
    await expect(download).toHaveAttribute("href", "/cv-antora.pdf");
    await expect(download).toHaveAttribute(
      "download",
      "Aktia Farjana Antora.pdf",
    );

    const pdf = await page.request.get("/cv-antora.pdf");
    expect(pdf.ok()).toBeTruthy();
    expect(pdf.headers()["content-type"] ?? "").toContain("pdf");

    await page.getByRole("button", { name: "PRINT" }).click();
    await expect(page.locator('iframe[data-cv-print-frame="true"]')).toHaveAttribute(
      "src",
      "/cv-antora.pdf",
    );
    await expect(page.getByRole("link", { name: "← BACK" })).toHaveAttribute(
      "href",
      "/",
    );
  });

  test("print stylesheet hides chrome and keeps the CV", async ({ page }) => {
    await page.goto("/cv");
    await page.emulateMedia({ media: "print" });

    await expect(page.getByRole("link", { name: "← BACK" })).toBeHidden();
    await expect(page.getByRole("link", { name: /DOWNLOAD PDF/i })).toBeHidden();
    await expect(page.getByRole("button", { name: "PRINT" })).toBeHidden();
    await expect(
      page.getByRole("heading", { name: "Aktia Farjana Antora" }),
    ).toBeVisible();
    await expect(page.getByText("Key Achievements")).toBeVisible();
  });
});
