import { projects } from "@/content/projects";
import FocalProjects from "@/components/sections/FocalProjects";
import ProjectCard from "@/components/ui/ProjectCard";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";
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

        <StaggerGroup className={styles.grid}>
          {projects.map((project) => (
            <StaggerItem key={project.slug} className={styles.cardSlot}>
              <ProjectCard
                title={project.title}
                description={project.summary}
                role={project.role}
                technologies={project.technologies}
                slug={project.slug}
                status={project.status}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
