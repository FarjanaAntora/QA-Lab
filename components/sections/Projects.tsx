import { projects } from "@/content/projects";
import ProjectCard from "@/components/ui/ProjectCard";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";
import styles from "./Projects.module.css";

export default function Projects() {
  return (
    <section id="projects" className={`section ${styles.projects}`}>
      <ScrollReveal className="container">
        <SectionLabel number="04" title="PROJECTS" />

        <h2 className={`text-h2 ${styles.heading}`}>Work worth showing.</h2>
        <p className={`text-body ${styles.subcopy}`}>
          Case studies, not repository lists.
        </p>

        <div className={styles.grid}>
          {projects.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
