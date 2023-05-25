export const convertToSlug = (text: any) => {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .replace("--", "-");
};

// rewrite with typescript
// export function clampBuilder(minWidthPx, maxWidthPx, minFontSize, maxFontSize) {
export function clampBuilder(
  minWidthPx: number,
  maxWidthPx: number,
  minFontSize: number,
  maxFontSize: number
) {
  const minWidth = minWidthPx / 16;
  const maxWidth = maxWidthPx / 16;

  const slope = (maxFontSize - minFontSize) / (maxWidth - minWidth);
  const yAxisIntersection = -minWidth * slope + minFontSize;

  return `clamp(${minFontSize}rem, ${yAxisIntersection}rem + ${
    slope * 100
  }vw, ${maxFontSize}rem)`;
}

export const splitTextIntoArray = (text: string) => {
  return text.split(" ");
};

export function isEmptyObject(obj: any) {
  if (!obj) return true;
  return Object.keys(obj).length === 0;
}
