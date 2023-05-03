import { BasicRichText } from "@/components/BasicRichText";
import SliceData from "@/components/dev/SliceData";
import { GridSection } from "@/components/GridSection";
import Headline from "@/components/Headline";
import MediaFrame from "@/components/media-frame";
import MotionBox from "@/components/MotionBox";
import StringText from "@/components/StringText";
import { Content } from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import { m } from "framer-motion";
import Head from "next/head";
import { useState } from "react";

export const FaqItem = ({ question, answer }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <MotionBox
      className={clsx(
        "relative flex w-full flex-col border-t-2 border-white pt-8 pb-8 text-left",
        "last-of-type:border-b-2"
      )}
    >
      <button
        className={clsx(
          "relative flex w-full items-center text-left",
          "after:bg-transparent after:absolute after:-inset-2 after:z-[-1] after:rounded-2xl after:transition-all after:duration-500 after:ease-out-expo after:content-['']"
        )}
        onClick={toggleOpen}
      >
        {prismicH.asText(question) && (
          <PrismicRichText
            field={question}
            components={{
              paragraph: ({ children }) => (
                <Headline
                  size={"sm"}
                  as="span"
                  className="max-w-[80%]"
                  animateOnce
                  disableMotion
                >
                  {children}
                </Headline>
              ),
            }}
          />
        )}
        <m.span
          variants={{
            open: { rotate: -180 },
            closed: { rotate: 0 },
          }}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          className="absolute right-0 flex h-8 w-8 items-center justify-center rounded-full "
        >
          <m.span className="absolute h-[2px] w-6 bg-black" />
          <m.span
            variants={{ closed: { rotate: 90 }, open: { rotate: 0 } }}
            animate={isOpen ? "open" : "closed"}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="absolute h-[2px] w-6 rotate-90 bg-black"
          />
        </m.span>
      </button>
      <m.div
        variants={{
          open: {
            height: "auto",
            opacity: 1,
            marginTop: "1rem",
          },
          closed: {
            height: 0,
            opacity: 0,
            marginTop: "0rem",
            transitionEnd: { display: "none" },
          },
        }}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        className="relative max-w-[90%] overflow-hidden will-change-transform"
      >
        {prismicH.asText(answer) && (
          <div className="mb-2 mt-4 whitespace-pre-wrap leading-[2] last:mb-0 ">
            <BasicRichText field={answer} paragraphSize="large" />
          </div>
        )}
      </m.div>
    </MotionBox>
  );
};

/**
 * Props for `FaqSection`.
 */
export type FaqSectionProps = SliceComponentProps<Content.FaqSectionSlice>;

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
          ({ question, answer }) =>
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
          <MotionBox className="flex flex-col items-start justify-start">
            {items.map((item, index: number) => {
              return (
                <FaqItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                />
              );
            })}
          </MotionBox>
        </MotionBox>
        <MediaFrame
          className={clsx(
            "top-[9.5rem] col-span-full row-start-1 aspect-square overflow-hidden rounded-sm bg-white lg:max-h-[calc(100vh-9rem-2rem)] lg:rounded-md xl:sticky xl:col-span-6 xl:aspect-auto xl:h-[100vh]",
            getAssetPosition(asset_position)
          )}
          gallery={gallery}
          video_media={video_media}
          media={media}
        />
      </GridSection>
      <SliceData slice={slice} />
    </>
  );
};

export default FaqSection;
