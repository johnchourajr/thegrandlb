"use client";

import { GridSection } from "@/components/GridSection";
import Headline from "@/components/Headline";
import { MenuSection, MenuSectionNav } from "@/components/menu";
import type { MenuPageContentProps } from "@/types/menu";
import { isMenuCollectionDocument } from "@/types/menu";
import clsx from "clsx";
import Button from "./Button";
import MotionBox from "./MotionBox";
import Text from "./Paragraph";

export const MenuPageContent = ({ page }: MenuPageContentProps) => {
  if (!page) return null;

  // Use type guard to determine data structure
  const isExternalData = isMenuCollectionDocument(page);

  // Handle different data structures from internal vs external Prismic repos
  let pageTitle: string;
  let pageDescription: string | undefined;
  let pageDisclaimer: string | undefined;

  if (isExternalData) {
    // External data has string fields
    pageTitle = page.data.page_title;
    pageDescription = page.data.page_description;
    pageDisclaimer = page.data.page_disclaimer;
  } else {
    // Internal data might have RichTextField or string fields
    pageTitle = page.data.title || page.data.page_title || "";
    pageDescription =
      typeof page.data.page_description === "string"
        ? page.data.page_description
        : undefined;
    pageDisclaimer =
      typeof page.data.page_disclaimer === "string"
        ? page.data.page_disclaimer
        : undefined;
  }

  return (
    <GridSection
      id={`${page.uid}-grid-section`}
      layoutId={`${page.uid}-grid-section`}
      className="grid-section"
      topSpacer={"Small"}
      bottomSpacer={"None"}
      overflowHidden={false}
    >
      <MotionBox
        className={clsx(
          "col-span-full col-start-1 flex flex-col items-center justify-between gap-6 text-center lg:col-span-10 lg:col-start-2",
          /**
           * PRINT STYLES
           */
          "print:!opacity-100"
        )}
      >
        {pageTitle && (
          <Headline
            size={"3xl"}
            className={"!whitespace-nowrap"}
            uppercase
            animateOnce
          >
            {pageTitle}
          </Headline>
        )}
        {pageDescription && (
          <Headline size={"sm"} className={"max-w-[20em]"} emphasis animateOnce>
            {pageDescription}
          </Headline>
        )}
        {pageDisclaimer && (
          <Text size={"small"} className="max-w-[35em]">
            {pageDisclaimer}
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
          /**
           * PRINT STYLES
           */
          "print:hidden"
        )}
      />
      <MenuSectionNav uid={page.uid} group={page.data.group} />
      <MenuSection uid={page.uid} group={page.data.group} />
    </GridSection>
  );
};
