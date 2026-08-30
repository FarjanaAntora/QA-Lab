"use client";

import { Download } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import MatrixRain from "@/components/ui/MatrixRain";
import TechTag from "@/components/ui/TechTag";
import { cvData } from "@/content/cv";
import { experience } from "@/content/experience";
import { toolbox } from "@/content/toolbox";
import styles from "./page.module.css";

type Phase = "entry" | "transition" | "revealed";

const ACCESS_LABEL = "[ ACCESS CV ]";

export default function MatrixCvPage() {
  const [phase, setPhase] = useState<Phase>("entry");
  const [showAccess, setShowAccess] = useState(false);
  const [typedAccess, setTypedAccess] = useState("");
  const [rainOpacity, setRainOpacity] = useState(0.28);
  const [rainInterval, setRainInterval] = useState(50);
  const [cvVisible, setCvVisible] = useState(false);

  useEffect(() => {
    const showTimer = window.setTimeout(() => {
      setShowAccess(true);
    }, 1500);
    return () => window.clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!showAccess || phase !== "entry") return;

    let index = 0;
    setTypedAccess("");
    const typeTimer = window.setInterval(() => {
      index += 1;
      setTypedAccess(ACCESS_LABEL.slice(0, index));
      if (index >= ACCESS_LABEL.length) {
        window.clearInterval(typeTimer);
      }
    }, 45);

    return () => window.clearInterval(typeTimer);
  }, [showAccess, phase]);

  const handleAccess = () => {
    if (phase !== "entry") return;
    setPhase("transition");
    setRainInterval(200);

    window.setTimeout(() => {
      setRainOpacity(0);
    }, 600);

    window.setTimeout(() => {
      setPhase("revealed");
      setRainOpacity(0.1);
      setRainInterval(200);
      setCvVisible(false);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setCvVisible(true);
        });
      });
    }, 1000);
  };

  const handleReturnToEntry = () => {
    setPhase("entry");
    setRainOpacity(0.28);
    setRainInterval(50);
    setCvVisible(false);
  };

  useEffect(() => {
    if (phase !== "revealed") return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleReturnToEntry();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [phase]);

  return (
    <main className={styles.page}>
      <div className={`${styles.rainLayer} ${styles.printHide}`}>
        <MatrixRain
          opacity={rainOpacity}
          active={phase !== "transition" || rainOpacity > 0}
          intervalMs={rainInterval}
        />
      </div>

      {phase !== "revealed" ? (
        <div className={`${styles.entryOverlay} ${styles.printHide}`}>
          <div className={styles.entryBox}>
            <div className={styles.entryBoxRain} aria-hidden="true">
              <MatrixRain opacity={0.08} intervalMs={90} />
            </div>
            <div className={styles.entryBoxContent}>
              <p className={`text-label ${styles.entrySmall}`}>
                INITIALIZING...
              </p>
              <h1 className={styles.entryName}>AKTIA FARJANA ANTORA</h1>
              <p className={`text-label ${styles.entrySmall}`}>
                SENIOR QA AUTOMATION ENGINEER
              </p>

              {showAccess ? (
                <button
                  type="button"
                  className={styles.accessButton}
                  onClick={handleAccess}
                >
                  {typedAccess}
                  <span className={styles.cursor} aria-hidden="true">
                    {typedAccess.length < ACCESS_LABEL.length ? "_" : ""}
                  </span>
                </button>
              ) : (
                <div className={styles.accessPlaceholder} />
              )}
            </div>
          </div>
        </div>
      ) : null}

      {phase === "revealed" ? (
        <div
          className={`${styles.cvShell} ${cvVisible ? styles.cvShellVisible : ""}`}
        >
        <div className={styles.cvPanel}>
          <div className={`${styles.topBar} ${styles.printHide}`}>
            <Link href="/" className={`text-label ${styles.back}`}>
              ← BACK
            </Link>
            <div className={styles.actions}>
              <a
                href="/cv-antora.pdf"
                className={styles.downloadButton}
                download="Aktia Farjana Antora AIQA.pdf"
              >
                <Download size={14} strokeWidth={1.75} aria-hidden="true" />
                DOWNLOAD PDF
              </a>
              <button
                type="button"
                className={styles.printButton}
                onClick={() => window.print()}
              >
                PRINT
              </button>
            </div>
          </div>

          <header className={styles.header}>
            <h1 className={styles.name}>{cvData.name}</h1>
            <p className={`text-label ${styles.title}`}>{cvData.title}</p>
            <p className={styles.contact}>
              <a href={`mailto:${cvData.email}`}>{cvData.email}</a>
              <span aria-hidden="true"> · </span>
              <a href={`tel:${cvData.phone.replace(/\s/g, "")}`}>
                {cvData.phone}
              </a>
              <span aria-hidden="true"> · </span>
              <span>{cvData.location}</span>
            </p>
          </header>

          <section className={styles.block}>
            <h2 className={`text-label ${styles.blockHeading}`}>SUMMARY</h2>
            <p className={styles.summary}>{cvData.summary}</p>
          </section>

          <section className={styles.block}>
            <h2 className={`text-label ${styles.blockHeading}`}>EXPERIENCE</h2>
            {experience.map((role, index) => (
              <article key={role.id} className={styles.role}>
                <div className={styles.roleHeader}>
                  <div className={styles.roleLeft}>
                    <span className={styles.roleTitle}>{role.role}</span>
                    <span className={styles.roleCompany}>{role.company}</span>
                  </div>
                  <span className={`text-label ${styles.rolePeriod}`}>
                    {role.period}
                  </span>
                </div>
                <ul className={styles.bullets}>
                  {role.responsibilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className={styles.tags}>
                  {role.technologies.map((tech) => (
                    <TechTag key={tech} label={tech} />
                  ))}
                </div>
                {index < experience.length - 1 ? (
                  <hr className={styles.rule} />
                ) : null}
              </article>
            ))}
          </section>

          <section className={styles.block}>
            <h2 className={`text-label ${styles.blockHeading}`}>EDUCATION</h2>
            <p className={styles.eduDegree}>{cvData.education.degree}</p>
            <p className={styles.eduMeta}>
              {cvData.education.university} | {cvData.education.year} |{" "}
              {cvData.education.grade}
            </p>
          </section>

          <section className={styles.block}>
            <h2 className={`text-label ${styles.blockHeading}`}>SKILLS</h2>
            <div className={styles.skills}>
              {toolbox.map((group) => (
                <p key={group.category} className={styles.skillRow}>
                  <span className={styles.skillCategory}>{group.category}</span>{" "}
                  <span className={styles.skillItems}>
                    {group.items.join(", ")}
                  </span>
                </p>
              ))}
            </div>
          </section>

          <p className={`text-label ${styles.hint} ${styles.printHide}`}>
            Press ESC to return · Press CTRL+P to print
          </p>
        </div>
      </div>
      ) : null}
    </main>
  );
}
