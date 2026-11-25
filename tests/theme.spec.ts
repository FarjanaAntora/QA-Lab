import { test, expect } from "@playwright/test";

const THEMES = [
  ["Dark", "dark"],
  ["Green", "bottle-green"],
  ["Light", "light"],
  ["Aurora", "aurora"],
] as const;

const REQUIRED_TOKENS = [
  "--color-bg-primary",
  "--color-bg-secondary",
  "--color-bg-tertiary",
  "--color-surface",
  "--color-surface-raised",
  "--color-border",
  "--color-text-primary",
  "--color-text-secondary",
  "--color-text-muted",
  "--color-accent",
  "--color-accent-hover",
  "--color-accent-text",
  "--color-accent-warm",
  "--color-accent-gold",
  "--color-accent-primary",
  "--color-accent-gradient",
  "--color-success",
  "--color-focus-ring",
  "--color-matrix-from",
  "--color-matrix-to",
  "--color-glitch-base",
  "--color-glitch-a",
  "--color-glitch-b",
] as const;

async function tokenMap(page: import("@playwright/test").Page) {
  return page.evaluate((names) => {
    const styles = getComputedStyle(document.documentElement);
    return Object.fromEntries(
      names.map((name) => [name, styles.getPropertyValue(name).trim()]),
    );
  }, REQUIRED_TOKENS);
}

