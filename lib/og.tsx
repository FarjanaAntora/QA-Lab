import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

/** Site dark palette used for social previews. */
const palette = {
  bg: "#0c0f14",
  panel: "#161a22",
  accent: "#a8d0dc",
  text: "#e8eaed",
  muted: "#9aa3b2",
  rule: "#2a3140",
} as const;

export function createOgImage({
  eyebrow = "THE QA LAB",
  title,
  positioning,
}: {
  eyebrow?: string;
  title: string;
  positioning: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: `linear-gradient(145deg, ${palette.bg} 0%, ${palette.panel} 55%, #1e2430 100%)`,
          color: palette.text,
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: palette.accent,
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 42 ? 52 : 60,
              lineHeight: 1.12,
              maxWidth: 980,
              color: palette.text,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div
            style={{
              width: 72,
              height: 2,
              background: palette.accent,
              display: "flex",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 28,
              lineHeight: 1.35,
              maxWidth: 920,
              color: palette.muted,
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
            }}
          >
            {positioning}
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
