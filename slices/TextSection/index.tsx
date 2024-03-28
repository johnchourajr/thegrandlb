import Button from "@/components/Button";
import SliceData from "@/components/dev/SliceData";
import { GridSection } from "@/components/GridSection";
import Headline from "@/components/Headline";
import MotionBox from "@/components/MotionBox";
import StringText from "@/components/StringText";
import { stringToUnderscore } from "@/utils/utils";
import { Content } from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";
import { SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";

/**
 * Props for `TextSection`.
 */
export type TextSectionProps = SliceComponentProps<
  Content.TextSectionSlice | any
>;

const TextSection = ({
  slice,
  context,
}: TextSectionProps | any): JSX.Element => {
  const {
    section_id,
    top_border,
    top_spacer,
    bottom_border,
    bottom_spacer,
    eyebrow,
    body,
    primary_action,
    primary_action_link,
    secondary_action,
    secondary_action_link,
  } = slice.primary;

  const { uid } = context;

  // console.log({ context });

  return (
    <>
      <GridSection
        id={section_id || slice.id}
        bottomSpacer={bottom_spacer || null}
        topSpacer={top_spacer || null}
        className={clsx("!gap-y-10 lg:!gap-y-24")}
      >
        <div
          className={clsx(
            "col-span-full border-t-2 border-[transparent] lg:col-span-10 lg:col-start-2",
            top_border && "!border-white"
          )}
        />
        <MotionBox className="col-span-full flex flex-col items-center justify-center gap-10 text-center lg:col-span-10 lg:col-start-2">
          {eyebrow && (
            <StringText size="large" uppercase bold>
              {eyebrow}
            </StringText>
          )}
          {prismicH.asText(body) && (
            <Headline size="lg" staggerDuration={0.02} animateOnce>
              {prismicH.asText(body)}
            </Headline>
          )}
          <MotionBox className="gap-6 sm:flex">
            {prismicH.documentToLinkField(primary_action_link) &&
              primary_action && (
                <Button
                  field={primary_action_link}
                  text={primary_action}
                  eventCategory={stringToUnderscore(
                    `${uid} text Section Action`
                  )}
                  eventLabel={stringToUnderscore(`${section_id} Primary CTA`)}
                  type="black"
                  size="large"
                  params={uid && `ref=${uid}`}
                />
              )}
            {prismicH.asLink(secondary_action_link) && (
              <Button
                field={secondary_action_link}
                text={secondary_action}
                type="outline"
                size="large"
              />
            )}
          </MotionBox>
        </MotionBox>
        <div
          className={clsx(
            "col-span-full border-b-2 border-[transparent] lg:col-span-10 lg:col-start-2",
            bottom_border && "!border-white"
          )}
        />
      </GridSection>
      <SliceData slice={slice} hidden />
    </>
  );
};

export default TextSection;
