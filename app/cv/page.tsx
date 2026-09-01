"use client";

import { Download } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import MatrixRain from "@/components/ui/MatrixRain";
import { cvData } from "@/content/cv";
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
        return;
      }

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "p") {
        event.preventDefault();
        window.open("/cv-antora.pdf", "_blank", "noopener,noreferrer");
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
                download={cvData.pdfDownloadName}
              >
                <Download size={14} strokeWidth={1.75} aria-hidden="true" />
                DOWNLOAD PDF
              </a>
              <a
                href="/cv-antora.pdf"
                className={styles.printButton}
                target="_blank"
                rel="noreferrer"
              >
                PRINT
              </a>
            </div>
          </div>

          <iframe
            className={styles.pdfFrame}
            src="/cv-antora.pdf"
            title="Aktia Farjana Antora CV"
          />

          <p className={`text-label ${styles.hint} ${styles.printHide}`}>
            Press ESC to return · Press CTRL+P to print
          </p>
        </div>
      </div>
      ) : null}
    </main>
  );
}
