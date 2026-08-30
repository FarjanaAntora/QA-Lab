from pathlib import Path

from fpdf import FPDF


class CVPDF(FPDF):
    def section(self, title: str) -> None:
        self.ln(4)
        self.set_x(self.l_margin)
        self.set_font("Helvetica", "B", 12)
        self.set_text_color(20, 20, 20)
        self.cell(0, 7, title.upper(), new_x="LMARGIN", new_y="NEXT")
        y = self.get_y()
        self.set_draw_color(180, 180, 180)
        self.line(self.l_margin, y, self.w - self.r_margin, y)
        self.ln(3)

    def muted_line(self, text: str) -> None:
        self.set_x(self.l_margin)
        self.set_font("Helvetica", "", 9)
        self.set_text_color(90, 90, 90)
        self.multi_cell(0, 5, text)
        self.set_text_color(20, 20, 20)

    def body(self, text: str) -> None:
        self.set_x(self.l_margin)
        self.set_font("Helvetica", "", 10)
        self.set_text_color(20, 20, 20)
        self.multi_cell(0, 5, text)

    def bullet(self, text: str) -> None:
        self.set_x(self.l_margin)
        self.set_font("Helvetica", "", 9)
        self.set_text_color(20, 20, 20)
        self.multi_cell(0, 5, f"- {text}")


def build() -> Path:
    pdf = CVPDF()
    pdf.set_auto_page_break(auto=True, margin=18)
    pdf.add_page()
    pdf.set_margins(18, 18, 18)

    pdf.set_font("Helvetica", "B", 18)
    pdf.cell(0, 8, "Aktia Farjana Antora", new_x="LMARGIN", new_y="NEXT")
    pdf.muted_line("Senior QA Automation Engineer")
    pdf.muted_line(
        "farjana1319ontu@gmail.com | +880 1686057143 | Dhaka, Bangladesh"
    )
    pdf.muted_line(
        "linkedin.com/in/aktia-farjana-antora | github.com/aktia-antora"
    )

    pdf.section("Summary")
    pdf.body(
        "Lead SQA Engineer with 8 years of experience across QA automation, "
        "AI system testing, healthcare informatics, and government platforms. "
        "Specialising in Playwright CI/CD automation, LLM hallucination testing, "
        "and full-spectrum quality engineering."
    )

    pdf.section("Experience")
    roles = [
        (
            "Lead SQA Engineer",
            "Golden Harvest Infotech Ltd (GHIT)",
            "Oct 2024 - Present",
            [
                "Architected and maintained Playwright automation suites integrated into CI/CD pipelines for 6+ concurrent client projects",
                "Built AI agent testing framework from scratch using DeepEval and LangSmith (hallucination detection, LLM-as-judge, output consistency)",
                "Sole QA engineer for Memorial Houston Medical: EHR, PIS, and Appointment Scheduler ownership",
                "Delivered QA across Bangladesh government platforms: Satellite Billing Module, BRRI, Conferencing Portal",
                "Trained and mentored junior QA engineers; established team-wide QA frameworks and standards",
            ],
        ),
        (
            "SQA Engineer",
            "Echologyx",
            "Dec 2022 - Oct 2024",
            [
                "API, functional, regression, integration, and A/B testing across complex multi-module ERP platforms",
                "Created and maintained SRS, SOP, and structured test documentation",
                "Managed full defect lifecycle in Jira across cross-functional international teams",
            ],
        ),
        (
            "Web Developer / QA",
            "Digital Agency Nordic",
            "Nov 2021 - Dec 2022",
            [
                "QA testing across web applications including cross-browser and UI validation",
                "WordPress development and client communication",
            ],
        ),
        (
            "Business Analyst & QA Manager",
            "Quantanite",
            "Jan 2020 - Oct 2021",
            [
                "Team management and QA oversight across international client projects",
                "Requirements analysis and structured quality reporting",
            ],
        ),
        (
            "Business Transformation Analyst",
            "IPDC Finance",
            "Jan 2018 - May 2019",
            [
                "End-to-end development of Collateral Data Management System in C# (.NET)",
                "UAT execution and test environment creation",
            ],
        ),
    ]

    for title, company, period, items in roles:
        pdf.set_x(pdf.l_margin)
        pdf.set_font("Helvetica", "B", 10)
        pdf.cell(0, 5, title, new_x="LMARGIN", new_y="NEXT")
        pdf.muted_line(f"{company} | {period}")
        for item in items:
            pdf.bullet(item)
        pdf.ln(2)

    pdf.section("Education")
    pdf.set_x(pdf.l_margin)
    pdf.set_font("Helvetica", "B", 10)
    pdf.cell(
        0,
        5,
        "BSc in Computer Science & Engineering",
        new_x="LMARGIN",
        new_y="NEXT",
    )
    pdf.muted_line(
        "American International University Bangladesh | 2014 - 2018 | CGPA 3.65"
    )

    pdf.section("Skills")
    for skill in [
        "Automation: Playwright, Selenium, Cypress, Pytest",
        "API Testing: Postman, Swagger, REST API Automation",
        "CI/CD & Engineering: GitHub Actions, GitLab CI, Jenkins, Docker, Git",
        "Performance: JMeter, k6",
        "Security: OWASP ZAP, Burp Suite",
        "AI Testing: DeepEval, LangSmith, LLM-as-judge, Hallucination Detection",
        "Languages: Python, JavaScript, TypeScript, C#, SQL",
    ]:
        pdf.bullet(skill)

    out = Path("public") / "cv-antora.pdf"
    out.parent.mkdir(exist_ok=True)
    pdf.output(str(out))
    return out


if __name__ == "__main__":
    path = build()
    print(f"wrote {path} ({path.stat().st_size} bytes)")
