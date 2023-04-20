import SliceData from "@/components/dev/SliceData";

/**
 * @typedef {import("@prismicio/client").Content.FaqSectionSlice} FaqSectionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<FaqSectionSlice>} FaqSectionProps
 * @param { FaqSectionProps }
 */
const FaqSection = ({ slice }) => (
  <section>
    <SliceData slice={slice} />
  </section>
);

export default FaqSection;
