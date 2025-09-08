"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

interface ParallaxWrapperProps {
  children: any;
  amount?: number;
  /* @deprecated */
  offset?: [string, string];
}

const ParallaxWrapper = ({ children, amount = 0.2 }: ParallaxWrapperProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const progress = useSpring(scrollYProgress, {
    damping: 200,
    stiffness: 1800,
  });
  const y = useTransform(progress, [0, 1], [`${amount * -100}%`, `0%`]);

  const height = 100 + amount * 100;

  return (
    <motion.div className="absolute h-full w-full overflow-hidden" ref={ref}>
      <motion.div
        className="absloute z-[-1] w-full"
        style={{
          y,
          height: `${height}%`,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default ParallaxWrapper;
