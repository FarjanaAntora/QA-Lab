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
          These are the instruments. The skill is knowing when and when not to
          use them.
        </p>

        <div className={styles.tiers}>
          <div className={styles.tier}>
            <p className={`text-label ${styles.tierLabel}`}>Core</p>
            <p className={styles.tierNote}>
              What the case studies are built with.
            </p>
            <div className={styles.coreTags}>
              {toolbox.core.map((item) => (
                <TechTag key={item} label={item} size="default" />
              ))}
            </div>
          </div>

          <div className={`${styles.tier} ${styles.tierSupporting}`}>
            <p className={`text-label ${styles.tierLabel}`}>Also used</p>
            <p className={styles.tierNote}>Familiarity, not the main stack.</p>
            <div className={styles.supportTags}>
              {toolbox.supporting.map((item) => (
                <TechTag key={item} label={item} size="compact" />
              ))}
            </div>
          </div>
        </div>

        <p className={styles.types}>
          <span className={`text-label ${styles.typesLabel}`}>
            Testing types
          </span>
          {toolbox.testingTypes.join(" · ")}
        </p>
      </ScrollReveal>
    </section>
  );
}
