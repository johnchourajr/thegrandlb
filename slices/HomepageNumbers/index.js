import SliceData from "@/components/dev/SliceData";

/**
 * @typedef {import("@prismicio/client").Content.HomepageNumbersSlice} HomepageNumbersSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<HomepageNumbersSlice>} HomepageNumbersProps
 * @param { HomepageNumbersProps }
 */
const HomepageNumbers = ({ slice }) => (
  <section>
    <SliceData slice={slice} />
  </section>
);

export default HomepageNumbers;
