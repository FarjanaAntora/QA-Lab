import { getCaseStudyFacts } from "@/content/facts";
import { createOgImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CaseStudyOpenGraphImage({ params }: Props) {
  const { slug } = await params;
  const facts = getCaseStudyFacts(slug);

  return createOgImage({
    title: facts?.title ?? "Case study",
    positioning:
      facts?.positioning ??
      "Case study from THE QA LAB — Aktia Farjana Antora.",
  });
}
