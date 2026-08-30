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

  await expect(
    page.getByRole("heading", { name: "Aktia Farjana Antora" }),
  ).toBeVisible({ timeout: 5000 });
  await expect(page.getByRole("link", { name: /DOWNLOAD PDF/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: "SUMMARY" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "EXPERIENCE" })).toBeVisible();
  await expect(
    page.getByText("Press ESC to return · Press CTRL+P to print"),
  ).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(page.getByText("INITIALIZING...")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "AKTIA FARJANA ANTORA" }),
  ).toBeVisible();
});
