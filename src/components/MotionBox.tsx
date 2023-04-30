import { m } from "framer-motion";

interface MotionBoxProps {
  as?: "div" | "section" | "article" | "header" | "footer";
  whileInView?: boolean;
  children: React.ReactNode;
  className?: string;
}

const MotionBox: React.FC<MotionBoxProps> = ({
  as = "div",
  whileInView = true,
  children,
  ...rest
}) => {
  const MotionComp = m[as];

  const variants = {
    hidden: { opacity: 0, y: "0.1em", scale: 1 },
    show: {
      opacity: [0, 1],
      y: 0,
      scale: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
        duration: 2,
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
    <MotionComp {...motionProps} {...rest}>
      {children}
    </MotionComp>
  );
};

export default MotionBox;
