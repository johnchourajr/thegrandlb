import { SliceZone } from "@prismicio/react";
import { SliceSimulator } from "@prismicio/slice-simulator-react";

/**
 * Slices for the SliceSimulator.
 */
import { components } from "../../slices";

/**
 * @name SliceSimulatorPage
 */
const SliceSimulatorPage = () => (
  <SliceSimulator
    sliceZone={({ slices }: any) => (
      <SliceZone slices={slices} components={components} />
    )}
    state={{}}
  />
);

export default SliceSimulatorPage;
