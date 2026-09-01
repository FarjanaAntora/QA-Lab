import { cvData } from "@/content/cv";
import styles from "./CV.module.css";

export default function CV() {
  return (
    <section id="cv" className={styles.section}>
      <div className={styles.buttonRow}>
        <a href="/cv" className={styles.interactiveButton}>
          VIEW CV
        </a>
        <a
          href="/cv-antora.pdf"
          className={styles.downloadButton}
          download={cvData.pdfDownloadName}
        >
          DOWNLOAD PDF
        </a>
      </div>
    </section>
  );
}
