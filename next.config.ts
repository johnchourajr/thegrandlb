import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  // Ensure content/menus JSON files are included in the Vercel serverless
  // function bundle so fs.readFileSync works at runtime (ISR, API routes).
  outputFileTracingIncludes: {
    "/menus/[uid]": ["./content/menus/*.menu.json"],
    "/api/admin/menus/[uid]": ["./content/menus/*.menu.json"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imagedelivery.net",
      },
      {
        protocol: "https",
        hostname: "cdn.thegrandlb.com",
      },
    ],
    // Fewer breakpoints = fewer unique transformed images cached on CF edge.
    deviceSizes: [640, 1080, 1440, 1920],
    formats: ["image/webp"],
    qualities: [75],
    // 1 year TTL for images served through /_next/image.
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    /** Apex canonical: https://thegrandlb.com — assign these hosts to this Vercel project so requests hit Next. */
    const canonicalHosts = [
      "www2.thegrandlb.com",
      "hello.thegrandlb.com",
      "www.thegrandlb.com",
    ] as const;

    const hostRedirects = canonicalHosts.map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: "https://thegrandlb.com/:path*",
      permanent: true as const,
    }));

    return [
      ...hostRedirects,
      { source: "/home", destination: "/", permanent: true },
      { source: "/tour/map", destination: "/map", permanent: true },
      { source: "/tour/map/", destination: "/map", permanent: true },
      { source: "/corporate-social-events", destination: "/events", permanent: true },
      { source: "/corporate-social-events/", destination: "/events", permanent: true },
      { source: "/services-menu", destination: "/menus", permanent: true },
      { source: "/services-menu/", destination: "/menus", permanent: true },
      { source: "/feed", destination: "/", permanent: true },
      { source: "/weddings", destination: "/events/weddings", permanent: true },
      { source: "/weddings/", destination: "/events/weddings", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/api/admin/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "private, no-store, no-cache, must-revalidate",
          },
        ],
      },
      {
        source: "/api/:path((?!admin/).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=3600",
          },
        ],
      },
    ];
  },
  compress: true,
};

export default nextConfig;
