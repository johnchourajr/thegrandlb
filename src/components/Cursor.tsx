"use client";

import useTouchDevice from "@/hooks/useTouchDevice";
import clsx from "clsx";
import { motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import ArrowRight from "./svg/ArrowRight";

const Cursor: React.FC = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [hovering, setHovering] = useState("none");
  const [pressed, setPressed] = useState(false);
  const isTouch = useTouchDevice();

  useEffect(() => {
    const setFromEvent = (e: any) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const handleMouseDown = () => {
      setPressed(true);
    };

    const handleMouseUp = () => {
      setPressed(false);
    };

    document.addEventListener("mousemove", setFromEvent);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", setFromEvent);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [x, y, setHovering, hovering, pressed, setPressed]);

  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      // Check if mutations involve adding/removing the desired class
      for (const mutation of mutationsList) {
        const targetElement = mutation.target as HTMLElement;

        if (targetElement.classList.contains("arrow-prev")) {
          setHovering("arrow-left");
        } else if (targetElement.classList.contains("arrow-next")) {
          setHovering("arrow-right");
          /**
           * If adding a new class to capture for the cursor, add it here with the following code:?
           *
           * @example
           * } else if (targetElement.classList.contains("SOME-CLASS")) {
           *   setHovering("SOME-VALUE");
           * }
           */
        } else {
          setHovering(""); // Reset the state
        }
      }
    });

    // Observe the document for changes to the class
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect(); // Disconnect the observer on component unmount
    };
  }, []);

  const cursorVariant = {
    hidden: {
      opacity: 0.5,
      scale: 0.5,
      "--top": ".35rem",
      "--left": ".2rem",
      "--bkg-opacity": 0,
    },
    default: {
      opacity: 0,
      scale: 1,
      "--width": "3rem",
      "--height": "3rem",
      "--top": ".35rem",
      "--left": ".2rem",
      "--bkg-opacity": 0,
    },
    arrow: {
      "--width": "6rem",
      "--height": "6rem",
      "--top": ".35rem",
      "--left": ".2rem",
      "--bkg-opacity": 0,
    },
  } as any;

  const cursorAnimate = () => {
    if (hovering !== "none" && pressed) {
      return "hidden";
    } else if (hovering === "arrow-left") {
      return "arrow";
    } else if (hovering === "arrow-right") {
      return "arrow";
    } else {
      return "default";
    }
  };

  const isHoveringArrow =
    hovering === "arrow-left" || hovering === "arrow-right";

  if (isTouch) {
    return null;
  }

  return (
    <div
      className={clsx(
        "pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      )}
    >
      <motion.div
        className={clsx(
          "pointer-events-none h-[1px] w-[1px] items-center justify-center text-[#3C3836] ",
          " origin-center transform transition-transform duration-150 ease-out",
          "after:absolute after:left-[var(--left)] after:top-[var(--top)] after:h-[var(--height)] after:w-[var(--width)] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:border-2 after:border-[#3C3836] after:bg-[#3c3836] after:bg-opacity-[var(--bkg-opacity)] after:opacity-60",
          "!mix-blend-normal after:!border-white"
        )}
        style={{
          x,
          y,
        }}
        variants={cursorVariant}
        animate={cursorAnimate()}
      >
        {isHoveringArrow && (
          <ArrowRight
            className="absolute left-[-.48rem] top-[-.38rem] z-40 h-6 w-6 transform text-white"
            animate={{
              rotate: hovering === "arrow-right" ? 0 : 180,
            }}
          />
        )}
      </motion.div>
    </div>
  );
};

export default Cursor;
