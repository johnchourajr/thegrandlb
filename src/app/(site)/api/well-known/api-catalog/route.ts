import { SITE_ORIGIN } from "@/lib/agent/site-info";

/**
 * RFC 9727 API catalog, served at `/.well-known/api-catalog` via a rewrite in
 * `next.config.ts`. Returns `application/linkset+json` (RFC 9264) advertising
 * the genuinely public, read-only APIs this site exposes.
 */
export function GET() {
  const linkset = {
    linkset: [
      {
        anchor: `${SITE_ORIGIN}/api/menus`,
        "service-desc": [
          { href: `${SITE_ORIGIN}/.well-known/openapi.json`, type: "application/json" },
        ],
        "service-doc": [
          { href: `${SITE_ORIGIN}/llms.txt`, type: "text/markdown" },
        ],
        describedby: [
          {
            href: `${SITE_ORIGIN}/.well-known/agent-skills/index.json`,
            type: "application/json",
          },
        ],
      },
    ],
  };

  return new Response(JSON.stringify(linkset, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/linkset+json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
