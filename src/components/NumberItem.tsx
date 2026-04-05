import Headline from "@/components/Headline";
import MotionBox from "@/components/MotionBox";
import Text from "@/components/Paragraph";
import StringText from "@/components/StringText";
import { handleEvent } from "@/utils/events";
import { isEmptyObject } from "@/utils/utils";
import { toText } from "@/utils/rich-text";
import ImageBox from "@/components/media-frame/ImageBox";
import AppLink from "@/components/AppLink";
import { RichText } from "@/components/RichText";
import clsx from "clsx";
import { motion } from "framer-motion";

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
  const numberAsString = toText(number);
  const bodyAsString = toText(body);

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
        ease: [0.19, 1, 0.22, 1] as const,
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
        ease: [0.19, 1, 0.22, 1] as const,
      },
    },
  };

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
        <motion.div variants={item}>
          <ImageBox
            media={media}
            className="h-[4.375rem] w-[4.375rem]"
            decorative
          />
        </motion.div>
      )}
      {numberAsString && (
        <motion.div variants={item}>
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
        </motion.div>
      )}
      {eyebrow && (
        <motion.div variants={item}>
          <StringText className="whitespace-pre-line" uppercase bold>
            {eyebrow}
          </StringText>
        </motion.div>
      )}
      {bodyAsString && (
        <motion.div
          variants={item}
          className={clsx(bodyLong ? "max-w-[24em]" : "max-w-[18em]")}
        >
          {!Array.isArray(body) ? (
            <Text as="span" className={clsx(bodyLong ? "max-w-[24em]" : "max-w-[18em]")}>
              {bodyAsString}
            </Text>
          ) : (
            <RichText
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
                hyperlink: ({ text, node: { data } }) => (
                  <AppLink
                    field={data as any}
                    onClick={() => {
                      handleEvent({
                        action: "click",
                        category: `rich_text_link`,
                        label: `text_url`,
                        value: `${text}: ${(data as any)?.url}`,
                      });
                    }}
                    className="hover:underline"
                  >
                    {text}
                  </AppLink>
                ),
              }}
            />
          )}
        </motion.div>
      )}
    </MotionBox>
  );
};
