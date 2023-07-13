import { handleEvent } from "@/utils/events";
import { PrismicLink } from "@prismicio/react";
import clsx from "clsx";
import { m } from "framer-motion";
import { linkResolver } from "../../prismicio";
import StringText from "./StringText";

export const NavItem = ({
  field,
  text,
  linkProps,
  linkClassName,
  show = true,
  className,
  ...rest
}: any) => {
  if (show === false) return null;
  return (
    <m.li className={clsx(className)}>
      <PrismicLink
        linkResolver={linkResolver}
        field={field}
        className={clsx("group relative z-10", linkClassName)}
        onClick={() =>
          handleEvent({
            category: `NavItem`,
            label: text,
            value: field.uid,
          })
        }
        {...rest}
        {...linkProps}
      >
        <StringText
          as="span"
          className={clsx(
            "inline-flex py-[0.65rem]",
            "after:absolute after:bottom-0 after:left-0 after:z-20 after:h-[1.5px] after:w-[100%] after:origin-top-right after:scale-x-0 after:bg-black after:transition-transform after:duration-300 after:ease-out-expo after:content-['']",
            "group-hover:after:origin-top-left group-hover:after:scale-x-100"
          )}
        >
          {text}
        </StringText>
      </PrismicLink>
    </m.li>
  );
};
