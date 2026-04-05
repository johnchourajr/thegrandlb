/**
 * CDN configuration for video assets.
 * Videos are served from Cloudflare R2 (cdn.thegrandlb.com).
 */

export const VIDEO_CDN_BASE =
  process.env.NEXT_PUBLIC_VIDEO_CDN_URL || "https://cdn.thegrandlb.com";

const LEGACY_VIDEO_HOSTS =
  /^(https?:)?\/\/(the-grand\.cdn\.prismic\.io|images\.prismic\.io)/i;
const VIDEO_EXT = /\.(mp4|webm|mov)(\?|$)/i;

function slugify(name: string): string {
  return (
    name
      .replace(/\.[^.]+$/, "")
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/^-|-$/g, "")
      .toLowerCase() || "video"
  );
}

let legacyUrlToR2Key: (url: string) => string | null = (url) => {
  try {
    const u = new URL(url);
    const base = u.pathname.split("/").pop();
    if (!base || !VIDEO_EXT.test(base)) return null;
    return `${slugify(base)}.mp4`;
  } catch {
    return null;
  }
};

/**
 * Override the legacy-URL → R2 key mapping (e.g. when manifest targetFilename differs).
 */
export function setLegacyToR2KeyMapper(fn: (url: string) => string | null): void {
  legacyUrlToR2Key = fn;
}

/**
 * Rewrites a legacy CDN video URL to the R2 CDN URL.
 * If the URL is not a legacy video host, returns the original URL.
 */
export function videoUrlFromCdn(url: string | null | undefined): string {
  if (!url || typeof url !== "string") return "";
  if (!LEGACY_VIDEO_HOSTS.test(url) || !VIDEO_EXT.test(url)) return url;
  const key = legacyUrlToR2Key(url);
  if (!key) return url;
  const base = VIDEO_CDN_BASE.replace(/\/$/, "");
  return `${base}/${key}`;
}
