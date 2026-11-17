"use client";

import { motion, useReducedMotion } from "framer-motion";
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

type Lens = {
  heading: string;
  considerations: string[];
};

const scenarios = [
  { id: "login", label: "Login form" },
  { id: "extraction", label: "AI document extraction" },
] as const;

type ScenarioId = (typeof scenarios)[number]["id"];

const scenarioContent: Record<ScenarioId, Record<Mode, Lens>> = {
  login: {
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
      "Password: minimum 8 characters what about exactly 7? Exactly 8?",
      "What about a password that is 500 characters long?",
      "Empty email + valid password which error fires first?",
      "Unicode characters in the email field",
      "Whitespace only in both fields",
    ],
  },
  NEGATIVE: {
    heading: "What happens when it goes wrong?",
    considerations: [
      "SQL injection in the email field: ' OR 1=1 --",
      "HTML in the password: <script>alert('xss')</script>",
      "What if the auth server is down does the UI fail gracefully?",
      "Copy-pasting a password with leading/trailing spaces",
      "Submitting the form twice rapidly does it send two login requests?",
      "Back button after login can you return to the login page?",
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
      "What is the timeout threshold and what happens when it's hit?",
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
  },
  extraction: {
    FUNCTIONAL: {
      heading: "What does a correct extraction look like, end to end?",
      considerations: [
        "The page is stored, the text is read, and each required field is filled from that text",
        "Every stored value cites the page and the span it came from",
        "A field that is absent on the page stays empty",
        "A person can accept, correct, or reject the extraction before it is written",
        "Anything downstream uses the verified value, not the raw model string",
      ],
    },
    BOUNDARY: {
      heading: "Where does extraction quality degrade?",
      considerations: [
        "A faint scan, a stamp across the line, or a page photographed at an angle",
        "Handwriting that could be a 1 or a 7, or a name with an ambiguous letter",
        "A value that starts on one page and finishes on the next",
        "The same field printed twice, where the later line amends the first",
        "A blank page, a cover sheet, or a page from a different document in the packet",
      ],
    },
    NEGATIVE: {
      heading: "What does a hallucinated value look like when it is plausible?",
      considerations: [
        "A dosage that is clinically ordinary, and is not printed on the page",
        "A date that is a real calendar date, and is not the date on the document",
        "A patient name one character away from another name in the same batch",
        "Catch it by requiring a source span. No span, no write",
        "Score the field against the page text. A fluent value with nothing to cite fails",
        "Send the uncited field to a person instead of letting the model fill the gap",
      ],
    },
    SECURITY: {
      heading: "What if one tenant's pipeline could expose another's document?",
      considerations: [
        "Tenant A's extraction written into tenant B's store, log, or prompt context",
        "A page that tells the model to ignore the document and return another patient's record",
        "Entitlement checked when the file is fetched, not only when the screen renders",
        "Traces, embeddings, and model logs scoped to the tenant that owns the document",
        "An audit entry for who opened the file, who accepted the extraction, and what they changed",
      ],
    },
    PERFORMANCE: {
      heading: "How would you know quality had dropped, before anyone complains?",
      considerations: [
        "Faithfulness and citation rate on a sample of production documents, not one happy-path fixture",
        "A rise in human corrections on a field that used to pass through",
        "The same document re-run after a prompt or model change, compared with the last accepted output",
        "A trace when the call chain gets longer, or when a fallback model takes over",
        "A slow read shows a waiting state. It does not write a partial record",
        "A backlog of pages does not skip the citation check to catch up",
      ],
    },
    ACCESSIBILITY: {
      heading: "Can the person who has to review the extraction actually do it?",
      considerations: [
        "A field that needs review is named as such. Color is not the only signal",
        "Keyboard reaches every field, the source page, and accept, correct, or reject",
        "A screen reader reads the value and whether it has a source",
        "Focus lands on the first field a person has to resolve",
        "The source image has a text alternative of the line that was read",
        "The message names the field with no citation, and what to do next",
      ],
    },
  },
};

function ExtractionSpecimen() {
  return (
    <div className={styles.specimen}>
      <p className={`text-label ${styles.formLabel}`}>SOURCE PAGE</p>
      <p className={styles.sourceLine}>
        Metformin 500 mg
        <span className={styles.sourceMeta}>printed on page 2</span>
      </p>
      <p className={styles.sourceLine}>
        Date of service
        <span className={styles.sourceMeta}>not printed</span>
      </p>
      <p className={`text-label ${styles.extractedLabel}`}>EXTRACTED</p>
      <ul className={styles.extracted}>
        <li>
          <span className={styles.extractedName}>Medication</span>
          <span>Metformin 500 mg</span>
          <span className={styles.cited}>cited</span>
        </li>
        <li>
          <span className={styles.extractedName}>Date of service</span>
          <span>14 Mar 2024</span>
          <span className={styles.uncited}>no source span</span>
        </li>
      </ul>
    </div>
  );
}

export default function HowIThink() {
  const [scenario, setScenario] = useState<ScenarioId>("login");
  const [mode, setMode] = useState<Mode>("FUNCTIONAL");
  const active = scenarioContent[scenario][mode];
  const reduce = useReducedMotion();

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
            The login form is the simple case. AI document extraction is the
            work. Same lenses either way.
          </p>

          <div
            className={styles.scenarios}
            role="radiogroup"
            aria-label="Example"
          >
            {scenarios.map((item) => (
              <button
                key={item.id}
                type="button"
                role="radio"
                aria-checked={scenario === item.id}
                className={`${styles.modeButton} ${
                  scenario === item.id ? styles.modeButtonActive : ""
                }`}
                onClick={() => setScenario(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

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
              {scenario === "login" ? (
                <>
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
                </>
              ) : (
                <ExtractionSpecimen />
              )}
            </div>

            <div className={styles.panel}>
              <motion.div
                key={`${scenario}-${mode}`}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: reduce ? 0 : 0.2 }}
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
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
