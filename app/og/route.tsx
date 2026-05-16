import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams, origin } = new URL(request.url);
    const subtitle = searchParams.get("subtitle")?.slice(0, 100) || "";

    // Load Inter font (700 + 800 weights)
    const fontCss = await fetch(
      "https://fonts.googleapis.com/css2?family=Inter:wght@500;800&display=swap"
    ).then((r) => r.text());

    const fontUrl = fontCss.match(/src:\s*url\(([^)]+)\)/)?.[1];
    if (!fontUrl) throw new Error("Could not resolve Inter font URL");

    const fontData = await fetch(fontUrl).then((r) => r.arrayBuffer());

    // Absolute URL for the avatar image
    const avatarUrl = `${origin}/profile_pic.png`;

    return new ImageResponse(
      (
        <div
          style={{
            width: 1200,
            height: 630,
            background: "#0a0a0a",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 80px",
            position: "relative",
            overflow: "hidden",
            fontFamily: "Inter",
          }}
        >
          {/* ── Dot grid pattern (SVG) ── */}
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: 0.4,
            }}
          >
            <defs>
              <pattern
                id="dots"
                width="24"
                height="24"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="12" cy="12" r="1" fill="#333333" opacity="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>

          {/* ── Teal/purple glow ── */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "140%",
              height: "100%",
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(ellipse at center, rgba(6,182,212,0.2) 0%, rgba(168,85,247,0.1) 50%, transparent 70%)",
              opacity: 0.6,
            }}
          />

          {/* ── Left: Name section ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              zIndex: 1,
            }}
          >
            {subtitle && (
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 500,
                  color: "#a3a3a3",
                  marginBottom: 8,
                  letterSpacing: "0.02em",
                }}
              >
                {subtitle}
              </div>
            )}
            <div
              style={{
                fontSize: subtitle ? 100 : 120,
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 0.88,
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
              }}
            >
              Rahul
              <br />
              Gehlot
            </div>
          </div>

          {/* ── Right: Avatar with gradient ring ── */}
          <div
            style={{
              display: "flex",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Outer gradient border */}
            <div
              style={{
                display: "flex",
                padding: 3,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #00d2ff, #9245ff)",
                boxShadow: "0 0 80px -10px rgba(0,210,255,0.35)",
              }}
            >
              {/* Gap ring */}
              <div
                style={{
                  display: "flex",
                  padding: 6,
                  borderRadius: "50%",
                  background: "#0a0a0a",
                }}
              >
                {/* Inner gradient border */}
                <div
                  style={{
                    display: "flex",
                    padding: 3,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #00d2ff, #9245ff)",
                  }}
                >
                  {/* Avatar */}
                  <img
                    src={avatarUrl}
                    alt=""
                    style={{
                      width: 220,
                      height: 220,
                      borderRadius: "50%",
                      objectFit: "cover",
                      display: "flex",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: fontData,
            weight: 800,
            style: "normal",
          },
        ],
      }
    );
  } catch (error) {
    // Fallback: static OG image if generation fails
    return new Response(null, {
      status: 302,
      headers: { Location: "/og-image.png" },
    });
  }
}
