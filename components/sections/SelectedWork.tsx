"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";
import TechTag from "@/components/ui/TechTag";
import { MOTION_EASE } from "@/lib/motion";
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

function ManuscriptVisual() {
  return (
    <div className={styles.pipeline} aria-label="Digitization pipeline">
      <StaggerGroup className={styles.pipelineTrack}>
        {manuscriptProject.flow.map((item) => (
          <StaggerItem key={item.step} className={styles.pipelineStep}>
            <span className={`text-label ${styles.pipelineName}`}>
              {item.step}
            </span>
            <span className={styles.pipelineNote}>{item.note}</span>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}

function TravelVisual() {
  return (
    <div className={styles.travelStage} aria-label="Booking journey">
      <p className={styles.travelEyebrow}>Premium booking path</p>
      <p className={styles.travelDisplay}>The journey</p>
      <ol className={styles.travelPath}>
        {travelProject.journey.map((item) => (
          <li key={item.step} className={styles.travelStop}>
            <span className={styles.travelStep}>{item.step}</span>
          </li>
        ))}
      </ol>
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
    <StaggerGroup className={styles.layers} aria-label="Framework layers">
      {playwrightProject.layers.map((item) => (
        <StaggerItem key={item.step} className={styles.layer}>
          <span className={`text-label ${styles.layerName}`}>{item.step}</span>
          <span className={styles.layerNote}>{item.note}</span>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}

function ThemeTags({
  items,
  label,
}: {
  items: string[];
  label: string;
}) {
  return (
    <StaggerGroup className={styles.tags} aria-label={label}>
      {items.map((item) => (
        <StaggerItem key={item}>
          <TechTag label={item} />
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}

function DataVisual() {
  return (
    <ThemeTags
      label="Data path"
      items={dataProject.checks.map((item) => `${item.step} · ${item.note}`)}
    />
  );
}

function WordpressVisual() {
  return (
    <ThemeTags label="Client types" items={[...wordpressProject.audiences]} />
  );
}

function LeadershipVisual() {
  return (
    <ThemeTags
      label="QA process"
      items={processProject.loop.map((item) => `${item.step} · ${item.note}`)}
    />
  );
}

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
            project={manuscriptProject}
            visual={<ManuscriptVisual />}
            tone="secondary"
          />
          <FeatureCard
            project={travelProject}
            visual={<TravelVisual />}
            tone="tertiary"
          />
          <FeatureCard
            project={governmentProject}
            visual={<GovernmentVisual />}
            tone="secondary"
          />
          <FeatureCard
            project={playwrightProject}
            visual={<PlaywrightVisual />}
            tone="tertiary"
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
