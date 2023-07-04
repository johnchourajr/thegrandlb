import clsx from "clsx";
import { m } from "framer-motion";
import { useEffect, useState } from "react";
import { GridSection } from "./GridSection";
import Headline from "./Headline";
import Link from "./Link";
import Text from "./Paragraph";
import StringText from "./StringText";
import Map from "./svg/Map";

const ItemSelected = ({ filteredItem, ...extra }: any) => {
  const { key, name, attributes } = filteredItem || {};

  return (
    <div className="grid-inset flex w-full flex-col gap-2 border-b-[1px] border-[#C8C2BC] py-4 xl:py-8">
      {name && (
        <Link
          href={`/tour/${key}`}
          className="decoration-1 underline-offset-4 hover:underline"
        >
          <Headline size={"md"} animateOnce>
            {name}
          </Headline>
        </Link>
      )}
      {!name && (
        <Headline size={"md"} className="opacity-50" animateOnce>
          Choose a space
        </Headline>
      )}
      <m.div className="flex flex-row gap-2">
        {attributes ? (
          <>
            {attributes.map((attribute: any) => (
              <Text key={attribute} size={"small"}>
                {attribute} <span>/</span>{" "}
              </Text>
            ))}
            {key && (
              <Text as="span" size={"small"} className="underline">
                <Link href={`tour/${key}`}>View space</Link>
              </Text>
            )}
          </>
        ) : (
          <Text size={"small"}>Select a space for more details</Text>
        )}
      </m.div>
    </div>
  );
};

const ItemList = ({
  items,
  hoveredItemKey,
  onItemHover,
  selectedItemKey,
  onItemSelect,
}: any) => {
  const variants = {
    initial: {
      opacity: 0.3,
      "--after-opacity": 0,
      "--after-color": "#311514",
    },
    selected: {
      opacity: 1,
      "--after-opacity": 1,
      "--after-color": "#ffffff",
    },
    hover: {
      opacity: 1,
      "--after-opacity": 0.05,
      "--after-color": "#311514",
    },
  } as any;

  return (
    <ul className="grid-inset flex w-full flex-col gap-4 py-4 !pr-10 pb-10 xl:py-10">
      {items.map((item: any) => (
        <m.li
          key={item.key}
          variants={variants}
          onClick={() => onItemSelect(item.key)}
          onMouseOver={() => onItemHover(item.key)}
          onMouseOut={() => onItemHover(null)}
          animate={
            selectedItemKey === item.key
              ? "selected"
              : hoveredItemKey === item.key
              ? "hover"
              : "initial"
          }
          className={clsx(
            "relative z-10 flex cursor-pointer flex-col py-2",
            "after:contents-[''] after:absolute after:-inset-x-4 after:-inset-y-1 after:z-[-1] after:rounded-md after:bg-[var(--after-color)] after:opacity-[var(--after-opacity)]"
          )}
          transition={{
            duration: 0.3,
          }}
          data-cursor="button"
        >
          <div
            className={clsx(
              "flex h-[min-content] w-full flex-row items-baseline justify-between gap-1"
            )}
          >
            <Text size={"small"}>{item.letter}</Text>
            <StringText size={"large"}>{item.name}</StringText>
          </div>
        </m.li>
      ))}
    </ul>
  );
};

const items: itemType[] = [
  {
    key: "grand-ballroom",
    letter: "A",
    name: "Grand Ballroom",
    attributes: ["XX Max Guests", "Indoor", "Small Patio"],
  },
  {
    key: "palm-terrace",
    letter: "B",
    name: "Palm Terrace",
    attributes: ["XX Max Guests", "Outdoor"],
  },
  {
    key: "monarch-room",
    letter: "C",
    name: "Monarch Room",
    attributes: ["XX Max Guests", "Outdoor", "Indoor"],
  },
  {
    key: "garden-room",
    letter: "D",
    name: "Garden Room",
    attributes: ["XX Max Guests", "Indoor"],
  },
  {
    key: "pacific-room",
    letter: "E",
    name: "Pacific Room",
    attributes: ["XX Max Guests", "Indoor"],
  },
  {
    key: "catalina-room",
    letter: "F",
    name: "Catalina Room",
    attributes: ["XX Max Guests", "Indoor"],
  },
  {
    key: "board-room",
    letter: "G",
    name: "Board Room",
    attributes: ["XX Max Guests", "Indoor"],
  },
];

// { key: string; letter: string; name: string; attributes: string[]; }[]
type itemType = {
  key?: string;
  letter?: string;
  name?: string;
  attributes?: string[];
};

const MapContainer = ({ ...extra }) => {
  const [hoveredItemKey, setHoveredItemKey] = useState(null);
  const [selectedItemKey, setSelectedItemKey] = useState("grand-ballroom");
  const [filteredList, setFilteredList] = useState<itemType[]>([]);

  useEffect(() => {
    setFilteredList(items);
  }, []);

  const handleItemHover = (itemKey: any) => {
    setHoveredItemKey(itemKey);
    console.log({ itemKey });
  };

  const handleItemSelect = (itemKey: any) => {
    setSelectedItemKey(itemKey);
    console.log({ itemKey });
  };

  const getFilteredItem = () => {
    if (!selectedItemKey) return false;
    return items.filter((item) => item.key === selectedItemKey)[0];
  };

  return (
    <GridSection
      id="map"
      topSpacer={"None"}
      bottomSpacer={"None"}
      className={clsx(
        "relative h-[100%] min-h-[100%] auto-rows-[min-content] !gap-0 overflow-y-scroll rounded-tl-md rounded-tr-md bg-bg !px-0"
      )}
    >
      <div className="relative col-span-full row-start-2 flex flex-col items-start justify-start border-t-[1px] border-[#C8C2BC] xl:col-span-4 xl:row-start-1 xl:border-t-0 xl:border-r-[1px]">
        <ItemSelected filteredItem={getFilteredItem()} />
        <ItemList
          items={filteredList}
          hoveredItemKey={hoveredItemKey}
          onItemHover={handleItemHover}
          selectedItemKey={selectedItemKey}
          onItemSelect={handleItemSelect}
        />
      </div>
      <div className="relative col-span-full row-start-1 flex h-[70vw] items-center justify-center overflow-hidden xl:col-span-8 xl:h-[calc(100vh-9rem)]">
        <Map
          className="relative h-full w-full"
          hoveredItemKey={hoveredItemKey}
          onMapAreaHover={handleItemHover}
          selectedItemKey={selectedItemKey}
          onItemSelect={handleItemSelect}
        />
      </div>
    </GridSection>
  );
};

export default MapContainer;
