import useTouchDevice from "@/hooks/useTouchDevice";
import clsx from "clsx";
import { m, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import ArrowRight from "./svg/ArrowRight";

const addEventListenerTemplate = (
  element: any,
  enterFunc: () => void,
  exitFunc: () => void
) => {
  element.forEach((e: any) => {
    e.addEventListener("mouseenter", enterFunc);
    e.addEventListener("mouseleave", exitFunc);
  });
};

const removeEventListenerTemplate = (
  element: any,
  enterFunc: () => void,
  exitFunc: () => void
) => {
  element.forEach((e: any) => {
    e.removeEventListener("mouseenter", enterFunc);
    e.removeEventListener("mouseleave", exitFunc);
  });
};

const Cursor: React.FC = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [hovering, setHovering] = useState("none");
  const [pressed, setPressed] = useState(false);
  const isTouch = useTouchDevice();

  useEffect(() => {
    const anchorLinks = document.querySelectorAll("a");
    const buttonsElements =
      document.querySelectorAll("button") ||
      document.querySelectorAll("[data-cursor='button']");
    const videosElements = document.querySelectorAll("[data-cursor='video']");
    const prevArrow = document.querySelectorAll("[data-cursor='arrow-left']");
    const nextArrow = document.querySelectorAll("[data-cursor='arrow-right']");

    const handleMouseEnterLink = () => {
      setHovering("link");
    };

    const handleMouseEnterVideo = () => {
      setHovering("video");
    };

    const handlePrevArrow = () => {
      setHovering("arrow-left");
    };

    const handleNextArrow = () => {
      setHovering("arrow-right");
    };

    const handleMouseLeave = () => {
      setHovering("none");
    };

    addEventListenerTemplate(
      anchorLinks,
      handleMouseEnterLink,
      handleMouseLeave
    );
    addEventListenerTemplate(
      buttonsElements,
      handleMouseEnterLink,
      handleMouseLeave
    );
    addEventListenerTemplate(
      videosElements,
      handleMouseEnterVideo,
      handleMouseLeave
    );
    addEventListenerTemplate(prevArrow, handlePrevArrow, handleMouseLeave);
    addEventListenerTemplate(nextArrow, handleNextArrow, handleMouseLeave);
    return () => {
      removeEventListenerTemplate(
        anchorLinks,
        handleMouseEnterLink,
        handleMouseLeave
      );
      removeEventListenerTemplate(
        buttonsElements,
        handleMouseEnterLink,
        handleMouseLeave
      );
      removeEventListenerTemplate(
        videosElements,
        handleMouseEnterVideo,
        handleMouseLeave
      );
      removeEventListenerTemplate(prevArrow, handlePrevArrow, handleMouseLeave);
      removeEventListenerTemplate(nextArrow, handleNextArrow, handleMouseLeave);
    };
  }, [setHovering, hovering, pressed, setPressed]);

  useEffect(() => {
    const handleMouseDown = () => {
      setPressed(true);
    };

    const handleMouseUp = () => {
      setPressed(false);
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [setHovering, hovering, pressed, setPressed]);

  useEffect(() => {
    const setFromEvent = (e: any) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    document.addEventListener("mousemove", setFromEvent);

    return () => {
      document.removeEventListener("mousemove", setFromEvent);
    };
  }, [x, y]);

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
    link: {
      "--width": "2rem",
      "--height": "2rem",
      "--top": ".35rem",
      "--left": ".2rem",
      "--bkg-opacity": 1,
    },
    video: {
      "--width": "3rem",
      "--height": "3rem",
      "--top": ".35rem",
      "--left": ".2rem",
      "--bkg-opacity": 0,
    },
    "arrow-left": {
      "--width": "6rem",
      "--height": "6rem",
      "--top": ".35rem",
      "--left": ".2rem",
      "--bkg-opacity": 0,
    },
    "arrow-right": {
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
    }
    if (hovering === "none") {
      return "default";
    } else if (hovering === "video") {
      return "video";
    } else if (hovering === "arrow-left") {
      return "arrow-left";
    } else if (hovering === "arrow-right") {
      return "arrow-right";
    } else {
      return "link";
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
        "--mix-blend-difference pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      )}
    >
      <m.div
        className={clsx(
          "pointer-events-none h-[1px] w-[1px] items-center justify-center text-[#3C3836] ",
          " origin-center transform transition-transform duration-150 ease-out",
          "after:--backdrop-blur-[.5rem] after:absolute after:top-[var(--top)] after:left-[var(--left)] after:h-[var(--height)] after:w-[var(--width)] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:border-2 after:border-[#3C3836] after:bg-[#3c3836] after:bg-opacity-[var(--bkg-opacity)] after:opacity-60",
          isHoveringArrow && "!mix-blend-normal after:!border-white"
          // "fixed top-0 left-0 "
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
            className="absolute top-[-.38rem] left-[-.48rem] z-40 h-6 w-6 transform text-white"
            animate={{
              rotate: hovering === "arrow-right" ? 0 : 180,
            }}
          />
        )}
      </m.div>
    </div>
  );
};

export default Cursor;
