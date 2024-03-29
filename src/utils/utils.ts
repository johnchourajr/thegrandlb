export const convertToSlug = (text?: any) => {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .replace("--", "-");
};

export const stringToUnderscore = (str?: string | null) => {
  if (!str || str === undefined) return "";
  return str
    .replace(/\s/g, "_")
    .replace(/^(.)/, function ($1) {
      return $1.toLowerCase();
    })
    .toLowerCase();
};

export const stringToCamelCase = (str?: string | null) => {
  if (!str || str === undefined) return "";
  return (
    str
      .replace(/\s(.)/g, function ($1) {
        return $1.toUpperCase();
      })
      .replace(/\s/g, "")
      .replace(/^(.)/, function ($1) {
        return $1.toLowerCase();
      })
      .replace(/[^a-zA-Z0-9]/g, "")
      // replace dashes and capitalizes the next letter
      .replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
      })
  );
};

export const slugToSentenceCase = (str?: string | null) => {
  if (!str || str === undefined) return "";
  return str
    .replace(/-/g, " ")
    .replace(/_/g, " ")
    .replace(/^(.)/, function ($1) {
      return $1.toUpperCase();
    });
};

export const getTextFromChildren = (children?: any) => {
  if (!children || children === undefined) return "";
  return children
    .map((child: any) => child.props.children)
    .join("")
    .trim();
};

export const childrenToCamelCase = (children?: any) => {
  if (!children || children === undefined) return "";
  return stringToCamelCase(getTextFromChildren(children));
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

// replace dashes and underscores with spaces and title case
export function formatTitle(str: string) {
  if (!str) return "";
  // Replace dashes and underscores with spaces
  const modifiedStr = str.replace(/[-_]/g, " ");

  // Convert string to title case
  const titleCaseStr = modifiedStr
    .toLowerCase()
    .replace(/(^|\s)\w/g, (match) => match.toUpperCase());

  return titleCaseStr;
}
