"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MOTION_EASE } from "@/lib/motion";
import { useTheme } from "@/components/theme/ThemeProvider";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import type { Theme } from "@/lib/theme";
import styles from "./CatDrop.module.css";

function OrangeCat() {
  return (
    <svg className={styles.mark} viewBox="0 0 48 54" aria-hidden="true">
      <path
        d="M36 28c6-2 10 6 6 13-2 4-8 6-12 5"
        fill="none"
        stroke="#c45c28"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <ellipse cx="22" cy="36" rx="13" ry="10" fill="#e3873a" />
      <ellipse cx="20" cy="38" rx="7" ry="5.5" fill="#f3d2a6" />
      <path d="M14 30.5c2 3 8 3.4 12 .4" stroke="#c45c28" strokeWidth="1.1" fill="none" />
      <path d="M13 34c3 2.2 9 2.4 13 .2" stroke="#c45c28" strokeWidth="1.1" fill="none" />
      <circle cx="23" cy="20" r="10" fill="#e3873a" />
      <path d="M14.2 14.2 16.8 5.6 20.8 14.6Z" fill="#e3873a" />
      <path d="M25.4 14.6 29.6 5.4 32.2 14.4Z" fill="#e3873a" />
      <path d="M16.2 12.6 17.6 8.2 19.6 13.2Z" fill="#f4b4a0" />
      <path d="M27.8 13.2 29.8 8 31.2 12.8Z" fill="#f4b4a0" />
      <path d="M19 12.8 23.2 16.2 27.2 12.6" stroke="#c45c28" strokeWidth="1.05" fill="none" />
      <ellipse cx="19.4" cy="19.4" rx="2.1" ry="2.5" fill="#fff6e8" />
      <ellipse cx="26.8" cy="19.4" rx="2.1" ry="2.5" fill="#fff6e8" />
      <ellipse cx="19.5" cy="19.6" rx="1" ry="1.5" fill="#2a1b12" />
      <ellipse cx="26.9" cy="19.6" rx="1" ry="1.5" fill="#2a1b12" />
      <path d="M22.2 22.4 24 24.2 25.8 22.4" fill="#e38a7a" />
      <path d="M24 24.2v2.1" stroke="#c45c28" strokeWidth=".8" />
      <path
        d="M24 26.4c-1.4 1.3-2.8 1.3-3.6.4M24 26.4c1.4 1.3 2.8 1.3 3.6.4"
        fill="none"
        stroke="#c45c28"
        strokeWidth=".85"
        strokeLinecap="round"
      />
      <path d="M12 20.6h5.2M12.4 22.6h4.6M31 20.6h5M31.2 22.6h4.4" stroke="#f3d2a6" strokeWidth=".7" />
      <ellipse cx="15.4" cy="44.8" rx="3.1" ry="2" fill="#e3873a" />
      <ellipse cx="27.2" cy="44.8" rx="3.1" ry="2" fill="#e3873a" />
    </svg>
  );
}

function PersianCat() {
  return (
    <svg className={styles.mark} viewBox="0 0 50 54" aria-hidden="true">
      <path
        d="M35 30c7-1 11 8 6 14-3 4-9 5-13 4"
        fill="none"
        stroke="#f4eee3"
        strokeWidth="5.4"
        strokeLinecap="round"
      />
      <ellipse cx="23" cy="37" rx="15.5" ry="12" fill="#f7f1e6" />
      <ellipse cx="23" cy="38" rx="11" ry="8.5" fill="#fffaf2" />
      <circle cx="24" cy="21.5" r="12.2" fill="#f7f1e6" />
      <circle cx="24" cy="22.4" r="9.6" fill="#fffaf2" />
      <path d="M14.6 14.8 17.2 8.4 20.8 15.6Z" fill="#f7f1e6" />
      <path d="M27.2 15.6 31 8.2 33.6 15Z" fill="#f7f1e6" />
      <path d="M16.4 13.8 17.8 10.4 19.6 14.6Z" fill="#f3c6c0" />
      <path d="M28.6 14.6 30.4 10.2 31.8 13.8Z" fill="#f3c6c0" />
      <ellipse cx="19.6" cy="21.6" rx="3.1" ry="3.4" fill="#7eb3d6" />
      <ellipse cx="28.6" cy="21.6" rx="3.1" ry="3.4" fill="#7eb3d6" />
      <circle cx="19.6" cy="21.8" r="1.15" fill="#1c2a33" />
      <circle cx="28.6" cy="21.8" r="1.15" fill="#1c2a33" />
      <circle cx="20.4" cy="20.9" r=".45" fill="#fff" />
      <circle cx="29.4" cy="20.9" r=".45" fill="#fff" />
      <path d="M23.1 25.2 25 26.8 26.9 25.2Z" fill="#e38a7a" />
      <path
        d="M25 26.8c-1.6 1.4-3.2 1.3-4.1.2M25 26.8c1.6 1.4 3.2 1.3 4.1.2"
        fill="none"
        stroke="#c9b7a4"
        strokeWidth=".85"
        strokeLinecap="round"
      />
      <path d="M12.4 22.2h5.4M12.8 24.4h4.8M30 22.2h5.4M30.4 24.4h4.8" stroke="#e8d9c4" strokeWidth=".7" />
      <ellipse cx="16.6" cy="47" rx="3.6" ry="2.1" fill="#f7f1e6" />
      <ellipse cx="29.6" cy="47" rx="3.6" ry="2.1" fill="#f7f1e6" />
    </svg>
  );
}

