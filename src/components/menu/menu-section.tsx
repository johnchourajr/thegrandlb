"use client";

import type { MenuSectionProps } from "@/types/menu";
import { ensureArray, safeMap } from "@/utils/safe-array";
import { convertToSlug } from "@/utils/utils";
import * as prismicH from "@prismicio/helpers";
import { PrismicRichText } from "@prismicio/react";
import clsx from "clsx";
import Headline from "../Headline";
import MotionBox from "../MotionBox";
import Text from "../Paragraph";
import Star from "../svg/Star";
import MenuItem from "./menu-item";

export function MenuSection({ uid, group }: MenuSectionProps) {
  // Ensure group is always an array to prevent map errors
  const safeGroup = ensureArray(group);

  return (
    <MotionBox
      className={clsx(
        "col-span-full col-start-1 flex flex-col gap-20 md:col-span-3 lg:col-span-5",
        /**
         * PRINT STYLES
         */
        "print:!translate-y-0 print:!opacity-100"
      )}
    >
      {safeMap(safeGroup, ({ menu_link }, groupIndex) => {
        const section = menu_link.data;
        return (
          <div key={groupIndex} className="relative flex flex-col gap-20">
            <div
              id={convertToSlug(section.page_title)}
              className={clsx(
                "absolute left-0 top-[-10rem] w-full",
                /**
                 * PRINT STYLES
                 */
                "print:relative print:top-[unset] print:hidden"
              )}
            />
            <a
              href={`#${convertToSlug(section.page_title)}`}
              className={clsx(
                "group sticky top-[5rem] z-50 inline-flex h-fit md:top-[6rem]",
                "after:from-transparent after:pointer-events-none after:absolute after:inset-[-1rem] after:bottom-[-2rem] after:top-[-2rem] after:z-10 after:bg-gradient-to-b after:from-bg after:via-bg after:via-20% after:to-[transparent] after:opacity-100 after:transition-opacity after:delay-500 after:duration-500 after:ease-in-out after:content-['']",
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
            {safeMap(section.body, ({ items, primary }, groupIndex: number) => {
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
                          className="absolute left-0 top-[-18rem] w-full"
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
                      safeMap(items, (item, itemIndex: number) => (
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
                groupIndex === (group?.length ?? 0) - 1 && "!opacity-0"
              )}
            />
          </div>
        );
      })}
    </MotionBox>
  );
}

export default MenuSection;
