import Headline from "@/components/Headline";
import MotionBox from "@/components/MotionBox";
import Text from "@/components/Paragraph";
import StringText from "@/components/StringText";
import { handleEvent } from "@/utils/events";
import { isEmptyObject } from "@/utils/utils";
import * as prismicH from "@prismicio/helpers";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicLink, PrismicRichText } from "@prismicio/react";
import clsx from "clsx";
import { m } from "framer-motion";

interface NumberItemProps {
  media?: any;
  headline_size?: "3xl" | "2xl" | "xl" | "lg" | "md";
  number: any;
  eyebrow: any;
  body: any;
  action_text: any;
  action_link: any;
  className?: string;
  delay?: number;
}
export const NumberItem: React.FC<NumberItemProps> = ({
  media,
  headline_size = "3xl",
  number,
  eyebrow,
  body,
  action_text,
  action_link,
  className,
  delay = 0,
  ...rest
}) => {
  // console.log({ action_text, action_link });

  const numberAsString = prismicH.asText(number);
  const bodyAsString = prismicH.asText(body) || "";

  const bodyLong = bodyAsString?.length > 100;
  const hasMedia = isEmptyObject(media) ? false : true;

  const isMoreThanOneWord =
    numberAsString && numberAsString.split(" ").length > 1;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren: 0.2,
        duration: 2,
        ease: [0.19, 1, 0.22, 1],
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 32 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.19, 1, 0.22, 1],
      },
    },
  };

  // console.log({ media });

  return (
    <MotionBox
      className={clsx(
        "flex w-full flex-col items-center justify-center gap-6 text-center",
        className
      )}
      variants={container}
      {...rest}
    >
      {hasMedia && (
        <m.div variants={item}>
          <PrismicNextImage
            field={media}
            className=" h-[4.375rem] w-[4.375rem]"
            fallbackAlt={""}
          />
        </m.div>
      )}
      {numberAsString && (
        <m.div variants={item}>
          <Headline
            as="h3"
            size={headline_size}
            className={clsx(
              "mb-4 flex-nowrap whitespace-nowrap",
              isMoreThanOneWord && "max-w-[8em] !whitespace-normal"
            )}
            animationType={isMoreThanOneWord ? "word" : "letter"}
            animateOnce
          >
            {numberAsString}
          </Headline>
        </m.div>
      )}
      {eyebrow && (
        <m.div variants={item}>
          <StringText className="whitespace-pre-line" uppercase bold>
            {eyebrow}
          </StringText>
        </m.div>
      )}
      {bodyAsString && (
        <m.div
          variants={item}
          className={clsx(bodyLong ? "max-w-[24em]" : "max-w-[18em]")}
        >
          <PrismicRichText
            field={body}
            components={{
              paragraph: ({ children }) => (
                <Text
                  as="span"
                  className={clsx(bodyLong ? "max-w-[24em]" : "max-w-[18em]")}
                >
                  {children}
                </Text>
              ),
              hyperlink: ({ text, node: { data } }) => {
                return (
                  <PrismicLink
                    field={data}
                    onClick={() => {
                      handleEvent({
                        action: "click",
                        category: `rich_text_link`,
                        label: `text_url`,
                        value: `${text}: ${data?.url}`,
                      });
                    }}
                    className="hover:underline"
                  >
                    {text}
                  </PrismicLink>
                );
              },
            }}
          />
        </m.div>
      )}
    </MotionBox>
  );
};
