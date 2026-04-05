import { GridSection } from "@/components/GridSection";
import type { SliceComponentProps } from "@/types/slices";
import type { LongformTextSectionSlice } from "../slice-types";
import clsx from "clsx";
import { LongformRichText } from "./LongformRichText";

const LongformTextSection = ({
  slice,
}: SliceComponentProps<LongformTextSectionSlice>): JSX.Element => {
  const {
    section_id,
    text,
    top_border = true,
    top_spacer,
    bottom_border = true,
    bottom_spacer,
  } = slice;

  return (
    <>
      <GridSection
        id={section_id || slice.type}
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
