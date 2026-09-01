import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import ThemeProvider from "@/components/theme/ThemeProvider";
import FriendsWalk from "@/components/ui/FriendsWalk";
import { THEME_BOOT_SCRIPT } from "@/lib/theme";
import "./globals.css";

export const metadata: Metadata = {
  title: "THE QA LAB Aktia Farjana Antora",
  description:
    "Senior QA Automation Engineer. Playwright | AI/ML Quality Engineering | CI/CD | Performance. I break software for a living.",
  openGraph: {
    title: "THE QA LAB Aktia Farjana Antora",
    description:
      "Senior QA Automation Engineer. Playwright | AI/ML Quality Engineering | CI/CD | Performance. I break software for a living.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Nav />
          {children}
          <FriendsWalk />
        </ThemeProvider>
      </body>
    </html>
  );
}
