// inline video player component
import clsx from "clsx";
import { useReducedMotion } from "framer-motion";
import React, { useState, VideoHTMLAttributes } from "react";
import { VideoProgressButton } from "./VideoProgressButton";

export interface InlineVideoPlayerProps {
  className?: string;
  videoClassName?: string;
  uid?: string;
  media?: {
    link_type: string;
    name: string;
    kind: string;
    url: string;
    size: number;
  };
  poster?: {
    link_type: string;
    name: string;
    kind: string;
    url: string;
    size: number;
  };
  auto_play?: boolean;
  loop?: boolean;
  controls?: boolean;
  controlPosition?: "Top Right" | "Bottom Left" | "Bottom Right";
}

const InlineVideoPlayer = ({
  className,
  videoClassName,
  uid,
  media,
  auto_play,
  controls,
  loop,
  controlPosition = "Bottom Right",
}: InlineVideoPlayerProps) => {
  const ref = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const reducedMotion = useReducedMotion();

  const videoOptions = {
    autoPlay: auto_play,
    loop: loop,
    playsInline: true,
    preload: "auto",
    muted: true,
    controls,
  } as VideoHTMLAttributes<HTMLVideoElement>;

  const handleChange = () => {
    if (!isPlaying) {
      ref?.current?.play();
      setIsPlaying(true);
    } else {
      ref?.current?.pause();
      setIsPlaying(false);
    }
  };

  const getVideoProgress = (): any => {
    const video = ref?.current;
    if (video) {
      const { currentTime, duration } = video;
      const progress = (currentTime / duration) * 100;
      return {
        progress,
        currentTime,
        duration,
      };
    }
    return 0;
  };

  const setPosition = (
    controlPosition: "Bottom Right" | "Top Right" | "Bottom Left"
  ) => {
    switch (controlPosition) {
      case "Bottom Right":
        return "bottom-4 right-4 xl:bottom-6 xl:right-6";
      case "Top Right":
        return "top-4 right-4 xl:top-6 xl:right-6";
      case "Bottom Left":
        return "bottom-4 left-4 xl:bottom-6 xl:left-6";
      default:
        return "bottom-4 right-4 xl:bottom-6 xl:right-6";
    }
  };

  React.useEffect(() => {
    if (auto_play) {
      ref?.current?.play();
      setIsPlaying(true);
    }
  }, [auto_play]);

  React.useEffect(() => {
    if (reducedMotion) {
      ref?.current?.pause();
      setIsPlaying(false);
    }
  }, [reducedMotion]);

  React.useEffect(() => {
    const video = ref?.current;
    if (video) {
      video.addEventListener("timeupdate", () => {
        const { progress } = getVideoProgress();
        setVideoProgress(progress);
      });
    }
  }, []);

  return (
    <div className={clsx(className)}>
      <div
        className={clsx("absolute inset-0")}
        // onClick={() => handleChange()}
        // aria-label={isPlaying ? "Pause" : "Play"}
        // tabIndex={-1}
        // data-cursor="video"
      >
        <div
          className={clsx(
            "absolute inset-0 z-10 h-full w-full bg-black object-cover opacity-20"
          )}
        />
        <video
          ref={ref}
          className={clsx("h-full w-full object-cover", videoClassName)}
          {...videoOptions}
          poster={media?.url}
        >
          <source src={media?.url} type="video/mp4" />
        </video>
      </div>
      {!controls && (
        <div
          className={clsx(
            "absolute  z-30 h-9 w-9 ",
            setPosition(controlPosition)
          )}
        >
          <VideoProgressButton
            className="h-9 w-9"
            onClick={() => handleChange()}
            progress={videoProgress}
            playing={isPlaying}
            aria-label={isPlaying ? "Pause" : "Play"}
          />
        </div>
      )}
    </div>
  );
};

export default InlineVideoPlayer;
