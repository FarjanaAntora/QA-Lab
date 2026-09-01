import { test, expect } from "@playwright/test";

test("matrix cv entry and reveal states", async ({ page }) => {
  await page.goto("/cv");

  await expect(page.getByText("INITIALIZING...")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "AKTIA FARJANA ANTORA" }),
  ).toBeVisible();
  await expect(
    page.getByText("SENIOR QA AUTOMATION ENGINEER"),
  ).toBeVisible();

  const access = page.getByRole("button", { name: /ACCESS CV/ });
  await expect(access).toBeVisible({ timeout: 5000 });
  await access.click();

  const pdf = page.getByTitle("Aktia Farjana Antora CV");
  await expect(pdf).toBeVisible({ timeout: 5000 });
  await expect(pdf).toHaveAttribute("src", "/cv-antora.pdf");
  await expect(page.getByRole("link", { name: /DOWNLOAD PDF/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /DOWNLOAD PDF/i })).toHaveAttribute(
    "download",
    "Aktia Farjana Antora.pdf",
  );
  await expect(page.getByRole("link", { name: "PRINT" })).toHaveAttribute(
    "href",
    "/cv-antora.pdf",
  );
  await expect(
    page.getByText("Press ESC to return · Press CTRL+P to print"),
  ).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(page.getByText("INITIALIZING...")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "AKTIA FARJANA ANTORA" }),
  ).toBeVisible();
});
