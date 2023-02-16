/** @type {import('tailwindcss').Config} */

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

const MAX_RATIO = 1.5;
const MIN_RATIO = 1.25;

const headline = {
  max: {
    1: ms(1, MAX_RATIO, 6),
    2: ms(1, MAX_RATIO, 5),
    3: ms(1, MAX_RATIO, 4),
    4: ms(1, MAX_RATIO, 3),
    5: ms(1, MAX_RATIO, 2),
    6: ms(1, MAX_RATIO, 1),
  },
  min: {
    1: ms(1, MIN_RATIO, 6),
    2: ms(1, MIN_RATIO, 5),
    3: ms(1, MIN_RATIO, 4),
    4: ms(1, MIN_RATIO, 3),
    5: ms(1, MIN_RATIO, 2),
    6: ms(1, MIN_RATIO, 1),
  },
};

module.exports = {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    olors: {
      mark: "#f74c04",
      highlight: "#ccbb00",
      "highlight-dim": "rgba(204, 187, 0, 0.5)",
      steel: "#304855",
      black: "#0b1418",
      glacier: "#f7f7f7",
      white: "#fff",
      transparent: "transparent",
    },
    fontFamily: {
      sans: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    },
    fontSize: {
      base: "1rem",
      paragraph: "1.15rem",
      string: "1.15rem",
      linkString: "1.15rem",
      caption: "0.85rem",
      "headline-3xl": clampBuilder(640, 1920, headline.min[1], headline.max[1]),
      "headline-2xl": clampBuilder(640, 1920, headline.min[2], headline.max[2]),
      "headline-xl": clampBuilder(640, 1920, headline.min[3], headline.max[3]),
      "headline-lg": clampBuilder(640, 1920, headline.min[4], headline.max[4]),
      "headline-md": clampBuilder(640, 1920, headline.min[5], headline.max[5]),
    },
    lineHeight: {
      base: 1.2,
      paragraph: 1.5,
      string: 1.5,
      linkString: 1.2,
      "headline-3xl": 1.1,
      "headline-2xl": 1.1,
      "headline-xl": 1.2,
      "headline-lg": 1.2,
      "headline-md": 1.3,
      "headline-sm": 1.3,
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
    extend: {},
  },
  plugins: [],
};
