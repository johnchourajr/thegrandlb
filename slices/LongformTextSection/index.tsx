import { GridSection } from "@/components/GridSection";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import { LongformRichText } from "./LongformRichText";

/**
 * Props for `LongformTextSection`.
 */
export type LongformTextSectionProps = SliceComponentProps<
  Content.LongformTextSectionSlice | any
>;

/**
 * Component for "LongformTextSection" Slices.
 */
const LongformTextSection = ({
  slice,
}: LongformTextSectionProps): JSX.Element => {
  const {
    section_id,
    text,
    top_border = true,
    top_spacer,
    bottom_border = true,
    bottom_spacer,
  } = slice.primary;

  return (
    <>
      <GridSection
        id={section_id || slice.id}
        bottomSpacer={bottom_spacer || null}
        topSpacer={top_spacer || null}
        className={clsx("!gap-y-10 lg:!gap-y-24")}
      >
        <div
          className={clsx(
            "col-span-full border-t-2 border-[transparent] lg:col-span-6 lg:col-start-4",
            top_border && "!border-white"
          )}
        />
        <div className={clsx("col-span-full lg:col-span-6 lg:col-start-4")}>
          <LongformRichText field={text} />
        </div>
        <div
          className={clsx(
            "col-span-full border-b-2 border-[transparent] lg:col-span-6 lg:col-start-4",
            bottom_border && "!border-white"
          )}
        />
      </GridSection>
    </>
  );
};

export default LongformTextSection;
