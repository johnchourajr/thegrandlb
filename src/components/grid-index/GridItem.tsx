"use client";

import useTouchDevice from "@/hooks/useTouchDevice";
import { handleEvent } from "@/utils/events";
import { clampBuilder } from "@/utils/utils";
import { PrismicLink } from "@prismicio/react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { linkResolver } from "prismicio";
import { useEffect, useState } from "react";
import {
  getNumberForColSpan,
  getNumberForColStart,
  getNumberForRowSpan,
  getNumberForRowStart,
} from "slices/TileGrid/utils";
import Headline from "../Headline";
import ImageBox from "../media-frame/ImageBox";
import Text from "../Paragraph";
import ParallaxWrapper from "../ParallaxWrapper";

export const GridIndexItem = ({
  id,
  uid,
  parentUid,
  title,
  max_capacity,
  square_feet,
  features,
  caption,
  page_media,
  layout,
}: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const touchDevice = useTouchDevice();
  const bottomMargin = clampBuilder(1024, 1920, 6, 8.5);

  useEffect(() => {
    if (touchDevice) {
      setIsHovered(true);
    }
  }, [touchDevice]);

  const numberWithCommas = (x: number) => {
    if (!x) {
      return;
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const hoverProps = () => {
    if (touchDevice) {
      return {};
    }
    return {
      onHoverStart: () => setIsHovered(true),
      onHoverEnd: () => setIsHovered(false),
    };
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <motion.div
      key={id}
      layoutId={`${parentUid}-index-${uid}`}
      className={clsx(
        "tour-index-tile hover-black-text relative flex min-h-[25rem] gap-4 overflow-hidden rounded-sm bg-white p-6 text-white transition-colors duration-700 ease-out-expo lg:rounded-md xl:min-h-[20rem] xl:p-8",
        getNumberForColStart(layout?.col_start),
        getNumberForColSpan(layout?.col_span),
        getNumberForRowStart(layout?.row_start),
        getNumberForRowSpan(layout?.row_span),
        layout?.container
      )}
      variants={item}
      {...hoverProps()}
    >
      <PrismicLink
        href={`/${parentUid}/${uid}`}
        linkResolver={linkResolver}
        className="absolute inset-0 z-20"
        onClick={() =>
          handleEvent({
            category: `tile_link`,
            label: `tile_section_${parentUid}_index`,
            value: `${title}: /${parentUid}/${uid}`,
          })
        }
      />
      <div className="relative z-10 flex-shrink-0">
        <Headline size={"md"} className="">
          {title}
        </Headline>
        <motion.div
          layoutId={`text-index-${uid}`}
          className="flex gap-2"
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isHovered ? "auto" : 0,
            opacity: isHovered ? 1 : 0,
            willChange: "height",
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.1,
          }}
        >
          {max_capacity && (
            <>
              <Text>{max_capacity} Max Guests</Text>{" "}
            </>
          )}
          {max_capacity && square_feet && <span className="opacity-20">/</span>}
          {square_feet && (
            <>
              <Text>{numberWithCommas(square_feet)} sqft</Text>{" "}
            </>
          )}
          {square_feet && caption && <span className="opacity-20">/</span>}

          {caption && (
            <>
              <Text>{truncate(caption, 50)}</Text>{" "}
            </>
          )}
        </motion.div>
      </div>
      <motion.div
        layoutId={`media-index-${uid}`}
        className="absolute inset-0 z-0 overflow-hidden rounded-sm bg-black"
        initial={{ margin: 0 }}
        animate={{
          margin: isHovered ? `1.25rem 1.25rem ${bottomMargin}` : "0px",
          willChange: "margin",
        }}
        exit={{ margin: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <ParallaxWrapper>
          <ImageBox
            media={page_media}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </ParallaxWrapper>
        <div className="noise" />
      </motion.div>
    </motion.div>
  );
};
