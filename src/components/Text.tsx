import React from "react";

interface TextProps {
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";
  size?: "base" | "paragraph" | "string" | "caption";
  className?: string;
  text?: string;
  children?: React.ReactNode;
}

function Text({
  as: Comp = "p",
  size = "paragraph",
  text,
  children,
  className,
  ...rest
}: TextProps) {
  // switch for mapping size is to output leading
  const getStyles = () => {
    switch (size) {
      case "base":
        return "text-base leading-base";
      case "paragraph":
        return "text-paragraph leading-paragraph";
      case "string":
        return "text-string leading-string";
      case "caption":
        return "text-caption leading-base";
      default:
        return "text-paragraph leading-paragraph";
    }
  };

  return (
    <Comp className={`${getStyles()} ${className}`} {...rest}>
      {text || children}
    </Comp>
  );
}

export default Text;
