import clsx from "clsx";
import { GridSection } from "./GridSection";

const MapContainer = ({ ...extra }) => {
  return (
    <GridSection
      id="map"
      topSpacer={"None"}
      bottomSpacer={"None"}
      className={clsx(
        "relative h-[100%] min-h-[100%] auto-rows-[min-content] !gap-0 overflow-y-scroll rounded-tl-md rounded-tr-md bg-bg !px-0"
      )}
    >
      <div className="grid-inset col-span-full flex items-center justify-center lg:justify-end">
        Inquire
      </div>
    </GridSection>
  );
};

export default MapContainer;
