import { SVGProps } from "react";
const Star = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={17}
    viewBox="0 0 18 17"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M8.643 0c2.024 5.396 3.103 6.504 8.5 8.5-5.397 1.996-6.544 3.104-8.5 8.5-2.024-5.396-3.103-6.504-8.5-8.5C5.54 6.504 6.619 5.396 8.643 0Z"
    />
  </svg>
);
export default Star;
