# THE QA LAB

Personal portfolio for **Aktia Farjana Antora** — a cinematic, editorial site that demonstrates QA engineering through interactive experiments, case studies, and a Playwright suite that tests the portfolio itself.

## Tech stack

- Next.js (App Router) + TypeScript
- Custom CSS design system (Inter, Playfair Display, JetBrains Mono)
- Framer Motion
- Lucide React
- Playwright (Chromium) + GitHub Actions CI

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Copy `.env.example` if you need local env files later. No variables are required for local development.

Production smoke tests (optional):

```bash
PROD_URL=https://your-deployment.vercel.app npx playwright test tests/production.spec.ts
```

## Run tests

```bash
npx playwright install chromium
npx playwright test
```

HTML report (after a run):

```bash
npx playwright show-report
```

## CI

![QA Lab CI](https://img.shields.io/badge/CI-QA%20Lab-111113?style=flat-square)

> Replace this placeholder badge with your live GitHub Actions status badge after enabling Actions on the repository.

## Screenshot

![THE QA LAB screenshot](./docs/screenshot-placeholder.png)

> Add a homepage screenshot at `docs/screenshot-placeholder.png` (or update this path) before publishing.

## Project structure

```
app/                 # App Router pages + globals
components/          # Sections, layout, UI primitives
content/             # Experience, toolbox, projects, CV data
tests/               # Playwright specs
.github/workflows/   # CI pipeline
```

## License

Private portfolio project. All rights reserved.
