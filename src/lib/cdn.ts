/**
 * CDN configuration for video assets.
 * Videos are served from Cloudflare R2 (cdn.thegrandlb.com) instead of Prismic.
 */

export const VIDEO_CDN_BASE =
  process.env.NEXT_PUBLIC_VIDEO_CDN_URL || "https://cdn.thegrandlb.com";

const PRISMIC_VIDEO_HOSTS =
  /^(https?:)?\/\/(the-grand\.cdn\.prismic\.io|images\.prismic\.io)/i;
const VIDEO_EXT = /\.(mp4|webm|mov)(\?|$)/i;

/** Slugify to match scripts/audit-prismic-videos.mjs targetFilename. */
function slugify(name: string): string {
  return (
    name
      .replace(/\.[^.]+$/, "")
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/^-|-$/g, "")
      .toLowerCase() || "video"
  );
}

/**
 * Maps a Prismic CDN video URL to the R2 object key (slugified filename, .mp4).
 * Must match the targetFilename produced by scripts/audit-prismic-videos.mjs.
 */
let prismicUrlToR2Key: (url: string) => string | null = (url) => {
  try {
    const u = new URL(url);
    const base = u.pathname.split("/").pop();
    if (!base || !VIDEO_EXT.test(base)) return null;
    const key = `${slugify(base)}.mp4`;
    return key;
  } catch {
    return null;
  }
};

/**
 * Set a custom mapping from Prismic video URL to R2 object key.
 * Use after migration if manifest has different targetFilename vs Prismic name.
 */
export function setPrismicToR2KeyMapper(
  fn: (url: string) => string | null
): void {
  prismicUrlToR2Key = fn;
}

/**
 * Rewrites a Prismic CDN video URL to the R2 CDN URL.
 * If the URL is not a Prismic video, returns the original URL.
 */
export function videoUrlFromCdn(url: string | null | undefined): string {
  if (!url || typeof url !== "string") return "";
  if (!PRISMIC_VIDEO_HOSTS.test(url) || !VIDEO_EXT.test(url)) return url;
  const key = prismicUrlToR2Key(url);
  if (!key) return url;
  const base = VIDEO_CDN_BASE.replace(/\/$/, "");
  return `${base}/${key}`;
}
