import Headline from "@/components/Headline";
import MotionBox from "@/components/MotionBox";
import Text from "@/components/Paragraph";
import StringText from "@/components/StringText";
import * as prismicH from "@prismicio/helpers";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

interface NumberItemProps {
  media?: any;
  number: any;
  eyebrow: any;
  body: any;
  action_text: any;
  action_link: any;
}
export const NumberItem: React.FC<NumberItemProps> = ({
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
