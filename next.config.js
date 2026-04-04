/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.prismic.io",
      },
      {
        protocol: "https",
        hostname: "cdn.thegrandlb.com",
      },
      {
        protocol: "https",
        hostname: "imagedelivery.net",
      },
    ],
    // Fewer breakpoints = fewer unique transformed images cached on CF edge.
    // 375 removed (too close to 640; phones get 640px images, which is fine).
    deviceSizes: [640, 1080, 1440, 1920],
    // Single format keeps the /_next/image cache simple during Prismic migration.
    // CF Images loader uses fixed webp independently of this setting.
    formats: ["image/webp"],
    qualities: [50, 75],
    // 1 year TTL for images going through /_next/image (Prismic during migration).
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Prismic images going through Next.js image optimizer during migration.
      // CF Images bypasses this entirely — its caching is controlled at CF edge.
      {
        source: "/_next/image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=3600",
          },
        ],
      },
    ];
  },
  // Enable compression
  compress: true,
};

module.exports = nextConfig;
