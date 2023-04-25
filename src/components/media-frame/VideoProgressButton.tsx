import clsx from "clsx";
import { AnimatePresence, m } from "framer-motion";
import { VideoHTMLAttributes } from "react";
import PauseIcon from "../svg/PauseIcon";
import PlayIcon from "../svg/PlayIcon";

interface VideoProgressButtonProps {
  className?: string;
  progress: number;
  playing?: boolean;
  onClick?: VideoHTMLAttributes<HTMLButtonElement>["onClick"];
}
export const VideoProgressButton = ({
  className,
  progress,
  playing,
  onClick,
}: VideoProgressButtonProps) => {
  return (
    <m.button
      className={clsx(
        "relative z-10 inline-flex items-center justify-center",
        className
      )}
      onClick={onClick}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.9 }}
    >
      <m.svg
        className="absolute inset-0 z-0 h-full w-full origin-center rotate-[-90deg]"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <m.circle
          className={clsx(
            "text-gray-300 fill-white stroke-white opacity-30",
            !playing && "opacity-10"
          )}
          cx="50"
          cy="50"
          r="45"
          strokeWidth="6"
          fill="none"
        />
        <m.circle
          className={clsx("stroke-white text-black", !playing && "opacity-30")}
          cx="50"
          cy="50"
          r="45"
          strokeWidth="6"
          fill="none"
          pathLength="1"
          animate={{
            pathLength: progress / 100,
          }}
        />
      </m.svg>
      <AnimatePresence mode="wait">
        {playing ? (
          <PauseIcon className="absolute inset-0 z-0 h-full w-full" />
        ) : (
          <PlayIcon className="absolute inset-0 z-0 h-full w-full" />
        )}
      </AnimatePresence>
    </m.button>
  );
};
