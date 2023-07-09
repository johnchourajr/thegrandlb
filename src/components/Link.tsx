import { event as handleEvent } from "@/utils/gtm";
import { stringToCamelCase } from "@/utils/utils";
import NextLink from "next/link";

export default function Link({
  href,
  children,
  className,
  eventCategory,
  eventLabel,
  eventValue,
  ...props
}: any) {
  const handleClick = () => {
    handleEvent({
      action: "click",
      category: stringToCamelCase(eventCategory || "button"),
      label: stringToCamelCase(eventLabel || ""),
      value: stringToCamelCase(eventValue || ""),
    });
  };
  return (
    <NextLink
      href={href}
      onClick={() => handleClick()}
      className={className}
      {...props}
    >
      {children}
    </NextLink>
  );
}
