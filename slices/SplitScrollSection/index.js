import SliceData from "@/components/dev/SliceData";

/**
 * @typedef {import("@prismicio/client").Content.SplitScrollSectionSlice} SplitScrollSectionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<SplitScrollSectionSlice>} SplitScrollSectionProps
 * @param { SplitScrollSectionProps }
 */
const SplitScrollSection = ({ slice }) => (
  <section>
    <SliceData slice={slice} />
  </section>
);

export default SplitScrollSection;
