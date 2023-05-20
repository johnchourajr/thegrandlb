/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

function clampBuilder(minWidthPx, maxWidthPx, minFontSize, maxFontSize) {
  const minWidth = minWidthPx / 16;
  const maxWidth = maxWidthPx / 16;

  const slope = (maxFontSize - minFontSize) / (maxWidth - minWidth);
  const yAxisIntersection = -minWidth * slope + minFontSize;

  return `clamp(${minFontSize}rem, ${yAxisIntersection}rem + ${
    slope * 100
  }vw, ${maxFontSize}rem)`;
}

// modular scale function
function ms(base, ratio, n) {
  return base * Math.pow(ratio, n);
}

const MAX_RATIO = 1.275;
const MIN_RATIO = 1.125;

const headline = {
  max: {
    "-1": ms(2.3, MAX_RATIO, 10),
    0: ms(2.3, MAX_RATIO, 9.2),
    1: ms(2.1, MAX_RATIO, 6),
    2: ms(2.1, MAX_RATIO, 5),
    3: ms(2.1, MAX_RATIO, 4),
    4: ms(2.1, MAX_RATIO, 3),
    5: ms(2.1, MAX_RATIO, 2),
    6: ms(2, MAX_RATIO, 1),
  },
  min: {
    "-1": ms(2, MIN_RATIO, 10),
    0: ms(2, MIN_RATIO, 9.2),
    1: ms(1.4, MIN_RATIO, 6),
    2: ms(1.4, MIN_RATIO, 5),
    3: ms(1.4, MIN_RATIO, 4),
    4: ms(1.4, MIN_RATIO, 3),
    5: ms(1.4, MIN_RATIO, 2),
    6: ms(1.4, MIN_RATIO, 1),
  },
};

const colors = {
  black: "#311514",
  cream: "#FAF2EB",
  white: "#FFFFFF",
  gold: "#FFC42D",
  red: "#8A2432",
  blue: "#CEEAEB",
};

module.exports = {
  mode: "jit",
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
    "./slices/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    require("tailwindcss-scoped-groups")({
      groups: ["one", "two", "three"],
    }),
  ],
  theme: {
    colors: {
      bg: colors.cream,
      text: colors.black,
      primary: colors.black,
      black: colors.black,
      cream: colors.cream,
      white: colors.white,
      gold: colors.gold,
      blue: colors.blue,
      red: colors.red,
    },
    fontSize: {
      "string-large": "1rem",
      "string-default": "0.8125rem",
      "string-small": "0.6875rem",
      "string-extra-small": "0.625rem",
      "paragraph-large": "1.25rem",
      "paragraph-default": "1rem",
      "paragraph-small": "0.875rem",
      "headline-5xl": clampBuilder(
        375,
        1920,
        headline.min["-1"],
        headline.max["-1"]
      ),
      "headline-4xl": clampBuilder(375, 1920, headline.min[0], headline.max[0]),
      "headline-3xl": clampBuilder(
        1024,
        1920,
        headline.min[1],
        headline.max[1]
      ),
      "headline-2xl": clampBuilder(
        1024,
        1920,
        headline.min[2],
        headline.max[2]
      ),
      "headline-xl": clampBuilder(1024, 1920, headline.min[3], headline.max[3]),
      "headline-lg": clampBuilder(1024, 1920, headline.min[4], headline.max[4]),
      "headline-md": clampBuilder(1024, 1920, headline.min[5], headline.max[5]),
      "headline-sm": clampBuilder(1024, 1920, headline.min[6], headline.max[6]),
    },
    lineHeight: {
      base: 1.2,
      paragraph: 1.45,
      string: 1.5,
      linkString: 1.2,
      "headline-5xl": 0.88,
      "headline-4xl": 0.88,
      "headline-3xl": 0.91,
      "headline-2xl": 0.95,
      "headline-xl": 0.98,
      "headline-lg": 1,
      "headline-md": 1.1,
      "headline-sm": 1.2,
    },
    letterSpacing: {
      "headline-5xl": "-0.04em",
      "headline-4xl": "-0.04em",
      "headline-3xl": "-0.04em",
      "headline-2xl": "-0.04em",
      "headline-xl": "-0.04em",
      "headline-lg": "-0.03em",
      "headline-md": "-0.015em",
      "headline-sm": "-0.015em",
    },

    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1440px",
      // => @media (min-width: 1440px) { ... }

      "3xl": "1920px",
      // => @media (min-width: 1920px) { ... }

      "4xl": "2560px",
      // => @media (min-width: 2560px) { ... }
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    fontFamily: {
      sans: ["var(--font-atkinson)", ...defaultTheme.fontFamily.sans],
      serif: ["var(--font-domaine)", ...defaultTheme.fontFamily.serif],
      lexend: ["var(--font-lexend)", ...defaultTheme.fontFamily.sans],
      "lexend-bold": [
        "var(--font-lexend-bold)",
        ...defaultTheme.fontFamily.sans,
      ],
    },
    extend: {
      spacing: {
        "layout-sm": "1.5rem",
        "layout-md": "2rem",
        "layout-lg": "2.5rem",
        "layout-xl": "3rem",
        "layout-2xl": "3.5rem",
        "layout-3xl": "4rem",
        "layout-4xl": "4.5rem",
        "layout-5xl": "5rem",
      },
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.25rem",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },
      maxWidth: {
        DEFAULT: "92%",
        "inner-rail": "92%",
        "outer-rail": "100%",
        xl: "1280px",
        lg: "880px",
        md: "720px",
        sm: "540px",
        xs: "360px",
      },
    },
  },
};
