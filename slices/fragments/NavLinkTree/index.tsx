import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `NavLinkTree`.
 */
export type NavLinkTreeProps = SliceComponentProps<
  Content.NavLinkTreeSlice | any
>;

const NavLinkTree = ({ slice }: NavLinkTreeProps): JSX.Element => <></>;

export default NavLinkTree;
