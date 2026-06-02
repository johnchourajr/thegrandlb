import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isMarkdownSupportedPath } from "@/lib/agent/markdown-paths";

// RFC 8288 Link header advertising agent-discovery resources, added to every
// HTML page response.
const DISCOVERY_LINK = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</.well-known/openapi.json>; rel="service-desc"; type="application/json"',
  '</llms.txt>; rel="service-doc"; type="text/markdown"',
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
  '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
  '</.well-known/mcp/server-card.json>; rel="describedby"; type="application/json"',
].join(", ");

/** True for navigable HTML page routes (not API, assets, well-known, or admin). */
function isPageRoute(pathname: string): boolean {
  return (
    !pathname.startsWith("/api") &&
    !pathname.startsWith("/_next") &&
    !pathname.startsWith("/.well-known") &&
    !pathname.startsWith("/admin") &&
    !/\.[a-zA-Z0-9]+$/.test(pathname)
  );
}

// User-Agent patterns for known malicious bots (scanners, exploit tools, aggressive scrapers)
const BLOCKED_USER_AGENTS = [
  /sqlmap|nikto|nmap|masscan|zgrab|nuclei/i,
  /semrushbot|ahrefsbot|mj12bot|dotbot|petalbot|bytespider/i,
  /dataforseo|megaindex|serpstatbot|screaming frog/i,
  /bot[_-]?crawler|malicious|evilbot|python-requests.*bot/i,
];

// Path patterns commonly probed by malicious bots
const BLOCKED_PATH_PATTERNS = [
  /\.php$/i,
  /\.env/i,
  /\.git/i,
  /wp-admin/i,
  /wp-content/i,
  /xmlrpc\.xml/i,
  /\.sql/i,
  /\.bak$/i,
  /\.config$/i,
  /phpmyadmin/i,
  /\.aspx?$/i,
  /\.cgi$/i,
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get("user-agent") ?? "";

  // Block known malicious bot User-Agents (404 so we don't reveal we're blocking)
  for (const pattern of BLOCKED_USER_AGENTS) {
    if (pattern.test(userAgent)) {
      console.warn("[bot-block] User-Agent", { pathname, userAgent: userAgent || "(empty)" });
      return new NextResponse(null, { status: 404 });
    }
  }

  // Block suspicious path patterns (404 so we don't reveal we're blocking)
  for (const pattern of BLOCKED_PATH_PATTERNS) {
    if (pattern.test(pathname)) {
      console.warn("[bot-block] path", { pathname, userAgent: userAgent || "(empty)" });
      return new NextResponse(null, { status: 404 });
    }
  }

  // Handle special files
  if (pathname === "/ads.txt") {
    // Return your ads.txt content if you have one
    return new NextResponse("", { status: 404 });
  }

  // sitemap.xml is automatically handled by Next.js via sitemap.ts

  if (isPageRoute(pathname)) {
    // Markdown for Agents (Cloudflare-style content negotiation): when an agent
    // asks for Markdown and we can render it, serve the Markdown variant.
    const accept = request.headers.get("accept") ?? "";
    if (
      (request.method === "GET" || request.method === "HEAD") &&
      /text\/markdown/i.test(accept) &&
      isMarkdownSupportedPath(pathname)
    ) {
      const url = request.nextUrl.clone();
      url.pathname = "/api/md";
      url.search = "";
      // Pass the original path to the handler via a request header: after a
      // rewrite the handler's own `nextUrl` still reflects the incoming URL,
      // so a query param on the destination would not be visible to it.
      const headers = new Headers(request.headers);
      headers.set("x-md-path", pathname);
      return NextResponse.rewrite(url, { request: { headers } });
    }

    // Advertise agent-discovery resources on every page (RFC 8288).
    const res = NextResponse.next();
    res.headers.set("Link", DISCOVERY_LINK);
    return res;
  }

  return NextResponse.next();
}

// Configure which routes this middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - All static assets (images, fonts, media, documents)
     * - robots.txt (legitimate file)
     */
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff|woff2|ttf|eot|otf|mp4|webm|mp3|wav|pdf|ico|css)$).*)",
  ],
};
