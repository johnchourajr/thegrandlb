import { m } from "framer-motion";
import { ComponentType } from "react";

type MotionBoxElementType = "div" | "section" | "article" | "header" | "footer";

type MotionBoxComponentType<Props = any> = ComponentType<Props> | undefined;

type MotionBoxProps<Props = any> = {
  ref?: any;
  whileInView?: boolean;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /* @deprecated */
  as?: MotionBoxElementType;
} & Props;

type MotionBoxType<Props = any> = React.FC<MotionBoxProps<Props>> &
  MotionBoxProps<Props> &
  any;

const MotionBox: React.FC<MotionBoxType> = ({
  ref = null,
  as = "div",
  whileInView = true,
  delay = 0,
  children,
  ...rest
}) => {
  const variants = {
    hidden: { opacity: 0, y: 4, scale: 1 },
    show: {
      opacity: [0, 1],
      y: 0,
      scale: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
        duration: 2,
        delay: delay,
        ease: [0.19, 1, 0.22, 1],
      },
    },
  };

  const animateProps = whileInView
    ? {
        whileInView: "show",
      }
    : {
        animate: "show",
      };

  const motionProps = {
    variants: variants,
    initial: "hidden",
    ...animateProps,
    viewport: {
      once: true,
    },
  };

  return (
    <m.div ref={ref} {...motionProps} {...rest}>
      {children}
    </m.div>
  );
};

export default MotionBox;
