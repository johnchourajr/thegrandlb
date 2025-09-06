/**
 * Safe Array Utilities
 *
 * Utility functions to safely handle arrays that might be undefined/null
 * and prevent "Cannot read property 'map' of undefined" errors.
 */

/**
 * Safely maps over an array, returning empty array if source is undefined/null
 * @param array - Array that might be undefined or null
 * @param mapFn - Mapping function to apply to each item
 * @returns Mapped array or empty array if source is invalid
 */
export const safeMap = <T, R>(
  array: T[] | undefined | null,
  mapFn: (item: T, index: number, array: T[]) => R
): R[] => {
  if (!Array.isArray(array)) {
    console.warn("safeMap: Received non-array value:", array);
    return [];
  }
  return array.map(mapFn);
};

/**
 * Ensures a value is always an array
 * @param value - Value that should be an array
 * @returns Array or empty array if value is invalid
 */
export const ensureArray = <T>(value: T[] | undefined | null): T[] => {
  if (!Array.isArray(value)) {
    console.warn("ensureArray: Received non-array value:", value);
    return [];
  }
  return value;
};

/**
 * Safely gets array length, returns 0 if undefined/null
 * @param array - Array that might be undefined or null
 * @returns Length or 0 if array is invalid
 */
export const safeLength = <T>(array: T[] | undefined | null): number => {
  return Array.isArray(array) ? array.length : 0;
};

/**
 * Safely filters an array, returning empty array if source is undefined/null
 * @param array - Array that might be undefined or null
 * @param filterFn - Filter function to apply
 * @returns Filtered array or empty array if source is invalid
 */
export const safeFilter = <T>(
  array: T[] | undefined | null,
  filterFn: (item: T, index: number, array: T[]) => boolean
): T[] => {
  if (!Array.isArray(array)) {
    console.warn("safeFilter: Received non-array value:", array);
    return [];
  }
  return array.filter(filterFn);
};

/**
 * Safely finds an item in an array, returns undefined if array is invalid
 * @param array - Array that might be undefined or null
 * @param findFn - Find function to apply
 * @returns Found item or undefined
 */
export const safeFind = <T>(
  array: T[] | undefined | null,
  findFn: (item: T, index: number, array: T[]) => boolean
): T | undefined => {
  if (!Array.isArray(array)) {
    console.warn("safeFind: Received non-array value:", array);
    return undefined;
  }
  return array.find(findFn);
};
