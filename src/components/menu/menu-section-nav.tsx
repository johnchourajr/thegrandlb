import Link from "@/components/Link";
import { convertToSlug } from "@/utils/utils";
import clsx from "clsx";
import React from "react";
import StringText from "../StringText";
import MenuArrowScroll from "./menu-arrow-scroll";

interface MenuItem {
  menu_link: {
    data: {
      page_title: string;
    };
  };
}

interface MenuSectionNavProps {
  uid?: string;
  group: MenuItem[];
}

const MenuSectionNav: React.FC<MenuSectionNavProps> = ({ uid, group }) => {
  return (
    <div
      className={clsx(
        "col-span-full lg:col-span-1 lg:col-start-1 xl:col-span-5 xl:col-start-2",
        "fixed bottom-0 left-0 h-fit lg:sticky lg:left-[unset] lg:bottom-[unset] lg:top-[12rem] lg:h-[calc(100vh-16rem)]",
        "z-50 w-full bg-bg",
        /**
         * PRINT STYLES
         */
        "print:hidden"
      )}
      data-no-print
    >
      {/* {group.length > 1 && ( */}
      <div className="flex-rows inline-flex w-full items-center gap-8 overflow-y-clip overflow-x-scroll p-6 lg:m-0 lg:flex lg:flex-col lg:items-start lg:gap-6 lg:p-0">
        <StringText
          size={"small"}
          uppercase
          className="inline-block flex-nowrap whitespace-nowrap lg:mb-6"
        >
          Menu Sections
        </StringText>
        {group.map(({ menu_link }, i) => {
          const { page_title } = menu_link.data;
          const sectionLink = page_title && convertToSlug(page_title);
          return (
            <Link
              key={i}
              className={clsx(
                "lg:whitespace-[unset] group z-40 inline-flex flex-nowrap whitespace-nowrap lg:flex-wrap"
              )}
              eventCategory={"menusLink"}
              eventLabel={"menusJumpLink"}
              eventValue={page_title}
              href={`#${sectionLink}`}
            >
              <StringText
                className={clsx(
                  "relative",
                  "after:absolute after:bottom-[-.2em] after:left-0 after:z-20 after:h-[1.5px] after:w-[100%] after:origin-top-right after:scale-x-0 after:bg-black after:transition-transform after:duration-300 after:ease-out-expo after:content-['']",
                  "group-hover:after:origin-top-left group-hover:after:scale-x-100"
                )}
                uppercase
                bold
              >
                {page_title}
              </StringText>
            </Link>
          );
        })}
      </div>
      {/* )} */}
      <MenuArrowScroll />
    </div>
  );
};

export default MenuSectionNav;
