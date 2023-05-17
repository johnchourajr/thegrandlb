// setup react component

import { splitTextIntoArray } from "@/utils/utils";
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
    offset: ["start end", "end end"],
  });

  const {
    results: [result],
  } = data;

  const progress = useSpring(scrollYProgress, { damping: 100, stiffness: 300 });

  const {
    data: {
      headline,
      video_media,
      media,
      top_spacer,
      bottom_spacer,
      inquire_card,
    },
  } = result;

  const headlineArray = splitTextIntoArray(headline);

  return (
    <>
      {result && (
        <GridSection
          id={"cta-footer"}
          gridSectionRef={ref}
          bottomSpacer={bottom_spacer}
          topSpacer={top_spacer}
          overflowHidden={true}
          className="relative h-[65vmax] max-h-[35rem] bg-[white] text-[black] lg:max-h-[40rem] xl:max-h-[80rem]"
        >
          <TileItem
            className="z-50 !col-span-2 !col-start-3 w-full xl:!col-span-5 xl:!col-start-7 3xl:!col-span-4 3xl:!col-start-8"
            initial={{
              opacity: 0,
              y: 60,
            }}
            viewport={{
              threshold: 1,
              margin: "0% 0% -40% 0%",
            }}
            {...inquire_card.data}
          />
          <div className="absolute inset-0 z-20 bg-cream mix-blend-multiply" />
          <div className="absolute inset-0 flex translate-x-[-1%] flex-col justify-center">
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
      <SliceData slice={result} />
    </>
  );
};

export default CtaFooter;
