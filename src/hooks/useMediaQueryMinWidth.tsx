import { useEffect, useState } from "react";

// hook for responsive breakpoints
const useMediaQueryMinWidth = (width: number) => {
  const [targetReached, setTargetReached] = useState(false);

  useEffect(() => {
    const updateTarget = (e: any) => {
      if (e.matches) {
        setTargetReached(true);
      } else {
        setTargetReached(false);
      }
    };
    const media = window.matchMedia(`(min-width: ${width}px)`);
    media.addEventListener("change", (e) => updateTarget(e));
    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }
    return () => media.removeEventListener("change", (e) => updateTarget(e));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return targetReached;
};

export default useMediaQueryMinWidth;
