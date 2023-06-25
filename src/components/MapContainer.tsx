import { GridSection } from "./GridSection";

const MapContainer = ({ ...extra }) => {
  return (
    <GridSection
      id="map"
      topSpacer={"None"}
      bottomSpacer={"None"}
      className="relative"
    >
      <div className="grid-inset col-span-full flex items-center justify-center lg:justify-end">
        Inquire
      </div>
    </GridSection>
  );
};

export default MapContainer;
