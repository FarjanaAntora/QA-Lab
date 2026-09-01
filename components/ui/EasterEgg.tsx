"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import styles from "./EasterEgg.module.css";

const lines = [
  "> running assertion...",
  "> expect(user).toBe('curious')  ✓",
  ">",
  "> good. you passed the first test.",
];

const GLITCH_LINE = "Found the glitch in the matrix.";
const SCRAMBLE =
  "アイウエオカキクケコサシスセソタチツテトABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export default function EasterEgg() {
  const reduce = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [display, setDisplay] = useState(GLITCH_LINE);
  const hideTimer = useRef<number | null>(null);

  useEffect(() => {
    if (!open) return;

    const timer = window.setTimeout(() => {
      setOpen(false);
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (reduce) return;

    const delay = 13000 + Math.floor(Math.random() * 5000);
    const showId = window.setTimeout(() => {
      setGlitch(true);
      hideTimer.current = window.setTimeout(() => {
        setGlitch(false);
      }, 2600);
    }, delay);

    return () => {
      window.clearTimeout(showId);
      if (hideTimer.current !== null) {
        window.clearTimeout(hideTimer.current);
      }
    };
  }, [reduce]);

  useEffect(() => {
    if (!glitch) {
      setDisplay(GLITCH_LINE);
      return;
    }

    if (
      reduce ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setDisplay(GLITCH_LINE);
      return;
    }

    let frame = 0;
    const id = window.setInterval(() => {
      frame += 1;
      if (frame > 8) {
        setDisplay(GLITCH_LINE);
        window.clearInterval(id);
        return;
      }

      setDisplay(
        GLITCH_LINE.split("")
          .map((char) => {
            if (char === " " || char === "." || Math.random() > 0.45) {
              return char;
            }
            return SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)] ?? char;
          })
          .join(""),
      );
    }, 42);

    return () => window.clearInterval(id);
  }, [glitch, reduce]);

  const showGlitch = () => {
    if (hideTimer.current !== null) {
      window.clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
    setGlitch(true);
  };

  const scheduleHide = () => {
    hideTimer.current = window.setTimeout(() => {
      setGlitch(false);
    }, 1400);
  };

  return (
    <div className={styles.root}>
      <AnimatePresence>
        {glitch && !open ? (
          <motion.p
            className={styles.glitch}
            data-text={display}
            data-testid="glitch-line"
            data-active={reduce ? "false" : "true"}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
          >
            {display}
          </motion.p>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        className={styles.trigger}
        onClick={() => {
          setGlitch(false);
          setOpen(true);
        }}
        onMouseEnter={showGlitch}
        onFocus={showGlitch}
        onMouseLeave={scheduleHide}
        onBlur={scheduleHide}
        aria-label="Hidden interaction"
      >
        [ DO NOT CLICK ]
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className={styles.card}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            role="status"
            aria-live="polite"
          >
            {lines.map((line, index) => (
              <motion.p
                key={`${line}-${index}`}
                className={styles.line}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: index * 0.3,
                  duration: 0.25,
                  ease: "easeOut",
                }}
              >
                {line}
              </motion.p>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
