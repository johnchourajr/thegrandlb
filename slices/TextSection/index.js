import SliceData from "@/components/dev/SliceData";

/**
 * @typedef {import("@prismicio/client").Content.TextSectionSlice} TextSectionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<TextSectionSlice>} TextSectionProps
 * @param { TextSectionProps }
 */
const TextSection = ({ slice }) => (
  <section>
    <SliceData slice={slice} />
  </section>
);

export default TextSection;
