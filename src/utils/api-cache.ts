/**
 * API Cache Utilities
 *
 * Reduces Prismic API calls by implementing smart caching strategies
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

interface CacheConfig {
  defaultTTL: number; // Time to live in milliseconds
  maxSize: number; // Maximum cache entries
}

class APICache {
  private cache = new Map<string, CacheEntry<unknown>>();
  private config: CacheConfig;

  constructor(config: Partial<CacheConfig> = {}) {
    this.config = {
      defaultTTL: 5 * 60 * 1000, // 5 minutes default
      maxSize: 100,
      ...config,
    };
  }

  private generateKey(endpoint: string, params?: Record<string, unknown>): string {
    const paramStr = params
      ? JSON.stringify(params, Object.keys(params).sort())
      : "";
    return `${endpoint}:${paramStr}`;
  }

  private isExpired(entry: CacheEntry<unknown>): boolean {
    return Date.now() - entry.timestamp > entry.ttl;
  }

  private evictExpired(): void {
    // Use Array.from to avoid IterableIterator TypeScript issues
    const entries = Array.from(this.cache.entries());
    for (const [key, entry] of entries) {
      if (this.isExpired(entry)) {
        this.cache.delete(key);
      }
    }
  }

  private evictOldest(): void {
    if (this.cache.size >= this.config.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }
  }

  get<T>(endpoint: string, params?: Record<string, unknown>): T | null {
    this.evictExpired();

    const key = this.generateKey(endpoint, params);
    const entry = this.cache.get(key);

    if (entry && !this.isExpired(entry)) {
      return entry.data as T;
    }

    return null;
  }

  set<T>(
    endpoint: string,
    data: T,
    params?: Record<string, unknown>,
    customTTL?: number
  ): void {
    this.evictOldest();

    const key = this.generateKey(endpoint, params);
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl: customTTL || this.config.defaultTTL,
    };

    this.cache.set(key, entry);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

// Global cache instance
const apiCache = new APICache({
  defaultTTL: 10 * 60 * 1000, // 10 minutes for Prismic data
  maxSize: 150,
});

/**
 * Cache configurations for different types of Prismic content
 */
export const CACHE_CONFIGS = {
  // Long-lived data that rarely changes
  NAVIGATION: { ttl: 30 * 60 * 1000 }, // 30 minutes
  SETTINGS: { ttl: 30 * 60 * 1000 }, // 30 minutes
  CTA_FOOTER: { ttl: 30 * 60 * 1000 }, // 30 minutes

  // Medium-lived data
  PAGES: { ttl: 15 * 60 * 1000 }, // 15 minutes
  FRAGMENTS: { ttl: 15 * 60 * 1000 }, // 15 minutes

  // Short-lived data that might change frequently
  MENUS: { ttl: 5 * 60 * 1000 }, // 5 minutes
  EVENTS: { ttl: 5 * 60 * 1000 }, // 5 minutes
} as const;

/**
 * Cached version of Prismic client calls
 */
export async function cachedPrismicCall<T>(
  cacheKey: string,
  apiCall: () => Promise<T>,
  config?: { ttl?: number }
): Promise<T> {
  // Check cache first
  const cached = apiCache.get<T>(cacheKey);
  if (cached) {
    if (process.env.NODE_ENV === "development") {
      console.log(`[Cache HIT] ${cacheKey}`);
    }
    return cached;
  }

  // Make API call
  if (process.env.NODE_ENV === "development") {
    console.log(`[Cache MISS] ${cacheKey}`);
  }

  const data = await apiCall();

  // Cache the result
  apiCache.set(cacheKey, data, undefined, config?.ttl);

  return data;
}

/**
 * Pre-cache frequently accessed data during build
 */
export function warmCache() {
  // This can be called during build time or app initialization
  // to pre-populate commonly accessed data
}

/**
 * Utility to batch multiple Prismic calls
 */
export async function batchPrismicCalls<T extends Record<string, unknown>>(
  calls: Record<
    keyof T,
    { key: string; call: () => Promise<T[keyof T]>; ttl?: number }
  >
): Promise<T> {
  const results = {} as T;

  // Check cache for all calls first
  const uncachedCalls: Array<{
    key: keyof T;
    call: () => Promise<T[keyof T]>;
    ttl?: number;
  }> = [];

  for (const [key, { key: cacheKey, call, ttl }] of Object.entries(calls)) {
    const cached = apiCache.get<T[keyof T]>(cacheKey);
    if (cached) {
      results[key as keyof T] = cached as T[keyof T];
    } else {
      uncachedCalls.push({ key: key as keyof T, call, ttl });
    }
  }

  // Execute uncached calls in parallel
  if (uncachedCalls.length > 0) {
    const promises = uncachedCalls.map(async ({ key, call, ttl }) => {
      const data = await call();
      apiCache.set(calls[key].key, data, undefined, ttl);
      return { key, data };
    });

    const uncachedResults = await Promise.all(promises);

    // Merge results
    for (const { key, data } of uncachedResults) {
      results[key] = data;
    }
  }

  return results;
}

export { apiCache };
