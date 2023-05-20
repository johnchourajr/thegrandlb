import ArrowRight from "@/components/svg/ArrowRight";
import clsx from "clsx";
import { m, useScroll, Variants } from "framer-motion";
import React, { useEffect, useState } from "react";

const MenuArrowScroll: React.FC = () => {
  const { scrollY } = useScroll();
  const [min, setMin] = useState(false);

  const update = () => {
    const y = scrollY as any;
    if (y?.current! < y?.prev!) {
      if (y?.current! < 300) {
        setMin(false);
      }
    } else if (y?.current! > 300 && y?.current! > y?.prev!) {
      setMin(true);
    }
  };

  useEffect(() => {
    const unsubscribe = scrollY.on("change", update);
    return () => unsubscribe();
  }, [scrollY]); //

  const wrapperVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      x: "-50%",
      pointerEvents: "none",
    },
    show: { opacity: 1, y: 0, x: "-50%", pointerEvents: "fill" },
    hover: { opacity: 1, y: -5, x: "-50%", pointerEvents: "fill" },
  };

  return (
    <m.a
      href="#page"
      initial="hidden"
      variants={wrapperVariants}
      animate={min ? "show" : "hidden"}
      whileHover="hover"
      transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.4 }}
      data-min={min}
      data-no-print
      className={clsx(
        "absolute bottom-0 left-0 z-50 m-2 hidden h-16 w-16 items-center justify-center rounded-full bg-white xl:flex "
      )}
    >
      <ArrowRight className={clsx("h-6 w-6 -rotate-90 text-black")} />
    </m.a>
  );
};

export default MenuArrowScroll;
