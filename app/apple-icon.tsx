import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

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
          background: "linear-gradient(145deg, #FB3E25 0%, #D11F73 45%, #007D21 100%)",
          color: "#FFBB78",
          fontSize: 72,
          fontWeight: 900,
          fontFamily: "system-ui, sans-serif",
          border: "8px solid #A85300",
        }}
      >
        C
      </div>
    ),
    { ...size },
  );
}
