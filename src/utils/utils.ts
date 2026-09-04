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

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

/** A date we have already formatted, e.g. "February 1, 2025". */
const FORMATTED = /^[A-Z][a-z]+ \d{1,2}, \d{4}$/;

/** The calendar part of "2025-02-01" or "2025-02-01T00:00:00.000Z". */
const CALENDAR_DATE = /^(\d{4})-(\d{2})-(\d{2})/;

/**
 * Formats a calendar date as "February 1, 2025".
 *
 * Deliberately does no timezone conversion. `desired_date` is a calendar day a
 * visitor picked, not an instant — 1 February is 1 February wherever they are.
 *
 * The previous implementation went through `Date` and read the month in local
 * time while reading the day and year in UTC. West of Greenwich those two
 * disagree for the whole of the 1st, so `"2025-02-01"` formatted as
 * "January 1, 2025" — reported by a visitor in May 2024 and confirmed in #213.
 * Every other day of the month looked fine, which is why it survived two years.
 *
 * Already-formatted input is returned unchanged. The submit path used to format
 * on the client and again on the server, which shifted the date a second time;
 * that double call is gone, but staying idempotent means it cannot silently
 * come back.
 */
export function formatDate(date: string) {
  if (!date) return "";

  const trimmed = String(date).trim();
  if (FORMATTED.test(trimmed)) return trimmed;

  const match = CALENDAR_DATE.exec(trimmed);
  // Not a shape we recognise — hand it back rather than inventing a date.
  if (!match) return trimmed;

  const [, year, month, day] = match;
  const monthName = MONTH_NAMES[Number(month) - 1];
  if (!monthName) return trimmed;

  return `${monthName} ${Number(day)}, ${Number(year)}`;
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
