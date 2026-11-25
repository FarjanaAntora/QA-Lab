"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";
import styles from "./HowIThink.module.css";

type Lens = {
  heading: string;
  considerations: string[];
};

const scenarios = [
  { id: "login", label: "Login form" },
  { id: "extraction", label: "AI document extraction" },
] as const;

type ScenarioId = (typeof scenarios)[number]["id"];

const loginModes = [
  "FUNCTIONAL",
  "BOUNDARY",
  "NEGATIVE",
  "SECURITY",
  "PERFORMANCE",
  "ACCESSIBILITY",
] as const;

const extractionModes = [
  "FUNCTIONAL",
  "BOUNDARY",
  "NEGATIVE",
  "SECURITY",
  "AI BEHAVIOUR",
  "OBSERVABILITY",
] as const;

type LoginMode = (typeof loginModes)[number];
type ExtractionMode = (typeof extractionModes)[number];

const loginContent: Record<LoginMode, Lens> = {
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
};

const extractionContent: Record<ExtractionMode, Lens> = {
  FUNCTIONAL: {
    heading: "What does a correct extraction look like, end to end?",
    considerations: [
      "From upload through OCR and structured fields to what is stored — what does “correct” mean at each step?",
      "Does every stored value map back to something on the source page?",
      "If a field is absent on the document, does it stay empty rather than being invented?",
      "Who confirms the extraction before it is written — and can they accept, correct, or reject it?",
      "Do downstream steps use the verified value, not the raw model string?",
    ],
  },
  BOUNDARY: {
    heading: "Where does extraction quality degrade?",
    considerations: [
      "Poor scans: faint pages, skewed photos, stamps across the text",
      "Handwriting that could be read two ways",
      "Multi-page documents where a value starts on one page and finishes on the next",
      "Very large files — does the pipeline finish, or does it silently truncate?",
      "Mixed languages on the same page or in the same packet",
    ],
  },
  NEGATIVE: {
    heading: "What happens when the input is wrong?",
    considerations: [
      "Corrupted files that look uploadable but cannot be read",
      "Wrong file types presented as documents",
      "Empty documents and cover sheets with no extractable content",
      "Duplicate uploads of the same file — does the system create a second record?",
      "How does the UI report failure without writing a partial extraction?",
    ],
  },
  SECURITY: {
    heading: "Can one user's document ever surface for another?",
    considerations: [
      "Can one user's document, extracted values, or chat context ever appear for another user?",
      "Token tampering: changing an ID in the request to reach someone else's file",
      "Injection through free-text fields that end up in prompts or logs",
      "Are entitlements checked when the file is fetched, not only when the screen renders?",
      "Are traces, embeddings, and model logs scoped to the user who owns the document?",
    ],
  },
  "AI BEHAVIOUR": {
    heading: "When does a fluent answer still fail?",
    considerations: [
      "A plausible but unsupported value — ordinary-looking, not on the page",
      "An answer with no source span to cite",
      "A refusal that should have happened, and did not",
      "How do you catch those without asserting an exact string?",
      "When should a person see the field instead of letting the model fill the gap?",
    ],
  },
  OBSERVABILITY: {
    heading: "How would you know quality degraded before a user complained?",
    considerations: [
      "What signal shows extraction quality dropping on real documents, not one happy-path fixture?",
      "A rise in human corrections on a field that used to pass through",
      "Re-running the same document after a prompt or model change and comparing the last accepted output",
      "A trace when the call chain gets longer, or when a fallback model takes over",
      "Does a slow or partial read wait — or write an incomplete record to catch up?",
    ],
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
  const [loginMode, setLoginMode] = useState<LoginMode>("FUNCTIONAL");
  const [extractionMode, setExtractionMode] =
    useState<ExtractionMode>("FUNCTIONAL");
  const reduce = useReducedMotion();

  const modes = scenario === "login" ? loginModes : extractionModes;
  const mode = scenario === "login" ? loginMode : extractionMode;
  const active =
    scenario === "login"
      ? loginContent[loginMode]
      : extractionContent[extractionMode];

  function selectScenario(next: ScenarioId) {
    setScenario(next);
  }

  function selectMode(next: string) {
    if (scenario === "login") {
      setLoginMode(next as LoginMode);
      return;
    }
    setExtractionMode(next as ExtractionMode);
  }

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
            The login form is the easy entry. AI document extraction uses the
            same kind of lens — different risks.
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
                onClick={() => selectScenario(item.id)}
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
                onClick={() => selectMode(item)}
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
