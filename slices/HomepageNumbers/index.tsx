import SliceData from "@/components/dev/SliceData";
import { GridSection } from "@/components/GridSection";
import Headline from "@/components/Headline";
import MotionBox from "@/components/MotionBox";
import Text from "@/components/Paragraph";
import StringText from "@/components/StringText";
import { Content } from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { TileItem } from "slices/TileGrid/TileItem";

interface NumberItemProps {
  media?: any;
  number: any;
  eyebrow: any;
  body: any;
  action_text: any;
  action_link: any;
}

const NumberItem: React.FC<NumberItemProps> = ({
  media,
  number,
  eyebrow,
  body,
  action_text,
  action_link,
  ...rest
}) => {
  console.log({ action_text, action_link });

  const numberAsString = prismicH.asText(number);
  const bodyAsString = prismicH.asText(body);

  return (
    <MotionBox
      className="flex w-full flex-col items-center justify-center gap-6 text-center"
      {...rest}
    >
      {media && (
        <PrismicNextImage
          field={media}
          className=" h-[4.375rem] w-[4.375rem]"
        />
      )}
      {numberAsString && (
        <Headline as="h3" className={"!whitespace-normal"} animateOnce>
          {numberAsString}
        </Headline>
      )}
      {eyebrow && (
        <StringText uppercase bold>
          {eyebrow}
        </StringText>
      )}
      {bodyAsString && (
        <PrismicRichText
          field={body}
          components={{
            paragraph: ({ children }) => <Text as="span">{children}</Text>,
          }}
        />
      )}
    </MotionBox>
  );
};

/**
 * Props for `HomepageNumbers`.
 */
export type HomepageNumbersProps =
  SliceComponentProps<Content.HomepageNumbersSlice>;

const HomepageNumbers = ({ slice }: HomepageNumbersProps): JSX.Element => {
  const {
    data: { bullet_list, numberlist, primary_action_link, primary_action },
  } = slice.primary.number_list as any;

  console.log({ bullet_list });

  return (
    <>
      <GridSection
        id={slice.primary.section_id || ""}
        bottomSpacer={slice.primary.bottom_spacer || undefined}
        topSpacer={slice.primary.top_spacer || undefined}
        className={"!gap-y-28 xl:!gap-y-20"}
      >
        {slice.primary.title && (
          <Headline
            className="col-span-full text-center"
            size="lg"
            uppercase
            animateOnce
          >
            {slice.primary.title}
          </Headline>
        )}
        {numberlist && (
          <MotionBox className="col-span-full flex flex-col items-center justify-evenly gap-10 xl:col-span-10 xl:col-start-2 xl:flex-row xl:gap-20">
            {numberlist.map(
              (
                { number, eyebrow, body, action_text, action_link }: any,
                i: number
              ) => {
                return (
                  <>
                    <NumberItem
                      key={i}
                      number={number}
                      eyebrow={eyebrow}
                      body={body}
                      action_text={action_text}
                      action_link={action_link}
                    />
                    {i != numberlist.length - 1 && (
                      <div
                        key={i + 10}
                        className={
                          "h-20 w-[3px] flex-grow rounded-md bg-white xl:h-[3px] xl:w-full"
                        }
                      />
                    )}
                  </>
                );
              }
            )}
          </MotionBox>
        )}
        {bullet_list && (
          <MotionBox className="col-span-full flex flex-col items-center justify-evenly gap-10 xl:col-span-8 xl:col-start-3 xl:flex-row xl:gap-6">
            {bullet_list.map(
              (
                { media, number, eyebrow, body, action_text, action_link }: any,
                i: number
              ) => {
                return (
                  <NumberItem
                    key={i}
                    media={media}
                    number={number}
                    eyebrow={eyebrow}
                    body={body}
                    action_text={action_text}
                    action_link={action_link}
                  />
                );
              }
            )}
          </MotionBox>
        )}
        {primary_action_link && primary_action && (
          <TileItem
            link={primary_action_link}
            headline={primary_action}
            theme={"Outlined"}
            col_span={"Span 10"}
            col_start={"Start 2"}
            className={"h-[12vw]"}
          />
        )}
      </GridSection>
      <SliceData slice={slice} />
    </>
  );
};

export default HomepageNumbers;
