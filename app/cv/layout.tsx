import type { Metadata } from "next";
import type { ReactNode } from "react";
import { OG_IMAGE_PATH, absoluteUrl } from "@/lib/site";

const title = "CV | Aktia Farjana Antora — Lead SQA Engineer";
const description =
  "Curriculum vitae for Aktia Farjana Antora, Lead SQA Engineer.";

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
    images: [
      {
        url: OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [OG_IMAGE_PATH],
  },
};

export default function CvLayout({ children }: { children: ReactNode }) {
  return children;
}
