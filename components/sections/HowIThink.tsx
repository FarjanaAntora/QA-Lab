"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";
import styles from "./HowIThink.module.css";

const modes = [
  "FUNCTIONAL",
  "BOUNDARY",
  "NEGATIVE",
  "SECURITY",
  "PERFORMANCE",
  "ACCESSIBILITY",
] as const;

type Mode = (typeof modes)[number];

const modeContent: Record<
  Mode,
  {
    heading: string;
    considerations: string[];
  }
> = {
  FUNCTIONAL: {
    heading: "Does it do what it's supposed to do?",
    considerations: [
      "Valid email + correct password → successful login",
      "Valid email + wrong password → error message, stay on login page",
      'Case sensitivity: is "User@Email.com" the same as "user@email.com"?',
      'Does "forgot password" actually send a reset email?',
      "What happens after 3 failed attempts?",
      "Does the session persist correctly after login?",
    ],
  },
  BOUNDARY: {
    heading: "What happens at the edges?",
    considerations: [
      "Email field: what is the maximum allowed length? What happens at 255 characters?",
      "Password: minimum 8 characters — what about exactly 7? Exactly 8?",
      "What about a password that is 500 characters long?",
      "Empty email + valid password — which error fires first?",
      "Unicode characters in the email field",
      "Whitespace only in both fields",
    ],
  },
  NEGATIVE: {
    heading: "What happens when it goes wrong?",
    considerations: [
      "SQL injection in the email field: ' OR 1=1 --",
      "HTML in the password: <script>alert('xss')</script>",
      "What if the auth server is down — does the UI fail gracefully?",
      "Copy-pasting a password with leading/trailing spaces",
      "Submitting the form twice rapidly — does it send two login requests?",
      "Back button after login — can you return to the login page?",
    ],
  },
  SECURITY: {
    heading: "What should never be possible?",
    considerations: [
      "Is the password masked by default? Can it be revealed?",
      "Is the password transmitted over HTTPS only?",
      "Is the session token httpOnly and secure?",
      "After logout, does the session token become invalid?",
      "Can you brute-force the login? Is there rate limiting?",
      "Are failed login attempts logged for anomaly detection?",
    ],
  },
  PERFORMANCE: {
    heading: "What happens under pressure?",
    considerations: [
      "Login response time under normal load: should be <500ms",
      "What happens with 1000 concurrent login attempts?",
      "Does the system degrade gracefully or fail completely?",
      "Does a slow auth server cause the UI to freeze or show a timeout state?",
      "Are login API calls cached anywhere they shouldn't be?",
      "What is the timeout threshold — and what happens when it's hit?",
    ],
  },
  ACCESSIBILITY: {
    heading: "Can everyone use it?",
    considerations: [
      "Is the form fully keyboard-navigable (Tab, Enter, Escape)?",
      "Do error messages have sufficient color contrast?",
      "Are form fields properly labelled for screen readers?",
      'Does the "show password" toggle work with a keyboard?',
      "Is focus managed correctly after a failed login?",
      "Are ARIA roles and live regions used for error announcements?",
    ],
  },
};

export default function HowIThink() {
  const [mode, setMode] = useState<Mode>("FUNCTIONAL");
  const active = modeContent[mode];

  return (
    <section id="how-i-think" className={`section ${styles.section}`}>
      <ScrollReveal className="container">
        <SectionLabel number="05" title="HOW I THINK" />

        <div className={styles.opening}>
          <h2 className={`text-h2 ${styles.openingLeft}`}>
            Most testers ask: does it work?
          </h2>
          <p className={`text-body ${styles.openingRight}`}>
            I also ask: what happens when it doesn&apos;t? What happens at the
            boundary? What happens when two things are true at once? What
            happens when a human does something unexpected?
          </p>
        </div>

        <div className={styles.demo}>
          <h3 className={`text-label ${styles.demoHeading}`}>
            CHOOSE A TESTING LENS
          </h3>
          <p className={styles.demoSubtext}>
            Select a perspective. See how a QA engineer thinks about the same
            problem.
          </p>

          <div className={styles.modes} role="tablist" aria-label="Testing lenses">
            {modes.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={mode === item}
                className={`${styles.modeButton} ${
                  mode === item ? styles.modeButtonActive : ""
                }`}
                onClick={() => setMode(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className={styles.split}>
            <div className={styles.formPanel}>
              <p className={`text-label ${styles.formLabel}`}>LOGIN FORM</p>
              <form
                className={styles.form}
                onSubmit={(event) => event.preventDefault()}
              >
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Email</span>
                  <input
                    type="email"
                    className={styles.input}
                    placeholder="you@company.com"
                    tabIndex={-1}
                    readOnly
                    aria-readonly="true"
                  />
                </label>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Password</span>
                  <input
                    type="password"
                    className={styles.input}
                    placeholder="••••••••"
                    value="password"
                    tabIndex={-1}
                    readOnly
                    aria-readonly="true"
                  />
                </label>
                <button type="button" className={styles.loginButton}>
                  LOG IN
                </button>
                <button type="button" className={styles.forgot}>
                  Forgot password?
                </button>
              </form>
            </div>

            <div className={styles.panel}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className={`text-h3 ${styles.panelHeading}`}>
                    {active.heading}
                  </h3>
                  <ul className={styles.considerations}>
                    {active.considerations.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
