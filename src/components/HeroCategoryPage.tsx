import clsx from "clsx";
import { LayoutGroup } from "framer-motion";
import { GridSection } from "./GridSection";
import Headline from "./Headline";
import MediaFrame from "./media-frame";
import ImageBox from "./media-frame/ImageBox";
import MotionBox from "./MotionBox";
import Text from "./Paragraph";

const HeroCategoryPage = ({
  uid,
  headline,
  gallery,
  media,
  video_media,
  subhead,
  body,
  icon_media,
  primary_action,
  primary_action_link,
}: any) => {
  const hasSubheadandBody = subhead && body;
  return (
    <LayoutGroup>
      <GridSection
        id={`hero-${uid}`}
        layoutId={`hero-${uid}`}
        bottomSpacer={"Small"}
        topSpacer={"Small"}
      >
        {headline && (
          <Headline
            size="xl"
            uppercase
            className="margin-bottom-md margin-top padding-top relative z-10 col-span-full text-center"
            animateOnce={true}
            animationType="word"
            layoutId={`hero-${uid}-headline`}
            key={`hero-${uid}-headline`}
          >
            {headline}
          </Headline>
        )}
        <MotionBox
          className={clsx(
            "relative col-span-full col-start-1 flex aspect-square max-h-[calc(100vh-8.8125rem)] w-full flex-col items-center justify-center gap-10 overflow-hidden rounded-sm bg-black px-4 text-center text-white lg:aspect-[18/9] lg:max-h-[calc(100vh-9rem-3rem)] lg:rounded-md"
          )}
        >
          <MediaFrame
            key={`hero-${uid}-media`}
            id={`hero-${uid}-media`}
            gallery={gallery}
            media={media}
            video_media={video_media}
            className="absolute inset-0 z-0 h-full w-full"
            priority={true}
          />
        </MotionBox>
      </GridSection>
      {hasSubheadandBody && (
        <GridSection
          id={"sub-hero"}
          bottomSpacer={"Medium"}
          topSpacer={"Medium"}
        >
          <MotionBox className="col-span-2 row-span-2 flex items-center justify-center pt-10 pb-0 xl:col-span-3 xl:col-start-1 xl:row-span-1 xl:pt-3 xl:pb-3">
            <ImageBox
              media={icon_media}
              className={clsx("h-48 w-48 lg:h-[14vw] lg:w-[14vw]")}
            />
          </MotionBox>
          <MotionBox className="col-span-full col-start-3 pt-10 pb-0 xl:col-span-5 xl:col-start-auto xl:pt-12 xl:pb-20">
            <Headline size={"xl"} className={"max-w-[9em] pr-12"} animateOnce>
              {subhead}
            </Headline>
          </MotionBox>
          <MotionBox className="col-span-full col-start-3 pb-12 xl:col-span-3 xl:col-start-9 xl:pt-12">
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
