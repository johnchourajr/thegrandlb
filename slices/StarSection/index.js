import SliceData from "@/components/dev/SliceData";

/**
 * @typedef {import("@prismicio/client").Content.StarSectionSlice} StarSectionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<StarSectionSlice>} StarSectionProps
 * @param { StarSectionProps }
 */
const StarSection = ({ slice }) => (
  <section>
    <SliceData slice={slice} />
  </section>
);

export default StarSection;
