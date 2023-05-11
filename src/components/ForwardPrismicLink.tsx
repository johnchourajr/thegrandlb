import { PrismicLink } from "@prismicio/react";
import React from "react";

type PrismicLinkProps = React.ComponentProps<typeof PrismicLink>;

const ForwardedPrismicLink = React.memo(
  React.forwardRef<HTMLAnchorElement, PrismicLinkProps>((props, ref) => {
    return <PrismicLink {...props} ref={ref} />;
  })
);

ForwardedPrismicLink.displayName = "ForwardedPrismicLink";

export default ForwardedPrismicLink;
