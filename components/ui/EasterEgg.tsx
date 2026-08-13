"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "./EasterEgg.module.css";

const lines = [
  "> running assertion...",
  "> expect(user).toBe('curious')  ✓",
  ">",
  "> good. you passed the first test.",
];

export default function EasterEgg() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const timer = window.setTimeout(() => {
      setOpen(false);
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [open]);

  return (
    <div className={styles.root}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen(true)}
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
