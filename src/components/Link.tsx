import { useRouter } from "next/router";
import { useEffect } from "react";
import NextLink from "next/link";

export default function Link({ href, children, className }: any) {
  return (
    <NextLink href={href} className={className}>
      {children}
    </NextLink>
  );
}
