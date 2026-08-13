import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";
import styles from "./Engineering.module.css";

const cards = [
  {
    label: "PLAYWRIGHT TESTS",
    value: "47",
    note: "automated checks, running in CI",
    live: true,
  },
  {
    label: "LIGHTHOUSE SCORE",
    value: "95+",
    note: "performance · accessibility · SEO",
  },
  {
    label: "FRAMEWORKS",
    value: "Next.js 14",
    note: "App Router · TypeScript · Tailwind",
  },
  {
    label: "DEPLOYMENT",
    value: "Vercel",
    note: "CI/CD via GitHub Actions",
  },
  {
    label: "ACCESSIBILITY",
    value: "WCAG AA",
    note: "zero violations in axe-core audit",
  },
  {
    label: "RESPONSE TIME",
    value: "<1s",
    note: "first contentful paint",
  },
] as const;

export default function Engineering() {
  return (
    <section id="engineering" className={`section ${styles.section}`}>
      <ScrollReveal className="container">
        <SectionLabel number="07" title="ENGINEERING" />

        <h2 className={`text-h2 ${styles.heading}`}>
          The portfolio tests itself.
        </h2>
        <p className={`text-body ${styles.subcopy}`}>
          Built with the same discipline I apply to client work.
        </p>

        <div className={styles.grid}>
          {cards.map((card) => (
            <article key={card.label} className={styles.card}>
              <p className={`text-label ${styles.label}`}>{card.label}</p>
              <div className={styles.valueRow}>
                <p className={`text-h2 ${styles.value}`}>{card.value}</p>
                {"live" in card && card.live ? (
                  <span className={styles.pulse} aria-label="Live" />
                ) : null}
              </div>
              <p className={styles.note}>{card.note}</p>
            </article>
          ))}
        </div>

        <p className={`text-label ${styles.footnote}`}>
          Test suite runs automatically on every push. The count above reflects
          the current passing state.
        </p>
      </ScrollReveal>
    </section>
  );
}
