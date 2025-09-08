import clsx from "clsx";
import { m } from "framer-motion";
import { useEffect, useState } from "react";
import type {
  ItemListProps,
  ItemSelectedProps,
  MapContainerProps,
  MapItem,
  MapItemKey,
} from "../types/map";
import {
  convertPrismicToMapItem,
  generateMapLetter,
} from "../utils/map-helpers";
import { ensureArray, safeMap } from "../utils/safe-array";
import { GridSection } from "./GridSection";
import Headline from "./Headline";
import Link from "./Link";
import Text from "./Paragraph";
import StringText from "./StringText";
import Map from "./svg/Map";

/**
 * MapContainer Component - Interactive venue map with space selection
 *
 * This component is fully typed using Prismic content types and provides a
 * type-safe interface for displaying interactive venue spaces. It supports
 * both hardcoded fallback data and dynamic Prismic tour space data.
 *
 * Usage with Prismic data:
 * <MapContainer tourSpaces={tourIndexPage.data.spaces} />
 *
 * Usage with fallback data:
 * <MapContainer />
 */

const ItemSelected = ({ filteredItem }: ItemSelectedProps) => {
  if (!filteredItem) {
    return (
      <div className="grid-inset flex w-full flex-col gap-2 border-b-[1px] border-[#C8C2BC] py-4 lg:py-8">
        <Headline size={"md"} className="opacity-50" animateOnce>
          Choose a space →
        </Headline>
        <m.div className="inline flex-row gap-2 whitespace-pre-wrap">
          <Text size={"small"}>Select a space for more details</Text>
        </m.div>
      </div>
    );
  }

  const { key, name, attributes } = filteredItem;

  return (
    <div className="grid-inset flex w-full flex-col gap-2 border-b-[1px] border-[#C8C2BC] py-4 lg:py-8">
      <Link
        href={`/tour/${key}`}
        className="decoration-1 underline-offset-4 hover:underline"
        eventCategory={"interactiveMap"}
        eventLabel={"mapHeadlineButton"}
        eventValue={name}
      >
        <Headline size={"md"} animateOnce>
          {name} →
        </Headline>
      </Link>
      <m.div className="inline flex-row gap-2 whitespace-pre-wrap">
        {attributes.map((attribute) => (
          <Text key={attribute} size={"small"} className="inline-flex">
            {attribute} <span className="opacity-30"> / </span>
          </Text>
        ))}
        <Text as="span" size={"small"} className="whitespace-nowrap">
          <Link
            eventCategory={"interactiveMap"}
            eventLabel={"mapLinkTextButton"}
            eventValue={name}
            href={`tour/${key}`}
            className="whitespace-nowrap underline"
          >
            View space
          </Link>
        </Text>
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
}: ItemListProps) => {
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
  };

  return (
    <ul className="flex w-full flex-col gap-4 px-8 py-4 md:!pr-10 md:pb-10 lg:py-10">
      {items.map((item) => (
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

// Hardcoded fallback data for map items
const items: MapItem[] = [
  {
    key: "grand-ballroom",
    letter: "A",
    name: "Grand Ballroom",
    attributes: ["675 Max Guests", "Indoor", "Small Patio"],
  },
  {
    key: "palm-terrace",
    letter: "B",
    name: "Palm Terrace",
    attributes: ["400 Max Guests", "Outdoor"],
  },
  {
    key: "monarch-room",
    letter: "C",
    name: "Monarch Room",
    attributes: ["280 Max Guests", "Outdoor", "Indoor"],
  },
  {
    key: "garden-room",
    letter: "D",
    name: "Garden Room",
    attributes: ["140 Max Guests", "Indoor"],
  },
  {
    key: "pacific-room",
    letter: "E",
    name: "Pacific Room",
    attributes: ["90 Max Guests", "Indoor"],
  },
  {
    key: "catalina-room",
    letter: "F",
    name: "Catalina Room",
    attributes: ["400 Max Guests", "Indoor"],
  },
  {
    key: "board-room",
    letter: "G",
    name: "Board Room",
    attributes: ["40 Max Guests", "Indoor"],
  },
];

const MapContainer = ({ tourSpaces, ...extra }: MapContainerProps) => {
  const [hoveredItemKey, setHoveredItemKey] = useState<MapItemKey>(null);
  const [selectedItemKey, setSelectedItemKey] =
    useState<MapItemKey>("grand-ballroom");
  const [filteredList, setFilteredList] = useState<MapItem[]>([]);

  useEffect(() => {
    // Ensure we always have a valid array
    const safeTourSpaces = ensureArray(tourSpaces);

    // If Prismic tour spaces are provided, convert them to MapItems
    if (safeTourSpaces.length > 0) {
      const prismicItems = safeMap(safeTourSpaces, (space, index) =>
        convertPrismicToMapItem(space, generateMapLetter(index))
      ).filter((item): item is MapItem => item !== null);

      if (prismicItems.length > 0) {
        setFilteredList(prismicItems);
        return;
      }
    }

    // Fallback to hardcoded items (always safe)
    setFilteredList(ensureArray(items));
  }, [tourSpaces]);

  const handleItemHover = (itemKey: MapItemKey) => {
    setHoveredItemKey(itemKey);
  };

  const handleItemSelect = (itemKey: string) => {
    setSelectedItemKey(itemKey);
  };

  const getFilteredItem = (): MapItem | false => {
    if (!selectedItemKey) return false;
    const foundItem = filteredList.find((item) => item.key === selectedItemKey);
    return foundItem || false;
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
      <div className="relative col-span-full row-start-2 flex flex-col items-start justify-start border-t-[1px] border-[#C8C2BC] lg:col-span-4 lg:row-start-1 lg:border-r-[1px] lg:border-t-0">
        <ItemSelected filteredItem={getFilteredItem()} />
        <ItemList
          items={filteredList}
          hoveredItemKey={hoveredItemKey}
          onItemHover={handleItemHover}
          selectedItemKey={selectedItemKey}
          onItemSelect={handleItemSelect}
        />
      </div>
      <div className="relative col-span-full row-start-1 flex h-[70vw] items-center justify-center overflow-hidden lg:col-span-8 lg:h-[calc(100vh-9rem)]">
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
