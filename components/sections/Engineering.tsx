import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  engineeringMetrics,
  formatFcp,
  formatMeasuredDate,
} from "@/content/engineering-metrics";
import styles from "./Engineering.module.css";

const REPO_URL = "https://github.com/FarjanaAntora/QA-Lab";
const ACTIONS_URL = "https://github.com/FarjanaAntora/QA-Lab/actions";

export default function Engineering() {
  const metrics = engineeringMetrics;
  const measured = formatMeasuredDate(
    metrics.measuredAt ?? metrics.updatedAt ?? null,
  );
  const listed = metrics.playwright?.listed ?? metrics.playwrightPassed;
  const ciRunnable =
    metrics.playwright?.ciRunnable ?? metrics.playwrightPassed;
  const lh = metrics.lighthouse?.summary;
  const fcp = formatFcp(lh?.fcpMs ?? null);
  const axeStatement =
    metrics.axe?.statement ??
    (typeof metrics.axeViolations === "number"
      ? `axe-core: ${metrics.axeViolations} violations on the pages tested (automated checks only).`
      : null);
  const workflowUrl =
    metrics.ci?.latestWorkflowRun?.url ?? metrics.ci?.actionsUrl ?? ACTIONS_URL;
  const repoUrl = metrics.ci?.repoUrl ?? REPO_URL;

  return (
    <section id="engineering" className={`section ${styles.section}`}>
      <ScrollReveal className="container">
        <SectionLabel number="07" title="ENGINEERING" />

        <div className={styles.compact}>
          <h2 className={`text-h3 ${styles.heading}`}>
            The portfolio tests itself.
          </h2>

          <p className={styles.body}>
            {typeof listed === "number" ? (
              <>
                <strong>{listed}</strong> Playwright tests in the suite
                {typeof ciRunnable === "number" && ciRunnable !== listed ? (
                  <>
                    {" "}
                    (<strong>{ciRunnable}</strong> run in CI;{" "}
                    {metrics.playwright?.productionSkippedWithoutProdUrl ?? 3}{" "}
                    production smokes skip unless <code>PROD_URL</code> is set)
                  </>
                ) : null}
                . GitHub Actions runs the suite on push and pull request to{" "}
                <code>main</code> and <code>motion</code> — not on every branch
                push.
              </>
            ) : (
              <>Playwright suite size has not been measured yet.</>
            )}
          </p>

          {lh ? (
            <p className={styles.body}>
              Lighthouse (mobile + desktop on home, a case study, and CV),
              measured {measured}: performance{" "}
              <strong>{lh.performance}</strong>, accessibility{" "}
              <strong>{lh.accessibility}</strong>, SEO <strong>{lh.seo}</strong>
              {fcp ? (
                <>
                  , FCP <strong>{fcp}</strong>
                </>
              ) : null}
              . Values are the minima across those runs — not a “95+” claim.
            </p>
          ) : null}

          {axeStatement ? (
            <p className={styles.body}>
              {axeStatement} Measured {measured}.
            </p>
          ) : null}

          <p className={styles.links}>
            <a href={repoUrl} target="_blank" rel="noopener noreferrer">
              Public repo ↗
            </a>
            <span aria-hidden="true"> · </span>
            <a href={workflowUrl} target="_blank" rel="noopener noreferrer">
              Latest CI run ↗
            </a>
            <span aria-hidden="true"> · </span>
            <a href={ACTIONS_URL} target="_blank" rel="noopener noreferrer">
              All workflow runs ↗
            </a>
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
