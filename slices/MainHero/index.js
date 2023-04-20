import SliceData from "@/components/dev/SliceData";
import { GridSection } from "@/components/GridSection";
import Headline from "@/components/Headline";
import { PrismicImage, PrismicRichText } from "@prismicio/react";
import clsx from "clsx";

/**
 * @typedef {import("@prismicio/client").Content.PageHeroSlice} PageHeroSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<PageHeroSlice>} PageHeroProps
 * @param { PageHeroProps }
 */
const PageHero = ({ slice }) => (
  <>
    <GridSection className="mt-4">
      <div
        className={clsx(
          "relative col-span-full col-start-1 flex aspect-square max-h-[80vmin] w-full items-center justify-center overflow-hidden rounded-md bg-black px-4 text-center text-white lg:aspect-[16/7]"
        )}
      >
        <PrismicRichText
          field={slice.primary.headline}
          components={{
            heading1: ({ children }) => (
              <Headline size="3xl" uppercase className="relative z-10">
                {children}
              </Headline>
            ),
          }}
        />
        <PrismicImage
          field={slice.primary.media}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </GridSection>
    <SliceData slice={slice} />
  </>
);

export default PageHero;
