"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import SelectedWork from "@/components/sections/SelectedWork";
import TechTag from "@/components/ui/TechTag";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";
import { MOTION_EASE } from "@/lib/motion";
import {
  enterpriseErpFocal,
  hppyFocal,
  hppyMetrics,
  mhmFigures,
  mhmFocal,
  type FocalProject,
} from "@/content/focal";
import styles from "./FocalProjects.module.css";

const mhmModules = ["PIS", "EHR", "BMS", "Appointments"] as const;

function FocalHeader({ project }: { project: FocalProject }) {
  return (
    <>
      <p className={`text-label ${styles.label}`}>{project.label}</p>
      <h3 className={`text-h2 ${styles.title}`}>{project.title}</h3>
      <p className={styles.positioning}>{project.positioning}</p>
      <p className={styles.summary}>{project.summary}</p>
      <p className={`text-label ${styles.role}`}>{project.role}</p>
    </>
  );
}

function FocalTags({ project }: { project: FocalProject }) {
  return (
    <StaggerGroup className={styles.tags}>
      {project.technologies.map((tech) => (
        <StaggerItem key={tech}>
          <TechTag label={tech} />
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}

function FocalCta({ project }: { project: FocalProject }) {
  if (!project.slug) return null;

  return (
    <Link
      href={`/projects/${project.slug}${project.anchor ?? ""}`}
      className={`text-label ${styles.cta}`}
    >
      VIEW CASE STUDY →
    </Link>
  );
}

function FigureStack({
  figures,
  label,
}: {
  figures: readonly { value: string; note: string }[];
  label: string;
}) {
  return (
    <div className={styles.figureStack} aria-label={label}>
      {figures.map((figure) => (
        <p key={figure.value} className={styles.metric}>
          <span className={`text-h2 ${styles.metricValue}`}>{figure.value}</span>
          <span className={styles.metricNote}>{figure.note}</span>
        </p>
      ))}
    </div>
  );
}

function HppyVisual() {
  return (
    <StaggerGroup className={styles.dataStrip} aria-label="Hppy AI plan numbers">
      {hppyMetrics.map((metric) => (
        <StaggerItem key={metric.note} className={styles.dataCard}>
          <span className={`text-h2 ${styles.dataValue}`}>{metric.value}</span>
          <span className={`text-label ${styles.dataNote}`}>{metric.note}</span>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}

function FlowLine({
  active,
  delay,
  reduce,
}: {
  active: boolean;
  delay: number;
  reduce: boolean;
}) {
  return (
    <svg
      className={styles.archArrow}
      viewBox="0 0 2 16"
      width="2"
      height="16"
      aria-hidden="true"
    >
      <motion.line
        x1="1"
        y1="0"
        x2="1"
        y2="16"
        stroke="currentColor"
        strokeWidth="1"
        initial={{ pathLength: reduce ? 1 : 0 }}
        animate={{ pathLength: active || reduce ? 1 : 0 }}
        transition={{
          duration: reduce ? 0 : 0.4,
          delay: reduce ? 0 : delay,
          ease: MOTION_EASE,
        }}
      />
    </svg>
  );
}

function MhmArchitecture() {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const active = reduce || inView;

  return (
    <div
      ref={ref}
      className={styles.architecture}
      aria-label="Identity flow"
      data-flow-diagram=""
    >
      <div className={styles.archHub}>
        <span className={`text-label ${styles.archName}`}>UIS</span>
        <span className={styles.archHint}>Identity</span>
      </div>
      <div className={styles.archLink} aria-hidden="true">
        <FlowLine active={active} delay={0.08} reduce={reduce} />
        <span className={`text-label ${styles.archId}`}>External ID</span>
        <FlowLine active={active} delay={0.48} reduce={reduce} />
      </div>
      <div className={styles.archModules}>
        {mhmModules.map((name) => (
          <div key={name} className={styles.archNode}>
            <span className={`text-label ${styles.archName}`}>{name}</span>
          </div>
        ))}
      </div>
      <p className={styles.archCaption}>
        Patient identity stays in UIS. Other modules reference an External ID.
        They do not copy the record.
      </p>
    </div>
  );
}

export default function FocalProjects() {
  return (
    <div className={styles.stack}>
      <ScrollReveal>
        <article className={`${styles.focal} ${styles.focalEditorial}`}>
          <div className={styles.copy}>
            <FocalHeader project={hppyFocal} />
            <ul className={styles.capabilities}>
              {hppyFocal.capabilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <FocalTags project={hppyFocal} />
            {hppyFocal.highlight ? (
              <blockquote className={styles.highlight}>
                {hppyFocal.highlight}
              </blockquote>
            ) : null}
            {hppyFocal.judgment ? (
              <p className={styles.judgment}>{hppyFocal.judgment}</p>
            ) : null}
            <FocalCta project={hppyFocal} />
          </div>
          <HppyVisual />
        </article>
      </ScrollReveal>

      <ScrollReveal>
        <article className={`${styles.focal} ${styles.focalSplit}`}>
          <div className={styles.copy}>
            <FocalHeader project={mhmFocal} />
            <FigureStack
              figures={mhmFigures}
              label="ERP defect counts"
            />
            <ul className={styles.capabilities}>
              {mhmFocal.capabilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <FocalTags project={mhmFocal} />
            {mhmFocal.highlight ? (
              <blockquote className={styles.highlight}>
                {mhmFocal.highlight}
              </blockquote>
            ) : null}
            <FocalCta project={mhmFocal} />
          </div>
          <MhmArchitecture />
        </article>
      </ScrollReveal>

      <ScrollReveal>
        <article className={`${styles.focal} ${styles.focalEditorial}`}>
          <div className={styles.copy}>
            <FocalHeader project={enterpriseErpFocal} />
            {enterpriseErpFocal.metric ? (
              <p className={styles.metric}>
                <span className={`text-h2 ${styles.metricValue}`}>
                  {enterpriseErpFocal.metric.value}
                </span>
                <span className={styles.metricNote}>
                  {enterpriseErpFocal.metric.note}
                </span>
              </p>
            ) : null}
            <ul className={styles.capabilities}>
              {enterpriseErpFocal.capabilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <FocalTags project={enterpriseErpFocal} />
            {enterpriseErpFocal.highlight ? (
              <blockquote className={styles.highlight}>
                {enterpriseErpFocal.highlight}
              </blockquote>
            ) : null}
            <FocalCta project={enterpriseErpFocal} />
          </div>
        </article>
      </ScrollReveal>

      <SelectedWork />
    </div>
  );
}
