import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";
import { getEngineeringCards } from "@/content/engineering-metrics";
import styles from "./Engineering.module.css";

export default function Engineering() {
  const cards = getEngineeringCards();

  return (
    <section id="engineering" className={`section ${styles.section}`}>
      <ScrollReveal className="container">
        <SectionLabel number="07" title="ENGINEERING" />

        <h2 className={`text-h2 ${styles.heading}`}>
          The portfolio tests itself.
        </h2>
        <p className={`text-body ${styles.subcopy}`}>
          Playwright in this repo covers navigation, themes, and the CV download.
          Counts below come from the latest CI metrics file, not placeholders.
        </p>

        <StaggerGroup className={styles.grid}>
          {cards.map((card) => (
            <StaggerItem key={card.label}>
              <article className={styles.card}>
                <p className={`text-label ${styles.label}`}>{card.label}</p>
                <div className={styles.valueRow}>
                  <p className={`text-h2 ${styles.value}`}>{card.value}</p>
                  {card.live ? (
                    <span className={styles.pulse} aria-label="Live" />
                  ) : null}
                </div>
                <p className={styles.note}>{card.note}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <p className={`text-label ${styles.footnote}`}>
          GitHub Actions runs Playwright (JSON reporter), axe-core, and Lighthouse
          CI on push, then writes{" "}
          <code>content/engineering-metrics.json</code> for the next build.
          Cards without a measured value are omitted.
        </p>
      </ScrollReveal>
    </section>
  );
}
