import type { PrismicNextImageProps } from "@prismicio/next";
import clsx from "clsx";
import { AnimatePresence, m, useInView } from "framer-motion";
import React, { useEffect, useState } from "react";
import ParallaxWrapper from "../ParallaxWrapper";
import GalleryControls from "./GalleryControls";
import ImageBox from "./ImageBox";

export type ImageItem = {
  caption: string;
  link: {
    link_type: string;
  };
  video_media: {
    link_type: string;
  };
  media: {
    dimensions: {
      width: number;
      height: number;
    };
    alt: string;
    url: string;
  };
};

interface ImageGalleryProps {
  id?: string;
  className?: string;
  containerClassName?: string;
  images?: ImageItem[];
  autoPlay?: boolean;
  cycleDuration?: number;
  delayStart?: number;
  outerControls?: boolean;
  controlPosition?: "Bottom Right" | "Top Right" | "Bottom Left" | "Top Left";
  imgixParams?: PrismicNextImageProps["imgixParams"];
  overlay?: boolean;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  id,
  className,
  containerClassName,
  images,
  autoPlay = true,
  cycleDuration = 5000,
  delayStart = 0,
  outerControls = false,
  controlPosition = "Bottom Right",
  imgixParams,
  overlay = false,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [loadRest, setLoadRest] = useState(false);

