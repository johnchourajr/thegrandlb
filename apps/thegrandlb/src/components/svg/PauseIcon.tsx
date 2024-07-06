import { m } from "framer-motion";
import { SVGProps } from "react";
const PauseIcon = (props: SVGProps<SVGSVGElement>) => {
  const Svg = m.svg as any;
  return (
    <Svg
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
      <path fill="currentColor" d="M13 12h3v11h-3V12ZM20 12h3v11h-3V12Z" />
    </Svg>
  );
};
export default PauseIcon;
