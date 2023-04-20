import clsx from "clsx";
import type { MotionProps } from "framer-motion";
import { m } from "framer-motion";

interface GridSectionProps {
  children: React.ReactNode;
  gridSectionType?: "grid" | "flex";
  as?: "section" | "div";
  className?: string;
}

// have GridSectionProps extend framer motion props to allow for motion
// variants and other motion props

type GridSectionPropsWithMotion = GridSectionProps & MotionProps;

export function GridSection({
  children,
  gridSectionType = "grid",
  as: Comp = "section",
  className,
  ...rest
}: GridSectionPropsWithMotion) {
  // create motion component based on the as prop
  const MotionComp = m[Comp];

  return (
    <MotionComp
      className={clsx(
        "mx-auto w-full max-w-[2500px] gap-4 overflow-hidden",
        gridSectionType === "grid" && "grid grid-cols-4 px-4 xl:grid-cols-12",
        gridSectionType === "flex" && "flex",
        className
      )}
      {...rest}
    >
      {children}
    </MotionComp>
  );
}