  const setPosition = (
    controlPosition: ImageGalleryProps["controlPosition"]
  ) => {
    switch (controlPosition) {
      case "Bottom Right":
        return {
          container: "",
          controls:
            "self-end flex-row-reverse justify-between md:justify-center w-full md:w-fit md:flex-row",
        };
      case "Top Right":
        return {
          container: "md:flex-col-reverse",
          controls:
            "self-start md:self-end flex-row-reverse justify-between md:justify-center w-full md:w-fit md:flex-row",
        };
      case "Top Left":
        return {
          container: "md:flex-col-reverse",
          controls:
            "self-start justify-between w-full md:w-fit md:justify-self-start flex-row-reverse",
        };
      case "Bottom Left":
        return {
          container: "",
          controls:
            "self-start justify-between w-full md:w-fit md:justify-self-end flex-row-reverse",
        };
      default:
        return {
          container: "",
          controls: "self-end",
        };
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

  useEffect(() => {
    if (autoPlay) {
      setIsPlaying(true);
    }

    if (delayStart) {
      setTimeout(() => {
        setIsPlaying(true);
      }, delayStart);
    }
  }, [delayStart, autoPlay]);

  useEffect(() => {
    if (!images) {
      return () => null;
    }

    let interval: ReturnType<typeof setInterval> | undefined = undefined;

    if (!isPlaying) {
      return () => clearInterval(interval);
    }

    if (isInView && isPlaying) {
      interval = setInterval(() => {
        setCurrentImageIndex(nextImageIndex);
        setNextImageIndex((nextImageIndex) =>
          nextImageIndex === images.length - 1 ? 0 : nextImageIndex + 1
        );
      }, cycleDuration);

      return () => {
        clearInterval(interval);
      };
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [
    autoPlay,
    cycleDuration,
    isInView,
    isPlaying,
    delayStart,
    images,
    nextImageIndex,
  ]);

  useEffect(() => {
    // after cycleDuration minus 100 ms set loadRest to true
    // this will load the rest of the images in the background
    // so that they are ready to be displayed when the user
    // navigates to them
    const timeout = setTimeout(() => {
      setLoadRest(true);
    }, cycleDuration / 2);

    return () => {
      clearTimeout(timeout);
    };
  }, [cycleDuration]);

  if (!images) {
    return null;
  }

  const handlePlayPauseClick = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleNavigateToNext = () => {
    setIsPlaying(false);
    setCurrentImageIndex(nextImageIndex);
    setNextImageIndex(
      nextImageIndex === images.length - 1 ? 0 : nextImageIndex + 1
    );
    setTimeout(() => {
      setIsPlaying(true);
      // console.log("playing again");
    }, cycleDuration);
  };

  const handleNavigateToPrevious = () => {
    setIsPlaying(false);
    setCurrentImageIndex(nextImageIndex);
    setNextImageIndex(
      nextImageIndex === 0 ? images?.length - 1 : nextImageIndex - 1
    );
    setTimeout(() => {
      setIsPlaying(true);
      // console.log("playing again");
    }, cycleDuration);
  };

  const handleNavigateToIndex = (index: number) => {
    setIsPlaying(false);
    setCurrentImageIndex(index);
    setNextImageIndex(index === images?.length - 1 ? 0 : index + 1);
  };

  const boxVariants = {
    hidden: {
      opacity: 0,
      scale: 1.05,
      x: "0%",
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: "0%",
    },
  };

  return (
    <div
      id={id}
      ref={ref}
      className={clsx(
        "relative z-10 flex flex-col gap-y-4",
        setPosition(controlPosition).container,
        containerClassName
      )}
    >
      <div
        className={clsx(
          "relative z-10 h-full w-full gap-y-4 overflow-hidden rounded-sm lg:rounded-md",
          className
        )}
      >
        <div className="relative z-10 h-full w-full ">
          <ParallaxWrapper>
            <AnimatePresence mode={"sync"}>
              {images.map(({ media, caption }: any, i) => {
                const isActive = i === currentImageIndex;
                return (
                  <m.div
                    key={i}
                    className="absolute top-0 left-0 h-full w-full object-cover"
                    variants={boxVariants}
                    transition={{
                      ease: [0.1, 0.25, 0.3, 1],
                      duration: 1,
                    }}
                    initial="hidden"
                    animate={isActive ? "visible" : "hidden"}
                    data-item={i}
                    data-active={isActive ? true : false}
                    aria-hidden={isActive ? "false" : "true"}
                  >
                    <ImageBox
                      className="absolute top-0 left-0 h-full w-full object-cover"
                      media={media}
                      customAlt={caption}
                      imgixParams={imgixParams}
                      priority={i === 0 ? true : false}
                    />
                    {overlay && (
                      <div className="absolute inset-0 z-10 bg-black bg-opacity-10" />
                    )}
                    <div className="noise" />
                  </m.div>
                );
              })}
            </AnimatePresence>
          </ParallaxWrapper>
        </div>
        <button
          className={clsx(
            "--bg-red absolute top-0 left-0 z-[100] h-full w-1/2 cursor-none bg-opacity-30",
            "after:absolute after:left-0 after:top-0 after:rounded-sm after:p-3 after:py-2 focus-visible:after:bg-black focus-visible:after:text-white focus-visible:after:content-[attr(data-content)]"
          )}
          data-cursor="arrow-left"
          data-content="Go to previous"
          title="Go to previous"
          onClick={handleNavigateToPrevious}
        />
        <button
          className={clsx(
            "--bg-blue absolute top-0 right-0 z-[100] h-full w-1/2 cursor-none bg-opacity-30",
            "after:absolute after:right-0 after:top-0 after:rounded-sm after:p-3 after:py-2 focus-visible:after:bg-black focus-visible:after:text-white focus-visible:after:content-[attr(data-content)]"
          )}
          data-cursor="arrow-right"
          data-content="Go to next"
          title="Go to next"
          onClick={handleNavigateToNext}
        />
        {!outerControls && (
          <div className="pointer-events-none absolute inset-6 z-[150] flex flex-col-reverse">
            <GalleryControls
              outerControls={outerControls}
              setPosition={setPosition}
              images={images}
              controlPosition={controlPosition}
              currentImageIndex={currentImageIndex}
              handleNavigateToIndex={handleNavigateToIndex}
              isPlaying={isPlaying}
              handlePlayPauseClick={handlePlayPauseClick}
            />
          </div>
        )}
      </div>
      {outerControls && (
        <GalleryControls
          outerControls={outerControls}
          setPosition={setPosition}
          images={images}
          controlPosition={controlPosition}
          currentImageIndex={currentImageIndex}
          handleNavigateToIndex={handleNavigateToIndex}
          isPlaying={isPlaying}
          handlePlayPauseClick={handlePlayPauseClick}
        />
      )}
    </div>
  );
};

export default ImageGallery;
