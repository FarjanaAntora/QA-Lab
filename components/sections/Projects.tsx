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
        </ScrollReveal>

        <FocalProjects />
      </div>
    </section>
  );
}
