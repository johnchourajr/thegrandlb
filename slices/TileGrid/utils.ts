export type TileTheme =
  | "Black/White"
  | "White/Black"
  | "Creme/Black"
  | "Blue/Black"
  | "Gold/Black"
  | "Outlined";

export type ColStart =
  | "Start 1"
  | "Start 2"
  | "Start 3"
  | "Start 4"
  | "Start 5"
  | "Start 6"
  | "Start 7"
  | "Start 8"
  | "Start 9"
  | "Start 10"
  | "Start 11"
  | "Start 12";

export type ColSpan =
  | "Span 1"
  | "Span 2"
  | "Span 3"
  | "Span 4"
  | "Span 5"
  | "Span 6"
  | "Span 7"
  | "Span 8"
  | "Span 9"
  | "Span 10"
  | "Span 11"
  | "Span 12";

export type RowStart =
  | "Start 1"
  | "Start 2"
  | "Start 3"
  | "Start 4"
  | "Start 5"
  | "Start 6";

export type RowSpan =
  | "Span 1"
  | "Span 2"
  | "Span 3"
  | "Span 4"
  | "Span 5"
  | "Span 6";

export const getNumberForColStart = (string: ColStart) => {
  switch (string) {
    case "Start 1":
      return `col-start-1`;
    case "Start 2":
      return `col-start-2`;
    case "Start 3":
      return `col-start-3`;
    case "Start 4":
      return `col-start-4`;
    case "Start 5":
      return `col-start-5`;
    case "Start 6":
      return `col-start-6`;
    case "Start 7":
      return `col-start-7`;
    case "Start 8":
      return `col-start-8`;
    case "Start 9":
      return `col-start-9`;
    case "Start 10":
      return `col-start-10`;
    case "Start 11":
      return `col-start-11`;
    case "Start 12":
      return `col-start-12`;
    default:
      return `col-start-1`;
  }
};

export const getNumberForColSpan = (string: ColSpan) => {
  switch (string) {
    case "Span 1":
      return `col-span-1`;
    case "Span 2":
      return `col-span-2`;
    case "Span 3":
      return `col-span-3`;
    case "Span 4":
      return `col-span-4`;
    case "Span 5":
      return `col-span-5`;
    case "Span 6":
      return `col-span-6`;
    case "Span 7":
      return `col-span-7`;
    case "Span 8":
      return `col-span-8`;
    case "Span 9":
      return `col-span-9`;
    case "Span 10":
      return `col-span-10`;
    case "Span 11":
      return `col-span-11`;
    case "Span 12":
      return `col-span-12`;
    default:
      return `col-span-1`;
  }
};

export const getNumberForRowStart = (string: RowStart) => {
  switch (string) {
    case "Start 1":
      return `row-start-1`;
    case "Start 2":
      return `row-start-2`;
    case "Start 3":
      return `row-start-3`;
    case "Start 4":
      return `row-start-4`;
    case "Start 5":
      return `row-start-5`;
    case "Start 6":
      return `row-start-6`;
    default:
      return `row-start-1`;
  }
};

export const getNumberForRowSpan = (string: RowSpan) => {
  switch (string) {
    case "Span 1":
      return `row-span-1`;
    case "Span 2":
      return `row-span-2`;
    case "Span 3":
      return `row-span-3`;
    case "Span 4":
      return `row-span-4`;
    case "Span 5":
      return `row-span-5`;
    case "Span 6":
      return `row-span-6`;
    default:
      return `row-span-1`;
  }
};
