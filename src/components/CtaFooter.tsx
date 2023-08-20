// setup react component

import { splitTextIntoArray } from "@/utils/utils";
import clsx from "clsx";
import { useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { TileItem } from "slices/TileGrid/TileItem";
import SliceData from "./dev/SliceData";
import { GridSection } from "./GridSection";
import Headline from "./Headline";
import MediaFrame from "./media-frame";

const CtaFooterHeadlineItem = ({ word, index, scrollYProgress }: any) => {
  const keyframes = [0, 1];

  const x = useTransform(scrollYProgress, keyframes, [
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

const CtaFooter = ({ data }: any) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "-20%"],
  });
  const progress = useSpring(scrollYProgress, { damping: 100, stiffness: 300 });

  if (!data) return null;

  const {
    results: [result],
  } = data;

  const {
    data: { headline, video_media, media, inquire_card },
  } = result;

  const headlineArray = splitTextIntoArray(headline);

  return (
    <>
      {result && (
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
            className="z-50 flex w-full items-center md:!col-span-2 md:!col-start-3 xl:!col-span-5 xl:!col-start-7 3xl:!col-span-4 3xl:!col-start-8"
            innerClassName="max-h-[50rem] "
            initial={{
              opacity: 0,
              y: 60,
            }}
            viewport={{
              threshold: 0.25,
              margin: "0% 0% -40% 0%",
            }}
            {...inquire_card.data}
          />
          <div className="absolute inset-0 z-20 bg-cream mix-blend-multiply" />
          <div className="overflow-mask absolute inset-0 flex translate-x-[-1%] flex-col justify-start py-8 lg:justify-center lg:py-0">
            {headlineArray.map((word: string, index: number) => {
              return (
                <CtaFooterHeadlineItem
                  key={index}
                  word={word}
                  index={index}
                  scrollYProgress={progress}
                  array={headlineArray}
                  media={media}
                />
              );
            })}
          </div>
          <MediaFrame
            media={media}
            video_media={video_media}
            video_options={{ controls: false, auto_play: true, loop: true }}
            className="absolute inset-0 z-10 col-span-6 h-full w-full mix-blend-screen"
          />
        </GridSection>
      )}
      <SliceData slice={result} hidden />
    </>
  );
};

export default CtaFooter;
