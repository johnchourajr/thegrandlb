/**
 * Noise Generation Utilities
 *
 * Creates lightweight noise effects without requiring large image files
 */

/**
 * Generates a small noise pattern as a data URL
 * This replaces the large 156MB noise.png with a tiny procedural texture
 */
export function generateNoiseDataUrl(
  size: number = 64,
  opacity: number = 0.1
): string {
  if (typeof window === "undefined") return "";

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) return "";

  canvas.width = size;
  canvas.height = size;

  const imageData = ctx.createImageData(size, size);
  const data = imageData.data;

  // Generate random noise pattern
  for (let i = 0; i < data.length; i += 4) {
    const noise = Math.random() * 255;
    data[i] = noise; // Red
    data[i + 1] = noise; // Green
    data[i + 2] = noise; // Blue
    data[i + 3] = Math.floor(opacity * 255); // Alpha
  }

  ctx.putImageData(imageData, 0, 0);

  return canvas.toDataURL("image/png");
}

/**
 * Creates CSS-only noise using SVG filter
 * This is the most bandwidth-efficient approach
 */
export function generateSvgNoiseFilter(): string {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <defs>
        <filter id="noise">
          <feTurbulence
            baseFrequency="0.9"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0"/>
          <feComponentTransfer>
            <feFuncA type="discrete" tableValues="0 .5 .5 .7 .7 .9 1"/>
          </feComponentTransfer>
          <feComposite in="SourceGraphic" operator="multiply"/>
        </filter>
      </defs>
      <rect width="100%" height="100%" filter="url(#noise)" opacity="0.05"/>
    </svg>
  `;
}

/**
 * Get optimized noise CSS class based on user preferences
 */
export function getOptimizedNoiseClass(): string {
  // Check for reduced motion or data saver preferences
  if (typeof window !== "undefined") {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const saveData =
      "connection" in navigator && (navigator as any).connection?.saveData;

    if (prefersReducedMotion || saveData) {
      return "noise-static";
    }
  }

  return "noise-animated";
}

/**
 * Create small repeating noise pattern using CSS gradients (no external files)
 */
export function getCssNoiseBackground(): string {
  return `
    radial-gradient(circle at 20% 80%, transparent 50%, rgba(255,255,255,0.02) 50%),
    radial-gradient(circle at 80% 20%, transparent 50%, rgba(255,255,255,0.02) 50%),
    radial-gradient(circle at 40% 40%, transparent 50%, rgba(255,255,255,0.01) 50%)
  `;
}


