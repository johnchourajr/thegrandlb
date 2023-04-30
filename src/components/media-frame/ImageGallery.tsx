import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { m } from "framer-motion";
import React, { useEffect, useState } from "react";
import GalleryControls from "./GalleryControls";

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
  className?: string;
  containerClassName?: string;
  images?: ImageItem[];
  autoPlay?: boolean;
  cycleDuration?: number;
  delayStart?: number;
  outerControls?: false;
  controlPosition?: "Bottom Right" | "Top Right" | "Bottom Left" | "Top Left";
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  className,
  containerClassName,
  images,
  autoPlay = true,
  cycleDuration = 5000,
  delayStart = 0,
  outerControls = false,
  controlPosition = "Bottom Right",
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

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

    if (isPlaying) {
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
  }, [autoPlay, cycleDuration, isPlaying, delayStart, images, nextImageIndex]);

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
      console.log("playing again");
    }, cycleDuration);
  };

  const handleNavigateToPrevious = () => {
    setIsPlaying(false);
    setCurrentImageIndex(nextImageIndex);
    setNextImageIndex(
      nextImageIndex === 0 ? images.length - 1 : nextImageIndex - 1
    );
    setTimeout(() => {
      setIsPlaying(true);
      console.log("playing again");
    }, cycleDuration);
  };

  const handleNavigateToIndex = (index: number) => {
    setIsPlaying(false);
    setCurrentImageIndex(index);
    setNextImageIndex(index === images.length - 1 ? 0 : index + 1);
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
      className={clsx(
        "relative z-10 my-4 flex flex-col",
        setPosition(controlPosition).container,
        containerClassName
      )}
    >
      <div
        className={clsx(
          "relative z-10 my-4 h-full w-full overflow-hidden rounded-sm lg:rounded-md",
          className
        )}
      >
        <div className="relative z-10 h-full w-full">
          {images.map((image, i) => {
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
                animate={isActive ? "visible" : "hidden"}
                data-active={isActive ? true : false}
                aria-hidden={isActive ? "false" : "true"}
              >
                <PrismicNextImage
                  className="absolute top-0 left-0 h-full w-full object-cover"
                  field={image.media as any}
                />
              </m.div>
            );
          })}
        </div>
        <button
          className="--bg-red absolute top-0 z-10 h-full w-1/2 cursor-none bg-opacity-30"
          data-cursor="arrow-left"
          onClick={handleNavigateToPrevious}
        />
        <button
          className="--bg-blue absolute top-0 right-0 z-10 h-full w-1/2 cursor-none bg-opacity-30"
          data-cursor="arrow-right"
          onClick={handleNavigateToNext}
        />
        {!outerControls && (
          <div className="absolute inset-6 z-50 flex flex-col-reverse">
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
