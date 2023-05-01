import clsx from "clsx";
import type { MotionProps } from "framer-motion";
import { m } from "framer-motion";

interface GridSectionProps {
  children: React.ReactNode;
  gridSectionType?: "grid" | "flex";
  as?: "section" | "div";
  id: string | null | undefined;
  className?: string;
  topSpacer: "None" | "Small" | "Large" | null;
  bottomSpacer: "None" | "Small" | "Large" | null;
}

// have GridSectionProps extend framer motion props to allow for motion
// variants and other motion props

type GridSectionPropsWithMotion = GridSectionProps & MotionProps;

export function GridSection({
  children,
  gridSectionType = "grid",
  as: Comp = "section",
  id = null,
  className,
  topSpacer = "Small",
  bottomSpacer = "None",
  ...rest
}: GridSectionPropsWithMotion) {
  // create motion component based on the as prop
  const MotionComp = m[Comp];

  const getSpacerTopStyles = (space?: "None" | "Small" | "Large") => {
    if (!space) return "!pt-0";
    if (space?.includes("None")) {
      return "pt-0";
    } else if (space?.includes("Small")) {
      return "padding-top";
    } else if (space?.includes("Large")) {
      return "padding-top-lg";
    }
    return "pt-0";
  };

  const getSpacerBottomStyles = (space?: "None" | "Small" | "Large") => {
    if (!space) return "!mb-0";
    if (space?.includes("None")) {
      return "pb-0";
    } else if (space?.includes("Small")) {
      return "padding-bottom";
    } else if (space?.includes("Large")) {
      return "padding-bottom-lg";
    }
    return "pb-0";
  };

  return (
    <MotionComp
      id={id ? id : undefined}
      className={clsx(
        "mx-auto w-full max-w-[2500px] gap-4 lg:gap-6",
        gridSectionType === "grid" &&
          "grid grid-cols-4 px-4 lg:px-6 xl:grid-cols-12",
        gridSectionType === "flex" && "flex",
        topSpacer && getSpacerTopStyles(topSpacer),
        bottomSpacer && getSpacerBottomStyles(bottomSpacer),
        className
      )}
      {...rest}
    >
      {children}
    </MotionComp>
  );
}
