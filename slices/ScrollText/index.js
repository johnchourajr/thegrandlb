import SliceData from "@/components/dev/SliceData";

/**
 * @typedef {import("@prismicio/client").Content.ScrollTextSlice} ScrollTextSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ScrollTextSlice>} ScrollTextProps
 * @param { ScrollTextProps }
 */
const ScrollText = ({ slice }) => (
  <section>
    <SliceData slice={slice} />
  </section>
);

export default ScrollText;
