import { ColSpan, ColStart, RowSpan, RowStart } from "./types";

export const getNumberForColStart = (string?: ColStart) => {
  switch (string) {
    case "Start 1":
      return `col-start-auto xl:col-start-1`;
    case "Start 2":
      return `col-start-auto xl:col-start-2`;
    case "Start 3":
      return `col-start-auto xl:col-start-3`;
    case "Start 4":
      return `col-start-auto xl:col-start-4`;
    case "Start 5":
      return `col-start-auto xl:col-start-5`;
    case "Start 6":
      return `col-start-auto xl:col-start-6`;
    case "Start 7":
      return `col-start-auto xl:col-start-7`;
    case "Start 8":
      return `col-start-auto xl:col-start-8`;
    case "Start 9":
      return `col-start-auto xl:col-start-9`;
    case "Start 10":
      return `col-start-auto xl:col-start-10`;
    case "Start 11":
      return `col-start-auto xl:col-start-11`;
    case "Start 12":
      return `col-start-auto xl:col-start-12`;
    default:
      return `col-start-1`;
  }
};

export const getNumberForColSpan = (string?: ColSpan) => {
  switch (string) {
    case "Span 1":
      return `col-span-4 lg:col-span-2 xl:col-span-1`;
    case "Span 2":
      return `col-span-4 lg:col-span-2 xl:col-span-2`;
    case "Span 3":
      return `col-span-4 lg:col-span-2 xl:col-span-3`;
    case "Span 4":
      return `col-span-4 lg:col-span-2 xl:col-span-4`;
    case "Span 5":
      return `col-span-4 lg:col-span-2 xl:col-span-5`;
    case "Span 6":
      return `col-span-4 lg:col-span-2 xl:col-span-6`;
    case "Span 7":
      return `col-span-4 lg:col-span-2 xl:col-span-7`;
    case "Span 8":
      return `col-span-4 lg:col-span-2 xl:col-span-8`;
    case "Span 9":
      return `col-span-4 lg:col-span-2 xl:col-span-9`;
    case "Span 10":
      return `col-span-4 lg:col-span-2 xl:col-span-10`;
    case "Span 11":
      return `col-span-4 lg:col-span-2 xl:col-span-11`;
    case "Span 12":
      return `col-span-4 lg:col-span-2 xl:col-span-12`;
    default:
      return `col-span-full`;
  }
};

export const getNumberForRowStart = (string?: RowStart) => {
  switch (string) {
    case "Start 1":
      return `row-auto xl:row-start-1`;
    case "Start 2":
      return `row-auto xl:row-start-2`;
    case "Start 3":
      return `row-auto xl:row-start-3`;
    case "Start 4":
      return `row-auto xl:row-start-4`;
    case "Start 5":
      return `row-auto xl:row-start-5`;
    case "Start 6":
      return `row-auto xl:row-start-6`;
    case "Start 7":
      return `row-auto xl:row-start-7`;
    case "Start 8":
      return `row-auto xl:row-start-8`;
    default:
      return `row-auto`;
  }
};

export const getNumberForRowSpan = (string?: RowSpan) => {
  switch (string) {
    case "Span 1":
      return `row-auto xl:row-span-1`;
    case "Span 2":
      return `row-auto xl:row-span-2`;
    case "Span 3":
      return `row-auto xl:row-span-3`;
    case "Span 4":
      return `row-auto xl:row-span-4`;
    case "Span 5":
      return `row-auto xl:row-span-5`;
    case "Span 6":
      return `row-auto xl:row-span-6`;
    case "Span 7":
      return `row-auto xl:row-span-7`;
    case "Span 8":
      return `row-auto xl:row-span-8`;
    default:
      return `row-auto`;
  }
};
