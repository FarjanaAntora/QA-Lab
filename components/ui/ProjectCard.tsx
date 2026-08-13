import Link from "next/link";
import TechTag from "@/components/ui/TechTag";
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
          <span className={`text-label ${styles.statusSoon}`}>COMING SOON</span>
        )}
      </div>

      <p className={`text-label ${styles.role}`}>{role}</p>
      <h3 className={`text-h3 ${styles.title}`}>{title}</h3>
      <p className={styles.description}>{description}</p>

      <div className={styles.tags}>
        {technologies.map((tech) => (
          <TechTag key={tech} label={tech} />
        ))}
      </div>

      {isLive ? (
        <span className={`text-label ${styles.cta}`}>VIEW CASE STUDY →</span>
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
