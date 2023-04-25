import { m } from "framer-motion";
import { SVGProps } from "react";
const PlayIcon = (props: SVGProps<SVGSVGElement>) => (
  <m.svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    initial={{
      rotate: -180,
      opacity: 0,
    }}
    animate={{
      rotate: [-180, 0],
      opacity: [0, 1],
    }}
    exit={{
      rotate: [180, 360],
      opacity: 0,
    }}
    {...props}
  >
    <path fill="#fff" d="m26 18-12 6.928V11.072L26 18Z" />
  </m.svg>
);
export default PlayIcon;
