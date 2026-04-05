import HeroDetailPage from "@/components/HeroDetailPage";
import type { SliceComponentProps } from "@/types/slices";
import type { HeroDetailPageSlice } from "../slice-types";

const HeroDetailPageSlice = ({
  slice,
}: SliceComponentProps<HeroDetailPageSlice>): JSX.Element => {
  const { type: _type, ...props } = slice;
  return <HeroDetailPage {...props} />;
};

export default HeroDetailPageSlice;
