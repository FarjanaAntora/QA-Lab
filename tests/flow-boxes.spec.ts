import { test, expect, type Locator } from "@playwright/test";

const VIEWPORTS = [320, 360, 390, 768, 1024, 1440] as const;

/**
 * True when any continuous word in the element spans more than one visual line.
 */
async function labelWrapsInsideAWord(locator: Locator): Promise<boolean> {
  return locator.evaluate((el) => {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let node: Node | null;
    while ((node = walker.nextNode())) {
      const text = node.textContent ?? "";
      let i = 0;
      while (i < text.length) {
        while (i < text.length && /\s/.test(text[i]!)) i += 1;
        const start = i;
        while (i < text.length && !/\s/.test(text[i]!)) i += 1;
        if (start === i) continue;

        const range = document.createRange();
        range.setStart(node, start);
        range.setEnd(node, i);
        const tops = new Set(
          Array.from(range.getClientRects()).map((rect) => Math.round(rect.top)),
        );
        if (tops.size > 1) return true;
      }
    }
    return false;
  });
}

test.describe("flow boxes", () => {
  for (const width of VIEWPORTS) {
    test(`no mid-word wrap in flow-box labels at ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");

      const projects = page.locator("#projects");
      await projects.scrollIntoViewIfNeeded();

      const labels = page.locator("[data-flow-label]");
      await expect(labels.first()).toBeVisible();
      const count = await labels.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i += 1) {
        const label = labels.nth(i);
        await label.scrollIntoViewIfNeeded();
        const text = (await label.textContent())?.trim() ?? "";
        expect(text.length, `empty flow label at index ${i}`).toBeGreaterThan(0);
        const wraps = await labelWrapsInsideAWord(label);
        expect(
          wraps,
          `Flow label "${text}" wraps mid-word at ${width}px`,
        ).toBe(false);
      }
    });
  }
});
