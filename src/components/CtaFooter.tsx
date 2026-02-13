"use client";

import {
  getImageField,
  getKeyText,
  getLinkField,
  getSelectValue,
} from "@/utils/prismic-helpers";
import { splitTextIntoArray } from "@/utils/utils";
import type { Content } from "@prismicio/client";
import clsx from "clsx";
import { useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { TileItem } from "slices/TileGrid/TileItem";
import type {
  CtaFooterHeadlineItemProps,
  CtaFooterProps,
} from "../types/footer";
import { GridSection } from "./GridSection";
import Headline from "./Headline";
import MediaFrame from "./media-frame";

const CtaFooterHeadlineItem = ({
  word,
  index,
  scrollProgress,
}: CtaFooterHeadlineItemProps) => {
  const keyframes = [0, 1];

  const x = useTransform(scrollProgress, keyframes, [
    `${50 * (index + 1)}%`,
    `${0 * (index + 1)}%`,
  ]);

  return (
    <Headline
      key={index}
      text={word}
      uppercase
      size={"5xl"}
      animationType={"letter"}
      className="w-[100vw] !whitespace-nowrap text-[black]"
      style={{ x }}
      animateOnce={true}
    />
  );
};

const CtaFooter = ({ data }: CtaFooterProps) => {
  // Always call hooks first
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "-20%"],
  });
  const scrollProgress = useSpring(scrollYProgress, {
    damping: 100,
    stiffness: 300,
  });

  // Early return AFTER hooks if no data
  if (!data?.data) return null;

  // Safe destructuring with fallbacks
  const headline = data.data.headline || "";
  const video_media = data.data.video_media || null;
  const video_url = (data.data as { video_url?: string }).video_url ?? null;
  const media = data.data.media || null;
  const inquire_card = data.data.inquire_card || null;

  // Safely extract inquire card data
  const cardData = inquire_card
    ? (inquire_card as unknown as Content.FragmentCardDocument)?.data
    : null;

  const headlineArray = splitTextIntoArray(headline);

  return (
    <GridSection
      id={"cta-footer"}
      gridSectionRef={ref}
      bottomSpacer={"None"}
      topSpacer={"None"}
      overflowHidden={true}
      className={clsx(
        "relative min-h-[65vmax] bg-[white] text-[black]",
        "!pt-[50vh] md:mt-8 md:!pt-[inherit]",
        /**
         * PRINT STYLES
         */
        "print:hidden"
      )}
    >
      <TileItem
        className="3lg:!col-span-4 3lg:!col-start-8 z-50 flex w-full items-center md:!col-span-2 md:!col-start-3 lg:!col-span-5 lg:!col-start-7"
        innerClassName="max-h-[50rem] "
        initial={{
          opacity: 0,
          y: 60,
        }}
        viewport={{
          amount: 0.25,
          margin: "0% 0% -40% 0%",
        }}
        media={getImageField(cardData?.media)}
        eyebrow={getKeyText(cardData?.eyebrow)}
        headline={getKeyText(cardData?.headline)}
        body={getKeyText(cardData?.body)}
        link={getLinkField(cardData?.link)}
        theme={getSelectValue(cardData?.theme)}
        size={getSelectValue(cardData?.size)}
        direction={getSelectValue(cardData?.direction)}
      />
      <div className="absolute inset-0 z-20 bg-cream mix-blend-multiply" />
      <div className="overflow-mask absolute inset-0 flex translate-x-[-1%] flex-col justify-start py-8 md:justify-center md:py-0">
        {headlineArray.map((word: string, index: number) => {
          return (
            <CtaFooterHeadlineItem
              key={index}
              word={word}
              index={index}
              scrollProgress={scrollProgress}
            />
          );
        })}
      </div>
      <MediaFrame
        media={media}
        video_media={video_media}
        video_url={video_url}
        video_options={{ controls: false, auto_play: true, loop: true }}
        className="absolute inset-0 z-10 col-span-6 h-full w-full mix-blend-screen"
      />
    </GridSection>
  );
};

export default CtaFooter;
