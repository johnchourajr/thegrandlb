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
}

const InlineVideoPlayer = ({
  className,
  videoClassName,
  uid,
  media,
  auto_play,
  controls,
  loop,
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

  React.useEffect(() => {
    if (auto_play) {
      ref?.current?.play();
      setIsPlaying(true);
    }
  }, [auto_play]);

  React.useEffect(() => {
    if (reducedMotion) {
      ref?.current.pause();
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
      <button
        className={clsx("absolute inset-0")}
        onClick={() => handleChange()}
        aria-label={isPlaying ? "Pause" : "Play"}
        tabIndex={-1}
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
      </button>
      {!controls && (
        <div className="absolute bottom-4 right-4 z-30 h-9 w-9 xl:bottom-6 xl:right-6">
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
