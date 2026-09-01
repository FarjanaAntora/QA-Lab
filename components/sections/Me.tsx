"use client";

import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";
import styles from "./Me.module.css";

const stats = [
  {
    value: "8+",
    label: "YEARS EXPERIENCE",
  },
  {
    value: "15+",
    label: "CONCURRENT PROJECTS",
  },
  {
    value: "150+",
    label: "FORMULAS VALIDATED",
    tooltip:
      "Mathematical formula verification for a clinical AI platform",
  },
  {
    value: "100M",
    label: "DOWNLOADS PROTECTED",
    tooltip: "QA across platforms reaching 100M+ users",
  },
] as const;

export default function Me() {
  return (
    <section id="me" className={`section ${styles.me}`}>
      <ScrollReveal className="container">
        <SectionLabel number="01" title="ME" />

        <div className={styles.grid}>
          <div className={styles.copy}>
            <h2 className={`text-h2 ${styles.heading}`}>
              Quality is not a phase.
            </h2>
            <div className={styles.body}>
              <p>
                I&apos;m a Lead SQA Engineer with 8 years of experience from
                manual testing fundamentals through to{" "}
                <span className={styles.tech}>Playwright</span> automation,{" "}
                <span className={styles.tech}>CI/CD</span> pipelines,{" "}
                <span className={styles.tech}>AI system validation</span>, and{" "}
                <span className={styles.tech}>healthcare technology</span>.
              </p>
              <p>
                The foundation is manual. I started testing enterprise ERP
                systems from scratch writing test cases, managing defect
                lifecycles, learning to find the bugs that automated tools miss
                because nobody has told them what to look for yet.
              </p>
              <p>
                From that base, the automation and AI work followed naturally.
                My day job now involves testing AI agents for healthcare
                platforms{" "}
                <span className={styles.tech}>hallucination detection</span>,{" "}
                <span className={styles.tech}>LLM output validation</span>,
                prompt-response consistency using{" "}
                <span className={styles.tech}>DeepEval</span> and{" "}
                <span className={styles.tech}>LangSmith</span>. Before that
                became a job title anyone recognised, I was already doing it.
              </p>
              <p>
                I&apos;m moving toward{" "}
                <span className={styles.tech}>AI evaluation engineering</span>{" "}
                more deliberately{" "}
                <span className={styles.tech}>deep learning</span> foundations,{" "}
                <span className={styles.tech}>agentic AI</span> architectures,
                and the kind of work that organisations like Anthropic and METR
                are doing around{" "}
                <span className={styles.tech}>model evaluation</span> and AI
                safety.
              </p>
            </div>
          </div>

          <div className={styles.stats}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <span className={`text-h1 ${styles.statValue}`}>
                  {stat.value}
                </span>
                <span className={`text-label ${styles.statLabel}`}>
                  {stat.label}
                </span>
                {"tooltip" in stat && stat.tooltip ? (
                  <span className={styles.tooltip} role="tooltip">
                    {stat.tooltip}
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
