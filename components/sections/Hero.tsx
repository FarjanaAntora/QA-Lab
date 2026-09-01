"use client";

import { motion, useReducedMotion } from "framer-motion";
import CV from "@/components/sections/CV";
import CatDrop from "@/components/ui/CatDrop";
import EasterEgg from "@/components/ui/EasterEgg";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";
import { MOTION_EASE } from "@/lib/motion";
import styles from "./Hero.module.css";

const headlineLines = ["I BREAK", "SOFTWARE", "FOR A LIVING."];
const tags = ["playwright", "api", "ci/cd", "AI/ML Quality Engineering"];

export default function Hero() {
  const reduce = useReducedMotion();
  const fadeUp = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: reduce ? 0 : index * 0.08,
        duration: reduce ? 0 : 0.4,
        ease: MOTION_EASE,
      },
    }),
  };

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
          AKTIA FARJANA ANTORA
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
          <StaggerGroup className={styles.tags}>
            {tags.map((tag) => (
              <StaggerItem key={tag}>
                <span className={`text-mono ${styles.tag}`}>{tag}</span>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </motion.div>

        <motion.div
          custom={6}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <CV />
        </motion.div>
      </div>

      <CatDrop />
      <EasterEgg />
    </section>
  );
}
