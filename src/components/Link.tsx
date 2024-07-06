import { event as handleEvent } from "@/utils/gtm";
import { stringToUnderscore } from "@/utils/utils";
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
      category: stringToUnderscore(eventCategory || "button"),
      label: stringToUnderscore(eventLabel || ""),
      value: stringToUnderscore(eventValue || ""),
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
