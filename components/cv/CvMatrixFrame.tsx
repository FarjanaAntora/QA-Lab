"use client";

import MatrixRain from "@/components/ui/MatrixRain";
import styles from "./CvMatrixFrame.module.css";

export default function CvMatrixFrame() {
  return (
    <div className={styles.rain} data-matrix-rain aria-hidden="true">
      <MatrixRain
        opacity={0.26}
        density="dense"
        backgroundToken="--color-bg-primary"
      />
    </div>
  );
}
