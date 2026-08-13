import { cvData } from "@/content/cv";
import { experience } from "@/content/experience";
import { toolbox } from "@/content/toolbox";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";
import styles from "./CV.module.css";

export default function CV() {
  return (
    <section id="cv" className={`section ${styles.section}`}>
      <ScrollReveal className="container">
        <SectionLabel number="08" title="CV" />

        <div className={styles.downloadBlock}>
          <a href="/cv-antora.pdf" className={styles.downloadButton}>
            DOWNLOAD CV (PDF)
          </a>
          <p className={styles.downloadNote}>
            Or view the interactive version above.
          </p>
        </div>

        <header className={styles.header}>
          <h1 className={`text-h1 ${styles.name}`}>{cvData.name}</h1>
          <p className={`text-h3 ${styles.title}`}>{cvData.title}</p>
          <p className={styles.contactRow}>
            <a href={`mailto:${cvData.email}`}>{cvData.email}</a>
            <span aria-hidden="true"> · </span>
            <a href={`tel:${cvData.phone.replace(/\s/g, "")}`}>{cvData.phone}</a>
            <span aria-hidden="true"> · </span>
            <span>{cvData.location}</span>
          </p>
        </header>

        <div className={styles.block}>
          <h2 className={`text-label ${styles.blockLabel}`}>EXPERIENCE</h2>
          <div className={styles.roles}>
            {experience.map((role, index) => (
              <div key={role.id}>
                <h3 className={styles.roleTitle}>{role.role}</h3>
                <p className={styles.roleMeta}>
                  {role.company} · {role.period}
                </p>
                <ul className={styles.bullets}>
                  {role.responsibilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {index < experience.length - 1 ? (
                  <hr className={styles.rule} />
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.block}>
          <h2 className={`text-label ${styles.blockLabel}`}>EDUCATION</h2>
          <p className={styles.eduDegree}>{cvData.education.degree}</p>
          <p className={styles.eduMeta}>
            {cvData.education.university} · {cvData.education.year} ·{" "}
            {cvData.education.grade}
          </p>
        </div>

        <div className={styles.block}>
          <h2 className={`text-label ${styles.blockLabel}`}>SKILLS</h2>
          <div className={styles.skills}>
            {toolbox.map((group) => (
              <p key={group.category} className={styles.skillGroup}>
                <span className={styles.skillCategory}>{group.category}:</span>{" "}
                {group.items.join(", ")}
              </p>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
