import { m, MotionProps } from "framer-motion";
import { SVGProps } from "react";
const ArrowRight = (props: SVGProps<SVGSVGElement> | MotionProps) => {
  const Svg = m.svg as any;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeWidth={2}
        d="M.87 12.314h21.757m0 0L11.314 1m11.313 11.314L11.314 23.627"
      />
    </Svg>
  );
};
export default ArrowRight;
