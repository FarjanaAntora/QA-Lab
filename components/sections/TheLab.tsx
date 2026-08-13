"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState, type ReactNode } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";
import styles from "./TheLab.module.css";

type Severity = "danger" | "warning" | "success";

type FormResult = {
  message: string;
  severity: Severity;
};

function analyzeInput(value: string): FormResult {
  if (value.length === 0) {
    return {
      message:
        "⚠ No input detected. A real form should validate before submission.",
      severity: "warning",
    };
  }

  if (value.trim().length === 0) {
    return {
      message:
        "⚠ Whitespace-only input passed validation. Should it?",
      severity: "warning",
    };
  }

  if (/<script[\s>]/i.test(value)) {
    return {
      message:
        "🔴 XSS attempt detected in input. A secure form should sanitize this server-side.",
      severity: "danger",
    };
  }

  const upper = value.toUpperCase();
  if (
    value.includes("' OR") ||
    value.includes("' or") ||
    upper.includes("SELECT") ||
    value.includes("--")
  ) {
    return {
      message:
        "🔴 SQL injection pattern detected. Never trust user input.",
      severity: "danger",
    };
  }

  if (value.length >= 500) {
    return {
      message:
        "⚠ Long input submitted. Does your backend have a length limit?",
      severity: "warning",
    };
  }

  if (/\p{Extended_Pictographic}/u.test(value)) {
    return {
      message:
        "✓ Emoji accepted. Does your database column handle UTF-8?",
      severity: "success",
    };
  }

  return {
    message:
      "✓ Input looks clean. But have you checked the server response too?",
    severity: "success",
  };
}

const searchModes = [
  "FUNCTIONAL",
  "BOUNDARY",
  "NEGATIVE",
  "PERFORMANCE",
  "ACCESSIBILITY",
] as const;

type SearchMode = (typeof searchModes)[number];

const searchIdeas: Record<SearchMode, string[]> = {
  FUNCTIONAL: [
    'Search "laptop" returns relevant results.',
    "Clearing the search restores the full list.",
    "Search is not case-sensitive.",
  ],
  BOUNDARY: [
    "Search with 1 character.",
    "Search with 255 characters.",
    "Search with 0 characters (empty submit).",
  ],
  NEGATIVE: [
    "Search with special characters: <, >, &, \".",
    "Search with SQL: ' OR 1=1.",
    "Search with script tags.",
  ],
  PERFORMANCE: [
    "Rapid typing — does each keystroke fire an API call?",
    "Type slowly vs paste 100 chars.",
    "Measure response time.",
  ],
  ACCESSIBILITY: [
    "Is search results update announced to screen readers?",
    "Keyboard-only navigation through results.",
    "Focus management after search.",
  ],
};

function ExperimentShell({
  label,
  title,
  description,
  children,
}: {
  label: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <article className={styles.card}>
      <p className={`text-label ${styles.experimentLabel}`}>{label}</p>
      <h3 className={`text-h3 ${styles.experimentTitle}`}>{title}</h3>
      <p className={styles.experimentDescription}>{description}</p>
      {children}
    </article>
  );
}

