import { ColSpan, ColStart, RowSpan, RowStart } from "slices/TileGrid/types";

interface GetIndexReturn {
  col_start?: ColStart;
  col_span?: ColSpan;
  row_start?: RowStart;
  row_span?: RowSpan;
  container?: string;
}

export const getIndexLayout = (uid: string): GetIndexReturn => {
  // uid: "grand-ballroom", Grand Ballroom, col start 1, col span 4, row start 1, row span 4
  // uid: "palm-terrace", Palm Terrace, col start 5, col span 8, row start 1, row span 2
  // uid: "monarch-room", Monarch Room, col start 5, col span 8, row start 3, row span 2
  // uid: "catalina-room", Catalina Room, col start 1, col span 4, row start 5, row span 2
  // uid: "garden-room", Garden Room, col start 5, col span 4, row start 5, row span 2
  // uid: "pacific-room", Pacific Room, col start 9, col span 4, row start 5, row span 2
  // uid: "board-room", Board Room, hidden

  switch (uid) {
    case "grand-ballroom":
      return {
        col_start: "Start 1",
        col_span: "Span 4",
        row_start: "Start 1",
        row_span: "Span 4",
        container: "lg:flex-col-reverse",
      };
    case "palm-terrace":
      return {
        col_start: "Start 5",
        col_span: "Span 8",
        row_start: "Start 1",
        row_span: "Span 2",
        container: "lg:flex-col-reverse",
      };
    case "monarch-room":
      return {
        col_start: "Start 5",
        col_span: "Span 8",
        row_start: "Start 3",
        row_span: "Span 2",
        container: "lg:flex-col-reverse",
      };
    case "catalina-room":
      return {
        col_start: "Start 1",
        col_span: "Span 8",
        row_start: "Start 5",
        row_span: "Span 2",
        container: "lg:flex-col-reverse",
      };
    case "garden-room":
      return {
        col_start: "Start 9",
        col_span: "Span 4",
        row_start: "Start 5",
        row_span: "Span 4",
        container: "lg:flex-col-reverse",
      };
    case "pacific-room":
      return {
        col_start: "Start 5",
        col_span: "Span 4",
        row_start: "Start 7",
        row_span: "Span 2",
        container: "lg:flex-col-reverse",
      };
    case "board-room":
      return {
        col_start: "Start 1",
        col_span: "Span 4",
        row_start: "Start 7",
        row_span: "Span 2",
        container: "lg:flex-col-reverse",
      };
    default:
      return {
        container: "lg:flex-col-reverse",
      };
  }
};
