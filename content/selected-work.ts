export type ProcessStep = {
  step: string;
  note: string;
};

export type SelectedProject = {
  id: string;
  number: string;
  title: string;
  category: string;
  summary: string;
  challenge: string;
  tested: string[];
  interesting: string;
  slug?: string;
  status?: "in-progress" | "delivered";
};

export const selectedWorkIntro = {
  label: "Selected work",
  title: "Five problems, five kinds of quality",
  supporting:
    "A/B analytics checking, a manuscript digitisation pipeline in progress, a luxury booking journey, public-sector systems, and an automation framework that has to judge AI output.",
} as const;

export const additionalWorkIntro = {
  label: "Further range",
  title: "Also in the work",
  supporting:
    "Data-heavy products, small-team websites, and the QA process that sat beside the larger projects.",
} as const;

export const manuscriptProject: SelectedProject & {
  focus: string[];
  flow: ProcessStep[];
} = {
  id: "manuscript-ocr",
  number: "01",
  title: "Manuscript Digitisation QA (in progress)",
  category: "Digitisation · Image QA · Human-in-the-loop",
  summary:
    "QA lead on an in-house project digitising historical manuscripts. The deliverable is validated digital images: camera capture, offline-first storage, image-quality checks, sync with retry and backoff, auditor review, metadata and cloud integrity checks. I am designing a human-in-the-loop, AI-assisted validation workflow for it. The build is in progress.",
  focus: [
    "Camera capture and offline-first storage",
    "Image-quality checks before sync",
    "Sync with retry and backoff",
    "Auditor review of validated images",
    "Metadata and cloud integrity checks",
    "Human-in-the-loop AI-assisted validation design",
  ],
  flow: [
    { step: "CAPTURE", note: "Camera" },
    { step: "QUALITY CHECK", note: "Image QA" },
    { step: "SYNC", note: "Retry / backoff" },
    { step: "METADATA", note: "Auditor review" },
    { step: "CLOUD INTEGRITY", note: "Cloud checks" },
  ],
  challenge:
    "The deliverable is a validated digital image, not a web screen. A fault can start at capture, quality gates, sync, metadata, or cloud integrity — and a human still has to sign off.",
  tested: [
    "Whether capture and offline storage held the image before sync",
    "Whether image-quality checks caught bad frames before they moved on",
    "Whether sync retry and backoff recovered without corrupting the record",
    "Whether metadata and cloud integrity still matched after auditor review",
  ],
  interesting:
    "I am designing the human-in-the-loop, AI-assisted validation workflow while the build is still in progress.",
};

export const travelProject: SelectedProject & {
  journey: ProcessStep[];
} = {
  id: "luxury-travel",
  number: "02",
  title: "The Journey",
  category: "Premium booking path · Travel QA",
  summary:
    "A premium booking journey where the quality bar is the whole trip: discovery, availability, guests, price, dates, confirmation. A small break in that path costs conversion and trust.",
  journey: [
    { step: "Discover", note: "Destinations and itineraries" },
    { step: "Hold", note: "Dates and availability" },
    { step: "Book", note: "Guests, packages, price" },
    { step: "Confirm", note: "The moment trust is earned" },
  ],
  challenge:
    "Luxury travel is not a single happy-path booking. Date, cabin, guest, and package combinations have to hold together, on every screen size, before anyone pays.",
  tested: [
    "Destination and itinerary discovery",
    "Availability against real date and package combinations",
    "Guest details, pricing, and confirmation",
    "The same journey on smaller screens and other browsers",
  ],
  interesting:
    "On a high-value path, a wrong price or a broken confirmation is not a small defect. It is the moment someone decides not to travel with you.",
};

