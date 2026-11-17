export const SITE_URL = "https://qa-lab-eight.vercel.app";

export const GITHUB_URL = "https://github.com/FarjanaAntora";
export const LINKEDIN_URL = "https://linkedin.com/in/aktia-farjana-antora";

export const OG_IMAGE_PATH = "/og-image.jpg";

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized === "/" ? SITE_URL : `${SITE_URL}${normalized}`;
}
