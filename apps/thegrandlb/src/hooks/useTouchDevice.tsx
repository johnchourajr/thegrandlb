import { useEffect, useState } from "react";

const useTouchDevice = () => {
  const [touchDevice, setTouchDevice] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(`(hover: none)`);
    const updateTarget = (e: any) => {
      if (e.matches) {
        setTouchDevice(true);
      } else {
        setTouchDevice(false);
      }
    };
    media.addEventListener("change", (e) => updateTarget(e));
    if (media.matches) {
      setTouchDevice(true);
    }
    return () => media.removeEventListener("change", (e) => updateTarget(e));
  }, []);

  return touchDevice;
};

export default useTouchDevice;
