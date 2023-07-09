import SliceData from "@/components/dev/SliceData";
import HeroDetailPage from "@/components/HeroDetailPage";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `HeroDetailPageSlice`.
 */
export type HeroDetailPageSliceProps = SliceComponentProps<
  Content.HeroDetailPageSliceSlice | any
>;

/**
 * Component for "HeroDetailPageSlice" Slices.
 */
const HeroDetailPageSlice = ({
  slice,
}: HeroDetailPageSliceProps): JSX.Element => {
  // console.log({ slice });

  return (
    <>
      <HeroDetailPage {...slice.primary} />
      <SliceData slice={slice} hidden />
    </>
  );
};

export default HeroDetailPageSlice;
