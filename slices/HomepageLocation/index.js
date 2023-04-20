import SliceData from "@/components/dev/SliceData";

/**
 * @typedef {import("@prismicio/client").Content.HomepageLocationSlice} HomepageLocationSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<HomepageLocationSlice>} HomepageLocationProps
 * @param { HomepageLocationProps }
 */
const HomepageLocation = ({ slice }) => (
  <section>
    <SliceData slice={slice} />
  </section>
);

export default HomepageLocation;
