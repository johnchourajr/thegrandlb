import clsx from "clsx";
import React from "react";

interface TextProps {
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";
  size?: "large" | "default" | "small";
  paragraph?: boolean;
  className?: string;
  text?: string;
  children?: React.ReactNode;
}

function Text({
  as: Comp = "p",
  size = "default",
  paragraph = false,
  text,
  children,
  className,
  ...rest
}: TextProps) {
  // switch for mapping size is to output leading
  const getStyles = () => {
    switch (size) {
      case "large":
        return "text-paragraph-large leading-paragraph";
      case "default":
        return "text-paragraph-default leading-paragraph";
      case "small":
        return "text-paragraph-small leading-paragraph";
      default:
        return "text-default leading-paragraph";
    }
  };

  return (
    <Comp className={clsx(getStyles(), className)} {...rest}>
      {text || children}
    </Comp>
  );
}

export default Text;
