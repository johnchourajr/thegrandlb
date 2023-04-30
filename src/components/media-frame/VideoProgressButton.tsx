import clsx from "clsx";
import { AnimatePresence, m } from "framer-motion";
import { VideoHTMLAttributes } from "react";
import PauseIcon from "../svg/PauseIcon";
import PlayIcon from "../svg/PlayIcon";

interface VideoProgressButtonProps {
  className?: string;
  progress?: number;
  playing: boolean;
  onClick: VideoHTMLAttributes<HTMLButtonElement>["onClick"];
  inverted?: boolean;
  transition?: any;
}
export const VideoProgressButton = ({
  className,
  progress = 0,
  playing,
  onClick,
  inverted = false,
}: VideoProgressButtonProps) => {
  const colorStyles = () => {
    if (inverted) {
      return {
        stroke: "stroke-black",
        fill: "fill-black",
      };
    } else {
      return {
        stroke: "stroke-white",
        fill: "fill-white",
      };
    }
  };

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
            "text-gray-300  opacity-30",
            colorStyles().stroke,
            colorStyles().fill,
            !playing && "opacity-10"
          )}
          cx="50"
          cy="50"
          r="45"
          strokeWidth="6"
          fill="none"
        />
        {progress && (
          <m.circle
            className={clsx(colorStyles().stroke, !playing && "opacity-30")}
            cx="50"
            cy="50"
            r="45"
            strokeWidth="6"
            fill="none"
            pathLength="1"
            animate={{
              pathLength: progress ? progress / 100 : 0,
            }}
          />
        )}
      </m.svg>
      <AnimatePresence mode="wait">
        {playing ? (
          <PauseIcon
            className={clsx(
              "absolute inset-0 z-0 h-full w-full",
              colorStyles().fill
            )}
          />
        ) : (
          <PlayIcon
            className={clsx(
              "absolute inset-0 z-0 h-full w-full",
              colorStyles().fill
            )}
          />
        )}
      </AnimatePresence>
    </m.button>
  );
};
