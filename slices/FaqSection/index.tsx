import { GridSection } from "@/components/GridSection";
import MediaFrame from "@/components/media-frame";
import MotionBox from "@/components/MotionBox";
import StringText from "@/components/StringText";
import type { SliceComponentProps } from "@/types/slices";
import type { FaqSectionSlice } from "../slice-types";
import { toText, toHtml } from "@/utils/rich-text";
import clsx from "clsx";
import Script from "next/script";
import { FaqItem } from "./FaqItem";

const FaqSection = ({
  slice,
}: SliceComponentProps<FaqSectionSlice>): JSX.Element => {
  const {
    section_id,
    title,
    gallery,
    media,
    video_url,
    asset_position = true,
    items = [],
  } = slice;

  const getAssetPosition = (pos: boolean) => {
    switch (pos) {
      case true:
        return "lg:col-start-7";
      case false:
        return "lg:col-start-1";
      default:
        return "lg:col-start-7";
    }
  };

  function buildFaqJsonLd() {
    const faq = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.map(({ question, answer }) => ({
        "@type": "Question",
        name: toText(question),
        acceptedAnswer: {
          "@type": "Answer",
          text: toHtml(answer),
        },
      })),
    };
    return JSON.stringify(faq);
  }

  const openByDefault = items.length <= 4;

  return (
    <>
      <Script
        id={`faq-${section_id || "faq"}-jsonld`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: buildFaqJsonLd() }}
      />
      <GridSection
        id={section_id || slice.type}
        bottomSpacer={"Medium"}
        topSpacer={"Medium"}
        overflowHidden={false}
      >
        <MotionBox className="padding-top-md padding-bottom-md gap-y-md padding-left-md padding-right-md col-span-full flex flex-col items-start justify-start lg:col-span-6 lg:col-start-auto lg:row-start-1">
          {title && (
            <StringText uppercase bold>
              {title}
            </StringText>
          )}
          <MotionBox className="flex w-full flex-col items-start justify-start">
            {items.map((item, index) => (
              <FaqItem
                key={index}
                question={item.question}
                answer={item.answer}
                open={openByDefault}
              />
            ))}
          </MotionBox>
        </MotionBox>
        <MotionBox
          className={clsx(
            "relative col-span-full row-start-1 flex aspect-square overflow-hidden rounded-sm bg-white md:max-h-[calc(100vh-9rem-2rem)] md:rounded-md lg:sticky lg:top-[9.5rem] lg:col-span-6 lg:aspect-auto lg:h-[100vh]",
            getAssetPosition(asset_position)
          )}
        >
          <MediaFrame
            className="absolute inset-0 h-full w-full overflow-hidden"
            gallery={gallery}
            video_url={video_url}
            media={media}
          />
        </MotionBox>
      </GridSection>
    </>
  );
};

export default FaqSection;
