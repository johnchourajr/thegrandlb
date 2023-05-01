import { PrismicLink, PrismicLinkProps } from "@prismicio/react";
import {
  EmptyLinkField,
  FilledLinkToDocumentField,
  FilledLinkToMediaField,
  FilledLinkToWebField,
} from "@prismicio/types";
import clsx from "clsx";
import { LinkProps } from "next/link";
import { linkResolver } from "prismicio";
import React, { ButtonHTMLAttributes } from "react";
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
  as?: "span" | "button";
  target?: "_blank" | "_self" | "_parent" | "_top";
  onClick?: () => void | ButtonTypes;
  text?: string | null;
  buttonType?: "submit" | "button" | "reset";
  type?: "black" | "white" | "outline" | "outline-black";
  size?: "large" | "default" | "small";
  className?: string;
  classNameInner?: string;
  children?: React.ReactNode;
  currentPage?: boolean;
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
  as: ButtonElement = "button",
  type = "white",
  size = "default",
  buttonType,
  text,
  className,
  classNameInner,
  children,
  currentPage,
  ...rest
}: ButtonTypes) {
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
        return { field, linkResolver } as PrismicLinkProps;
      default:
        return {
          onClick,
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
      className={clsx(
        `group relative inline-flex h-fit flex-row items-center justify-center whitespace-nowrap text-center transition-all`,
        getButtonStyles(type).parent,
        getButtonSize(size),
        className
      )}
      data-current-page={currentPage}
      role="button"
      tabIndex={0}
      aria-label={text}
      aria-current={currentPage}
      {...getLinkProps(buttonTypeName)}
    >
      <StringText
        className="relative z-10 w-full flex-shrink-0"
        size={"small"}
        uppercase={true}
        bold={true}
      >
        {text || children}
      </StringText>
      <span
        className={clsx(
          `absolute inset-0 z-0 transition-all duration-500 ease-out-expo will-change-auto group-hover:inset-[-2px] group-active:inset-[2px]`,
          getButtonStyles(type).inner,
          currentPage ? getButtonStyles(type).innerCurrentPage : "",
          classNameInner ? classNameInner : ""
        )}
      />
      {field?.target === "_blank" && <span className="z-10">↗</span>}
    </ButtonTag>
  );
}

export default Button;
