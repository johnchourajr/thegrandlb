import { isEmptyObject, stringToUnderscore } from "@/utils/utils";
import clsx from "clsx";
import { LayoutGroup, m } from "framer-motion";
import Button from "./Button";
import { GridSection } from "./GridSection";
import Headline from "./Headline";
import MediaFrame from "./media-frame";
import MotionBox from "./MotionBox";
import Text from "./Paragraph";
import StringText from "./StringText";

const HeroDetailPage = ({
  uid,
  title,
  headline,
  caption,
  media,
  video_media,
  subhead,
  body,
  primary_action,
  primary_action_link,
  bottomSpacer = "Small",
}: any) => {
  const hasSubheadandBody = subhead && body;
  const noMedia = isEmptyObject(media) && isEmptyObject(video_media?.src);

  return (
    <LayoutGroup>
      <GridSection
        id={`hero-${uid}`}
        layoutId={`hero-${uid}`}
        bottomSpacer={bottomSpacer}
        topSpacer={"Small"}
      >
        <div
          className={clsx(
            "padding-top-md padding-bottom-md relative col-span-full col-start-1 flex w-full flex-col items-center justify-center gap-4 overflow-hidden px-4 text-center",
            !noMedia &&
              "aspect-square max-h-[calc(100vh-8.8125rem)] gap-10 rounded-sm bg-black text-white md:aspect-[4/3] md:max-h-[calc(100vh-9rem-3rem)] md:rounded-md"
          )}
        >
          {title && (
            <StringText size={"default"} uppercase bold>
              {title}
            </StringText>
          )}
          {headline && (
            <Headline
              size="3xl"
              uppercase
              className="relative z-10 max-w-[10em]"
              animateOnce={true}
              animationType="word"
              layoutId={`hero-${uid}-headline`}
              key={`hero-${uid}-headline`}
            >
              {headline}
            </Headline>
          )}
          {caption && (
            <Headline size="lg" animateOnce={true} delay={0.5} emphasis>
              {caption}
            </Headline>
          )}
          <MediaFrame
            key={`hero-${uid}-media`}
            id={`hero-${uid}-media`}
            media={media}
            video_media={video_media}
            className="absolute inset-0 z-0 h-full w-full"
            priority={true}
            imgixParams={{
              q: 20,
              fm: "webp",
            }}
          />
          {primary_action && (
            <m.div
              className="gap-6 pt-6 sm:flex"
              initial={{
                opacity: 0,
                y: "2rem",
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 2,
                ease: [0.19, 1, 0.22, 1],
                delay: 0.7,
              }}
            >
              <Button
                field={primary_action_link}
                text={primary_action}
                type="black"
                size="large"
                params={uid && `desired_space=${uid}`}
                eventCategory={stringToUnderscore(
                  `${uid} Hero Detail Page Action`
                )}
                eventLabel={stringToUnderscore(`${headline} Primary CTA`)}
              />
            </m.div>
          )}
        </div>
      </GridSection>
      {hasSubheadandBody && (
        <GridSection
          id={"sub-hero"}
          bottomSpacer={"Medium"}
          topSpacer={"Medium"}
        >
          <MotionBox className="col-span-full pt-10 pb-0 lg:col-span-6 lg:col-start-2 lg:pt-12 lg:pb-20">
            <Headline size={"xl"} className={"max-w-[9em]"} animateOnce>
              {subhead}
            </Headline>
          </MotionBox>
          <MotionBox
            className="col-span-full pb-12 lg:col-span-4 lg:col-start-auto lg:pt-12"
            transition={{ delay: 1 }}
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

export default HeroDetailPage;
