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

export function formatPhoneNumber(value: string): string {
  if (!value) {
    return value;
  }

  if (value.length <= 10 || (value.length <= 11 && value[0] === "1")) {
    const regex =
      value[0] === "1"
        ? /(1{0,1})(\d{0,3})(\d{0,3})(\d{0,4})/
        : /(\d{0,3})(\d{0,3})(\d{0,4})/;

    return (
      value
        .match(regex)
        ?.slice(1)
        .filter((match) => match.length)
        .join("-") || ""
    );
  }

  return value;
}

// format date from YYYY-MM-DD to Mm DD, YYYY
export function formatDate(date: string) {
  const dateObj = new Date(date);
  dateObj.setUTCHours(0, 0, 0, 0); // Set time to midnight in UTC

  const month = dateObj.toLocaleString("default", { month: "long" });
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  return `${month} ${day}, ${year}`;
}
