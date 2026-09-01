"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import styles from "./FriendsWalk.module.css";

function Chick() {
  return (
    <svg className={styles.chick} viewBox="0 0 28 28" aria-hidden="true">
      <ellipse cx="14" cy="16.5" rx="8.2" ry="7.2" fill="#f5d15b" />
      <circle cx="15" cy="11.2" r="5.6" fill="#f7db6a" />
      <path d="M14.2 5.4 15.6 2.2 17.2 5.8Z" fill="#f5d15b" />
      <path d="M19.8 12.2 24.2 11.1 20.2 14Z" fill="#ef8a2a" />
      <circle cx="16.6" cy="10.6" r="1.05" fill="#2a1b12" />
      <path d="M8.6 15.4c-2.2.2-3.4 2.2-1.6 3.4" fill="#f0c94a" />
      <path d="M11.6 23.2 10.4 26.2M16.4 23.2 17.6 26.2" stroke="#ef8a2a" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M9.4 26.2h3M15.6 26.2h3.2" stroke="#ef8a2a" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function Duck() {
  return (
    <svg className={styles.duck} viewBox="0 0 38 32" aria-hidden="true">
      <ellipse cx="18" cy="19" rx="12" ry="8.4" fill="#f4f0e6" />
      <circle cx="27" cy="13.2" r="6.1" fill="#f7f3ea" />
      <path d="M31.6 12.6 37.2 11.2 32.2 15.4Z" fill="#ef8a2a" />
      <circle cx="29.1" cy="12.2" r="1.15" fill="#2a1b12" />
      <path d="M8.4 18.2c-3.6.2-5.2 3.4-2.2 5.2 2.2 1.2 5 .6 6.2-.8Z" fill="#ece6d8" />
      <path d="M13.4 26.4 12 30.2M21.2 26.6 22.8 30.2" stroke="#ef8a2a" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10.6 30.2h4.2M21 30.2h4.4" stroke="#ef8a2a" strokeWidth="1.35" strokeLinecap="round" />
    </svg>
  );
}

export default function FriendsWalk() {
  const reduce = usePrefersReducedMotion();
  const [pass, setPass] = useState(0);

  if (!reduce && pass >= 2) return null;

  return (
    <div
      className={styles.track}
      data-testid="friends-walk"
      data-reduced={reduce ? "true" : "false"}
      aria-hidden="true"
    >
      {reduce ? (
        <div className={`${styles.pair} ${styles.staticPair}`}>
          <Chick />
          <Duck />
        </div>
      ) : (
        <motion.div
          key={pass}
          className={styles.pair}
          initial={{ x: -110 }}
          animate={{ x: "100vw" }}
          transition={{
            duration: 16,
            delay: pass === 0 ? 1.8 : 1.2,
            ease: "linear",
          }}
          onAnimationComplete={() => setPass((n) => n + 1)}
        >
          <motion.span
            className={styles.bob}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 0.32, repeat: Infinity, ease: "easeInOut" }}
          >
            <Chick />
          </motion.span>
          <motion.span
            className={styles.bob}
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 0.36,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.08,
            }}
          >
            <Duck />
          </motion.span>
        </motion.div>
      )}
    </div>
  );
}
