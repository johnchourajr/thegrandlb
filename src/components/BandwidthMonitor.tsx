"use client";

/**
 * Bandwidth Monitor Component
 *
 * Tracks and reports bandwidth usage for optimization purposes
 */

import { useEffect } from "react";

interface BandwidthEntry {
  url: string;
  size: number;
  type: "image" | "video" | "api" | "other";
  timestamp: number;
}

const BandwidthMonitor = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    let totalBandwidth = 0;
    const entries: BandwidthEntry[] = [];

    // Monitor fetch requests
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const response = await originalFetch(...args);

      try {
        const url = args[0] as string;
        const contentLength = response.headers.get("content-length");

        if (contentLength) {
          const size = parseInt(contentLength, 10);
          totalBandwidth += size;

          let type: BandwidthEntry["type"] = "other";
          if (url.includes("prismic.io") && url.includes("/api/")) {
            type = "api";
          } else if (url.match(/\.(jpg|jpeg|png|webp|avif)$/i)) {
            type = "image";
          } else if (url.match(/\.(mp4|webm|mov)$/i)) {
            type = "video";
          }

          entries.push({
            url,
            size,
            type,
            timestamp: Date.now(),
          });

          // Log significant bandwidth usage
          if (size > 1024 * 1024) {
            // > 1MB
            console.log(
              `[Bandwidth Alert] Large ${type}: ${(size / 1024 / 1024).toFixed(
                2
              )}MB - ${url}`
            );
          }
        }
      } catch (error) {
        // Silently continue if monitoring fails
      }

      return response;
    };

    // Report bandwidth usage every 30 seconds in development
    const interval = setInterval(() => {
      if (entries.length > 0) {
        const summary = entries.reduce((acc, entry) => {
          acc[entry.type] = (acc[entry.type] || 0) + entry.size;
          return acc;
        }, {} as Record<string, number>);

        console.group(
          `[Bandwidth Summary] Total: ${(totalBandwidth / 1024 / 1024).toFixed(
            2
          )}MB`
        );
        Object.entries(summary).forEach(([type, size]) => {
          console.log(`${type}: ${(size / 1024 / 1024).toFixed(2)}MB`);
        });
        console.groupEnd();

        // Reset for next period
        entries.length = 0;
        totalBandwidth = 0;
      }
    }, 30000);

    return () => {
      clearInterval(interval);
      // Restore original fetch
      window.fetch = originalFetch;
    };
  }, []);

  return null; // This component doesn't render anything
};

export default BandwidthMonitor;
