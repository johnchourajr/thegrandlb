/**
 * Cloudflare Images CDN utilities.
 *
 * Images are served from Cloudflare Images (imagedelivery.net).
 * Set NEXT_PUBLIC_CF_IMAGES_ACCOUNT_HASH in your environment.
 *
 * URL format:
 *   https://imagedelivery.net/{account_hash}/{image_id}/{variant}
 *
 * Variant can be a named variant (e.g. "public") or flexible transforms
 * (e.g. "w=800,q=75,f=webp") — requires flexible variants enabled in your
 * Cloudflare Images dashboard.
 */

export const CF_IMAGES_BASE =
  process.env.NEXT_PUBLIC_CF_IMAGES_ACCOUNT_HASH
    ? `https://imagedelivery.net/${process.env.NEXT_PUBLIC_CF_IMAGES_ACCOUNT_HASH}`
    : null;

export type CfImageParams = {
  width?: number;
  quality?: number;
  format?: "webp" | "avif" | "auto";
  fit?: "scale-down" | "contain" | "cover" | "crop" | "pad";
};

/**
 * Build a Cloudflare Images URL from an image ID and optional transform params.
 * Falls back to the raw imageId if the account hash env var is not set.
 */
export function cfImageUrl(
  imageId: string,
  params: CfImageParams = {}
): string {
  if (!CF_IMAGES_BASE) {
    console.error(
      "[image-cdn] NEXT_PUBLIC_CF_IMAGES_ACCOUNT_HASH is not set. Cannot build Cloudflare Images URL."
    );
    return imageId;
  }

  const parts: string[] = [];
  if (params.width) parts.push(`w=${params.width}`);
  if (params.quality) parts.push(`q=${params.quality}`);
  if (params.format) parts.push(`f=${params.format}`);
  if (params.fit) parts.push(`fit=${params.fit}`);

  const variant = parts.length > 0 ? parts.join(",") : "public";
  return `${CF_IMAGES_BASE}/${imageId}/${variant}`;
}

/**
 * Next.js custom image loader for Cloudflare Images.
 *
 * Usage in next.config.js:
 *   images: { loader: 'custom', loaderFile: './src/lib/image-cdn.ts' }
 *
 * Or pass directly to <Image loader={cloudflareImageLoader} />.
 */
export function cloudflareImageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
  quality?: number; // ignored — fixed at 75 for consistent cache keys
}): string {
  // If src is already a full URL (e.g. during migration from Prismic), return as-is.
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }
  // Fixed quality and format so the same image + width always produces the
  // same URL → maximum cache reuse on Cloudflare's edge.
  return cfImageUrl(src, { width, quality: 75, format: "webp" });
}

/**
 * Detect whether a URL is a Cloudflare Images URL.
 */
export function isCfImageUrl(url: string): boolean {
  return url.startsWith("https://imagedelivery.net/");
}

export default cloudflareImageLoader;
