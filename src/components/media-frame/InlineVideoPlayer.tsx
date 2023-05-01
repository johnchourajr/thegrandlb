// inline video player component
import { EmptyLinkField, FilledLinkToMediaField } from "@prismicio/types";
import clsx from "clsx";
import { useInView, useReducedMotion } from "framer-motion";
import React, { useEffect, useState, VideoHTMLAttributes } from "react";
import { VideoProgressButton } from "./VideoProgressButton";

export interface InlineVideoPlayerProps {
  className?: string;
  videoClassName?: string;
  uid?: string;
  media?: FilledLinkToMediaField | EmptyLinkField<"Media">;
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
  poster,
  auto_play,
  controls,
  loop,
  controlPosition = "Bottom Right",
}: InlineVideoPlayerProps) => {
  const ref = React.useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref);
  const loadInView = useInView(ref, {
    once: true,
    margin: "50% 0px",
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const reducedMotion = useReducedMotion();

  const { url: mediaUrl }: any = media || {};
  const { url: posterUrl }: any = poster || {};
  const posterUrlWithParams = posterUrl && `${posterUrl}?q=10&fm=webp&w=800`;

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

  useEffect(() => {
    if (isInView) {
      setIsPlaying(true);
      // console.log("playing");
    } else {
      setIsPlaying(false);
      // console.log("paused");
    }
  }, [isInView]);

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
      <div className={clsx("absolute inset-0")}>
        <div
          className={clsx(
            "absolute inset-0 z-10 h-full w-full bg-black object-cover opacity-20"
          )}
        />
        <video
          ref={ref}
          className={clsx("h-full w-full object-cover", videoClassName)}
          {...videoOptions}
          poster={posterUrlWithParams}
        >
          {loadInView && <source src={mediaUrl} type="video/mp4" />}
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
