"use client";

import { Leaf, Moon, Sun } from "lucide-react";
import { THEME_LABELS, THEMES, type Theme } from "@/lib/theme";
import { useTheme } from "./ThemeProvider";
import styles from "./ThemeSwitch.module.css";

const ICONS: Record<Theme, typeof Moon> = {
  dark: Moon,
  "bottle-green": Leaf,
  light: Sun,
};

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={styles.group}
      role="radiogroup"
      aria-label="Color theme"
    >
      {THEMES.map((value) => {
        const Icon = ICONS[value];
        const active = theme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={THEME_LABELS[value]}
            className={`${styles.option} ${active ? styles.optionActive : ""}`}
            onClick={() => setTheme(value)}
          >
            <Icon size={14} strokeWidth={1.75} />
          </button>
        );
      })}
    </div>
  );
}
