import clsx from "clsx";
import { AnimatePresence, m } from "framer-motion";
import React from "react";
import Text from "../Paragraph";
import type { GalleryControlsProps } from "./types";
import { VideoProgressButton } from "./VideoProgressButton";

const GalleryDot = ({
  outerControls = true,
  className,
  props,
}: {
  outerControls?: boolean;
  className?: string;
  layoutId?: string;
  props?: any;
}) => (
  <m.span
    initial={{ opacity: 0, width: 0 }}
    animate={{ opacity: 1, width: "auto" }}
    exit={{ opacity: 0, width: 0 }}
    className={clsx(
      "min-h-4 min-w-4 flex",
      "bg-gray-300 relative z-10 flex h-6 w-6 items-center justify-center rounded-full px-1",
      "hover:before:scale-150 hover:after:opacity-20",
      "before:absolute before:z-10 before:h-[5px] before:w-[5px] before:transform before:rounded-full before:bg-black before:transition-all before:duration-300 before:ease-in-out before:content-['']",
      "relative after:absolute after:-z-10 after:h-4 after:w-4 after:transform after:rounded-full after:bg-black after:opacity-0 after:transition-all after:duration-300 after:ease-in-out after:content-['']",
      outerControls
        ? "before:bg-black after:bg-black "
        : "before:bg-white after:bg-white",
      className
    )}
    {...props}
  />
);

const GalleryControls: React.FC<GalleryControlsProps> = ({
  outerControls,
  setPosition,
  images,
  controlPosition,
  currentImageIndex,
  handleNavigateToIndex,
  isPlaying,
  handlePlayPauseClick,
}) => (
  <div
    className={clsx(
      "self pointer-events-auto flex items-center justify-center gap-4",
      outerControls ? "text-black" : "text-white",
      setPosition(controlPosition).controls
    )}
  >
    <div className="flex items-center justify-center space-x-2">
      {images.map(({ caption }: any, i: number) => {
        const isActive = i === currentImageIndex;
        return (
          <button
            key={i}
            onClick={() => handleNavigateToIndex(i)}
            aria-label={`navigate to image ${i + 1}`}
            className={"relative w-fit"}
            data-active={isActive}
          >
            <AnimatePresence>
              {isActive ? (
                <m.div
                  className="inline overflow-hidden"
                  initial={
                    {
                      opacity: 0,
                      width: 0,
                      position: "absolute",
                      "--scalex": 0,
                    } as any
                  }
                  animate={
                    {
                      opacity: 1,
                      width: "auto",
                      position: "relative",
                      "--scalex": "100%",
                    } as any
                  }
                  exit={
                    {
                      opacity: 0,
                      width: 0,
                      position: "absolute",
                      "--scalex": 0,
                    } as any
                  }
                >
                  {/**
                   * @todo TEMP FIX
                   */}
                  {caption ? (
                    <Text
                      className={clsx(
                        "inline whitespace-nowrap",
                        outerControls ? "text-black" : "text-white",
                        "after:absolute after:bottom-0 after:left-0 after:z-20 after:h-[1.5px] after:w-[100%] after:origin-top-right after:scale-x-0 after:bg-[currentColor] after:transition-transform after:duration-300 after:ease-out-expo after:content-['']",
                        "overflow-hidden after:origin-top-left after:scale-x-[var(--scalex)]"
                      )}
                    >
                      {caption}
                    </Text>
                  ) : (
                    <GalleryDot
                      outerControls={outerControls}
                      className={" px-[6px] before:!scale-[1.5]"}
                      layoutId={`dot-${i}`}
                    />
                  )}

                  {/* <GalleryDot
                    outerControls={outerControls}
                    className={"px-[6px] before:!scale-[1.5]"}
                  /> */}
                </m.div>
              ) : (
                <GalleryDot
                  outerControls={outerControls}
                  layoutId={`dot-${i}`}
                />
              )}
            </AnimatePresence>
          </button>
        );
      })}
    </div>
    <VideoProgressButton
      playing={isPlaying}
      onClick={handlePlayPauseClick}
      className="h-9 w-9"
      inverted={outerControls ? true : false}
    />
  </div>
);

export default GalleryControls;
