import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TechTag from "@/components/ui/TechTag";
import { projects, type Project } from "@/content/projects";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return { title: "Project - THE QA LAB" };
  }

  return {
    title: `${project.title} - THE QA LAB`,
    description: project.tagline,
  };
}

function getNextProject(current: Project): Project | null {
  const index = projects.findIndex((item) => item.slug === current.slug);
  if (index < 0 || index >= projects.length - 1) return null;
  return projects[index + 1] ?? null;
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const nextProject = getNextProject(project);
  const isLive = project.status === "live";

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.topNav}>
          <Link href="/#projects" className={`text-label ${styles.back}`}>
            ← THE QA LAB
          </Link>
        </div>

        <p className={`text-label ${styles.category}`}>
          {project.category.toUpperCase()}
        </p>

        <h1 className={`text-h1 ${styles.title}`}>{project.title}</h1>
        <p className={styles.tagline}>{project.tagline}</p>

        <div className={styles.meta}>
          <div className={styles.metaBlock}>
            <span className={`text-label ${styles.metaLabel}`}>ROLE</span>
            <span className={`text-small ${styles.metaValue}`}>
              {project.role}
            </span>
          </div>

          <div className={styles.metaBlock}>
            <span className={`text-label ${styles.metaLabel}`}>STATUS</span>
            {isLive ? (
              <span className={`text-label ${styles.statusLive}`}>
                <span className={styles.dot} aria-hidden="true" />
                LIVE
              </span>
            ) : (
              <span className={`text-label ${styles.statusSoon}`}>
                IN PROGRESS
              </span>
            )}
          </div>

          <div className={styles.metaBlock}>
            <span className={`text-label ${styles.metaLabel}`}>STACK</span>
            <div className={styles.tags}>
              {project.technologies.map((tech) => (
                <TechTag key={tech} label={tech} />
              ))}
            </div>
          </div>
        </div>

        <hr className={styles.divider} />

        <p className={`text-body ${styles.summary}`}>{project.summary}</p>

        <section className={styles.section}>
          <h2 className={`text-h3 ${styles.sectionHeading}`}>THE PROBLEM</h2>
          <p className={styles.sectionBody}>{project.problem}</p>
        </section>

        <section className={styles.section}>
          <h2 className={`text-h3 ${styles.sectionHeading}`}>THE APPROACH</h2>
          <ul className={styles.approachList}>
            {project.approach.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={`text-h3 ${styles.sectionHeading}`}>THE CHALLENGE</h2>
          <p className={styles.sectionBody}>{project.challenge}</p>
        </section>

        <section className={styles.section}>
          <h2 className={`text-h3 ${styles.sectionHeading}`}>THE OUTCOME</h2>
          <p className={styles.outcome}>{project.outcome}</p>
        </section>

        {project.github ? (
          <a
            href={project.github}
            className={styles.githubButton}
            target="_blank"
            rel="noopener noreferrer"
          >
            VIEW ON GITHUB ↗
          </a>
        ) : null}

        <div className={styles.bottomNav}>
          <Link href="/#projects" className={`text-label ${styles.back}`}>
            ← BACK TO PROJECTS
          </Link>
          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className={`text-label ${styles.nextLink}`}
            >
              NEXT PROJECT →
            </Link>
          ) : null}
        </div>
      </div>
    </main>
  );
}
