import Button from "@/components/Button";
import SliceData from "@/components/dev/SliceData";
import { GridSection } from "@/components/GridSection";
import Headline from "@/components/Headline";
import MotionBox from "@/components/MotionBox";
import StringText from "@/components/StringText";
import { Content } from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";
import { SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";

/**
 * Props for `TextSection`.
 */
export type TextSectionProps = SliceComponentProps<Content.TextSectionSlice>;

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

  console.log({ context });

  return (
    <>
      <GridSection
        id={section_id || slice.id}
        bottomSpacer={bottom_spacer || null}
        topSpacer={top_spacer || null}
        className={clsx("!gap-y-10 xl:!gap-y-24")}
      >
        <div
          className={clsx(
            "col-span-full border-t-2 border-[transparent] xl:col-span-10 xl:col-start-2",
            top_border && "!border-white"
          )}
        />
        <MotionBox className="col-span-full flex flex-col items-center justify-center gap-10 text-center xl:col-span-10 xl:col-start-2">
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
          <MotionBox className="gap-6 md:flex">
            {prismicH.documentToLinkField(primary_action_link) && (
              <Button
                field={primary_action_link}
                text={primary_action}
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
            "col-span-full border-b-2 border-[transparent] xl:col-span-10 xl:col-start-2",
            bottom_border && "!border-white"
          )}
        />
      </GridSection>
      <SliceData slice={slice} hidden />
    </>
  );
};

export default TextSection;
