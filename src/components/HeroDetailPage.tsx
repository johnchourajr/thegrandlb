import clsx from "clsx";
import { m } from "framer-motion";
import Button from "./Button";
import { GridSection } from "./GridSection";
import Headline from "./Headline";
import MediaFrame from "./media-frame";
import MotionBox from "./MotionBox";
import Text from "./Paragraph";

const HeroDetailPage = ({
  uid,
  headline,
  media,
  video_media,
  subhead,
  body,
  primary_action,
  primary_action_link,
}: any) => {
  const hasSubheadandBody = subhead && body;
  return (
    <>
      <GridSection id={"hero"} bottomSpacer={"Small"} topSpacer={"Small"}>
        <div
          className={clsx(
            "relative col-span-full col-start-1 flex aspect-square max-h-[calc(100vh-8.8125rem)] w-full flex-col items-center justify-center gap-10 overflow-hidden rounded-sm bg-black px-4 text-center text-white lg:aspect-[4/3] lg:max-h-[calc(100vh-9rem-3rem)] lg:rounded-md"
          )}
        >
          {headline && (
            <Headline
              size="3xl"
              uppercase
              className="relative z-10 max-w-[10em]"
              animateOnce={true}
              animationType="word"
            >
              {headline}
            </Headline>
          )}
          <MediaFrame
            media={media}
            video_media={video_media}
            className="absolute inset-0 z-0 h-full w-full"
            priority={true}
          />
          <m.div
            className="gap-6 md:flex"
            initial={{
              opacity: 0,
              y: "3rem",
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 2,
              ease: [0.19, 1, 0.22, 1],
              delay: 0.5,
            }}
          >
            {primary_action && (
              <Button
                field={primary_action_link}
                text={primary_action}
                type="black"
                size="large"
                params={uid && `ref=${uid}`}
              />
            )}
            {false && (
              <Button
                // field={slice.primary.secondary_action_link}
                // text={slice.primary.secondary_action}
                type="outline"
                size="large"
              />
            )}
          </m.div>
        </div>
      </GridSection>
      {hasSubheadandBody && (
        <GridSection id={"sub-hero"} bottomSpacer={"Small"} topSpacer={"Small"}>
          <MotionBox className="col-span-full pt-10 pb-0 xl:col-span-6 xl:col-start-2 xl:pt-12 xl:pb-20">
            <Headline size={"xl"} className={"max-w-[9em]"} animateOnce>
              {subhead}
            </Headline>
          </MotionBox>
          <MotionBox className="col-span-full pb-12 xl:col-span-4 xl:col-start-auto xl:mt-4 xl:pt-12">
            <Text paragraph size="large" className="max-w-[30em]">
              {body}
            </Text>
          </MotionBox>
        </GridSection>
      )}
    </>
  );
};

export default HeroDetailPage;
