"use client";

import { RichText } from "@/components/RichText";
import { toText } from "@/utils/rich-text";
import type { MenuDoc } from "content/types";
import { convertToSlug } from "@/utils/utils";
import clsx from "clsx";
import Headline from "../Headline";
import MotionBox from "../MotionBox";
import Text from "../Paragraph";
import Star from "../svg/Star";
import MenuItem from "./menu-item";

type MenuSectionProps = {
  uid?: string;
  groups?: MenuDoc["groups"];
};

export function MenuSection({ groups = [] }: MenuSectionProps) {
  return (
    <MotionBox
      className={clsx(
        "col-span-full col-start-1 flex flex-col gap-20 md:col-span-3 lg:col-span-5",
        "print:!translate-y-0 print:!opacity-100"
      )}
    >
      {groups.map((group, groupIndex) => {
        const groupSlug = convertToSlug(group.title);

        return (
          <div key={groupIndex} className="relative flex flex-col gap-20">
            {/* Group anchor */}
            <div
              id={groupSlug}
              className={clsx(
                "absolute left-0 top-[-10rem] w-full",
                "print:relative print:top-[unset] print:hidden"
              )}
            />

            {/* Group heading */}
            <a
              href={`#${groupSlug}`}
              className={clsx(
                "group sticky top-[5rem] z-50 inline-flex h-fit md:top-[6rem]",
                "after:from-transparent after:pointer-events-none after:absolute after:inset-[-1rem] after:bottom-[-2rem] after:top-[-2rem] after:z-10 after:bg-gradient-to-b after:from-bg after:via-bg after:via-20% after:to-[transparent] after:opacity-100 after:transition-opacity after:delay-500 after:duration-500 after:ease-in-out after:content-['']",
                "print:relative print:top-[unset] print:break-before-page print:after:hidden"
              )}
            >
              <Headline
                size={"xl"}
                as="h2"
                animateOnce={true}
                id={`menu-group-title-${groupSlug}`}
                layoutId={`menu-group-title-${groupSlug}`}
                className={clsx(
                  "relative z-40 !whitespace-nowrap",
                  "after:absolute after:bottom-[0em] after:left-0 after:z-20 after:h-[1.5px] after:w-[100%] after:origin-top-right after:scale-x-0 after:bg-black after:transition-transform after:duration-300 after:ease-out-expo after:content-['']",
                  "group-hover:after:origin-top-left group-hover:after:scale-x-100"
                )}
                disableMotion={true}
              >
                {group.title}
              </Headline>
            </a>

            {/* Group description */}
            {group.description && (
              <div className="-mt-16 flex flex-col gap-4">
                <Text size="large" className="mb-0">
                  {group.description}
                </Text>
              </div>
            )}

            {/* Sections within group */}
            {group.sections.map((section, sectionIndex) => {
              const sectionTitle = toText(section.primary.title);
              const sectionSlug = convertToSlug(sectionTitle);

              return (
                <MotionBox
                  key={sectionIndex}
                  className={clsx(
                    "flex flex-col gap-10",
                    "print:!translate-y-0 print:!opacity-100"
                  )}
                >
                  <div className="relative flex flex-col gap-4">
                    {sectionTitle && (
                      <a
                        href={`#${sectionSlug}`}
                        className="group inline-flex h-fit"
                      >
                        <div
                          id={sectionSlug}
                          className="absolute left-0 top-[-18rem] w-full"
                        />
                        <Headline
                          size={"sm"}
                          as="h3"
                          animateOnce={true}
                          layoutId={`menu-section-title-${sectionSlug}`}
                          className={clsx(
                            "relative",
                            "after:absolute after:bottom-[0em] after:left-0 after:z-20 after:h-[1.5px] after:w-[100%] after:origin-top-right after:scale-x-0 after:bg-black after:transition-transform after:duration-300 after:ease-out-expo after:content-['']",
                            "group-hover:after:origin-top-left group-hover:after:scale-x-100"
                          )}
                          disableMotion={true}
                        >
                          {sectionTitle}
                        </Headline>
                      </a>
                    )}
                    {section.primary.description.length > 0 && (
                      <RichText
                        field={section.primary.description}
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
                    {section.items.map((item, itemIndex) => (
                      <MenuItem key={itemIndex} data={item} />
                    ))}
                    {toText(section.primary.caption) && (
                      <div className="item-caption">
                        <RichText field={section.primary.caption} />
                      </div>
                    )}
                  </div>
                </MotionBox>
              );
            })}

            <Star
              className={clsx(
                "h-16 w-16 text-white",
                groupIndex === groups.length - 1 && "!opacity-0"
              )}
            />
          </div>
        );
      })}
    </MotionBox>
  );
}

export default MenuSection;
