import React from "react";

interface TextProps {
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";
  size?: "3xl" | "2xl" | "xl" | "lg" | "md" | "sm";
  className?: string;
  text?: string;
  children?: React.ReactNode;
}

function Headline({
  as: Comp = "p",
  size = "3xl",
  text,
  children,
  className,
  ...rest
}: TextProps) {
  const getHeadlineStyles = () => {
    switch (size) {
      case "3xl":
        return {
          size: "text-headline-3xl",
          leading: "text-headline-3xl-leading",
          letterSpacing: "-0.06em",
        };
      case "2xl":
        return {
          size: "text-headline-2xl",
          leading: "text-headline-2xl-leading",
          letterSpacing: "-0.06em",
        };
      case "xl":
        return {
          size: "text-headline-xl",
          leading: "leading-headline-xl",
          letterSpacing: "-0.05em",
        };
      case "lg":
        return {
          size: "text-headline-lg",
          leading: "leading-headline-lg",
          letterSpacing: "-0.04em",
        };
      case "md":
        return {
          size: "text-headline-md",
          leading: "leading-headline-md",
          letterSpacing: "-0.015em",
        };
      case "sm":
        return {
          size: "text-headline-sm",
          leading: "leading-headline-sm",
          letterSpacing: "-0.015em",
        };
      default:
        return {
          size: "text-headline-3xl",
          leading: "leading-headline-3xl",
          letterSpacing: "-0.04em",
        };
    }
  };

  return (
    <Comp
      className={`
        headline
        ${getHeadlineStyles().size}
        ${getHeadlineStyles().leading}
        ${className}
      `}
      style={{ letterSpacing: getHeadlineStyles().letterSpacing }}
      {...rest}
    >
      {text || children}
    </Comp>
  );
}

export default Headline;
