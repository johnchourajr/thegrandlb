import { PrismicLink } from "@prismicio/react";
import React from "react";

type PrismicLinkProps = React.ComponentProps<typeof PrismicLink>;

const ForwardedPrismicLink = React.memo(
  React.forwardRef<HTMLAnchorElement, PrismicLinkProps>((props, ref: any) => {
    return <PrismicLink ref={ref} {...props} />;
  })
);

ForwardedPrismicLink.displayName = "ForwardedPrismicLink";

export default ForwardedPrismicLink;
