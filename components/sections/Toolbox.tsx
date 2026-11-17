import { toolbox } from "@/content/toolbox";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";
import TechTag from "@/components/ui/TechTag";
import styles from "./Toolbox.module.css";

function Tier({
  label,
  items,
  tone,
}: {
  label: string;
  items: string[];
  tone: "core" | "supporting";
}) {
  if (items.length === 0) return null;

  return (
    <div className={tone === "core" ? styles.coreBlock : styles.supportBlock}>
      <p className={`text-label ${styles.tier}`}>{label}</p>
      <div className={tone === "core" ? styles.tags : styles.supportingTags}>
        {items.map((item) => (
          <TechTag key={item} label={item} />
        ))}
      </div>
    </div>
  );
}

export default function Toolbox() {
  const depth = toolbox.filter((group) => group.core.length > 0);
  const familiarity = toolbox.filter(
    (group) => group.core.length === 0 && !group.quiet,
  );
  const testingTypes = toolbox.find((group) => group.quiet);

  return (
    <section id="toolbox" className={`section ${styles.toolbox}`}>
      <ScrollReveal className="container">
        <SectionLabel number="03" title="TOOLBOX" />

        <h2 className={`text-h2 ${styles.heading}`}>
          The tools are not the skill.
        </h2>
        <p className={`text-body ${styles.subcopy}`}>
          These are the instruments. The skill is knowing when and when not to
          use them. Core is what the case studies are built with. Also used is
          familiarity.
        </p>

        <StaggerGroup className={styles.grid}>
          {depth.map((group) => (
            <StaggerItem key={group.category}>
              <article className={styles.card}>
                <h3 className={`text-label ${styles.category}`}>
                  {group.category}
                </h3>
                <Tier label="Core" items={group.core} tone="core" />
                <Tier
                  label="Also used"
                  items={group.supporting}
                  tone="supporting"
                />
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className={styles.supportBand}>
          {familiarity.map((group) => (
            <article key={group.category} className={styles.supportCard}>
              <h3 className={`text-label ${styles.supportCategory}`}>
                {group.category}
              </h3>
              <Tier
                label="Also used"
                items={group.supporting}
                tone="supporting"
              />
            </article>
          ))}
        </div>

        {testingTypes ? (
          <p className={styles.types}>
            <span className={`text-label ${styles.typesLabel}`}>
              Testing types
            </span>
            {testingTypes.supporting.join(" · ")}
          </p>
        ) : null}
      </ScrollReveal>
    </section>
  );
}
