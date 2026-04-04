import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

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

export function middleware(request: NextRequest) {
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
