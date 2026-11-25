"use client";

import { useRef, type KeyboardEvent } from "react";
import { THEME_LABELS, THEMES, type Theme } from "@/lib/theme";
import { useTheme } from "./ThemeProvider";
import styles from "./ThemeSwitch.module.css";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const refs = useRef<Partial<Record<Theme, HTMLButtonElement | null>>>({});

  function focusTheme(next: Theme) {
    setTheme(next);
    refs.current[next]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = THEMES.indexOf(theme);
    if (index < 0) return;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      focusTheme(THEMES[(index + 1) % THEMES.length]!);
      return;
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      focusTheme(THEMES[(index - 1 + THEMES.length) % THEMES.length]!);
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      focusTheme(THEMES[0]!);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      focusTheme(THEMES[THEMES.length - 1]!);
    }
  }

  return (
    <div
      className={styles.group}
      role="radiogroup"
      aria-label="Color theme"
      onKeyDown={onKeyDown}
    >
      {THEMES.map((value) => {
        const active = theme === value;
        return (
          <button
            key={value}
            ref={(node) => {
              refs.current[value] = node;
            }}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={THEME_LABELS[value]}
            data-theme-option={value}
            tabIndex={active ? 0 : -1}
            className={`${styles.option} ${active ? styles.optionActive : ""}`}
            onClick={() => setTheme(value)}
          >
            <span
              className={styles.swatch}
              data-theme-swatch={value}
              aria-hidden="true"
            />
            <span className={styles.label}>{THEME_LABELS[value]}</span>
          </button>
        );
      })}
    </div>
  );
}
