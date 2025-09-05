"use client";

import clsx from "clsx";
import React from "react";

import { motion, Variants } from "framer-motion";

export type TextSize =
  | "5xl"
  | "4xl"
  | "3xl"
  | "2xl"
  | "xl"
  | "lg"
  | "md"
  | "sm";

interface TextProps {
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";
  size?: TextSize;
  uppercase?: boolean;
  emphasis?: boolean;
  className?: string;
  style?: React.CSSProperties | any;
  text?: string;
  duration?: number;
  delay?: number;
  staggerDuration?: number;
  disableMotion?: boolean;
  disableStagger?: boolean;
  animationType?: "word" | "letter";
  animateOnce?: boolean;
  children?: React.ReactNode;
  id?: string;
  layoutId?: string;
}

const wrapEachLetterInSpan = (word: string, index: number) => {
  const item = {
    hidden: { opacity: 0, y: "0.5em" },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.19, 1, 0.22, 1] },
    },
  };
  const letters = word.toString().split("");
  const wrappedLetters = letters.map((letter, idx) => (
    <motion.span
      key={idx}
      variants={item}
      data-letter={letter}
      style={{ "--animation-order": `${idx * 0.05 * 100}ms` } as any}
      className={clsx("relative inline-block")}
    >
      {letter}
    </motion.span>
  ));
  return <>{wrappedLetters}</>;
};

const wrapEachWordInSpan = (word: string, index: number) => {
  const item = {
    hidden: { opacity: 0, y: "0.5em" },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 2, ease: [0.19, 1, 0.22, 1] },
    },
  };

  return (
    <motion.span
      key={index}
      variants={item}
      data-word={word}
      style={{ "--animation-order": `${index * 0.05 * 100}ms` } as any}
      className={clsx("relative")}
    >
      {word}{" "}
    </motion.span>
  );
};

const renderContent = (
  txt?: string,
  children?: any,
  type: "word" | "letter" = "word"
) => {
  if (!txt && !children) return null;

  const words =
    txt?.split(" ") ||
    React.Children.map(children, (child: React.ReactNode) => {
      if (typeof child === "string") {
        return child.split(" ").map((word) => `${word}`);
      }
      return child;
    });

  // console.log({ words });

  const wrappedWords = words?.map((word: any, index: number): any => {
    if (typeof word === "object") {
      return word;
    }
    if (type === "word") {
      return (
        <React.Fragment key={index}>
          {wrapEachWordInSpan(word, index)}
        </React.Fragment>
      );
    } else {
      return (
        <span key={index} className="relative inline-block">
          {wrapEachLetterInSpan(word, index)}
        </span>
      );
    }
  });

  const wordsAsString = words?.join(" ");
  return {
    wrappedWords,
    wordsAsString,
  };
};

const getHeadlineStyles = (size: TextProps["size"]) => {
  switch (size) {
    case "5xl":
      return {
        size: "text-headline-5xl",
        leading: "leading-headline-5xl",
        tracking: "tracking-headline-5xl",
      };
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
  duration,
  delay = 0,
  staggerDuration,
  disableMotion = false,
  disableStagger = false,
  animationType = "word",
  animateOnce = false,
  className,
  style,
  layoutId,
  ...rest
}: TextProps) {
  if (!text && !children) return null;

  const { wordsAsString, wrappedWords }: any = renderContent(
    text,
    children,
    animationType
  );

  const staggerChildren = () => {
    if (disableStagger) return 0;
    if (animationType === "word") {
      return staggerDuration || 0.1;
    } else {
      return staggerDuration || 0.05;
    }
  };

  const delayChildren = () => {
    if (disableStagger) return 0;
    if (animationType === "word") {
      return staggerDuration || 0.1;
    } else {
      return staggerDuration || 0;
    }
  };

  const container = {
    hidden: { opacity: 0, y: "0.1em", scale: 1.1 },
    show: {
      opacity: [0, 1],
      y: "0em",
      scale: [1.1, 1],
      transition: {
        delay,
        staggerChildren: staggerChildren(),
        delayChildren: delayChildren(),
        duration: duration || 2,
        ease: [0.19, 1, 0.22, 1],
      },
    },
  } as Variants;

  const motionProps = !disableMotion && {
    variants: container,
    initial: "hidden",
    whileInView: "show",
    viewport: {
      once: animateOnce,
    },
  };

  const MotionComp = motion[Comp];

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
      style={style}
      aria-label={wordsAsString}
      data-cursor="text"
      {...rest}
    >
      {disableMotion ? children : wrappedWords}
    </MotionComp>
  );
}

export default Headline;
