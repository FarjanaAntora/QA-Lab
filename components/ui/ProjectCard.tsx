"use client";

import Link from "next/link";
import TechTag from "@/components/ui/TechTag";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";
import styles from "./ProjectCard.module.css";

export type ProjectCardProps = {
  title: string;
  description: string;
  role: string;
  technologies: string[];
  slug: string;
  status: "live" | "coming-soon";
};

export default function ProjectCard({
  title,
  description,
  role,
  technologies,
  slug,
  status,
}: ProjectCardProps) {
  const isLive = status === "live";

  const content = (
    <>
      <div className={styles.status}>
        {isLive ? (
          <span className={`text-label ${styles.statusLive}`}>
            <span className={styles.dot} aria-hidden="true" />
            LIVE
          </span>
        ) : (
          <span className={`text-label ${styles.statusSoon}`}>IN PROGRESS</span>
        )}
      </div>

      <p className={`text-label ${styles.role}`}>{role}</p>
      <h3 className={`text-h3 ${styles.title}`}>{title}</h3>
      <p className={styles.description}>{description}</p>

      <StaggerGroup className={styles.tags}>
        {technologies.map((tech) => (
          <StaggerItem key={tech}>
            <TechTag label={tech} />
          </StaggerItem>
        ))}
      </StaggerGroup>

      {isLive ? (
        <span className={`text-label ${styles.ctaHover}`}>
          VIEW CASE STUDY →
        </span>
      ) : (
        <span className={`text-label ${styles.ctaMuted}`}>
          CASE STUDY COMING SOON
        </span>
      )}
    </>
  );

  if (isLive) {
    return (
      <Link href={`/projects/${slug}`} className={styles.card}>
        {content}
      </Link>
    );
  }

  return <article className={`${styles.card} ${styles.cardStatic}`}>{content}</article>;
}
