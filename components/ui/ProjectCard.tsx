"use client";

import Link from "next/link";
import TechTag from "@/components/ui/TechTag";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";
import styles from "./ProjectCard.module.css";

export type ProjectCardStatus = "coming-soon" | "delivered" | null;

export type ProjectCardProps = {
  title: string;
  description: string;
  role: string;
  technologies: string[];
  slug: string;
  status: ProjectCardStatus;
};

function statusLabel(status: ProjectCardStatus): string | null {
  if (status === "coming-soon") return "IN PROGRESS";
  if (status === "delivered") return "DELIVERED";
  return null;
}

export default function ProjectCard({
  title,
  description,
  role,
  technologies,
  slug,
  status,
}: ProjectCardProps) {
  const label = statusLabel(status);
  const linked = status !== "coming-soon";

  const content = (
    <>
      {label ? (
        <div className={styles.status}>
          <span className={`text-label ${styles.statusSoon}`}>{label}</span>
        </div>
      ) : null}

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

      {linked ? (
        <span className={`text-label ${styles.ctaHover}`}>
          VIEW CASE STUDY →
        </span>
      ) : (
        <span className={`text-label ${styles.ctaMuted}`}>
          CASE STUDY IN PROGRESS
        </span>
      )}
    </>
  );

  if (linked) {
    return (
      <Link href={`/projects/${slug}`} className={styles.card}>
        {content}
      </Link>
    );
  }

  return (
    <article className={`${styles.card} ${styles.cardStatic}`}>{content}</article>
  );
}
