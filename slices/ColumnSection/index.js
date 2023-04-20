import SliceData from "@/components/dev/SliceData";

/**
 * @typedef {import("@prismicio/client").Content.NumbersSectionSlice} NumbersSectionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<NumbersSectionSlice>} NumbersSectionProps
 * @param { NumbersSectionProps }
 */
const NumbersSection = ({ slice }) => (
  <section>
    <SliceData slice={slice} />
  </section>
);

export default NumbersSection;
