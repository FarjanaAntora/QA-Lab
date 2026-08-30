import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "CV - THE QA LAB",
  description:
    "Interactive Matrix CV experience for Aktia Farjana Antora, Senior QA Automation Engineer.",
};

export default function CvLayout({ children }: { children: ReactNode }) {
  return children;
}
