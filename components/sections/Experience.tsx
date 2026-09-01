"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { experience, type ExperienceItem } from "@/content/experience";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";
import TechTag from "@/components/ui/TechTag";
import { MOTION_EASE } from "@/lib/motion";
import styles from "./Experience.module.css";

function TimelineItem({ item }: { item: ExperienceItem }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <article className={styles.item}>
      <span className={styles.dot} aria-hidden="true" />

      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <span className={`text-label ${styles.period}`}>{item.period}</span>
        <span className={`text-h3 ${styles.role}`}>{item.role}</span>
        <span className={styles.company}>
          {item.company}
          {item.companyShort !== item.company
            ? ` (${item.companyShort})`
            : ""}
        </span>
        <span className={styles.summary}>{item.summary}</span>
        <span className={`text-label ${styles.details}`}>
          {open ? "- DETAILS" : "+ DETAILS"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            className={styles.panel}
            key="details"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{
              duration: reduce ? 0 : 0.3,
              ease: MOTION_EASE,
            }}
          >
            <div className={styles.panelInner}>
              <ul className={styles.responsibilities}>
                {item.responsibilities.map((responsibility) => (
                  <li key={responsibility}>{responsibility}</li>
                ))}
              </ul>

              <div className={styles.tags}>
                {item.technologies.map((tech) => (
                  <TechTag key={tech} label={tech} />
                ))}
              </div>

              {item.highlight ? (
                <blockquote className={styles.highlight}>
                  {item.highlight}
                </blockquote>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}

export default function Experience() {
  return (
    <section id="experience" className={`section ${styles.experience}`}>
      <div className="container">
        <ScrollReveal>
          <SectionLabel number="02" title="EXPERIENCE" />
        </ScrollReveal>

        <StaggerGroup className={styles.timeline}>
          {experience.map((item) => (
            <StaggerItem key={item.id}>
              <TimelineItem item={item} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
