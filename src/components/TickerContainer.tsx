import clsx from "clsx";
import { motion } from "framer-motion";
import React from "react";

interface TickProps {
  toLeft?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function Tick({
  toLeft,
  className,
  children,
  ...rest
}: TickProps) {
  const ref = React.useRef(null);
  const [width, setWidth] = React.useState<number>(1000);

  function debounce(func: () => void, wait: number = 100) {
    let timeout: any;
    return function (this: any, ...args: any) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(this, args);
      }, wait);
    };
  }

  const onUpdate = () => {
    if (ref?.current) {
      const element = ref.current as HTMLElement;
      setWidth(element.offsetWidth);
    }
  };

  React.useEffect(() => {
    if (ref.current) {
      onUpdate();
    }

    window.addEventListener("resize", debounce(onUpdate));

    return () => {
      window.removeEventListener("resize", debounce(onUpdate));
    };
  }, [ref]);

  if (!children) return null;
  return (
    <motion.div
      className={clsx("relative z-10 flex w-full overflow-hidden", className)}
      tabIndex={-1}
      {...rest}
    >
      <div className="ticker-mask flex w-full">
        <p
          className={clsx(
            "inline-flex whitespace-pre",
            !toLeft ? "animate_ticker" : "animate_ticker_reverse"
          )}
          style={{ "--ticker-width": `${-width}px` } as any}
        >
          <span ref={ref} className="inline-flex whitespace-pre">
            {children}
            <span
              className="inline-flex whitespace-pre"
              tabIndex={-1}
              aria-hidden
            >
              {children} {children}
            </span>
          </span>
          <span
            className="inline-flex whitespace-pre"
            tabIndex={-1}
            aria-hidden
          >
            {children} {children} {children}
          </span>
        </p>
      </div>
    </motion.div>
  );
}
