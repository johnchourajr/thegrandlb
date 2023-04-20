import SliceData from "@/components/dev/SliceData";

/**
 * @typedef {import("@prismicio/client").Content.SplitGallerySlice} SplitGallerySlice
 * @typedef {import("@prismicio/react").SliceComponentProps<SplitGallerySlice>} SplitGalleryProps
 * @param { SplitGalleryProps }
 */
const SplitGallery = ({ slice }) => (
  <section>
    <SliceData slice={slice} />
  </section>
);

export default SplitGallery;
