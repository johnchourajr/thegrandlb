import Button from "@/components/Button";
import { GridSection } from "@/components/GridSection";
import Headline from "@/components/Headline";
import MediaFrame from "@/components/media-frame";
import { stringToUnderscore } from "@/utils/utils";
import type { SliceComponentProps } from "@/types/slices";
import type { PageHeroSlice } from "../slice-types";
import clsx from "clsx";
import { LayoutGroup, motion } from "framer-motion";

const PageHero = ({ slice }: SliceComponentProps<PageHeroSlice>): JSX.Element => {
  const {
    section_id,
    headline,
    bottom_spacer,
    media,
    video_url,
    primary_action,
    primary_action_link,
    secondary_action,
    secondary_action_link,
  } = slice;
  return (
    <LayoutGroup>
      <GridSection
        id={section_id}
        bottomSpacer={bottom_spacer}
        topSpacer={"Small"}
        className="!pt-0 md:!pt-4"
      >
        <div
          className={clsx(
            "relative col-span-full col-start-1 flex aspect-square max-h-[calc(100vh-8.8125rem)] w-full flex-col items-center justify-center gap-10 overflow-hidden rounded-sm bg-black px-4 text-center text-white md:aspect-[4/3] md:max-h-[calc(100vh-9rem-2.5rem)] md:rounded-md"
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
            video_url={video_url}
            className="absolute inset-0 z-0 h-full w-full"
            priority={true}
            parallaxAmount={0}
          />
          <motion.div
            className="!hidden gap-6 sm:!flex"
            initial={{ opacity: 0, y: "3rem" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, ease: [0.19, 1, 0.22, 1], delay: 0.5 }}
          >
            {primary_action && (
              <Button
                field={primary_action_link}
                text={primary_action}
                eventCategory={stringToUnderscore(`Hero Action`)}
                eventLabel={stringToUnderscore(`${headline} Primary CTA`)}
                type="black"
                size="large"
              />
            )}
            {secondary_action && (
              <Button
                field={secondary_action_link}
                text={secondary_action}
                eventCategory={stringToUnderscore(`Hero Action`)}
                eventLabel={stringToUnderscore(`${headline} Secondary CTA`)}
                type="outline"
                size="large"
              />
            )}
          </motion.div>
        </div>
      </GridSection>
      <div className="flex w-full flex-col justify-between gap-2 px-4 py-2 sm:hidden">
        {primary_action && (
          <Button
            field={primary_action_link}
            text={primary_action}
            eventCategory={stringToUnderscore(`Hero Action`)}
            eventLabel={stringToUnderscore(`${headline} Primary Mobile CTA`)}
            type="black"
            size="large"
          />
        )}
        {secondary_action && (
          <Button
            field={secondary_action_link}
            text={secondary_action}
            eventCategory={stringToUnderscore(`Hero Action`)}
            eventLabel={stringToUnderscore(`${headline} Secondary Mobile CTA`)}
            type="outline-black"
            size="large"
          />
        )}
      </div>
    </LayoutGroup>
  );
};

export default PageHero;
