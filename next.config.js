/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["images.prismic.io"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  env: {
    RESEND_API_KEY: process.env.NEXT_RESEND_API_KEY,
  },
};

module.exports = nextConfig;
