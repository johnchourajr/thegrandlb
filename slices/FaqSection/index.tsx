import SliceData from "@/components/dev/SliceData";
import { GridSection } from "@/components/GridSection";
import MediaFrame from "@/components/media-frame";
import MotionBox from "@/components/MotionBox";
import StringText from "@/components/StringText";
import { Content } from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";
import { SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import Head from "next/head";
import { FaqItem } from "./FaqItem";

/**
 * Props for `FaqSection`.
 */
export type FaqSectionProps = SliceComponentProps<
  Content.FaqSectionSlice | any
>;

const FaqSection = ({ slice }: FaqSectionProps): JSX.Element => {
  const {
    section_id,
    title,
    gallery,
    video_media,
    media,
    asset_position = true,
  } = slice.primary;
  const { items } = slice;

  const getAssetPosition = (asset_position: boolean) => {
    switch (asset_position) {
      case true:
        return "xl:col-start-7";
      case false:
        return "xl:col-start-1";
      default:
        return "xl:col-start-7";
    }
  };

  function faqJsonLd() {
    return {
      __html: `{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
        ${slice.items.map(
          ({ question, answer }: any) =>
            `{
              "@type": "Question",
              "name": "${prismicH.asText(question)}",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "${prismicH.asHTML(answer)}",
              },
            }`
        )}
        ]
      }
    `,
    };
  }

  const openByDefault = items.length <= 4 ? true : false;

  return (
    <>
      <Head>
        {
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={faqJsonLd()}
            key={`faq-${slice.id}-jsonld`}
          />
        }
      </Head>
      <GridSection
        id={section_id || slice.id}
        bottomSpacer={"Medium"}
        topSpacer={"Medium"}
        overflowHidden={false}
      >
        <MotionBox className="padding-top-md padding-bottom-md gap-y-md padding-left-md padding-right-md col-span-full flex flex-col items-start justify-start xl:col-span-6 xl:col-start-auto xl:row-start-1">
          {title && (
            <StringText uppercase bold>
              {title}
            </StringText>
          )}
          <MotionBox className="flex w-full flex-col items-start justify-start">
            {items.map((item: any, index: number) => {
              return (
                <FaqItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  open={openByDefault}
                />
              );
            })}
          </MotionBox>
        </MotionBox>
        <MotionBox
          className={clsx(
            "relative col-span-full row-start-1 flex aspect-square overflow-hidden rounded-sm bg-white lg:max-h-[calc(100vh-9rem-2rem)] lg:rounded-md xl:sticky xl:top-[9.5rem] xl:col-span-6 xl:aspect-auto xl:h-[100vh]",
            getAssetPosition(asset_position)
          )}
        >
          <MediaFrame
            className="absolute inset-0 h-full w-full overflow-hidden"
            gallery={gallery}
            video_media={video_media}
            media={media}
          />
        </MotionBox>
      </GridSection>
      <SliceData slice={slice} hidden />
    </>
  );
};

export default FaqSection;
