import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Patterns that are commonly used by malicious bots
const BLOCKED_PATTERNS = [
  /\.php$/i, // PHP files (you're using Next.js, not PHP)
  /\.env/i, // Environment files
  /\.git/i, // Git files
  /wp-admin/i, // WordPress admin
  /wp-content/i, // WordPress content
  /xmlrpc\.xml/i, // XML-RPC
  /\.sql/i, // SQL files
  /\.bak$/i, // Backup files
  /\.config$/i, // Config files
  /phpmyadmin/i, // phpMyAdmin
  /\.aspx?$/i, // ASP/ASPX files
  /\.cgi$/i, // CGI scripts
];

// Legitimate files you might want to handle properly
// Note: robots.txt already exists in /public
const SPECIAL_FILES = ["/ads.txt", "/sitemap.xml"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Block suspicious patterns
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(pathname)) {
      console.warn(`🚫 Blocked suspicious request: ${pathname}`);
      // Return 403 Forbidden or 404 to not reveal information
      return new NextResponse(null, { status: 403 });
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
