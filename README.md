# 🧪 QA Lab

[![QA Lab CI](https://github.com/FarjanaAntora/QA-Lab/actions/workflows/ci.yml/badge.svg)](https://github.com/FarjanaAntora/QA-Lab/actions/workflows/ci.yml)

### An interactive QA portfolio by Aktia Farjana Antora

> I don't just test software. I try to break it, figure out why it broke, and make sure it doesn't break the same way twice.

🌐 **Live site:** https://qa-lab-eight.vercel.app/

## What is this?

This is my interactive QA portfolio.

Instead of putting everything into a traditional PDF CV and hoping someone reads it, I wanted to build something that actually shows how I think about software, testing, and quality.

So, welcome to my little lab.

You'll find my experience, projects, skills, testing approach, tools, and a few interactive bits that are much more fun than a list of technologies on a resume.

## About me

I'm a Software QA Engineer with experience in manual testing, automation, API testing, performance testing, and end to end product testing.

I've worked closely with developers, product teams, and other stakeholders to find bugs, investigate problems, improve test coverage, and make products more reliable.

For me, QA isn't just about checking whether a feature works.

I like asking what happens when:

* The user does something they weren't supposed to
* The API returns something unexpected
* The network decides to have a bad day
* Two things happen at the same time
* The user clicks the same button 15 times
* Someone enters absolutely terrible data
* Permissions aren't quite right
* The system is under pressure
* Everything works perfectly except for that one very specific scenario nobody thought about

That's usually where the interesting bugs are.

## 🧰 My toolbox

### Automation

* Playwright
* Selenium
* Cypress
* Puppeteer

### API Testing

* Postman
* Swagger / OpenAPI
* REST APIs

### Performance

* Apache JMeter

### Security

* OWASP ZAP
* Burp Suite

### Development

* Git
* GitHub
* CI/CD

### Project & Test Management

* Jira
* ClickUp
* Trello
* Notion

### Testing

* Functional Testing
* Regression Testing
* Smoke Testing
* Sanity Testing
* Integration Testing
* End to End Testing
* Exploratory Testing
* Black Box Testing
* Gray Box Testing
* API Testing
* UI Testing
* Performance Testing
* Security Testing
* Cross Browser Testing
* A/B Testing

## 🔬 What's inside the Lab?

The website includes an interactive CV along with different sections that showcase my work and experience.

There are also interactive elements built around the idea of testing itself.

The idea was simple:

**If I'm applying for a QA role, the portfolio should be something you can actually test.**

So don't just look around.

Try breaking it.

Resize the window. Click things repeatedly. Try unexpected inputs. Use the keyboard. Open it on another browser.

If you find a bug, I'd genuinely like to know about it.

## 🧠 How I approach QA

My process isn't simply:

```text
Write test cases
↓
Run test cases
↓
Find bugs
↓
Done
```

I usually start by understanding the product and figuring out where the actual risks are.

Then I think about coverage, edge cases, user behaviour, integrations, failure scenarios, and what is worth automating.

A simplified version looks like this:

```text
Understand the product
        ↓
Understand the risks
        ↓
Design the coverage
        ↓
Test the expected behaviour
        ↓
Test the unexpected behaviour
        ↓
Automate what makes sense
        ↓
Investigate failures
        ↓
Improve the product
```

## 🚀 Why I built this

A CV can say:

> "Experienced with Playwright."

That doesn't really tell you much.

I wanted this portfolio to give a better idea of how I approach problems.

It's also an experiment.

I wanted to see how far I could take the idea of turning a QA portfolio into an actual product instead of another static resume website.

## 🏗️ Tech

Built with the stack in `package.json`:

| Package | Version |
| --- | --- |
| next | 16.3.0 |
| react / react-dom | 19.2.8 |
| framer-motion | ^13.1.0 |
| lucide-react | ^1.31.0 |
| typescript | ^5 |
| tailwindcss / @tailwindcss/postcss | ^4 |
| @playwright/test | ^1.62.1 |
| @axe-core/playwright | ^4.14.0 |
| lighthouse | ^12.8.2 |
| @lhci/cli | ^0.15.1 |
| eslint / eslint-config-next | ^9 / 16.3.0 |
| puppeteer | ^25.9.0 |
| ts-node | ^10.9.2 |

The site is deployed through Vercel. GitHub Actions runs the CI workflow in `.github/workflows/ci.yml`.

## 💻 Run it locally

Clone the repository:

```bash
git clone https://github.com/FarjanaAntora/QA-Lab
```

Go into the project:

```bash
cd QA-Lab
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## 🧪 Run the Playwright tests

Install the Chromium browser used by Playwright (once per machine):

```bash
npx playwright install chromium
```

Run the full suite:

```bash
npx playwright test
```

Or use the npm script:

```bash
npm run test:e2e
```

Optional production smoke (against a deployed URL):

```bash
PROD_URL=https://qa-lab-eight.vercel.app npx playwright test tests/production.spec.ts
```

HTML report after a run:

```bash
npx playwright show-report
```

## 🧪 Found a bug?

Please report it.

Seriously.

It's a QA portfolio. Finding bugs here is kind of the point.

You can open an issue with:

* What you were doing
* What you expected
* What actually happened
* Steps to reproduce
* Browser/device information if relevant
* Screenshots or recordings if useful

## 📫 Let's connect

If you're interested in QA, automation, product quality, or just breaking things for fun, feel free to reach out.

**Portfolio:**
https://qa-lab-eight.vercel.app/

**LinkedIn:**
https://www.linkedin.com/in/aktia-farjana-antora/

**GitHub:**
https://github.com/FarjanaAntora/QA-Lab

**Email:**
farjana1319ontu@gmail.com

---

<p align="center">

Made with curiosity, caffeine, and an unreasonable desire to find edge cases.

**If it works, I'm suspicious. 🧪**

</p>
