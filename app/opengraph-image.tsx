import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

export const runtime = "nodejs";
export const alt = `${siteConfig.legalName} — ${siteConfig.positioning}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Default social sharing image, generated from brand colours and type.
 * Replace with official artwork at /public/brand/og-image.png if R&M supplies
 * one (see CONTENT-CHECKLIST.md).
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #061021 0%, #0b1b33 45%, #124497 100%)",
          padding: "72px",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 14,
              background: "#1268C3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: -1,
            }}
          >
            R&amp;M
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, fontWeight: 700 }}>R&amp;M Services Group Ltd</div>
            <div style={{ fontSize: 20, color: "#8ec6ff", letterSpacing: 3 }}>KIGALI, RWANDA</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div style={{ fontSize: 62, fontWeight: 700, lineHeight: 1.1, maxWidth: 940 }}>
            Your Trusted Business &amp; Compliance Partner in Rwanda
          </div>
          <div style={{ fontSize: 30, color: "#bcdcff" }}>
            Helping Businesses Start, Grow &amp; Stay Compliant
          </div>
        </div>

        <div style={{ display: "flex", gap: "40px", fontSize: 22, color: "#c3d5eb" }}>
          <div style={{ display: "flex" }}>10+ years of experience</div>
          <div style={{ display: "flex" }}>1,000+ clients served</div>
          <div style={{ display: "flex" }}>Remote &amp; in-person support</div>
        </div>
      </div>
    ),
    size,
  );
}
