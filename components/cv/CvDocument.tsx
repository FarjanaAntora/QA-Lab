import { cvData } from "@/content/cv";
import styles from "./CvDocument.module.css";

export default function CvDocument() {
  return (
    <article
      className={styles.paper}
      aria-label="Curriculum vitae"
      data-testid="cv-paper"
    >
      <header className={styles.masthead}>
        <h1 className={styles.name}>{cvData.name}</h1>
        <p className={styles.title}>{cvData.title}</p>
        <p className={styles.specialty}>{cvData.specialty}</p>
        <p className={styles.contact}>
          <span>{cvData.location}</span>
          <span aria-hidden="true"> · </span>
          <a href={`tel:${cvData.phone.replace(/\s/g, "")}`}>{cvData.phone}</a>
          <span aria-hidden="true"> · </span>
          <a href={`mailto:${cvData.email}`}>{cvData.email}</a>
        </p>
        <p className={styles.contact}>
          <a
            href={`https://${cvData.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {cvData.linkedin}
          </a>
          <span aria-hidden="true"> · </span>
          <a
            href={`https://${cvData.github}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {cvData.github}
          </a>
        </p>
      </header>

      <section className={styles.block}>
        <h2 className={styles.sectionLabel}>{cvData.experienceHeading}</h2>
        {cvData.experience.map((role) => (
          <div key={`${role.role}-${role.period}`} className={styles.role}>
            <div className={styles.roleHead}>
              <div>
                <h3 className={styles.roleTitle}>{role.role}</h3>
                <p className={styles.roleCompany}>{role.company}</p>
              </div>
              <p className={styles.rolePeriod}>{role.period}</p>
            </div>

            {role.groups?.map((group) => (
              <div key={group.heading} className={styles.group}>
                <h4 className={styles.groupHeading}>{group.heading}</h4>
                <ul className={styles.bullets}>
                  {group.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}

            {role.bullets ? (
              <ul className={styles.bullets}>
                {role.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </section>

      <section className={styles.block}>
        <h2 className={styles.sectionLabel}>Technical Skills</h2>
        <dl className={styles.skills}>
          {cvData.skills.map((skill) => (
            <div key={skill.category} className={styles.skillRow}>
              <dt>{skill.category}</dt>
              <dd>{skill.items}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={styles.block}>
        <h2 className={styles.sectionLabel}>Key Achievements</h2>
        <ul className={styles.bullets}>
          {cvData.achievements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className={styles.block}>
        <h2 className={styles.sectionLabel}>Education</h2>
        <p className={styles.eduDegree}>
          {cvData.education.degree}
          <span className={styles.eduGrade}> · {cvData.education.grade}</span>
        </p>
        <p className={styles.eduMeta}>
          {cvData.education.university} · {cvData.education.year}
        </p>
      </section>

      <section className={`${styles.block} ${styles.blockLast}`}>
        <h2 className={styles.sectionLabel}>Referees</h2>
        <div className={styles.referees}>
          {cvData.referees.map((referee) => (
            <div key={referee.email} className={styles.referee}>
              <p className={styles.refereeName}>{referee.name}</p>
              <p className={styles.refereeTitle}>{referee.title}</p>
              <p className={styles.refereeMeta}>
                <a href={`mailto:${referee.email}`}>{referee.email}</a>
                <span aria-hidden="true"> · </span>
                <a href={`tel:${referee.phone.replace(/\s/g, "")}`}>
                  {referee.phone}
                </a>
              </p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
