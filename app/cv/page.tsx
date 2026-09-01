import CvDocument from "@/components/cv/CvDocument";
import CvMatrixFrame from "@/components/cv/CvMatrixFrame";
import CvToolbar from "@/components/cv/CvToolbar";
import styles from "./page.module.css";

export default function CvPage() {
  return (
    <main className={styles.page} data-cv-stage aria-label="View Interactive CV">
      <CvMatrixFrame />
      <div className={styles.inner}>
        <CvToolbar />
        <CvDocument />
      </div>
    </main>
  );
}
