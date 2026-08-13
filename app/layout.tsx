import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "THE QA LAB — Aktia Farjana Antora",
  description:
    "Senior QA Automation Engineer. Playwright · AI Testing · CI/CD · Performance. I break software for a living.",
  openGraph: {
    title: "THE QA LAB — Aktia Farjana Antora",
    description:
      "Senior QA Automation Engineer. Playwright · AI Testing · CI/CD · Performance. I break software for a living.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Nav />
        {children}
      </body>
    </html>
  );
}
