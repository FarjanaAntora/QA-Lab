export const THEMES = ["dark", "bottle-green", "light", "aurora"] as const;

export type Theme = (typeof THEMES)[number];

export const THEME_STORAGE_KEY = "qalab-theme";

/** Short switcher labels. */
export const THEME_LABELS: Record<Theme, string> = {
  dark: "Dark",
  "bottle-green": "Green",
  light: "Light",
  aurora: "Aurora",
};

export function isTheme(value: string | null | undefined): value is Theme {
  return THEMES.some((theme) => theme === value);
}

export function themeFromSystem(): Theme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme =
    theme === "light" ? "light" : "dark";
}

export const THEME_BOOT_SCRIPT = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var allowed=${JSON.stringify([...THEMES])};var t=localStorage.getItem(k);if(allowed.indexOf(t)===-1){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}document.documentElement.setAttribute("data-theme",t);document.documentElement.style.colorScheme=t==="light"?"light":"dark";}catch(e){document.documentElement.setAttribute("data-theme","dark");document.documentElement.style.colorScheme="dark";}})();`;
