"use client";

// inline video player component
import { EmptyLinkField, FilledLinkToMediaField } from "@prismicio/types";
import clsx from "clsx";
import { useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState, VideoHTMLAttributes } from "react";
import ParallaxWrapper from "../ParallaxWrapper";
import LazyVideo from "./LazyVideo";
import { VideoProgressButton } from "./VideoProgressButton";

export interface InlineVideoPlayerProps {
  id?: string;
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
  priority?: boolean;
  // New optimization props
  lazy?: boolean;
  preload?: "none" | "metadata" | "auto";
  quality?: "low" | "medium" | "high";
  enableBandwidthOptimization?: boolean;
}

const InlineVideoPlayer = ({
  id,
  className,
  videoClassName,
  media,
  poster,
  auto_play,
  controls,
  loop,
  controlPosition = "Bottom Right",
  priority,
}: InlineVideoPlayerProps) => {
  const ref = React.useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref);

  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const reducedMotion = useReducedMotion();

  const { url: mediaUrl }: any = media || {};
  const { url: posterUrl }: any = poster || {};

  const videoOptions = {
    autoPlay: auto_play,
    loop: loop,
    playsInline: true,
    preload: "metadata", // Changed from "auto" to "metadata" to reduce initial bandwidth
    muted: true,
    controls,
  } as VideoHTMLAttributes<HTMLVideoElement>;

  const handleChange = (play = true): any => {
    if (play && !isPlaying) {
      let playPromise = ref?.current?.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            setIsPlaying(false);
          });
      }
    } else {
      ref?.current?.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    // Temporarily disabled slow connection check for debugging autoplay
    // const isSlowConnection = document.documentElement.hasAttribute(
    //   "data-slow-connection"
    // );

    if (isInView) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }

    return () => {
      setIsPlaying(false);
    };
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
      // Force play regardless of slow connection for debugging
      const video = ref?.current;
      if (video) {
        video.play().catch((error) => {
          console.log("Autoplay failed:", error);
        });
      }
      setIsPlaying(true);
    }
  }, [auto_play]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (reducedMotion) {
      handleChange(false);
      setIsPlaying(false);
    }
  }, [reducedMotion]); // eslint-disable-line react-hooks/exhaustive-deps

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
    <div id={id} className={clsx(className)}>
      <ParallaxWrapper>
        <div className={clsx("absolute inset-0")}>
          <div
            className={clsx(
              "absolute inset-0 z-20 h-full w-full bg-black object-cover opacity-20"
            )}
          />
          <LazyVideo
            ref={ref}
            src={mediaUrl}
            className={clsx(
              "absolute inset-0 z-10 h-full w-full object-cover",
              videoClassName
            )}
            {...videoOptions}
            controls={false}
            playsInline={true}
          />
          {posterUrl && (
            <div className={"absolute inset-0 z-0 h-full w-full"}>
              <Image
                className={clsx("h-full w-full object-cover", videoClassName)}
                src={posterUrl}
                width={`480`}
                height={`270`}
                priority={priority || false}
                alt=""
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </div>
          )}
        </div>
      </ParallaxWrapper>
      {controls && (
        <div
          className={clsx(
            "absolute z-30 h-9 w-9",
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