export const governmentProject: SelectedProject & {
  systems: string[];
} = {
  id: "bd-government",
  number: "03",
  title: "Bangladesh Government Systems - QA Portfolio",
  category: "Government / GovTech",
  slug: "bd-government-qa",
  status: "delivered",
  summary:
    "Three national-scale systems. Downtime or a wrong figure is a public failure, not a ticket.",
  systems: ["Satellite Billing", "BRRI", "Conferencing Portal"],
  challenge:
    "Three deliveries at once, each with different stakeholders, compliance, and a release window that does not move.",
  tested: [
    "The paths that would fail in public first",
    "Billing and record integrity at the data layer",
    "Whether the service held under expected citizen traffic",
  ],
  interesting:
    "The quality bar was not a demo. It was a system citizens would actually use.",
};

export const playwrightProject: SelectedProject & {
  layers: ProcessStep[];
} = {
  id: "playwright-ai",
  number: "04",
  title: "Playwright + AI Evaluation Framework",
  category: "Automation Framework",
  slug: "playwright-ai-qa-framework",
  status: "in-progress",
  summary:
    "Playwright runs the journey. An evaluation score judges the model output. CI fails the build when that score drops.",
  layers: [
    { step: "PLAYWRIGHT", note: "The journey" },
    { step: "EVAL", note: "The output" },
    { step: "CI", note: "The gate" },
  ],
  challenge:
    "Deterministic assertions break when the system under test can answer the same question two different ways.",
  tested: [
    "Whether the user journey still completed",
    "Whether the model stayed faithful to its source",
    "Whether a weak score failed the pipeline instead of shipping",
  ],
  interesting:
    "The framework had to judge quality, not just confirm a click path.",
};

export const dataProject: SelectedProject & {
  checks: ProcessStep[];
} = {
  id: "data-platforms",
  number: "01",
  title: "Testing Products Built Around Data",
  category: "Data · Web Platforms · QA",
  summary:
    "When the product is built around data, testing the interface is only half the job.",
  checks: [
    { step: "IN", note: "What entered" },
    { step: "THROUGH", note: "How it changed" },
    { step: "OUT", note: "What it showed" },
  ],
  challenge:
    "The screens could look finished while the numbers underneath had already drifted. Quality meant proving input, transformation, and output still agreed.",
  tested: [
    "Input and output consistency",
    "Boundary conditions and empty or extreme values",
    "Data transformation across the workflow",
    "How the product behaved when the data was wrong",
  ],
  interesting:
    "The product only felt trustworthy when the data did. That changed what I treated as the system under test.",
};

export const wordpressProject: SelectedProject & {
  audiences: string[];
} = {
  id: "wordpress-sites",
  number: "02",
  title: "Small Teams, Real Websites",
  category: "WordPress · Web QA · Client Projects",
  summary:
    "WordPress sites for artists, creators, and small businesses, shipped with a small team against a fixed launch date.",
  audiences: ["Artists", "Creators", "Small businesses"],
  challenge:
    "These were not enterprise platforms. The pressure was still the same: the site has to work for a real person, on a real phone, after a real content change.",
  tested: [
    "Layouts across screen sizes and browsers",
    "Forms, navigation, and media",
    "How the CMS behaved when content moved",
    "Usability, basic performance, and what broke after a plugin change",
  ],
  interesting:
    "QA was not limited to large systems. A one-person shop still needs a site that holds up.",
};

export const processProject: SelectedProject & {
  loop: ProcessStep[];
} = {
  id: "qa-process",
  number: "03",
  title: "Building the QA Process, Not Just Testing the Product",
  category: "QA Leadership · Process · Training",
  summary:
    "The work after the cases: training junior QA, setting the workflow, and helping a team own quality the same way.",
  loop: [
    { step: "TRAIN", note: "Junior QA" },
    { step: "STRUCTURE", note: "Workflows" },
    { step: "REVIEW", note: "Coverage" },
    { step: "IMPROVE", note: "Consistency" },
  ],
  challenge:
    "Execution does not scale by itself. Someone has to show the team how to think about risk, write a useful defect, and know when a release is actually ready.",
  tested: [
    "Whether new testers could pick up a product without losing coverage",
    "Whether the workflow made the important paths visible",
    "Whether reviews caught gaps before they became release surprises",
  ],
  interesting:
    "This is where the role moved from running the work to making the work repeatable.",
};
