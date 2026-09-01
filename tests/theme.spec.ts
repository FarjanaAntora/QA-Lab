import { test, expect } from "@playwright/test";

const REQUIRED_TOKENS = [
  "--color-bg-primary",
  "--color-bg-secondary",
  "--color-surface",
  "--color-border",
  "--color-text-primary",
  "--color-text-secondary",
  "--color-accent",
  "--color-accent-hover",
  "--color-accent-text",
] as const;

async function tokenMap(page: import("@playwright/test").Page) {
  return page.evaluate((names) => {
    const styles = getComputedStyle(document.documentElement);
    return Object.fromEntries(
      names.map((name) => [name, styles.getPropertyValue(name).trim()]),
    );
  }, REQUIRED_TOKENS);
}

test.describe("theme system", () => {
  test("defaults to dark when system preference is dark", async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.removeItem("qalab-theme");
    });
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });

  test("defaults to light when system preference is light and nothing is stored", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.removeItem("qalab-theme");
    });
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  });

  test("switcher persists Bottle Green across reload", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("radio", { name: "Bottle Green" }).click();
    await expect(page.locator("html")).toHaveAttribute(
      "data-theme",
      "bottle-green",
    );

    await page.reload();
    await expect(page.locator("html")).toHaveAttribute(
      "data-theme",
      "bottle-green",
    );
  });

  test("every required token is defined in all three themes", async ({
    page,
  }) => {
    await page.goto("/");

    for (const label of ["Dark", "Bottle Green", "Light"] as const) {
      await page.getByRole("radio", { name: label }).click();
      const tokens = await tokenMap(page);
      for (const name of REQUIRED_TOKENS) {
        expect(tokens[name], `${name} missing in ${label}`).toBeTruthy();
      }
    }
  });

  test("hero headline still meets 4.5:1 in every theme", async ({
    page,
  }) => {
    await page.goto("/");

    const themes = [
      ["Dark", "dark"],
      ["Bottle Green", "bottle-green"],
      ["Light", "light"],
    ] as const;

    for (const [label, theme] of themes) {
      await page.getByRole("radio", { name: label }).click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      await page.waitForTimeout(220);
      const ratio = await page.locator("#hero h1").evaluate((heading) => {
        const parse = (value: string) => {
          const match = value.match(
            /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?/,
          );
          if (!match) return null;
          const alpha = match[4] === undefined ? 1 : Number(match[4]);
          if (alpha === 0) return null;
          return [Number(match[1]), Number(match[2]), Number(match[3])];
        };
        const lum = (rgb: number[]) => {
          const [r, g, b] = rgb.map((channel) => {
            const c = channel / 255;
            return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
          });
          return 0.2126 * r + 0.7152 * g + 0.0722 * b;
        };
        const color = parse(getComputedStyle(heading).color);
        const background =
          parse(getComputedStyle(document.body).backgroundColor) ??
          parse(getComputedStyle(document.documentElement).backgroundColor);
        if (!color || !background) return 0;
        const [a, b] = [lum(color), lum(background)];
        const [hi, lo] = a > b ? [a, b] : [b, a];
        return (hi + 0.05) / (lo + 0.05);
      });

      expect(ratio, `${label} hero headline contrast`).toBeGreaterThanOrEqual(
        4.5,
      );
    }
  });

  test("body copy meets 4.5:1 in every theme", async ({ page }) => {
    await page.goto("/");
    await page.locator("#me").scrollIntoViewIfNeeded();

    const themes = [
      ["Dark", "dark"],
      ["Bottle Green", "bottle-green"],
      ["Light", "light"],
    ] as const;

    for (const [label, theme] of themes) {
      await page.getByRole("radio", { name: label }).click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      await page.waitForTimeout(220);
      const ratio = await page.locator("#me").evaluate((section) => {
        const parse = (value: string) => {
          const match = value.match(
            /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?/,
          );
          if (!match) return null;
          const alpha = match[4] === undefined ? 1 : Number(match[4]);
          if (alpha === 0) return null;
          return [Number(match[1]), Number(match[2]), Number(match[3])];
        };
        const lum = (rgb: number[]) => {
          const [r, g, b] = rgb.map((channel) => {
            const c = channel / 255;
            return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
          });
          return 0.2126 * r + 0.7152 * g + 0.0722 * b;
        };
        const el = section.querySelector("p");
        if (!el) return 0;
        const color = parse(getComputedStyle(el).color);
        const background =
          parse(getComputedStyle(document.body).backgroundColor) ??
          parse(getComputedStyle(document.documentElement).backgroundColor);
        if (!color || !background) return 0;
        const [a, b] = [lum(color), lum(background)];
        const [hi, lo] = a > b ? [a, b] : [b, a];
        return (hi + 0.05) / (lo + 0.05);
      });

      expect(ratio, `${label} body contrast`).toBeGreaterThanOrEqual(4.5);
    }
  });

  test("rope companion matches the active theme", async ({ page }) => {
    await page.goto("/");
    const cat = page.getByTestId("rope-cat");

    await page.getByRole("radio", { name: "Dark" }).click();
    await expect(cat).toHaveAttribute("data-cat-kind", "orange");

    await page.getByRole("radio", { name: "Bottle Green" }).click();
    await expect(cat).toHaveAttribute("data-cat-kind", "persian");

    await page.getByRole("radio", { name: "Light" }).click();
    await expect(cat).toHaveAttribute("data-cat-kind", "toothless");
  });

  test("CV preview follows the active theme without reload", async ({
    page,
  }) => {
    await page.goto("/cv");

    const paper = page.getByTestId("cv-paper");
    await expect(paper).toBeVisible();

    const themes = [
      ["Dark", "dark"],
      ["Bottle Green", "bottle-green"],
      ["Light", "light"],
    ] as const;

    const samples: string[] = [];

    for (const [label, theme] of themes) {
      await page.getByRole("radio", { name: label }).click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      await page.waitForTimeout(220);

      const sample = await paper.evaluate((el) => {
        const parse = (value: string) => {
          const match = value.match(
            /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?/,
          );
          if (!match) return null;
          const alpha = match[4] === undefined ? 1 : Number(match[4]);
          if (alpha === 0) return null;
          return [Number(match[1]), Number(match[2]), Number(match[3])];
        };
        const lum = (rgb: number[]) => {
          const [r, g, b] = rgb.map((channel) => {
            const c = channel / 255;
            return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
          });
          return 0.2126 * r + 0.7152 * g + 0.0722 * b;
        };
        const heading = el.querySelector("h1");
        const styles = getComputedStyle(el);
        const color = parse(
          getComputedStyle(heading ?? el).color,
        );
        const background = parse(styles.backgroundColor);
        if (!color || !background) {
          return { key: "", ratio: 0 };
        }
        const [a, b] = [lum(color), lum(background)];
        const [hi, lo] = a > b ? [a, b] : [b, a];
        return {
          key: `${styles.color}|${styles.backgroundColor}`,
          ratio: (hi + 0.05) / (lo + 0.05),
        };
      });

      expect(sample.ratio, `${label} CV contrast`).toBeGreaterThanOrEqual(4.5);
      samples.push(sample.key);
    }

    expect(new Set(samples).size).toBe(3);
  });

  test("MHM diagram stroke follows the theme accent", async ({ page }) => {
    await page.goto("/");
    const diagram = page.locator("[data-flow-diagram]");
    await diagram.scrollIntoViewIfNeeded();

    await page.getByRole("radio", { name: "Light" }).click();
    const lightStroke = await diagram.locator("svg").first().evaluate((el) => {
      return getComputedStyle(el).color;
    });

    await page.getByRole("radio", { name: "Dark" }).click();
    const darkStroke = await diagram.locator("svg").first().evaluate((el) => {
      return getComputedStyle(el).color;
    });

    expect(lightStroke).not.toBe(darkStroke);
  });
});
