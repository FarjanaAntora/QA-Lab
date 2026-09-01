import Link from "next/link";
import TechTag from "@/components/ui/TechTag";
import { hppyFocal, mhmFocal, type FocalProject } from "@/content/focal";
import styles from "./FocalProjects.module.css";

function FocalHeader({ project }: { project: FocalProject }) {
  return (
    <>
      <p className={`text-label ${styles.label}`}>{project.label}</p>
      <h3 className={`text-h2 ${styles.title}`}>{project.title}</h3>
      <p className={styles.positioning}>{project.positioning}</p>
      <p className={styles.summary}>{project.summary}</p>
      <p className={`text-label ${styles.role}`}>{project.role}</p>
    </>
  );
}

function FocalTags({ project }: { project: FocalProject }) {
  return (
    <div className={styles.tags}>
      {project.technologies.map((tech) => (
        <TechTag key={tech} label={tech} />
      ))}
    </div>
  );
}

function FocalCta({ project }: { project: FocalProject }) {
  return (
    <Link href={`/projects/${project.slug}`} className={`text-label ${styles.cta}`}>
      VIEW CASE STUDY →
    </Link>
  );
}

function HppyVisual() {
  return (
    <div className={styles.dataStrip} aria-label="Phase 1 coverage">
      <div className={styles.dataCard}>
        <span className={`text-h2 ${styles.dataValue}`}>88</span>
        <span className={`text-label ${styles.dataNote}`}>User stories</span>
      </div>
      <div className={styles.dataCard}>
        <span className={`text-h2 ${styles.dataValue}`}>23</span>
        <span className={`text-label ${styles.dataNote}`}>Epics</span>
      </div>
      <div className={styles.dataCard}>
        <span className={`text-h2 ${styles.dataValue}`}>1</span>
        <span className={`text-label ${styles.dataNote}`}>Phase 1 plan</span>
      </div>
    </div>
  );
}

function MhmArchitecture() {
  return (
    <div className={styles.architecture} aria-label="Identity flow">
      <div className={styles.archHub}>
        <span className={`text-label ${styles.archName}`}>UIS</span>
        <span className={styles.archHint}>Identity</span>
      </div>
      <div className={styles.archLink} aria-hidden="true">
        <span className={styles.archArrow} />
        <span className={`text-label ${styles.archId}`}>External ID</span>
        <span className={styles.archArrow} />
      </div>
      <div className={styles.archModules}>
        {["PIS", "EHR", "BMS", "Appointments"].map((name) => (
          <div key={name} className={styles.archNode}>
            <span className={`text-label ${styles.archName}`}>{name}</span>
          </div>
        ))}
      </div>
      <p className={styles.archCaption}>
        Patient identity stays in UIS. Other modules reference an External ID.
        They do not copy the record.
      </p>
    </div>
  );
}

export default function FocalProjects() {
  return (
    <div className={styles.stack}>
      <article className={`${styles.focal} ${styles.focalEditorial}`}>
        <div className={styles.copy}>
          <FocalHeader project={hppyFocal} />
          <ul className={styles.capabilities}>
            {hppyFocal.capabilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <FocalTags project={hppyFocal} />
          <FocalCta project={hppyFocal} />
        </div>
        <HppyVisual />
      </article>

      <article className={`${styles.focal} ${styles.focalSplit}`}>
        <div className={styles.copy}>
          <FocalHeader project={mhmFocal} />
          <p className={styles.metric}>
            <span className={`text-h2 ${styles.metricValue}`}>
              {mhmFocal.metric?.value}
            </span>
            <span className={styles.metricNote}>{mhmFocal.metric?.note}</span>
          </p>
          <ul className={styles.capabilities}>
            {mhmFocal.capabilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <FocalTags project={mhmFocal} />
          <FocalCta project={mhmFocal} />
        </div>
        <MhmArchitecture />
      </article>
    </div>
  );
}
