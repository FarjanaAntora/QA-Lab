import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TechTag from "@/components/ui/TechTag";
import { getCaseStudyFacts } from "@/content/facts";
import { projects, type Project } from "@/content/projects";
import { absoluteUrl } from "@/lib/site";
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
  const facts = getCaseStudyFacts(slug);
  const project = projects.find((item) => item.slug === slug);

  if (!facts || !project) {
    return {
      title: "Project | Aktia Farjana Antora",
      description: "Case study from THE QA LAB portfolio.",
      alternates: { canonical: absoluteUrl(`/projects/${slug}`) },
      twitter: { card: "summary_large_image" },
    };
  }

  const url = absoluteUrl(`/projects/${facts.slug}`);

  return {
    title: facts.ogTitle,
    description: facts.ogDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: facts.ogTitle,
      description: facts.ogDescription,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: facts.ogTitle,
      description: facts.ogDescription,
    },
  };
}

function getAdjacentProjects(current: Project): {
  previous: Project;
  next: Project;
} {
  const index = projects.findIndex((item) => item.slug === current.slug);
  const length = projects.length;
  return {
    previous: projects[(index - 1 + length) % length]!,
    next: projects[(index + 1) % length]!,
  };
}

function statusLabel(status: Project["status"]): string | null {
  if (status === "coming-soon") return "IN PROGRESS";
  if (status === "delivered") return "DELIVERED";
  // No generic LIVE — only badges the page copy supports.
  return null;
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const { previous, next } = getAdjacentProjects(project);
  const status = statusLabel(project.status);

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

          {status ? (
            <div className={styles.metaBlock}>
              <span className={`text-label ${styles.metaLabel}`}>STATUS</span>
              <span className={`text-label ${styles.statusSoon}`}>{status}</span>
            </div>
          ) : null}

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
          <Link
            href={`/projects/${previous.slug}`}
            className={`text-label ${styles.back}`}
          >
            ← {previous.title}
          </Link>
          <Link href="/#projects" className={`text-label ${styles.back}`}>
            ALL PROJECTS
          </Link>
          <Link
            href={`/projects/${next.slug}`}
            className={`text-label ${styles.nextLink}`}
          >
            {next.title} →
          </Link>
        </div>
      </div>
    </main>
  );
}
