"use client";

import { motion } from "framer-motion";
import EasterEgg from "@/components/ui/EasterEgg";
import styles from "./Hero.module.css";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.4,
      ease: "easeOut" as const,
    },
  }),
};

const headlineLines = ["I BREAK", "SOFTWARE", "FOR A LIVING."];
const tags = ["playwright", "api", "ci/cd", "ai testing"];

export default function Hero() {
  return (
    <section id="hero" className={styles.hero} aria-label="Hero">
      <div className={styles.inner}>
        <motion.p
          className={`text-label ${styles.label}`}
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          — AKTIA FARJANA ANTORA
        </motion.p>

        <h1 className={`text-display ${styles.headline}`}>
          {headlineLines.map((line, index) => (
            <motion.span
              key={line}
              className={styles.headlineLine}
              custom={index + 1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.div
          className={styles.divider}
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          aria-hidden="true"
        />

        <motion.div
          className={styles.subtext}
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <p className={styles.role}>Senior QA Automation Engineer</p>
          <div className={styles.tags}>
            {tags.map((tag) => (
              <span key={tag} className={`text-mono ${styles.tag}`}>
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <EasterEgg />
    </section>
  );
}
