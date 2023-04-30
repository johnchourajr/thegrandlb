import Button from "@/components/Button";
import { GridSection } from "@/components/GridSection";
import Headline from "@/components/Headline";
import MediaFrame from "@/components/media-frame";
import clsx from "clsx";
import { m } from "framer-motion";

/**
 * @typedef {import("@prismicio/client").Content.PageHeroSlice} PageHeroSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<PageHeroSlice>} PageHeroProps
 * @param { PageHeroProps }
 */
const PageHero = ({ slice }) => {
  console.log({
    field: slice.primary.primary_action_link,
    text: slice.primary.primary_action,
  });
  return (
    <>
      <GridSection
        id={slice.primary.section_id}
        bottomSpacer={slice.primary.bottom_spacer}
      >
        <div
          className={clsx(
            "relative col-span-full col-start-1 flex aspect-square max-h-[calc(100vh-8.8125rem)] w-full flex-col items-center justify-center gap-10 overflow-hidden rounded-sm bg-black px-4 text-center text-white lg:aspect-[4/3] lg:max-h-[calc(100vh-9.8125rem)] lg:rounded-md"
          )}
        >
          <Headline
            size="3xl"
            uppercase
            className="relative z-10 max-w-[10em]"
            animateOnce={true}
            animationType="word"
          >
            {slice.primary.headline[0].text}
          </Headline>
          <MediaFrame
            media={slice.primary.media}
            video_media={slice.primary.video_media}
            className="absolute inset-0 z-0 h-full w-full"
            priority={true}
          />
          <m.div
            className="!hidden gap-6 md:flex"
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
            {slice.primary.primary_action && (
              <Button
                field={slice.primary.primary_action_link}
                text={slice.primary.primary_action}
                type="black"
                size="large"
              />
            )}
            {slice.primary.secondary_action && (
              <Button
                field={slice.primary.secondary_action_link}
                text={slice.primary.secondary_action}
                type="outline"
                size="large"
              />
            )}
          </m.div>
        </div>
      </GridSection>
      <div className="flex w-full flex-col justify-between gap-2 px-4 py-2 md:hidden">
        {slice.primary.primary_action && (
          <Button
            link={slice.primary.primary_action_link}
            text={slice.primary.primary_action}
            type="black"
            size="large"
          />
        )}
        {slice.primary.secondary_action && (
          <Button
            link={slice.primary.secondary_action_link}
            text={slice.primary.secondary_action}
            type="outline-black"
            size="large"
          />
        )}
      </div>
      {/* <SliceData slice={slice} /> */}
    </>
  );
};

export default PageHero;
