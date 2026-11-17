import FocalProjects from "@/components/sections/FocalProjects";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";
import styles from "./Projects.module.css";

export default function Projects() {
  return (
    <section id="projects" className={`section ${styles.projects}`}>
      <div className="container">
        <ScrollReveal>
          <SectionLabel number="04" title="PROJECTS" />

          <h2 className={`text-h2 ${styles.heading}`}>Work worth showing.</h2>
          <p className={`text-body ${styles.subcopy}`}>
            Case studies, not repository lists.
          </p>

          <blockquote className={styles.framing}>
            <p>
              Different systems. Different risks. Different outcomes. I have
              found 160+ defects in one A/B test, 457+ in a single ERP module,
              and only 2 in a 120-hour project.
            </p>
            <p>
              The counts are not in conflict. They are the context. The work
              is not to make the bug count bigger. It is to make the risk
              smaller.
            </p>
          </blockquote>
        </ScrollReveal>

        <FocalProjects />
      </div>
    </section>
  );
}
