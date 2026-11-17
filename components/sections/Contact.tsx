import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";
import { GITHUB_URL, LINKEDIN_URL } from "@/lib/site";
import styles from "./Contact.module.css";

const links = [
  {
    label: "EMAIL ↗",
    href: "mailto:farjana1319ontu@gmail.com",
  },
  {
    label: "LINKEDIN ↗",
    href: LINKEDIN_URL,
  },
  {
    label: "GITHUB ↗",
    href: GITHUB_URL,
  },
] as const;

export default function Contact() {
  return (
    <section id="contact" className={`section ${styles.section}`}>
      <ScrollReveal className="container">
        <SectionLabel number="08" title="CONTACT" />

        <div className={styles.content}>
          <h2 className={`text-h1 ${styles.headline}`}>
            Have something interesting to break?
          </h2>
          <p className={`text-body ${styles.subcopy}`}>
            I&apos;m open to senior QA and AI quality engineering roles.
            Particularly interested in product companies, evaluation
            infrastructure, and anything at the intersection of reliability and
            intelligence.
          </p>

          <StaggerGroup className={styles.links}>
            {links.map((link) => (
              <StaggerItem key={link.label}>
                <a
                  href={link.href}
                  className={`text-label ${styles.link}`}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  {link.label}
                </a>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <hr className={styles.rule} />

          <p className={`text-label ${styles.footer}`}>
            © 2026 Aktia Farjana Antora | THE QA LAB | Built and tested with
            Playwright
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