async function contrastRatio(
  page: import("@playwright/test").Page,
  locator: import("@playwright/test").Locator,
  against: "body" | "self" = "body",
) {
  return locator.evaluate((el, againstMode) => {
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
    const color = parse(getComputedStyle(el).color);
    let background = null as number[] | null;
    if (againstMode === "self") {
      background = parse(getComputedStyle(el).backgroundColor);
    }
    if (!background) {
      background =
        parse(getComputedStyle(document.body).backgroundColor) ??
        parse(getComputedStyle(document.documentElement).backgroundColor);
    }
    if (!color || !background) return 0;
    const [a, b] = [lum(color), lum(background)];
    const [hi, lo] = a > b ? [a, b] : [b, a];
    return (hi + 0.05) / (lo + 0.05);
  }, against);
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

  for (const [label, theme] of THEMES) {
    test(`switcher persists ${label} across reload`, async ({ page }) => {
      await page.goto("/");
      await page.getByRole("radio", { name: label }).click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);

      await page.reload();
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
    });
  }

  test("every required token is defined in all four themes", async ({
    page,
  }) => {
    await page.goto("/");

    for (const [label] of THEMES) {
      await page.getByRole("radio", { name: label }).click();
      const tokens = await tokenMap(page);
      for (const name of REQUIRED_TOKENS) {
        expect(tokens[name], `${name} missing in ${label}`).toBeTruthy();
      }
    }
  });

  test("body, secondary, muted, tags and links meet contrast in every theme", async ({
    page,
  }) => {
    await page.goto("/");
    await page.locator("#me").scrollIntoViewIfNeeded();

    const report: Record<string, Record<string, number>> = {};

    for (const [label, theme] of THEMES) {
      await page.getByRole("radio", { name: label }).click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      await page.waitForTimeout(220);

      const body = await contrastRatio(page, page.locator("#me p").nth(1));
      const ratios = await page.evaluate(() => {
        const parseHex = (hex: string) => {
          const value = hex.trim();
          if (!value.startsWith("#") || value.length < 7) return null;
          return [
            parseInt(value.slice(1, 3), 16),
            parseInt(value.slice(3, 5), 16),
            parseInt(value.slice(5, 7), 16),
          ] as [number, number, number];
        };
        const parseRgb = (value: string) => {
          const match = value.match(
            /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?/,
          );
          if (!match) return null;
          const alpha = match[4] === undefined ? 1 : Number(match[4]);
          if (alpha === 0) return null;
          return [
            Number(match[1]),
            Number(match[2]),
            Number(match[3]),
          ] as [number, number, number];
        };
        const lum = (rgb: [number, number, number]) => {
          const [r, g, b] = rgb.map((channel) => {
            const c = channel / 255;
            return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
          });
          return 0.2126 * r! + 0.7152 * g! + 0.0722 * b!;
        };
        const ratio = (
          fg: [number, number, number],
          bg: [number, number, number],
        ) => {
          const [a, b] = [lum(fg), lum(bg)];
          const [hi, lo] = a > b ? [a, b] : [b, a];
          return (hi + 0.05) / (lo + 0.05);
        };

        const styles = getComputedStyle(document.documentElement);
        const bg =
          parseRgb(getComputedStyle(document.body).backgroundColor) ??
          parseHex(styles.getPropertyValue("--color-bg-primary"));
        const surface =
          parseHex(styles.getPropertyValue("--color-bg-secondary")) ?? bg;
        const raised =
          parseHex(styles.getPropertyValue("--color-bg-tertiary")) ?? surface;
        const primary = parseHex(styles.getPropertyValue("--color-text-primary"));
        const secondaryTok = parseHex(
          styles.getPropertyValue("--color-text-secondary"),
        );
        const muted = parseHex(styles.getPropertyValue("--color-text-muted"));
        const accent = parseHex(styles.getPropertyValue("--color-accent-text"));

        if (!bg || !surface || !raised || !primary || !secondaryTok || !muted || !accent) {
          return {
            primary: 0,
            secondary: 0,
            muted: 0,
            tag: 0,
            link: 0,
            button: 0,
          };
        }

        return {
          primary: ratio(primary, bg),
          secondary: ratio(secondaryTok, bg),
          muted: ratio(muted, bg),
          tag: ratio(secondaryTok, raised),
          link: ratio(accent, bg),
          button: ratio(accent, surface),
        };
      });

      report[label] = { body, ...ratios };

      expect(ratios.primary, `${label} primary`).toBeGreaterThanOrEqual(4.5);
      expect(ratios.secondary, `${label} secondary`).toBeGreaterThanOrEqual(4.5);
      expect(ratios.muted, `${label} muted`).toBeGreaterThanOrEqual(4.5);
      expect(ratios.tag, `${label} tag on raised`).toBeGreaterThanOrEqual(4.5);
      expect(ratios.link, `${label} link`).toBeGreaterThanOrEqual(4.5);
      expect(ratios.button, `${label} button/link on surface`).toBeGreaterThanOrEqual(
        4.5,
      );
      expect(body, `${label} body copy`).toBeGreaterThanOrEqual(4.5);
    }

    console.log("Theme contrast report:", JSON.stringify(report, null, 2));
  });

  test("hero headline still meets 4.5:1 in every theme", async ({ page }) => {
    await page.goto("/");

    for (const [label, theme] of THEMES) {
      await page.getByRole("radio", { name: label }).click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      await page.waitForTimeout(220);
      const ratio = await contrastRatio(page, page.locator("#hero h1"));
      expect(ratio, `${label} hero headline contrast`).toBeGreaterThanOrEqual(
        4.5,
      );
    }
  });

  test("rope companion matches the active theme", async ({ page }) => {
    await page.goto("/");
    const cat = page.getByTestId("rope-cat");

    await page.getByRole("radio", { name: "Dark" }).click();
    await expect(cat).toHaveAttribute("data-cat-kind", "orange");

    await page.getByRole("radio", { name: "Green" }).click();
    await expect(cat).toHaveAttribute("data-cat-kind", "persian");

    await page.getByRole("radio", { name: "Light" }).click();
    await expect(cat).toHaveAttribute("data-cat-kind", "toothless");

    await page.getByRole("radio", { name: "Aurora" }).click();
    await expect(cat).toHaveAttribute("data-cat-kind", "aurora");
  });

  test("CV preview follows the active theme without reload", async ({
    page,
  }) => {
    await page.goto("/cv");

    const paper = page.getByTestId("cv-paper");
    await expect(paper).toBeVisible();

    const samples: string[] = [];

    for (const [label, theme] of THEMES) {
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
        const color = parse(getComputedStyle(heading ?? el).color);
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

    expect(new Set(samples).size).toBe(4);
  });

  test("MHM diagram stroke follows the theme accent", async ({ page }) => {
    await page.goto("/");
    const diagram = page.locator("[data-flow-diagram]");
    await diagram.scrollIntoViewIfNeeded();

    await page.getByRole("radio", { name: "Light" }).click();
    const lightStroke = await diagram.locator("svg").first().evaluate((el) => {
      return getComputedStyle(el).color;
    });

    await page.getByRole("radio", { name: "Aurora" }).click();
    const auroraStroke = await diagram.locator("svg").first().evaluate((el) => {
      return getComputedStyle(el).color;
    });

    expect(lightStroke).not.toBe(auroraStroke);
  });

  test("Aurora matrix, CV paper and code tokens resolve", async ({ page }) => {
    await page.goto("/cv");
    await page.getByRole("radio", { name: "Aurora" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "aurora");

    const tokens = await page.evaluate(() => {
      const styles = getComputedStyle(document.documentElement);
      return {
        matrixFrom: styles.getPropertyValue("--color-matrix-from").trim(),
        matrixTo: styles.getPropertyValue("--color-matrix-to").trim(),
        glitch: styles.getPropertyValue("--color-glitch-base").trim(),
        success: styles.getPropertyValue("--color-success").trim(),
        warning: styles.getPropertyValue("--color-warning").trim(),
        paper: getComputedStyle(
          document.querySelector("[data-testid='cv-paper']")!,
        ).backgroundColor,
      };
    });

    expect(tokens.matrixFrom.toLowerCase()).toBe("#a78bfa");
    expect(tokens.matrixTo.toLowerCase()).toBe("#2dd4bf");
    expect(tokens.glitch.toLowerCase()).toBe("#a78bfa");
    expect(tokens.success.toLowerCase()).toBe("#2dd4bf");
    expect(tokens.warning.toLowerCase()).toBe("#fbbf24");
    expect(tokens.paper).toMatch(/rgb/i);
  });

  test("theme radiogroup supports arrow keys", async ({ page }) => {
    await page.goto("/");
    const dark = page.getByRole("radio", { name: "Dark" });
    await dark.focus();
    await page.keyboard.press("ArrowRight");
    await expect(page.locator("html")).toHaveAttribute(
      "data-theme",
      "bottle-green",
    );
    await page.keyboard.press("ArrowRight");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await page.keyboard.press("ArrowRight");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "aurora");
  });
});
