import clsx from "clsx";
import React from "react";

export interface StringTextProps {
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";
  size?: "large" | "default" | "small" | "xsmall";
  uppercase?: boolean;
  bold?: boolean;
  className?: string;
  text?: string;
  children?: React.ReactNode;
}

function StringText({
  as: Comp = "p",
  size = "default",
  uppercase = false,
  bold = false,
  text,
  children,
  className,
  ...rest
}: StringTextProps) {
  if (!text && !children) return null;
  // switch for mapping size is to output leading
  const getUppercaseStyles = () => {
    switch (uppercase) {
      case true:
        return "tracking-narrow uppercase";
      case false:
        return "tracking-tighter";
    }
  };

  const getStyles = () => {
    switch (size) {
      case "large":
        return "text-string-large leading-base font-lexend";
      case "default":
        return "text-string-default leading-base font-lexend";
      case "small":
        return "text-string-small leading-base font-lexend";
      case "xsmall":
        return "text-string-extra-small leading-base font-lexend";
      default:
        return "text-string-default leading-base font-lexend";
    }
  };

  return (
    <Comp
      className={clsx(
        getStyles(),
        getUppercaseStyles(),
        bold && " font-lexend-bold",
        className
      )}
      {...rest}
    >
      {text || children}
    </Comp>
  );
}

export default StringText;