function NightFuryMark() {
  return (
    <svg className={styles.markWide} viewBox="0 0 64 50" aria-hidden="true">
      <path
        d="M41 27c9 1 16 4 18 10 1 4-3 7-8 6-6-1-10-4-12-7"
        fill="#111218"
      />
      <path d="M52 34c3 4 8 5 10 2 1-3-2-6-7-7-2 0-3 2-3 5Z" fill="#1c1e26" />
      <path d="M48 31c4-7 11-6 12 0 1 4-4 7-9 6Z" fill="#1c1e26" />
      <path d="M14 22c-8-8-12-2-8 6 3 5 9 6 12 3Z" fill="#111218" />
      <ellipse cx="26" cy="30" rx="14" ry="10" fill="#111218" />
      <path d="M18 16 14 7l8 7Z" fill="#111218" />
      <path d="M22 14 20 5.5 26 13Z" fill="#111218" />
      <path d="M31 13.5 34 5 36.5 14Z" fill="#111218" />
      <path d="M35 15 40 7.5 39 16Z" fill="#111218" />
      <ellipse cx="28" cy="20" rx="10.5" ry="8.2" fill="#111218" />
      <ellipse cx="24.2" cy="19.6" rx="4.1" ry="4.6" fill="#6fde5c" />
      <ellipse cx="33.2" cy="19.6" rx="4.1" ry="4.6" fill="#6fde5c" />
      <ellipse cx="24.4" cy="20.1" rx="1.5" ry="2.5" fill="#0b0c10" />
      <ellipse cx="33.4" cy="20.1" rx="1.5" ry="2.5" fill="#0b0c10" />
      <circle cx="25.4" cy="18.4" r=".65" fill="#f3ffe8" />
      <circle cx="34.4" cy="18.4" r=".65" fill="#f3ffe8" />
      <path
        d="M27.2 24.6c1.6 1.2 3.4 1.2 5 0"
        fill="none"
        stroke="#2c303a"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <ellipse cx="20" cy="39.2" rx="3.2" ry="2" fill="#111218" />
      <ellipse cx="31.4" cy="39.2" rx="3.2" ry="2" fill="#111218" />
    </svg>
  );
}

function AuroraCat() {
  return (
    <svg
      className={`${styles.mark} ${styles.auroraMark}`}
      viewBox="0 0 48 54"
      aria-hidden="true"
    >
      <path
        d="M36 28c6-2 10 6 6 13-2 4-8 6-12 5"
        fill="none"
        stroke="var(--color-accent-warm)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <ellipse cx="22" cy="36" rx="13" ry="10" fill="currentColor" />
      <ellipse
        cx="20"
        cy="38"
        rx="7"
        ry="5.5"
        fill="color-mix(in srgb, currentColor 72%, white)"
      />
      <circle cx="23" cy="20" r="10" fill="currentColor" />
      <path d="M14.2 14.2 16.8 5.6 20.8 14.6Z" fill="currentColor" />
      <path d="M25.4 14.6 29.6 5.4 32.2 14.4Z" fill="currentColor" />
      <ellipse cx="19.4" cy="19.4" rx="2.1" ry="2.5" fill="var(--color-accent-warm)" />
      <ellipse cx="26.8" cy="19.4" rx="2.1" ry="2.5" fill="var(--color-accent-warm)" />
      <ellipse cx="19.5" cy="19.6" rx="1" ry="1.5" fill="var(--color-bg-primary)" />
      <ellipse cx="26.9" cy="19.6" rx="1" ry="1.5" fill="var(--color-bg-primary)" />
      <path
        d="M22.2 22.4 24 24.2 25.8 22.4"
        fill="var(--color-accent-warm)"
      />
      <ellipse cx="15.4" cy="44.8" rx="3.1" ry="2" fill="currentColor" />
      <ellipse cx="27.2" cy="44.8" rx="3.1" ry="2" fill="currentColor" />
    </svg>
  );
}

function ThemedCompanion({ theme }: { theme: Theme }) {
  if (theme === "bottle-green") return <PersianCat />;
  if (theme === "light") return <NightFuryMark />;
  if (theme === "aurora") return <AuroraCat />;
  return <OrangeCat />;
}

function kindFor(theme: Theme) {
  if (theme === "bottle-green") return "persian";
  if (theme === "light") return "toothless";
  if (theme === "aurora") return "aurora";
  return "orange";
}

export default function CatDrop() {
  const reduce = usePrefersReducedMotion();
  const { theme } = useTheme();
  const [gone, setGone] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <div
      className={styles.root}
      data-testid="rope-cat"
      data-cat-kind={kindFor(theme)}
      data-reduced={reduce ? "true" : "false"}
      aria-hidden="true"
    >
      <span className={styles.rope} />
      {gone ? null : reduce ? (
        <span className={styles.staticCat}>
          <ThemedCompanion theme={theme} />
        </span>
      ) : ready ? (
        <motion.span
          className={styles.traveler}
          initial={{ top: "4%", opacity: 1, scale: 1, x: "-50%" }}
          animate={{
            top: "88%",
            opacity: [1, 1, 1, 0],
            scale: [1, 1, 1.12, 0.4],
            x: "-50%",
          }}
          transition={{
            duration: 5.4,
            delay: 1.5,
            ease: MOTION_EASE,
            times: [0, 0.82, 0.92, 1],
          }}
          onAnimationComplete={() => setGone(true)}
        >
          <ThemedCompanion theme={theme} />
        </motion.span>
      ) : null}
    </div>
  );
}
