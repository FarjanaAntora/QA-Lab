"use client";

import { Download } from "lucide-react";
import Link from "next/link";
import ThemeSwitch from "@/components/theme/ThemeSwitch";
import { cvData } from "@/content/cv";
import styles from "./CvToolbar.module.css";

function printProvidedPdf() {
  const existing = document.querySelector<HTMLIFrameElement>(
    '[data-cv-print-frame="true"]',
  );
  existing?.remove();

  const iframe = document.createElement("iframe");
  iframe.src = cvData.pdfHref;
  iframe.title = "Print CV";
  iframe.setAttribute("data-cv-print-frame", "true");
  iframe.setAttribute("aria-hidden", "true");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";

  const cleanup = () => iframe.remove();

  iframe.addEventListener("load", () => {
    try {
      iframe.contentWindow?.addEventListener("afterprint", cleanup);
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    } catch {
      cleanup();
      window.open(cvData.pdfHref, "_blank", "noopener,noreferrer");
    }
  });

  document.body.appendChild(iframe);
}

export default function CvToolbar() {
  return (
    <div className={styles.bar}>
      <div className={styles.leading}>
        <Link href="/" className={`text-label ${styles.back}`}>
          ← BACK
        </Link>
        <ThemeSwitch />
      </div>
      <div className={styles.actions}>
        <a
          href={cvData.pdfHref}
          className={styles.download}
          download={cvData.pdfDownloadName}
        >
          <Download size={14} strokeWidth={1.75} aria-hidden="true" />
          DOWNLOAD PDF
        </a>
        <button
          type="button"
          className={styles.print}
          onClick={printProvidedPdf}
        >
          PRINT
        </button>
      </div>
    </div>
  );
}
