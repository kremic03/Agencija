import { ImageResponse } from "next/og";
import { site } from "@/content/site";

// Podrazumevana slika za deljenje na mrežama (1200×630), generiše se pri build-u
export const alt = `${site.name} — sajtovi, aplikacije i snimanje dronom`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          padding: 80,
          background: "#0a0a0b",
          color: "#f4f4f5",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              position: "relative",
              display: "flex",
              width: 56,
              height: 56,
              border: "4px solid #f4f4f5",
              borderRadius: 14,
            }}
          >
            <div style={{ position: "absolute", left: 8, right: 8, bottom: 12, height: 4, background: "#f4f4f5" }} />
            <div style={{ position: "absolute", top: 7, right: 7, width: 13, height: 13, borderRadius: 13, background: "#ff6b2c" }} />
          </div>
          <div style={{ fontSize: 44, fontWeight: 600, letterSpacing: -1 }}>{site.logoText}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 68, fontWeight: 600, lineHeight: 1.05, letterSpacing: -2, maxWidth: 950 }}>
            Sajtovi, aplikacije i snimci iz vazduha
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, color: "#a1a1aa" }}>
            <div style={{ width: 12, height: 12, borderRadius: 12, background: "#ff6b2c" }} />
            {site.name}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
