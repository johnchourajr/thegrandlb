/**
 * Bandwidth Optimization Utilities
 *
 * This module provides utilities to optimize Prismic media consumption
 * and reduce bandwidth usage across the application.
 */

export type VideoQuality = "low" | "medium" | "high";
export type VideoFormat = "mp4" | "webm" | "av1";

export interface VideoOptimizationOptions {
  quality?: VideoQuality;
  maxWidth?: number;
  format?: VideoFormat;
  compress?: boolean;
}

export interface ImageOptimizationOptions {
  quality?: number;
  format?: "webp" | "avif" | "auto";
  maxWidth?: number;
  aggressive?: boolean;
}

/**
 * Optimizes video URL parameters to reduce bandwidth
 */
export function optimizeVideoUrl(
  originalUrl: string,
  options: VideoOptimizationOptions = {}
): string {
  const {
    quality = "medium",
    maxWidth = 1920,
    format = "mp4",
    compress = true,
  } = options;

  // For Prismic videos, we can't directly optimize on their CDN
  // But we can prepare for external hosting or provide fallbacks
  const url = new URL(originalUrl);

  // Add compression hints if supported
  if (compress) {
    url.searchParams.set("compress", "true");
  }

  // Set quality parameters
  const qualityMap = {
    low: "30",
    medium: "50",
    high: "70",
  };

  url.searchParams.set("q", qualityMap[quality]);

  return url.toString();
}

/**
 * Optimizes image URL parameters to reduce bandwidth
 */
export function optimizeImageUrl(
  originalUrl: string,
  options: ImageOptimizationOptions = {}
): string {
  const {
    quality = 60,
    format = "webp",
    maxWidth,
    aggressive = false,
  } = options;

  const url = new URL(originalUrl);

  // Set quality (more aggressive for bandwidth saving)
  const adjustedQuality = aggressive ? Math.max(quality - 20, 30) : quality;
  url.searchParams.set("q", adjustedQuality.toString());

  // Set format
  if (format === "auto") {
    url.searchParams.set("fm", "webp");
    url.searchParams.set("auto", "compress,format");
  } else {
    url.searchParams.set("fm", format);
  }

  // Set max width if provided
  if (maxWidth) {
    url.searchParams.set("w", maxWidth.toString());
    url.searchParams.set("fit", "max");
  }

  // Add compression
  if (!url.searchParams.has("auto")) {
    url.searchParams.set("auto", "compress");
  }

  return url.toString();
}

/**
 * Generates a lightweight poster image for videos
 */
export function generateVideoPoster(videoUrl: string): string {
  // Extract the base URL and create a poster image URL
  // This assumes Prismic CDN can generate poster frames
  const baseUrl = videoUrl.replace(/\.(mp4|webm|mov)$/i, ".jpg");

  return optimizeImageUrl(baseUrl, {
    quality: 75,
    format: "webp",
    maxWidth: 1200,
    aggressive: true,
  });
}

/**
 * Determines if video should auto-play based on connection and preferences
 */
export function shouldAutoPlayVideo(): boolean {
  if (typeof window === "undefined") return false;

  // Check for reduced motion preference
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }

  // Check for save-data preference
  if ("connection" in navigator && (navigator as any).connection?.saveData) {
    return false;
  }

  // Check for slow connection
  if ("connection" in navigator) {
    const connection = (navigator as any).connection;
    if (connection && connection.effectiveType) {
      // Don't auto-play on 2G or slow 3G
      if (["slow-2g", "2g", "3g"].includes(connection.effectiveType)) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Gets optimized device sizes for responsive images
 */
export function getOptimizedDeviceSizes(): number[] {
  // Reduced set of sizes to minimize variants
  return [375, 640, 1080, 1440, 1920];
}

/**
 * Creates a more efficient sizes attribute for images
 */
export function getOptimizedSizesAttribute(
  type: "hero" | "gallery" | "thumbnail" | "full-width" = "full-width"
): string {
  const sizeMap = {
    hero: "(min-width: 1440px) 1440px, (min-width: 1080px) 1080px, 100vw",
    gallery: "(min-width: 1200px) 400px, (min-width: 768px) 300px, 250px",
    thumbnail: "(min-width: 768px) 200px, 150px",
    "full-width":
      "(min-width: 1440px) 1440px, (min-width: 1080px) 1080px, (min-width: 640px) 640px, 100vw",
  };

  return sizeMap[type];
}

/**
 * Implements intersection observer for lazy loading
 */
export function createLazyLoadObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver | null {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    return null;
  }

  const defaultOptions = {
    rootMargin: "100px 0px", // Load 100px before element comes into view
    threshold: 0,
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
}

/**
 * Checks if user is on a data-saving connection
 */
export function isDataSaverMode(): boolean {
  if (typeof window === "undefined") return false;

  // Check save-data header
  if ("connection" in navigator && (navigator as any).connection?.saveData) {
    return true;
  }

  // Check for slow connection
  if ("connection" in navigator) {
    const connection = (navigator as any).connection;
    if (
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "2g"
    ) {
      return true;
    }
  }

  return false;
}

/**
 * Log bandwidth usage for monitoring
 */
export function logBandwidthUsage(
  assetType: string,
  url: string,
  size?: number
) {
  if (process.env.NODE_ENV === "development") {
    console.log(
      `[Bandwidth] ${assetType}: ${url}${
        size ? ` (${(size / 1024 / 1024).toFixed(2)}MB)` : ""
      }`
    );
  }

  // In production, you could send this to analytics
  // analytics.track('bandwidth_usage', { assetType, url, size });
}
