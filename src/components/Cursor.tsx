import clsx from "clsx";
import { m, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const anchorLinks = document.querySelectorAll("a");
    const buttonsElements = document.querySelectorAll("button");
    const videosElements = document.querySelectorAll("[data-cursor='video']");
    const textElements = document.querySelectorAll("[data-cursor='text']");

    const handleMouseEnterLink = () => {
      setHovering("link");
    };

    const handleMouseEnterVideo = () => {
      setHovering("video");
    };

    const handleMouseEnterText = () => {
      setHovering("text");
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
    // addEventListenerTemplate(
    //   textElements,
    //   handleMouseEnterText,
    //   handleMouseLeave
    // );

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
      // removeEventListenerTemplate(
      //   textElements,
      //   handleMouseEnterText,
      //   handleMouseLeave
      // );
    };
  }, [setHovering, hovering]);

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
  }, [pressed, setPressed]);

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
    },
    default: {
      opacity: 0,
      scale: 1,
      "--width": "3rem",
      "--height": "3rem",
      "--bkg": "tranparent",
    },
    link: {
      "--width": "2rem",
      "--height": "2rem",
      "--bkg": "white",
    },
    video: {
      "--width": "3rem",
      "--height": "3rem",
      // "--bkg": "white",
    },
    // text: {
    //   "--width": ".1rem",
    //   "--height": "2rem",
    //   "--top": "50%",
    //   "--left": "50%",
    //   "--bkg": "white",
    // },
  } as any;

  const cursorAnimate = () => {
    if (hovering !== "none" && pressed) {
      return "hidden";
    }
    if (hovering === "none") {
      return "default";
    } else if (hovering === "video") {
      return "video";
      // } else if (hovering === "text") {
      //   return "text";
    } else {
      return "link";
    }
  };

  return (
    <m.div
      className={clsx(
        "pointer-events-none h-[1px] w-[1px] mix-blend-difference",
        "fixed top-0 left-0 z-[9999] origin-center transform transition-transform duration-150 ease-out",
        // "after:absolute after:top-1/2 after:left-1/2 after:h-[var(--height)] after:w-[var(--width)] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:border-2 after:border-white after:bg-[var(--bkg)] ",
        // after element arrow like arrow with svg data uri
        "after:top-[var(--top, .43rem)] after:left-[var(--left, .22rem)] after:absolute after:h-[var(--height)] after:w-[var(--width)] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:border-2 after:border-white after:bg-[var(--bkg)] "
      )}
      style={{
        x,
        y,
      }}
      variants={cursorVariant}
      animate={cursorAnimate()}
    />
  );
};

export default Cursor;
