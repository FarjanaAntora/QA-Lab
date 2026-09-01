import { test, expect } from "@playwright/test";

test.describe("motion variation", () => {
  test("reduced motion still shows section content instantly", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const projects = page.locator("#projects");
    await projects.scrollIntoViewIfNeeded();
    await expect(projects).toContainText("Hppy AI");
    await expect(projects).toContainText("Memorial Houston Medical");
    await expect(projects).toContainText("2,000+");

    const diagram = page.locator("[data-flow-diagram]");
    await expect(diagram).toBeVisible();
    await expect(diagram).toContainText("UIS");
    await expect(diagram).toContainText("External ID");
    await expect(diagram).toContainText("PIS");
    await expect(diagram).toContainText("Appointments");
  });

  test("matrix rain stays inside the interactive CV section", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByTestId("matrix-rain")).toHaveCount(0);
    await expect(page.locator("#hero")).toContainText("I BREAK");
    await expect(page.getByTestId("rope-cat")).toBeAttached();
    await expect(page.getByTestId("friends-walk")).toBeAttached();
    await expect(page.getByTestId("friends-walk")).toHaveCSS(
      "position",
      "fixed",
    );

    await page.goto("/cv");
    const stage = page.locator("[data-cv-stage]");
    const frame = stage.locator("[data-matrix-rain]");
    await expect(frame).toBeVisible();
    await expect(frame.getByTestId("matrix-rain")).toBeVisible();

    const contained = await frame.evaluate((el) => {
      const box = el.getBoundingClientRect();
      const host = el.closest("[data-cv-stage]");
      const hostBox = host?.getBoundingClientRect();
      if (!hostBox) return false;
      return (
        box.left >= hostBox.left - 1 &&
        box.right <= hostBox.right + 1 &&
        box.top >= hostBox.top - 1 &&
        box.bottom <= hostBox.bottom + 1
      );
    });
    expect(contained).toBe(true);

    const paper = page.getByTestId("cv-paper");
    const sheet = await paper.evaluate((el) => {
      const styles = getComputedStyle(el);
      const width = el.getBoundingClientRect().width;
      const bg = styles.backgroundColor;
      const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?/);
      const alpha = match?.[4] === undefined ? 1 : Number(match[4]);
      return {
        width,
        alpha,
        border: styles.borderTopWidth,
      };
    });
    expect(sheet.width).toBeLessThanOrEqual(810);
    expect(sheet.alpha).toBe(1);
    expect(Number.parseFloat(sheet.border)).toBeGreaterThan(0);
  });

  test("contained CV matrix stays still under reduced motion", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.getByTestId("matrix-rain")).toHaveCount(0);

    const cat = page.getByTestId("rope-cat");
    await expect(cat).toHaveAttribute("data-reduced", "true", { timeout: 8000 });

    await page.goto("/cv");
    await expect(page.getByTestId("matrix-rain")).toBeVisible();
  });

  test("MHM flow lines are present after the diagram enters view", async ({
    page,
  }) => {
    await page.goto("/");

    const diagram = page.locator("[data-flow-diagram]");
    await diagram.scrollIntoViewIfNeeded();
    await expect(diagram).toBeVisible();
    await expect(diagram.locator("svg")).toHaveCount(2);
    await expect(diagram).toContainText("EHR");
    await expect(diagram).toContainText("BMS");
  });
});
