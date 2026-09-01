import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "CV - THE QA LAB",
  description:
    "Curriculum vitae for Aktia Farjana Antora, AI Quality Engineer.",
};

export default function CvLayout({ children }: { children: ReactNode }) {
  return children;
}
