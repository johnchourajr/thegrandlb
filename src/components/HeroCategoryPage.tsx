"use client";

import clsx from "clsx";
import {
  LayoutGroup,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { GridSection } from "./GridSection";
import Headline from "./Headline";
import MediaFrame from "./media-frame";
import ImageBox from "./media-frame/ImageBox";
import MotionBox from "./MotionBox";
import Text from "./Paragraph";
import Star from "./svg/Star";

const HeadlineItem = ({ headline, scrollYProgress }: any) => {
  const keyframes = [0, 1];

  const xTop = useTransform(scrollYProgress, keyframes, [`0%`, `-20%`]);
  const xBottom = useTransform(scrollYProgress, keyframes, [`0%`, `20%`]);
  const splitFirstTwoWords = headline.split(" ").slice(0, 2).join(" ");
  const splitWordsPastTwo = headline.split(" ").slice(2).join(" ");

  return (
    <>
      <Headline
        uppercase
        size={"4xl"}
        animationType={"letter"}
        className="inline-flex max-w-[100vw] gap-[.15em] !whitespace-nowrap text-[black]"
        style={{ x: xTop }}
        animateOnce={true}
      >
        {splitFirstTwoWords}
        <motion.span
          initial={{
            opacity: 0,
            y: "0.1em",
          }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 1, delay: 0.6, ease: [0.19, 1, 0.22, 1] },
          }}
        >
          <Star style={{ height: ".9em", width: ".7em" }} />
        </motion.span>
        {splitWordsPastTwo}
      </Headline>
      <Headline
        // text={`${splitFirstTwoWords}⬦${splitWordsPastTwo}`}
        uppercase
        size={"4xl"}
        animationType={"letter"}
        className="inline-flex max-w-[100vw] justify-end gap-[.15em] self-end !whitespace-nowrap text-[black]"
        style={{ x: xBottom }}
        animateOnce={true}
      >
        {splitFirstTwoWords}
        <motion.span
          initial={{
            opacity: 0,
            y: "0.1em",
          }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 1, delay: 0.6, ease: [0.19, 1, 0.22, 1] },
          }}
        >
          <Star style={{ height: ".9em", width: ".7em" }} />
        </motion.span>
        {splitWordsPastTwo}
      </Headline>
    </>
  );
};

const HeroCategoryPage = ({
  uid,
  headline,
  gallery,
  media,
  video_media,
  subhead,
  body,
  icon_media,
}: any) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["-30%", "end start"],
  });
  const hasSubheadandBody = subhead && body;

  const progress = useSpring(scrollYProgress, { damping: 100, stiffness: 300 });

  return (
    <LayoutGroup>
      <GridSection
        gridSectionRef={ref}
        id={`hero-${uid}`}
        layoutId={`hero-${uid}`}
        bottomSpacer={"None"}
        topSpacer={"Small"}
        overflowHidden={true}
        className="relative bg-[white] text-[black]"
      >
        <div className="absolute inset-0 z-20 bg-cream mix-blend-multiply" />
        <div className="overflow-mask col-span-full flex translate-x-[-1%] flex-col justify-start whitespace-normal">
          <HeadlineItem
            scrollYProgress={progress}
            headline={headline}
            media={media}
          />
        </div>
        <MediaFrame
          media={media}
          video_media={video_media}
          video_options={{ controls: false, auto_play: true, loop: true }}
          className="absolute inset-0 z-10 col-span-6 h-full w-full mix-blend-screen"
        />
      </GridSection>
      {hasSubheadandBody && (
        <GridSection
          id={"sub-hero"}
          bottomSpacer={"Medium"}
          topSpacer={"Medium"}
        >
          {icon_media && (
            <MotionBox className="col-span-full flex pb-0 pt-10 sm:col-span-2 sm:row-span-2 sm:items-center sm:justify-center lg:col-span-3 lg:col-start-1 lg:row-span-1 lg:pb-3 lg:pt-3">
              <ImageBox
                media={icon_media}
                className={clsx(
                  "h-48 max-h-[18rem] w-48 max-w-[18rem] md:h-[14vw] md:w-[14vw]"
                )}
              />
            </MotionBox>
          )}
          <MotionBox
            className={clsx(
              "col-span-full pb-0 pt-10 lg:pb-20 lg:pt-12",
              icon_media
                ? "sm:col-start-3 lg:col-span-5 lg:col-start-auto"
                : "lg:col-span-5 lg:col-start-2"
            )}
          >
            <Headline size={"xl"} className={"max-w-[10em] pr-12"} animateOnce>
              {subhead}
            </Headline>
          </MotionBox>
          <MotionBox
            className={clsx(
              "col-span-full pb-12 lg:pt-16",
              icon_media
                ? "sm:col-start-3 lg:col-span-3 lg:col-start-9"
                : "lg:col-span-4 lg:col-start-7"
            )}
          >
            <Text paragraph size="large" className="max-w-[30em]">
              {body}
            </Text>
          </MotionBox>
        </GridSection>
      )}
    </LayoutGroup>
  );
};

export default HeroCategoryPage;
