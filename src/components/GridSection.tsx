import clsx from "clsx";
import type { MotionProps } from "framer-motion";
import { m } from "framer-motion";

export type Spacer = "None" | "Small" | "Medium" | "Large" | null;

interface GridSectionProps {
  gridSectionRef?: React.RefObject<HTMLDivElement> | null;
  children: React.ReactNode;
  gridSectionType?: "grid" | "flex";
  as?: "section" | "div" | "footer";
  id: string | null | undefined;
  className?: string;
  topSpacer: Spacer;
  bottomSpacer: Spacer;
  overflowHidden?: boolean;
}

type GridSectionPropsWithMotion = GridSectionProps & MotionProps;

export function GridSection({
  gridSectionRef = null,
  children,
  gridSectionType = "grid",
  as: Comp = "section",
  id = null,
  className,
  topSpacer = "Small",
  bottomSpacer = "None",
  overflowHidden = true,
  ...rest
}: GridSectionPropsWithMotion) {
  // create motion component based on the as prop
  const MotionComp = m[Comp];

  const getSpacerTopStyles = (space?: Spacer) => {
    if (!space) return "!pt-0";
    if (space?.includes("None")) {
      return "pt-0";
    } else if (space?.includes("Small")) {
      return "padding-top";
    } else if (space?.includes("Medium")) {
      return "padding-top-md";
    } else if (space?.includes("Large")) {
      return "padding-top-lg";
    }
    return "pt-0";
  };

  const getSpacerBottomStyles = (space?: Spacer) => {
    if (!space) return "!mb-0";
    if (space?.includes("None")) {
      return "pb-0";
    } else if (space?.includes("Small")) {
      return "padding-bottom";
    } else if (space?.includes("Medium")) {
      return "padding-bottom-md";
    } else if (space?.includes("Large")) {
      return "padding-bottom-lg";
    }
    return "pb-0";
  };

  return (
    <MotionComp
      id={id ? id : undefined}
      ref={gridSectionRef}
      className={clsx(
        "mx-auto w-full max-w-[2500px] gap-4 lg:gap-6",
        gridSectionType === "grid" &&
          "grid grid-cols-4 px-4 lg:grid-cols-12 lg:px-6",
        gridSectionType === "flex" && "flex",
        topSpacer && getSpacerTopStyles(topSpacer),
        bottomSpacer && getSpacerBottomStyles(bottomSpacer),
        overflowHidden && "overflow-hidden",
        className
      )}
      {...rest}
    >
      {children}
    </MotionComp>
  );
}

export default GridSection;
