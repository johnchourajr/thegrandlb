"use client";

import { GridSection } from "@/components/GridSection";
import Headline from "@/components/Headline";
import { MenuSection, MenuSectionNav } from "@/components/menu";
import type { MenuDoc } from "content/types";
import clsx from "clsx";
import Button from "./Button";
import MotionBox from "./MotionBox";
import Text from "./Paragraph";

type MenuPageContentProps = {
  menu: MenuDoc;
};

export const MenuPageContent = ({ menu }: MenuPageContentProps) => {
  if (!menu) return null;

  return (
    <GridSection
      id={`${menu.uid}-grid-section`}
      layoutId={`${menu.uid}-grid-section`}
      className="grid-section"
      topSpacer={"Small"}
      bottomSpacer={"None"}
      overflowHidden={false}
    >
      <MotionBox
        className={clsx(
          "col-span-full col-start-1 flex flex-col items-center justify-between gap-6 text-center lg:col-span-10 lg:col-start-2",
          "print:!opacity-100"
        )}
      >
        {menu.page_title && (
          <Headline
            size={"3xl"}
            className={"!whitespace-nowrap"}
            uppercase
            animateOnce
          >
            {menu.page_title}
          </Headline>
        )}
        {menu.page_description && (
          <Headline size={"sm"} className={"max-w-[20em]"} emphasis animateOnce>
            {menu.page_description}
          </Headline>
        )}
        {menu.page_disclaimer && (
          <Text size={"small"} className="max-w-[35em]">
            {menu.page_disclaimer}
          </Text>
        )}
        <Button
          onClick={() => window.print()}
          size="small"
          className="print:hidden"
        >
          Print Menu
        </Button>
      </MotionBox>
      <div
        className={clsx(
          "margin-top-md padding-bottom-md col-span-full col-start-1 border-t-2 border-white lg:col-span-10 lg:col-start-2",
          "print:hidden"
        )}
      />
      <MenuSectionNav uid={menu.uid} groups={menu.groups} />
      <MenuSection uid={menu.uid} groups={menu.groups} />
    </GridSection>
  );
};
