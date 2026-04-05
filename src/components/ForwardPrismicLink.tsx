import React from "react";
import AppLink, { type AppLinkProps } from "./AppLink";

const ForwardedPrismicLink = React.forwardRef<HTMLAnchorElement, AppLinkProps>(
  (props, ref) => <AppLink ref={ref} {...props} />
);

ForwardedPrismicLink.displayName = "ForwardedPrismicLink";

export default React.memo(ForwardedPrismicLink);
