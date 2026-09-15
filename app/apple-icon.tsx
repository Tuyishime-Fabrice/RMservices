import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const alt = "R&M Services Group Ltd";

/** Home-screen icon, generated from the brand colours. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1268C3",
          color: "#ffffff",
          fontSize: 62,
          fontWeight: 700,
          fontFamily: "serif",
          letterSpacing: -2,
        }}
      >
        R&amp;M
      </div>
    ),
    size,
  );
}
