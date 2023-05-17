import clsx from "clsx";
import { LayoutGroup, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { GridSection } from "./GridSection";
import Headline from "./Headline";
import MediaFrame from "./media-frame";
import ImageBox from "./media-frame/ImageBox";
import MotionBox from "./MotionBox";
import Text from "./Paragraph";

const HeadlineItem = ({ headline, scrollYProgress }: any) => {
  const keyframes = [0, 1];

  const xTop = useTransform(scrollYProgress, keyframes, [`0%`, `-20%`]);
  const xBottom = useTransform(scrollYProgress, keyframes, [`0%`, `20%`]);

  return (
    <>
      <Headline
        text={`${headline}`}
        uppercase
        size={"4xl"}
        animationType={"letter"}
        className="inline-flex max-w-[100vw] gap-[.15em] !whitespace-nowrap text-[black]"
        style={{ x: xTop }}
        animateOnce={true}
      />
      <Headline
        text={`${headline}`}
        uppercase
        size={"4xl"}
        animationType={"letter"}
        className="inline-flex max-w-[100vw] justify-end gap-[.15em] self-end !whitespace-nowrap text-[black]"
        style={{ x: xBottom }}
        animateOnce={true}
      />
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
        <div className="col-span-full flex translate-x-[-1%] flex-col justify-start whitespace-normal">
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
            <MotionBox className="col-span-2 row-span-2 flex items-center justify-center pt-10 pb-0 xl:col-span-3 xl:col-start-1 xl:row-span-1 xl:pt-3 xl:pb-3">
              <ImageBox
                media={icon_media}
                className={clsx("h-48 w-48 lg:h-[14vw] lg:w-[14vw]")}
              />
            </MotionBox>
          )}
          <MotionBox
            className={clsx(
              "col-span-full pt-10 pb-0  xl:pt-12 xl:pb-20",
              icon_media
                ? "col-start-3 xl:col-span-5 xl:col-start-auto"
                : "xl:col-span-5 xl:col-start-2"
            )}
          >
            <Headline size={"xl"} className={"max-w-[10em] pr-12"} animateOnce>
              {subhead}
            </Headline>
          </MotionBox>
          <MotionBox
            className={clsx(
              "col-span-full pb-12 xl:pt-16",
              icon_media
                ? "col-start-3 xl:col-span-3 xl:col-start-9"
                : "xl:col-span-4 xl:col-start-7"
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
