import { createOgImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";

export const alt = "Aktia Farjana Antora — Lead SQA Engineer | THE QA LAB";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpenGraphImage() {
  return createOgImage({
    title: "Aktia Farjana Antora",
    positioning:
      "Lead SQA Engineer. Manual testing first, with automation and AI-assisted QA.",
  });
}
