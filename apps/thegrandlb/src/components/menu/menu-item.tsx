import { PrismicRichText } from "@prismicio/react";
import clsx from "clsx";
import MotionBox from "../MotionBox";
import Text from "../Paragraph";
import StringText from "../StringText";

interface MenuItemProps {
  data: {
    title: any;
    description: any;
    price_per: string;
    price_min: number;
    price_max: number;
  };
}

const MenuItem: React.FC<MenuItemProps> = ({ data }) => {
  // console.log({ data });

  if (!data.price_min && !data.price_per) return null;

  const min = data.price_min;
  const max = data.price_max;

  return (
    <MotionBox
      className={clsx(
        "flex flex-row justify-between",
        /**
         * PRINT STYLES
         */
        "print:!translate-y-0 print:!opacity-100"
      )}
    >
      <div className="relative flex max-w-[60%] flex-col gap-4">
        {data.title && (
          <PrismicRichText
            field={data.title}
            components={{
              heading4: ({ children }) => (
                <StringText as="h4" size="large" uppercase bold>
                  {children}
                </StringText>
              ),
            }}
          />
        )}
        {data.description && (
          <PrismicRichText
            field={data.description}
            components={{
              paragraph: ({ children, key }) => (
                <Text key={key} className="mb-0">
                  {children}
                </Text>
              ),
              heading4: ({ children, key }) => (
                <StringText key={key} size={"large"} bold uppercase>
                  {children}
                </StringText>
              ),
              strong: ({ children, key }) => (
                <strong key={key}>{children}</strong>
              ),
              em: ({ children, key }) => (
                <span key={key} className={"pr-[.2em] italic"}>
                  {children}
                </span>
              ),
              listItem: ({ children, key }) => (
                <li key={key} className="my-2">
                  <Text as="span">{children}</Text>
                </li>
              ),
              oListItem: ({ children, key }) => (
                <li key={key} className="my-2">
                  <Text as="span">{children}</Text>
                </li>
              ),
              list: ({ children, key }) => (
                <ul key={key} className=" list-outside list-disc pl-4">
                  {children}
                </ul>
              ),
              oList: ({ children, key }) => (
                <ol key={key} className=" list-outside list-decimal pl-4">
                  {children}
                </ol>
              ),
            }}
          />
        )}
      </div>

      {min && (
        <div className="flex flex-col items-end gap-0 text-right">
          {min && (
            <StringText
              size="large"
              className="inline-flex gap-1"
              uppercase
              bold
            >
              {min && <span className="mb-0">${min}</span>}
              {min && max && <span className="mb-0"> / </span>}
              {max && <span className="mb-0">${max}</span>}
            </StringText>
          )}
          <p className="">
            {min && (
              <>
                —<br />
              </>
            )}
            {data.price_per}
          </p>
        </div>
      )}
    </MotionBox>
  );
};

export default MenuItem;
