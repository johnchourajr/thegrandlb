import type { TextSize } from "@/components/Headline";
import {
  MotionProps,
  MotionStyle,
  TargetAndTransition,
  VariantLabels,
} from "framer-motion";

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
  | "Start 6"
  | "Start 7"
  | "Start 8";

export type RowSpan =
  | "Span 1"
  | "Span 2"
  | "Span 3"
  | "Span 4"
  | "Span 5"
  | "Span 6"
  | "Span 7"
  | "Span 8";

export interface TileItemProps {
  col_span?: ColSpan;
  col_start?: ColStart;
  row_span?: RowSpan;
  row_start?: RowStart;
  theme?: TileTheme;
  size?: "Default" | "Large" | undefined;
  direction?: "Col" | "Col Reverse" | undefined;
  media?: any;
  link?: any;
  headline?: any;
  eyebrow?: any;
  card_fragment?: any;
  body?: any;
  className?: string;
  gridOptions?: boolean;
  motionStyles?: MotionStyle;
  initial?: TargetAndTransition | VariantLabels; //@deprecated
  whileInView?: TargetAndTransition | VariantLabels; //@deprecated
  viewport?: MotionProps["viewport"];
}
export type TileStyleProps = {
  container?: string;
  content?: string;
  headline?: string;
  headlineSize?: TextSize;
};
