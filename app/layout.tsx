import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import ThemeProvider from "@/components/theme/ThemeProvider";
import FriendsWalk from "@/components/ui/FriendsWalk";
import { SITE_URL, absoluteUrl } from "@/lib/site";
import { THEME_BOOT_SCRIPT } from "@/lib/theme";
import "./globals.css";

const homeTitle = "Aktia Farjana Antora | Lead SQA Engineer";
const homeDescription =
  "Manual testing first, with automation and AI-assisted QA.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: homeTitle,
  description: homeDescription,
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: absoluteUrl("/"),
    siteName: "THE QA LAB",
    title: homeTitle,
    description: homeDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
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
