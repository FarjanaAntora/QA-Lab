"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import styles from "./Nav.module.css";

const links = [
  { label: "ME", href: "#me" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "PROJECTS", href: "#projects" },
  { label: "THE LAB", href: "#the-lab" },
  { label: "CV", href: "#cv" },
  { label: "CONTACT", href: "#contact" },
] as const;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}
      >
        <a href="#" className={styles.brand}>
          THE QA LAB
        </a>

        <nav className={styles.links} aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={22} strokeWidth={1.5} />
        </button>
      </header>

      {menuOpen ? (
        <div className={styles.overlay} role="dialog" aria-modal="true">
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} strokeWidth={1.5} />
          </button>

          <nav className={styles.overlayLinks} aria-label="Mobile">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={styles.overlayLink}
                onClick={handleLinkClick}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </>
  );
}
