import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TechTag from "@/components/ui/TechTag";
import { projects, type Project } from "@/content/projects";
import { OG_IMAGE_PATH, absoluteUrl } from "@/lib/site";
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
    return {
      title: "Project | Aktia Farjana Antora",
      description: "Case study from THE QA LAB portfolio.",
      alternates: { canonical: absoluteUrl(`/projects/${slug}`) },
    };
  }

  const title = `${project.title} | Aktia Farjana Antora`;
  const description = project.tagline;
  const url = absoluteUrl(`/projects/${project.slug}`);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: OG_IMAGE_PATH,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE_PATH],
    },
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

        {project.decision ? (
          <section className={styles.section} id="decision">
            <h2 className={`text-h3 ${styles.sectionHeading}`}>
              {project.decision.title}
            </h2>
            <ol className={styles.steps}>
              {project.decision.steps.map((step) => (
                <li key={step.label} className={styles.step}>
                  <h3 className={`text-label ${styles.stepLabel}`}>
                    {step.label}
                  </h3>
                  <p className={styles.stepBody}>{step.body}</p>
                </li>
              ))}
            </ol>
            {project.decision.related ? (
              <Link
                href={project.decision.related.href}
                className={`text-label ${styles.related}`}
              >
                {project.decision.related.label} →
              </Link>
            ) : null}
          </section>
        ) : null}

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

        {project.outcome ? (
          <section className={styles.section}>
            <h2 className={`text-h3 ${styles.sectionHeading}`}>THE OUTCOME</h2>
            <p className={styles.outcome}>{project.outcome}</p>
            {project.related ? (
              <Link
                href={project.related.href}
                className={`text-label ${styles.related}`}
              >
                {project.related.label} →
              </Link>
            ) : null}
          </section>
        ) : project.related ? (
          <Link
            href={project.related.href}
            className={`text-label ${styles.related}`}
          >
            {project.related.label} →
          </Link>
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
