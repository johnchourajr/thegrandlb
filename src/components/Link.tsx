import NextLink from "next/link";

export default function Link({ href, children, className, ...props }: any) {
  return (
    <NextLink href={href} className={className} {...props}>
      {children}
    </NextLink>
  );
}
