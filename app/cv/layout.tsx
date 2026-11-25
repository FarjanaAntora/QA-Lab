import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CV_HEADLINE } from "@/content/cv";
import { absoluteUrl } from "@/lib/site";

const title = `CV | Aktia Farjana Antora — ${CV_HEADLINE}`;
const description = CV_HEADLINE;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: absoluteUrl("/cv"),
  },
  openGraph: {
    title,
    description,
    url: absoluteUrl("/cv"),
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function CvLayout({ children }: { children: ReactNode }) {
  return children;
}
