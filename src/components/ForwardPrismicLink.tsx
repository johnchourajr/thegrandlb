import { PrismicLink } from "@prismicio/react";
import React from "react";

type PrismicLinkProps = React.ComponentProps<typeof PrismicLink>;

const ForwardedPrismicLink = React.forwardRef<
  HTMLAnchorElement,
  PrismicLinkProps
>((props, ref) => {
  // Only pass ref if it's a valid ref object
  if (ref && typeof ref === "object" && "current" in ref) {
    return <PrismicLink ref={ref} {...props} />;
  }
  return <PrismicLink {...props} />;
});

ForwardedPrismicLink.displayName = "ForwardedPrismicLink";

export default React.memo(ForwardedPrismicLink);
