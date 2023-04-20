import SliceData from "@/components/dev/SliceData";

/**
 * @typedef {import("@prismicio/client").Content.TileGridSlice} TileGridSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<TileGridSlice>} TileGridProps
 * @param { TileGridProps }
 */
const TileGrid = ({ slice }) => (
  <section>
    <SliceData slice={slice} />
  </section>
);

export default TileGrid;
