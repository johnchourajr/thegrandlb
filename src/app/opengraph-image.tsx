import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://thegrandlb.com/og-image.png"
          width={1200}
          height={630}
          style={{ objectFit: "cover" }}
        />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
