import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Gabriel Lorencato — Medicina, Neurocirurgia e Medicina Aeroespacial";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const fraunces = await readFile(
    join(process.cwd(), "src/assets/fraunces-latin-600-normal.woff"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f6f3ea",
          position: "relative",
          fontFamily: "Fraunces",
        }}
      >
        {/* anéis orbitais à direita */}
        <svg
          width="720"
          height="720"
          viewBox="0 0 400 400"
          style={{ position: "absolute", right: -180, top: -45 }}
        >
          <ellipse cx="200" cy="200" rx="150" ry="150" stroke="#1c3ecf" strokeWidth="0.9" fill="none" opacity="0.35" />
          <ellipse cx="200" cy="200" rx="150" ry="55" stroke="#1c3ecf" strokeWidth="0.9" fill="none" opacity="0.3" />
          <ellipse cx="200" cy="200" rx="55" ry="150" stroke="#1c3ecf" strokeWidth="0.9" fill="none" opacity="0.3" />
          <circle cx="200" cy="200" r="6" fill="#1c3ecf" />
          <circle cx="330" cy="140" r="4" fill="#1c3ecf" />
          <circle cx="105" cy="105" r="3.5" fill="#1c3ecf" opacity="0.7" />
        </svg>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 96px",
          }}
        >
          <div
            style={{
              color: "#1c3ecf",
              fontSize: 24,
              letterSpacing: 8,
              textTransform: "uppercase",
              marginBottom: 28,
            }}
          >
            Medicina — Neurocirurgia — Medicina Aeroespacial
          </div>
          <div style={{ fontSize: 110, color: "#131619", lineHeight: 1 }}>
            Gabriel
          </div>
          <div
            style={{
              fontSize: 110,
              color: "#1c3ecf",
              lineHeight: 1.05,
              fontStyle: "italic",
            }}
          >
            Lorencato
          </div>
          <div
            style={{
              marginTop: 36,
              fontSize: 28,
              color: "#3f4750",
              maxWidth: 720,
            }}
          >
            Pesquisa em neurointervenção e fisiologia espacial
          </div>
          <div
            style={{
              marginTop: 44,
              fontSize: 22,
              color: "#5b6570",
              letterSpacing: 3,
            }}
          >
            drlorencato.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, weight: 600, style: "normal" },
      ],
    },
  );
}
