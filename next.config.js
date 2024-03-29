/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["images.prismic.io"],
    deviceSizes: [
      250, 375, 480, 640, 750, 828, 1080, 1200, 1440, 1920, 2048, 3840,
    ],
  },
};

module.exports = nextConfig;
