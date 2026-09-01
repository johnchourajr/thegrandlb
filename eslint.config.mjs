import nextConfig from "eslint-config-next/core-web-vitals";

export default [
  {
    // Build artifacts and generated output. `next lint` used to apply these
    // implicitly; running eslint directly means declaring them here.
    ignores: [
      ".next/**",
      ".react-email/**",
      ".netlify/**",
      ".vercel/**",
      ".pnpm-store/**",
      ".playwright-mcp/**",
      ".eval/**",
      "public/**",
      "next-env.d.ts",
    ],
  },
  ...nextConfig,
];
