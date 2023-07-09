import { SliceZone } from "@prismicio/react";
import { SliceSimulator } from "@prismicio/slice-simulator-react";

import { components } from "../../slices";

const SliceSimulatorPage = () => (
  <SliceSimulator
    sliceZone={({ slices }: any) => (
      <SliceZone slices={slices} components={components} />
    )}
    state={{}}
  />
);

export default SliceSimulatorPage;
