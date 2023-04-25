import clsx from "clsx";
import React from "react";

import { m } from "framer-motion";

export type TextSize = "4xl" | "3xl" | "2xl" | "xl" | "lg" | "md" | "sm";

interface TextProps {
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";
  size?: TextSize;
  uppercase?: boolean;
  emphasis?: boolean;
  className?: string;
  text?: string;
  disableMotion?: boolean;
  disableStagger?: boolean;
  children?: React.ReactNode;
}

const wrapEachWordInSpan = (txt?: string, children?: any) => {
  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };
  if (!txt && !children) return null;
  const words =
    txt?.split(" ") ||
    React.Children.map(children, (child: React.ReactNode) => {
      if (typeof child === "string") {
        return child.split(" ").map((word) => `${word} `);
      }
      return child;
    });

  const wrappedWords = words?.map((word, index) => (
    <m.span
      key={index}
      variants={item}
      data-word={word}
      style={{ "--animation-order": `${index * 0.1 * 100}ms` } as any}
      className={clsx(
        "relative inline-block"
        // "before:absolute before:bottom-[var(--before-b,0)] before:left-0 before:opacity-[var(--before-o,1)] before:content-[attr(data-word)]",
        // "after:absolute after:bottom-[var(--after-b,-1em)] after:left-0 after:opacity-[var(--after-o,0)] after:content-[attr(data-word)]",
        // "after:delay-[var(--animation-order)]"
      )}
    >
      {/* <span className="!text-[transparent]">{word}</span> */}
      {word}
    </m.span>
  ));

  const wordsAsString = words?.join("");

  return {
    wrappedWords,
    wordsAsString,
  };
};

const getHeadlineStyles = (size: TextProps["size"]) => {
  switch (size) {
    case "4xl":
      return {
        size: "text-headline-4xl",
        leading: "leading-headline-4xl",
        tracking: "tracking-headline-4xl",
      };
    case "3xl":
      return {
        size: "text-headline-3xl",
        leading: "leading-headline-3xl",
        tracking: "tracking-headline-3xl",
      };
    case "2xl":
      return {
        size: "text-headline-2xl",
        leading: "leading-headline-2xl",
        tracking: "tracking-headline-2xl",
      };
    case "xl":
      return {
        size: "text-headline-xl",
        leading: "leading-headline-xl",
        tracking: "tracking-headline-xl",
      };
    case "lg":
      return {
        size: "text-headline-lg",
        leading: "leading-headline-lg",
        tracking: "tracking-headline-lg",
      };
    case "md":
      return {
        size: "text-headline-md",
        leading: "leading-headline-md",
        tracking: "tracking-headline-md",
      };
    case "sm":
      return {
        size: "text-headline-sm",
        leading: "leading-headline-sm",
        tracking: "tracking-headline-sm",
      };
    default:
      return {
        size: "text-headline-3xl",
        leading: "leading-headline-3xl",
        tracking: "tracking-headline-3xl",
      };
  }
};

function Headline({
  as: Comp = "p",
  size = "3xl",
  uppercase = false,
  emphasis = false,
  text,
  children,
  disableMotion = false,
  disableStagger = false,
  className,
  ...rest
}: TextProps) {
  const MotionComp = m[Comp];

  if (!text && !children) return null;

  const { wordsAsString, wrappedWords }: any = wrapEachWordInSpan(
    text,
    children
  );

  const container = {
    hidden: { opacity: 0, y: "0.1em", scale: 1.1 },
    show: {
      opacity: [0, 1],
      y: 0,
      scale: [1.1, 1],
      transition: {
        staggerChildren: !disableStagger && 0.05,
        delayChildren: !disableStagger && 0.1,
        duration: 2,
        ease: [0.19, 1, 0.22, 1],
      },
    },
  };

  const motionProps = !disableMotion && {
    variants: container as any,
    initial: "hidden",
    whileInView: "show",
  };

  return (
    <MotionComp
      {...motionProps}
      className={clsx(
        "headline font-serif",
        uppercase && "uppercase",
        emphasis && "italic",
        getHeadlineStyles(size).size,
        getHeadlineStyles(size).leading,
        getHeadlineStyles(size).tracking,
        "whitespace-pre-wrap",
        className
      )}
      aria-label={wordsAsString}
      {...rest}
    >
      {wrappedWords}
    </MotionComp>
  );
}

export default Headline;
