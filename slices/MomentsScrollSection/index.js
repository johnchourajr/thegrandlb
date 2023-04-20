import SliceData from "@/components/dev/SliceData";

/**
 * @typedef {import("@prismicio/client").Content.MomentsScrollSectionSlice} MomentsScrollSectionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<MomentsScrollSectionSlice>} MomentsScrollSectionProps
 * @param { MomentsScrollSectionProps }
 */
const MomentsScrollSection = ({ slice }) => (
  <section>
    <SliceData slice={slice} />
  </section>
);

export default MomentsScrollSection;