function ExperimentOne() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<FormResult | null>(null);

  return (
    <ExperimentShell
      label="EXPERIMENT 01"
      title="Stress the form."
      description="Type something unexpected. See what happens."
    >
      <div className={styles.formRow}>
        <input
          type="text"
          className={styles.input}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Try something unexpected…"
          aria-label="Experiment input"
        />
        <button
          type="button"
          className={styles.submitButton}
          onClick={() => setResult(analyzeInput(value))}
        >
          SUBMIT
        </button>
      </div>

      <AnimatePresence mode="wait">
        {result ? (
          <motion.div
            key={result.message}
            className={`${styles.result} ${styles[`severity${result.severity}`]}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {result.message}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </ExperimentShell>
  );
}

function ExperimentTwo() {
  const [mode, setMode] = useState<SearchMode | null>(null);

  return (
    <ExperimentShell
      label="EXPERIMENT 02"
      title="Choose your approach."
      description="You have a search bar that filters a product list. How do you test it?"
    >
      <div className={styles.modes}>
        {searchModes.map((item) => (
          <button
            key={item}
            type="button"
            className={`${styles.modeButton} ${
              mode === item ? styles.modeButtonActive : ""
            }`}
            onClick={() => setMode(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {mode ? (
          <motion.ul
            key={mode}
            className={styles.ideaList}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {searchIdeas[mode].map((idea) => (
              <li key={idea}>{idea}</li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </ExperimentShell>
  );
}

function ExperimentThree() {
  const [revealed, setRevealed] = useState(false);

  return (
    <ExperimentShell
      label="EXPERIMENT 03"
      title="Something is wrong here."
      description="This is a simple checkout summary. There is a deliberate bug. Can you find it?"
    >
      <div className={styles.checkout}>
        <div className={styles.checkoutRow}>
          <span>Wireless Headphones</span>
          <span>£89.99</span>
        </div>
        <div className={styles.checkoutRow}>
          <span>USB-C Cable</span>
          <span>£12.99</span>
        </div>
        <div className={styles.checkoutRow}>
          <span>Phone Case</span>
          <span>£24.99</span>
        </div>
        <div className={styles.checkoutDivider} />
        <div className={styles.checkoutRow}>
          <span>Subtotal</span>
          <span>£127.97</span>
        </div>
        <div className={styles.checkoutRow}>
          <span>Delivery</span>
          <span>£4.99</span>
        </div>
        <div
          data-testid="checkout-total"
          className={`${styles.checkoutRow} ${styles.checkoutTotal} ${
            revealed ? styles.checkoutTotalBug : ""
          }`}
        >
          <span>Total</span>
          <span>£134.96</span>
        </div>
      </div>

      <button
        type="button"
        className={styles.ghostButton}
        onClick={() => setRevealed(true)}
      >
        REVEAL THE BUG
      </button>

      <AnimatePresence>
        {revealed ? (
          <motion.div
            className={styles.bugPanel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            The total is £134.96. The correct sum is £127.97 + £4.99 = £132.96.
            A calculation error of £1.99. Easy to miss visually. A QA engineer
            checks the maths.
          </motion.div>
        ) : null}
      </AnimatePresence>
    </ExperimentShell>
  );
}

function ExperimentFour() {
  const [showExplanation, setShowExplanation] = useState(false);

  const codeLines = useMemo(
    () => [
      <>
        <span className={styles.codeFn}>test</span>
        <span className={styles.codePlain}>(</span>
        <span className={styles.codeString}>
          &apos;user can log in with valid credentials&apos;
        </span>
        <span className={styles.codePlain}>, async (&#123; page &#125;) =&gt; &#123;</span>
      </>,
      <>
        <span className={styles.codePlain}>{"  "}</span>
        <span className={styles.codeKeyword}>await</span>
        <span className={styles.codePlain}> page.</span>
        <span className={styles.codeFn}>goto</span>
        <span className={styles.codePlain}>(</span>
        <span className={styles.codeString}>
          &apos;https://app.example.com/login&apos;
        </span>
        <span className={styles.codePlain}>);</span>
      </>,
      <>
        <span className={styles.codePlain}>{"  "}</span>
        <span className={styles.codeKeyword}>await</span>
        <span className={styles.codePlain}> page.</span>
        <span className={styles.codeFn}>fill</span>
        <span className={styles.codePlain}>(</span>
        <span className={styles.codeString}>
          &apos;[data-testid=&quot;email&quot;]&apos;
        </span>
        <span className={styles.codePlain}>, </span>
        <span className={styles.codeString}>
          &apos;test@example.com&apos;
        </span>
        <span className={styles.codePlain}>);</span>
      </>,
      <>
        <span className={styles.codePlain}>{"  "}</span>
        <span className={styles.codeKeyword}>await</span>
        <span className={styles.codePlain}> page.</span>
        <span className={styles.codeFn}>fill</span>
        <span className={styles.codePlain}>(</span>
        <span className={styles.codeString}>
          &apos;[data-testid=&quot;password&quot;]&apos;
        </span>
        <span className={styles.codePlain}>, </span>
        <span className={styles.codeString}>
          &apos;SecurePass123&apos;
        </span>
        <span className={styles.codePlain}>);</span>
      </>,
      <>
        <span className={styles.codePlain}>{"  "}</span>
        <span className={styles.codeKeyword}>await</span>
        <span className={styles.codePlain}> page.</span>
        <span className={styles.codeFn}>click</span>
        <span className={styles.codePlain}>(</span>
        <span className={styles.codeString}>
          &apos;[data-testid=&quot;submit&quot;]&apos;
        </span>
        <span className={styles.codePlain}>);</span>
      </>,
      <>
        <span className={styles.codePlain}>{"  "}</span>
        <span className={styles.codeKeyword}>await</span>
        <span className={styles.codePlain}> </span>
        <span className={styles.codeFn}>expect</span>
        <span className={styles.codePlain}>(page).</span>
        <span className={styles.codeFn}>toHaveURL</span>
        <span className={styles.codePlain}>(</span>
        <span className={styles.codeString}>&apos;/dashboard&apos;</span>
        <span className={styles.codePlain}>);</span>
      </>,
      <>
        <span className={styles.codePlain}>{"  "}</span>
        <span className={styles.codeKeyword}>await</span>
        <span className={styles.codePlain}> </span>
        <span className={styles.codeFn}>expect</span>
        <span className={styles.codePlain}>(page.</span>
        <span className={styles.codeFn}>locator</span>
        <span className={styles.codePlain}>(</span>
        <span className={styles.codeString}>&apos;h1&apos;</span>
        <span className={styles.codePlain}>)).</span>
        <span className={styles.codeFn}>toContainText</span>
        <span className={styles.codePlain}>(</span>
        <span className={styles.codeString}>&apos;Welcome&apos;</span>
        <span className={styles.codePlain}>);</span>
      </>,
      <>
        <span className={styles.codePlain}>&#125;);</span>
      </>,
    ],
    [],
  );

  return (
    <ExperimentShell
      label="EXPERIMENT 04"
      title="What does this test actually do?"
      description="Real Playwright code. Plain English explanation."
    >
      <pre className={styles.codeBlock} aria-label="Playwright test code">
        <code>
          {codeLines.map((line, index) => (
            <div key={index} className={styles.codeLine}>
              {line}
            </div>
          ))}
        </code>
      </pre>

      <button
        type="button"
        className={`${styles.modeButton} ${
          showExplanation ? styles.modeButtonActive : ""
        }`}
        onClick={() => setShowExplanation((prev) => !prev)}
      >
        {showExplanation ? "HIDE EXPLANATION" : "SHOW EXPLANATION"}
      </button>

      <AnimatePresence>
        {showExplanation ? (
          <motion.div
            className={styles.explanation}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ol className={styles.explanationList}>
              <li>Open the login page</li>
              <li>
                Find the email field (by its test ID) and type a test email
              </li>
              <li>Find the password field and type a test password</li>
              <li>Click the submit button</li>
              <li>
                Assert: the URL changed to /dashboard (not an error page)
              </li>
              <li>
                Assert: the page heading contains &quot;Welcome&quot; (the user
                is actually logged in)
              </li>
            </ol>
            <p className={styles.explanationNote}>
              Six lines. Six assertions. This runs in 2 seconds and catches
              login regressions automatically.
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </ExperimentShell>
  );
}

export default function TheLab() {
  return (
    <section id="the-lab" className={`section ${styles.section}`}>
      <ScrollReveal className="container">
        <SectionLabel number="06" title="THE LAB" />

        <h2 className={`text-h2 ${styles.heading}`}>Controlled experiments.</h2>
        <p className={`text-body ${styles.subcopy}`}>
          QA thinking made interactive. Four experiments. Each one shows
          something real.
        </p>

        <div className={styles.grid}>
          <ExperimentOne />
          <ExperimentTwo />
          <ExperimentThree />
          <ExperimentFour />
        </div>
      </ScrollReveal>
    </section>
  );
}
