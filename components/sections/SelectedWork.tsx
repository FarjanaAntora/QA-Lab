"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";
import TechTag from "@/components/ui/TechTag";
import { MOTION_EASE } from "@/lib/motion";
import {
  abContrasts,
  abTestingFocal,
  brandRoster,
} from "@/content/focal";
import {
  additionalWorkIntro,
  dataProject,
  governmentProject,
  manuscriptProject,
  playwrightProject,
  processProject,
  selectedWorkIntro,
  travelProject,
  wordpressProject,
  type ProcessStep,
  type SelectedProject,
} from "@/content/selected-work";
import styles from "./SelectedWork.module.css";

function StoryDetails({
  project,
  open,
}: {
  project: SelectedProject;
  open: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <AnimatePresence initial={false}>
      {open ? (
        <motion.div
          className={styles.story}
          key={`${project.id}-story`}
          initial={reduce ? false : { height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={reduce ? undefined : { height: 0, opacity: 0 }}
          transition={{
            duration: reduce ? 0 : 0.3,
            ease: MOTION_EASE,
          }}
        >
          <div className={styles.storyInner}>
            <div>
              <p className={`text-label ${styles.storyLabel}`}>Challenge</p>
              <p className={styles.storyCopy}>{project.challenge}</p>
            </div>
            <div>
              <p className={`text-label ${styles.storyLabel}`}>What I tested</p>
              <ul className={styles.storyList}>
                {project.tested.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className={`text-label ${styles.storyLabel}`}>
                What made it interesting
              </p>
              <p className={styles.storyCopy}>{project.interesting}</p>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function StoryTrigger({
  open,
  onToggle,
  label,
}: {
  open: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      className={`text-label ${styles.storyTrigger}`}
      onClick={onToggle}
      aria-expanded={open}
    >
      {open ? "− THE STORY" : "+ THE STORY"}
      <span className={styles.srOnly}>{label}</span>
    </button>
  );
}

function useStory(id: string) {
  const [open, setOpen] = useState(false);
  return {
    open,
    toggle: () => setOpen((prev) => !prev),
    label: id,
  };
}

function CardActions({
  project,
  open,
  onToggle,
}: {
  project: SelectedProject;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={styles.actions}>
      <StoryTrigger open={open} onToggle={onToggle} label={project.title} />
      {project.slug ? (
        <Link
          href={`/projects/${project.slug}`}
          className={`text-label ${styles.caseStudy}`}
        >
          VIEW CASE STUDY →
        </Link>
      ) : null}
    </div>
  );
}

function FeatureCard({
  project,
  visual,
  tone,
}: {
  project: SelectedProject;
  visual: ReactNode;
  tone: "secondary" | "tertiary";
}) {
  const story = useStory(project.title);

  return (
    <article
      className={`${styles.card} ${styles.feature} ${
        tone === "tertiary" ? styles.toneTertiary : styles.toneSecondary
      }`}
    >
      <p className={`text-label ${styles.index}`}>{project.number}</p>
      <p className={`text-label ${styles.category}`}>{project.category}</p>
      {project.status === "in-progress" ? (
        <p className={`text-label ${styles.category}`}>IN PROGRESS</p>
      ) : null}
      {project.status === "delivered" ? (
        <p className={`text-label ${styles.category}`}>DELIVERED</p>
      ) : null}
      <h3 className={`text-h3 ${styles.title}`}>{project.title}</h3>
      <p className={styles.summary}>{project.summary}</p>
      {visual}
      <CardActions
        project={project}
        open={story.open}
        onToggle={story.toggle}
      />
      <StoryDetails project={project} open={story.open} />
    </article>
  );
}

function AdditionalCard({
  project,
  visual,
}: {
  project: SelectedProject;
  visual: ReactNode;
}) {
  const story = useStory(project.title);

  return (
    <article className={`${styles.card} ${styles.additionalCard} ${styles.toneSecondary}`}>
      <p className={`text-label ${styles.category}`}>{project.category}</p>
      <h3 className={`text-h3 ${styles.title}`}>{project.title}</h3>
      <p className={styles.summary}>{project.summary}</p>
      {visual}
      <CardActions
        project={project}
        open={story.open}
        onToggle={story.toggle}
      />
      <StoryDetails project={project} open={story.open} />
    </article>
  );
}

function FlowBoxes({
  steps,
  label,
  className,
}: {
  steps: readonly ProcessStep[];
  label: string;
  className?: string;
}) {
  return (
    <StaggerGroup
      className={`${styles.flowTrack} ${className ?? ""}`}
      aria-label={label}
      data-flow-track=""
    >
      {steps.map((item) => (
        <StaggerItem
          key={item.step}
          className={styles.flowBox}
          data-flow-box=""
        >
          <span className={styles.flowLabel} data-flow-label="">
            {item.step}
          </span>
          {item.note ? (
            <span className={styles.flowNote}>{item.note}</span>
          ) : null}
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}

function ManuscriptVisual() {
  return (
    <div className={styles.pipeline} aria-label="Digitization pipeline">
      <FlowBoxes steps={manuscriptProject.flow} label="Digitization pipeline" />
    </div>
  );
}

function TravelVisual() {
  return (
    <div className={styles.travelStage} aria-label="Booking journey">
      <p className={styles.travelEyebrow}>Premium booking path</p>
      <p className={styles.travelDisplay}>The journey</p>
      <FlowBoxes
        steps={travelProject.journey}
        label="Booking journey steps"
        className={styles.travelPath}
      />
    </div>
  );
}

function GovernmentVisual() {
  return (
    <StaggerGroup className={styles.chips} aria-label="Government systems">
      {governmentProject.systems.map((item) => (
        <StaggerItem key={item}>
          <span className={styles.chip}>{item}</span>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}

function PlaywrightVisual() {
  return (
    <FlowBoxes
      steps={playwrightProject.layers}
      label="Framework layers"
      className={styles.layers}
    />
  );
}

function DataVisual() {
  return (
    <div className={styles.flowStage}>
      <FlowBoxes steps={dataProject.checks} label="Data path" />
    </div>
  );
}

function WordpressVisual() {
  return (
    <StaggerGroup className={styles.tags} aria-label="Client types">
      {wordpressProject.audiences.map((item) => (
        <StaggerItem key={item}>
          <TechTag label={item} />
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}

function LeadershipVisual() {
  return (
    <div className={styles.flowStage}>
      <FlowBoxes steps={processProject.loop} label="QA process" />
    </div>
  );
}

function AbAnalyticsVisual() {
  return (
    <>
      <div className={styles.figureStack} aria-label="Two A/B testing outcomes">
        {abContrasts.map((figure) => (
          <p key={figure.value} className={styles.metric}>
            <span className={`text-h2 ${styles.metricValue}`}>
              {figure.value}
            </span>
            <span className={styles.metricNote}>{figure.note}</span>
          </p>
        ))}
      </div>
      <StaggerGroup className={styles.roster} aria-label="Client brands">
        {brandRoster.map((brand) => (
          <StaggerItem key={brand.name} className={styles.rosterLogo}>
            <img
              src={brand.src}
              alt={brand.name}
              className={
                "emblem" in brand && brand.emblem
                  ? styles.rosterEmblem
                  : undefined
              }
            />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </>
  );
}

const abAnalyticsProject: SelectedProject = {
  id: abTestingFocal.id,
  number: "01",
  title: "A/B Analytics QA",
  category: "A/B Testing · Analytics · Brand QA",
  summary: abTestingFocal.summary,
  challenge:
    "Two engagements on different systems produced very different defect counts. Neither one corrects the other — the quality work is reading the risk, not chasing a bigger number.",
  tested: abTestingFocal.capabilities,
  interesting:
    "Client-facing checking on experiments, traffic, event tracking and user journeys for premium global brands.",
};

export default function SelectedWork() {
  return (
    <div className={styles.selected} id="selected-work">
      <ScrollReveal>
        <header className={styles.intro}>
          <p className={`text-label ${styles.introLabel}`}>
            {selectedWorkIntro.label}
          </p>
          <h2 className={`text-h2 ${styles.introTitle}`}>
            {selectedWorkIntro.title}
          </h2>
          <p className={`text-body ${styles.introCopy}`}>
            {selectedWorkIntro.supporting}
          </p>
        </header>
      </ScrollReveal>

      <ScrollReveal>
        <div className={styles.grid}>
          <FeatureCard
            project={abAnalyticsProject}
            visual={<AbAnalyticsVisual />}
            tone="secondary"
          />
          <FeatureCard
            project={{ ...manuscriptProject, number: "02" }}
            visual={<ManuscriptVisual />}
            tone="tertiary"
          />
          <FeatureCard
            project={{ ...travelProject, number: "03" }}
            visual={<TravelVisual />}
            tone="secondary"
          />
          <FeatureCard
            project={{ ...governmentProject, number: "04" }}
            visual={<GovernmentVisual />}
            tone="tertiary"
          />
          <FeatureCard
            project={{ ...playwrightProject, number: "05" }}
            visual={<PlaywrightVisual />}
            tone="secondary"
          />
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <header className={styles.intro}>
          <p className={`text-label ${styles.introLabel}`}>
            {additionalWorkIntro.label}
          </p>
          <h2 className={`text-h2 ${styles.introTitle}`}>
            {additionalWorkIntro.title}
          </h2>
          <p className={`text-body ${styles.introCopy}`}>
            {additionalWorkIntro.supporting}
          </p>
        </header>
      </ScrollReveal>

      <ScrollReveal>
        <div className={styles.additional}>
          <AdditionalCard project={dataProject} visual={<DataVisual />} />
          <AdditionalCard
            project={wordpressProject}
            visual={<WordpressVisual />}
          />
          <AdditionalCard
            project={processProject}
            visual={<LeadershipVisual />}
          />
        </div>
      </ScrollReveal>
    </div>
  );
}
