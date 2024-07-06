import { AnimatePresence, m } from "framer-motion";

interface AppearWrapProps {
  as?: "div" | "span";
  className?: string;
  currentPage: number;
  step: number;
  children: React.ReactNode;
  reverseCondition?: boolean;
}

const AppearWrap = ({
  as: Comp = "div",
  className,
  currentPage,
  step,
  children,
  reverseCondition,
  ...extra
}: AppearWrapProps) => {
  const appearWrapperVariants = {
    initial: {
      opacity: 0,
      height: 0,
    },
    animate: {
      opacity: 1,
      height: "auto",
    },
    exit: {
      opacity: 0,
      height: 0,
    },
  };
  const MotionComp = m[Comp];
  const condition = currentPage === step;
  const cond = reverseCondition ? !condition : condition;
  return (
    <AnimatePresence>
      {cond && (
        <MotionComp
          className={className}
          variants={appearWrapperVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {children}
        </MotionComp>
      )}
    </AnimatePresence>
  );
};

export default AppearWrap;
