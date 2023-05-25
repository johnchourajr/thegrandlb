import { GridSection } from "@/components/GridSection";
import Headline from "@/components/Headline";
import { MenuSection } from "@/components/menu";
import MenuSectionNav from "@/components/menu/menu-section-nav";
import MotionBox from "./MotionBox";
import Text from "./Paragraph";

export const MenuPageContent = ({ page, source }: any) => {
  const { title } = page.data;
  const { path, page_title, page_description, page_disclaimer } = source.data;

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
        className={
          "col-span-full col-start-1 flex flex-col items-center justify-between gap-6 text-center xl:col-span-10 xl:col-start-2"
        }
      >
        {title && (
          <Headline
            size={"3xl"}
            className={"!whitespace-nowrap"}
            uppercase
            animateOnce
          >
            {title}
          </Headline>
        )}
        {page_description && (
          <Headline size={"sm"} className={"max-w-[20em]"} emphasis animateOnce>
            {page_description}
          </Headline>
        )}
        {page_disclaimer && <Text size={"small"}>{page_disclaimer}</Text>}
      </MotionBox>
      <div
        className={
          "margin-top-md padding-bottom-md col-span-full col-start-1 border-t-2 border-white xl:col-span-10 xl:col-start-2"
        }
      />
      <MenuSectionNav uid={page.uid} group={source.data.group} />
      <MenuSection uid={page.uid} group={source.data.group} />
    </GridSection>
  );
};
