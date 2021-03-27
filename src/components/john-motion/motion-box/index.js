import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Box({
  children,
  transitionOverrides,
  hiddenStyles,
  visibleStyles,
  triggerOnce = true,
  ...rest
}) {
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: triggerOnce });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
    if (!inView) {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const boxVariants = {
    // transform: translateY(-2rem) rotateX(10deg) rotateY(10deg) translateZ(20px) scale(0.9)
    hidden: {
      opacity: 0,
      scale: 0.98,
      y: 16,
      z: 20,
      rotateX: 10,
      rotateY: 10,
      ...hiddenStyles
    },
    // transform: translateY(0rem) rotateX(0deg) rotateY(0deg) translateZ(20px) scale(0.9)
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      z: 20,
      rotateX: 0,
      rotateY: 0,
      ...visibleStyles,
      transition: {
        ease: [0.1, 0.25, 0.3, 1],
        duration: 0.5,
        delay: 0.2,
        ...transitionOverrides
      }
    }
  };
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={boxVariants}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
