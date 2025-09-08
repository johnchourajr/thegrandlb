"use client";

import { event as handleEvent } from "@/utils/gtm";
import { stringToUnderscore } from "@/utils/utils";
import { PrismicLink, PrismicLinkProps } from "@prismicio/react";
import {
  EmptyLinkField,
  FilledLinkToDocumentField,
  FilledLinkToMediaField,
  FilledLinkToWebField,
} from "@prismicio/types";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { LinkProps } from "next/link";
import { linkResolver } from "prismicio";
import React, { ButtonHTMLAttributes, useRef } from "react";
import Link from "./Link";
import StringText from "./StringText";

/**
 * Button Types
 */
interface ButtonTypes {
  key?: string;
  field?:
    | EmptyLinkField<"Any">
    | FilledLinkToWebField
    | FilledLinkToDocumentField<string, string, never>
    | FilledLinkToMediaField
    | any;
  href?: string;
  params?: string;
  as?: "span" | "button";
  target?: "_blank" | "_self" | "_parent" | "_top";
  onClick?: () => void | ButtonTypes | any;
  text?: string | null;
  buttonType?: "submit" | "button" | "reset";
  type?: "black" | "white" | "outline" | "outline-black" | "naked";
  size?: "large" | "default" | "small";
  className?: string;
  classNameInner?: string;
  children?: React.ReactNode;
  currentPage?: boolean;
  tabIndex?: number;
  eventAction?: string;
  eventCategory?: string;
  eventLabel?: string;
  eventValue?: string;
  eventNone?: boolean;
  loading?: boolean;
}

/**
 * Get Button Styles based on type
 */
const getButtonStyles = (type: ButtonTypes["type"]) => {
  switch (type) {
    case "black":
      return {
        parent: "text-white",
        inner: "bg-black rounded-full",
        innerCurrentPage: "",
      };
    case "white":
      return {
        parent: "text-black",
        inner: "bg-white rounded-full",
        innerCurrentPage: "",
      };
    case "outline":
      return {
        parent: "text-white",
        inner: "bg-transparent border-2 border-white rounded-full",
        innerCurrentPage: "",
      };
    case "outline-black":
      return {
        parent: "text-black",
        inner: "bg-transparent border-2 border-black rounded-full",
        innerCurrentPage: "",
      };
    case "naked":
      return {
        parent: "text-black !px-0",
        inner: "bg-transparent border-0 border-none rounded-0 ",
        innerCurrentPage: "",
      };
    default:
      return {
        parent: "text-white",
        inner: "bg-black rounded-full",
        innerCurrentPage: "",
      };
  }
};

/**
 * Get button size
 */
const getButtonSize = (size: ButtonTypes["size"]) => {
  switch (size) {
    case "small":
      return "px-4 py-3";
    case "large":
      return "px-10 py-7";
    default:
      return "px-6 py-5";
  }
};

/**
 * Button Component
 */
function Button({
  field,
  target,
  onClick,
  href,
  params,
  as: ButtonElement = "button",
  type = "white",
  size = "default",
  buttonType,
  text,
  className,
  classNameInner,
  children,
  currentPage,
  eventAction,
  eventCategory,
  eventLabel,
  eventValue,
  eventNone = false,
  loading = false,
  ...rest
}: ButtonTypes) {
  const buttonRef = useRef<HTMLButtonElement>(null); // Create a ref for the button element
  const isButton = onClick && ButtonElement;
  const isNextLink = href && !isButton;
  const isPrismicLink = field && !isButton;

  const getType = () => {
    if (isButton) {
      return "button";
    } else if (isNextLink) {
      return "next-link";
    } else if (isPrismicLink) {
      return "prismic-link";
    } else {
      return "button";
    }
  };

  const buttonTypeName = getType();

  const handleClick = () => {
    onClick && onClick();
    if (isNextLink || eventNone) return null;
    handleEvent({
      action: stringToUnderscore(eventAction || "click"),
      category: stringToUnderscore(eventCategory || "button"),
      label: stringToUnderscore(eventLabel || ""),
      value: stringToUnderscore(text || eventValue || ""),
    });
  };

  const getLinkProps = (
    type: "button" | "next-link" | "prismic-link"
  ):
    | LinkProps
    | PrismicLinkProps
    | ButtonHTMLAttributes<HTMLButtonElement>
    | any => {
    switch (type) {
      case "next-link":
        return { href } as LinkProps;
      case "prismic-link":
        if (params) {
          return { href: `${linkResolver(field)}?${params}` } as any;
        }
        return { field, linkResolver } as PrismicLinkProps;
      default:
        return {
          type: buttonType,
        } as ButtonHTMLAttributes<HTMLButtonElement>;
    }
  };

  const ButtonTag = isButton
    ? ButtonElement
    : isNextLink
    ? Link
    : isPrismicLink
    ? PrismicLink
    : "button";

  return (
    <ButtonTag
      {...(isButton ? { ref: buttonRef } : {})}
      className={clsx(
        `group relative z-50 inline-flex h-fit flex-row items-center justify-center whitespace-nowrap text-center transition-all`,
        loading && "cursor-wait",
        getButtonStyles(type).parent,
        getButtonSize(size),
        className
      )}
      onClick={() => !loading && handleClick()}
      data-current-page={currentPage}
      data-slug={stringToUnderscore(text)}
      role="button"
      tabIndex={0}
      aria-label={text}
      aria-current={currentPage}
      {...getLinkProps(buttonTypeName)}
      {...rest}
    >
      {/* <motion.span layout> */}
      <AnimatePresence>
        {loading && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <StringText
              className={clsx(
                "relative z-10 w-full flex-shrink-0",
                "transition-all duration-500 ease-out-expo will-change-auto",
                type !== "naked" && "group-hover:!text-white"
              )}
              size={"small"}
              uppercase={true}
              bold={true}
            >
              <span className="mr-1 inline-block animate-pulse">•</span>
              <span className="mr-1 inline-block animate-pulse">•</span>
              <span className="inline-block animate-pulse">•</span>
            </StringText>
          </motion.span>
        )}
      </AnimatePresence>
      {!loading && (
        <StringText
          className={clsx(
            "relative z-10 w-full flex-shrink-0",
            "transition-all duration-500 ease-out-expo will-change-auto",
            type !== "naked" && "group-hover:!text-white"
          )}
          size={"small"}
          uppercase={true}
          bold={true}
        >
          {text || children}
        </StringText>
      )}
      {/* </motion.span> */}

      <span
        className={clsx(
          "absolute inset-0 z-0 overflow-hidden rounded-full group-hover:inset-[-2px] group-active:inset-[2px]",
          "transition-all duration-500 ease-out-expo will-change-auto ",
          classNameInner ? classNameInner : ""
        )}
        aria-hidden
      >
        <span
          className={clsx(
            "pointer absolute inset-0 z-10  rounded-full opacity-0 group-hover:inset-[-1rem]",
            "transition-all duration-500 ease-out-expo will-change-auto ",
            "origin-top-left translate-y-[-100%] group-hover:origin-top-left group-hover:translate-y-[0%] group-hover:opacity-100",
            type !== "naked" && "bg-red "
          )}
        />
        <span
          className={clsx(
            `absolute inset-0 z-0 transition-all duration-500 ease-out-expo will-change-auto `,
            getButtonStyles(type).inner,
            currentPage ? getButtonStyles(type).innerCurrentPage : ""
          )}
        />
      </span>
      {field?.target === "_blank" && <span className="z-10">↗</span>}
    </ButtonTag>
  );
}

export default Button;
