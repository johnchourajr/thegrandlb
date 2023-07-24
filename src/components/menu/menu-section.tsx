import { convertToSlug } from "@/utils/utils";
import * as prismicH from "@prismicio/helpers";
import { PrismicRichText } from "@prismicio/react";
import clsx from "clsx";
import React from "react";
import Headline from "../Headline";
import MotionBox from "../MotionBox";
import Text from "../Paragraph";
import Star from "../svg/Star";
import MenuItem from "./menu-item";

interface MenuSectionProps {
  uid?: string;
  group: {
    menu_link: {
      data: {
        page_title?: string;
        page_description: any;
        page_disclaimer: any;
        body: {
          items?: any[];
          primary: {
            title: {
              text: string;
            };
            description: any;
            caption: any;
          };
        }[];
      };
    };
  }[];
}

const MenuSection: React.FC<MenuSectionProps> = ({ uid, group }) => {
  return (
    <MotionBox
      className={clsx(
        "col-span-full col-start-1 flex flex-col gap-20 lg:col-span-3 xl:col-span-5",
        /**
         * PRINT STYLES
         */
        "print:!translate-y-0 print:!opacity-100"
      )}
    >
      {group.map(({ menu_link }, groupIndex) => {
        const section = menu_link.data as any;
        return (
          <div key={groupIndex} className="relative flex flex-col gap-20">
            <div
              id={convertToSlug(section.page_title)}
              className={clsx(
                "absolute top-[-10rem] left-0 w-full",
                /**
                 * PRINT STYLES
                 */
                "print:relative print:top-[unset]"
              )}
            />
            <a
              href={`#${convertToSlug(section.page_title)}`}
              className={clsx(
                "group sticky top-[5rem] z-50 inline-flex h-fit lg:top-[10rem]",
                "after:from-transparent after:via-20% after:pointer-events-none after:absolute after:inset-[-1rem] after:top-[-2rem] after:bottom-[-2rem] after:z-10 after:bg-gradient-to-b after:from-bg after:via-bg after:to-[transparent] after:opacity-100 after:transition-opacity after:delay-500 after:duration-500 after:ease-in-out after:content-['']",
                /**
                 * PRINT STYLES
                 */
                "print:relative print:top-[unset] print:break-before-page print:after:hidden"
              )}
            >
              <Headline
                size={"xl"}
                as="h2"
                animateOnce={true}
                id={`menu-section-title-${convertToSlug(section.page_title)}`}
                layoutId={`menu-section-title-${convertToSlug(
                  section.page_title
                )}`}
                className={clsx(
                  "relative z-40 !whitespace-nowrap",
                  "after:absolute after:bottom-[0em] after:left-0 after:z-20 after:h-[1.5px] after:w-[100%] after:origin-top-right after:scale-x-0 after:bg-black after:transition-transform after:duration-300 after:ease-out-expo after:content-['']",
                  "group-hover:after:origin-top-left group-hover:after:scale-x-100"
                )}
                disableMotion={true}
              >
                {section.page_title}
              </Headline>
            </a>
            <div className="-mt-16 flex flex-col gap-8 ">
              {section.page_description && (
                <PrismicRichText
                  field={section.page_description}
                  components={{
                    paragraph: ({ children, key }) => (
                      <Text key={key} size="large" className="mb-0">
                        {children}
                      </Text>
                    ),
                  }}
                />
              )}
              {section.page_disclaimer && (
                <PrismicRichText
                  field={section.page_disclaimer}
                  components={{
                    paragraph: ({ children, key }) => (
                      <Text key={key} size="large" className="mb-0">
                        {children}
                      </Text>
                    ),
                  }}
                />
              )}
            </div>
            {section.body.map(({ items, primary }: any, groupIndex: number) => {
              const prim_title = prismicH.asText(primary.title);
              const prim_desc = primary.description;

              return (
                <MotionBox
                  key={groupIndex}
                  className={clsx(
                    "flex flex-col gap-10",
                    /**
                     * PRINT STYLES
                     */
                    "print:!translate-y-0 print:!opacity-100"
                  )}
                >
                  <div className="relative flex flex-col gap-4">
                    {prim_title && (
                      <a
                        href={`#${convertToSlug(prim_title)}`}
                        className="group inline-flex h-fit"
                      >
                        <div
                          id={convertToSlug(prim_title)}
                          className="absolute top-[-18rem] left-0 w-full"
                        />
                        <Headline
                          size={"sm"}
                          as="h3"
                          animateOnce={true}
                          layoutId={`menu-lower-title-${convertToSlug(
                            prim_title
                          )}`}
                          className={clsx(
                            "relative",
                            "after:absolute after:bottom-[0em] after:left-0 after:z-20 after:h-[1.5px] after:w-[100%] after:origin-top-right after:scale-x-0 after:bg-black after:transition-transform after:duration-300 after:ease-out-expo after:content-['']",
                            "group-hover:after:origin-top-left group-hover:after:scale-x-100"
                          )}
                          disableMotion={true}
                        >
                          {prim_title}
                        </Headline>
                      </a>
                    )}
                    {prim_desc && (
                      <PrismicRichText
                        field={prim_desc}
                        components={{
                          paragraph: ({ children, key }) => (
                            <Text key={key} size="large" className="mb-0">
                              {children}
                            </Text>
                          ),
                        }}
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-8">
                    {items &&
                      items.map((item: any, itemIndex: number) => (
                        <MenuItem key={itemIndex} data={item} />
                      ))}
                    {prismicH.asText(primary.caption) && (
                      <div className="item-caption">
                        <PrismicRichText field={primary.caption} />
                      </div>
                    )}
                  </div>
                </MotionBox>
              );
            })}
            <Star
              className={clsx(
                "h-16 w-16 text-white",
                groupIndex === group.length - 1 && "!opacity-0"
              )}
            />
          </div>
        );
      })}
    </MotionBox>
  );
};

export default MenuSection;
