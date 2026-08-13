import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import TechTag from "@/components/ui/TechTag";
import { projects } from "@/content/projects";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects
    .filter((project) => project.status === "live")
    .map((project) => ({ slug: project.slug }));
}

function BackLink() {
  return (
    <Link href="/#projects" className={`text-label ${styles.back}`}>
      ← BACK TO PROJECTS
    </Link>
  );
}

function CaseStudyHeader({
  title,
  role,
  status,
  tags,
}: {
  title: string;
  role: string;
  status: string;
  tags: string[];
}) {
  return (
    <header className={styles.header}>
      <p className={`text-label ${styles.role}`}>{role}</p>
      <h1 className={`text-h1 ${styles.title}`}>{title}</h1>
      <p className={styles.status}>{status}</p>
      <div className={styles.tags}>
        {tags.map((tag) => (
          <TechTag key={tag} label={tag} />
        ))}
      </div>
    </header>
  );
}

function PlaywrightAiCaseStudy() {
  const architecture = `GitHub Push
    ↓
GitHub Actions CI
    ├── Playwright E2E Tests (functional + regression)
    ├── API Tests (Postman/Newman)
    ├── DeepEval AI Evaluation Suite
    └── k6 Performance Tests
            ↓
        Results → Pass/Fail Gate
            ↓
        Deploy to Production`;

  return (
    <>
      <CaseStudyHeader
        title="Playwright AI QA Framework"
        role="Framework Architect & Author"
        status="Live — Open Source"
        tags={[
          "playwright",
          "python",
          "deepeval",
          "langsmith",
          "github actions",
          "docker",
        ]}
      />

      <section className={styles.section}>
        <h2 className={`text-h3 ${styles.sectionHeading}`}>The Problem</h2>
        <p className={styles.body}>
          Most QA automation frameworks are designed for deterministic software.
          But what happens when the system under test is an LLM — where the same
          input can produce different outputs, where &apos;correct&apos;
          isn&apos;t binary, and where traditional assertion logic breaks down?
        </p>
        <p className={styles.body}>
          This framework was built to solve that. It combines traditional
          Playwright E2E automation with an AI evaluation layer — so you can
          test both the interface and the intelligence behind it.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={`text-h3 ${styles.sectionHeading}`}>What It Does</h2>
        <ul className={styles.list}>
          <li>
            Playwright E2E test suites for web application functional coverage
          </li>
          <li>
            CI/CD integration via GitHub Actions — regression gates on every PR,
            scheduled nightly health checks
          </li>
          <li>
            DeepEval-powered LLM output evaluation — hallucination detection,
            faithfulness scoring, answer relevance
          </li>
          <li>
            LangSmith for LLM call chain tracing — monitors prompt performance
            and output drift in production
          </li>
          <li>k6 performance scripts for API load testing</li>
          <li>Docker Compose for local environment setup</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={`text-h3 ${styles.sectionHeading}`}>Architecture</h2>
        <pre className={styles.codeBlock}>{architecture}</pre>
      </section>

      <section className={styles.section}>
        <h2 className={`text-h3 ${styles.sectionHeading}`}>
          Interesting Technical Challenge
        </h2>
        <p className={styles.body}>
          Testing non-deterministic AI output required a different kind of
          assertion. Instead of:
        </p>
        <pre className={styles.codeBlock}>
          {`expect(response).toBe('exact string')`}
        </pre>
        <p className={`${styles.body}`} style={{ marginTop: 16 }}>
          The framework uses:
        </p>
        <pre className={styles.codeBlock}>
          {`expect(faithfulnessScore).toBeGreaterThan(0.85)
expect(hallucinationRate).toBeLessThan(0.05)`}
        </pre>
        <p className={`${styles.body}`} style={{ marginTop: 16 }}>
          This required building benchmark datasets, defining what
          &apos;good enough&apos; means for each AI module, and designing test
          cases that could tolerate variation while still catching genuine
          quality regressions.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={`text-h3 ${styles.sectionHeading}`}>Outcome</h2>
        <ul className={styles.list}>
          <li>
            Hallucination test framework adopted as standard practice across all
            AI products at GHIT
          </li>
          <li>
            Playwright CI/CD pipeline reduced manual testing overhead by
            eliminating scheduled regression runs
          </li>
          <li>
            LangSmith integration provided the first production-level visibility
            into LLM call quality
          </li>
        </ul>
      </section>

      <div className={styles.footerLinks}>
        <a
          href="#"
          className={`text-label ${styles.githubLink}`}
          aria-disabled="true"
        >
          VIEW ON GITHUB →
        </a>
        <Link href="/#projects" className={`text-label ${styles.back}`}>
          ← BACK TO PROJECTS
        </Link>
      </div>
    </>
  );
}

function HealthScanPlaceholder() {
  return (
    <>
      <CaseStudyHeader
        title="HealthScan — Phase 1 Test Plan"
        role="Lead QA Engineer"
        status="Live"
        tags={[
          "test strategy",
          "neo4j",
          "api testing",
          "ai validation",
          "compliance",
        ]}
      />
      <p className={styles.comingSoon}>Full case study coming soon.</p>
      <div className={styles.footerLinks}>
        <span />
        <Link href="/#projects" className={`text-label ${styles.back}`}>
          ← BACK TO PROJECTS
        </Link>
      </div>
    </>
  );
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project || project.status !== "live") {
    notFound();
  }

  let content: ReactNode = null;

  if (slug === "playwright-ai-qa-framework") {
    content = <PlaywrightAiCaseStudy />;
  } else if (slug === "healthscan-test-plan") {
    content = <HealthScanPlaceholder />;
  } else {
    notFound();
  }

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <BackLink />
        {content}
      </div>
    </main>
  );
}
