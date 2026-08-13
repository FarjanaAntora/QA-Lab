import { toolbox } from "@/content/toolbox";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TechTag from "@/components/ui/TechTag";
import styles from "./Toolbox.module.css";

export default function Toolbox() {
  return (
    <section id="toolbox" className={`section ${styles.toolbox}`}>
      <ScrollReveal className="container">
        <SectionLabel number="03" title="TOOLBOX" />

        <h2 className={`text-h2 ${styles.heading}`}>
          The tools are not the skill.
        </h2>
        <p className={`text-body ${styles.subcopy}`}>
          These are the instruments. The skill is knowing when — and when not —
          to use them.
        </p>

        <div className={styles.grid}>
          {toolbox.map((group) => (
            <article key={group.category} className={styles.card}>
              <h3 className={`text-label ${styles.category}`}>
                {group.category}
              </h3>
              <div className={styles.tags}>
                {group.items.map((item) => (
                  <TechTag key={item} label={item} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
