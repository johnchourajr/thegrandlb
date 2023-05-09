import useTouchDevice from "@/hooks/useTouchDevice";
import { PrismicLink } from "@prismicio/react";
import clsx from "clsx";
import { LayoutGroup, m } from "framer-motion";
import { linkResolver } from "prismicio";
import { useEffect, useState } from "react";
import {
  getNumberForColSpan,
  getNumberForColStart,
  getNumberForRowSpan,
  getNumberForRowStart,
} from "slices/TileGrid/utils";
import { GridSection } from "../GridSection";
import Headline from "../Headline";
import MediaFrame from "../media-frame";
import MotionBox from "../MotionBox";
import Text from "../Paragraph";
import { getIndexLayout } from "./utils";

const GridIndexItem = ({
  id,
  uid,
  title,
  max_capacity,
  square_feet,
  features,
  page_media,
}: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const touchDevice = useTouchDevice();

  useEffect(() => {
    if (touchDevice) {
      setIsHovered(true);
    }
  }, [touchDevice]);

  const numberWithCommas = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const hoverProps = () => {
    if (touchDevice) {
      return {};
    }
    return {
      onHoverStart: () => setIsHovered(true),
      onHoverEnd: () => setIsHovered(false),
    };
  };

  return (
    <LayoutGroup>
      <MotionBox
        key={id}
        layoutId={`tour-index-${uid}`}
        className={clsx(
          "hover-black-text relative flex min-h-[25rem] gap-4 overflow-hidden rounded-sm bg-white p-6 text-white transition-colors duration-500 ease-out-expo lg:rounded-md xl:min-h-[20rem] xl:p-8",
          getNumberForColStart(getIndexLayout(uid).col_start),
          getNumberForColSpan(getIndexLayout(uid).col_span),
          getNumberForRowStart(getIndexLayout(uid).row_start),
          getNumberForRowSpan(getIndexLayout(uid).row_span),
          getIndexLayout(uid).container
        )}
        {...hoverProps()}
      >
        <PrismicLink
          href={`/tour/${uid}`}
          linkResolver={linkResolver}
          className="absolute inset-0 z-20"
        />
        <m.div className="relative z-10 flex-shrink-0">
          <Headline size={"md"} className="">
            {title}
          </Headline>
          <m.div
            className="flex gap-2"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isHovered ? "auto" : "0px",
              opacity: isHovered ? 1 : 0,
            }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.1,
            }}
          >
            <Text>{max_capacity} Max Guests</Text>{" "}
            <span className="opacity-20">/</span>
            <Text>{numberWithCommas(square_feet)} sqft</Text>
          </m.div>
        </m.div>
        {isHovered && (
          <m.div
            layoutId={`media-${uid}`}
            className="relative z-[1] h-full w-full rounded-sm bg-black"
          >
            <MediaFrame media={page_media} className="absolute inset-0" />
          </m.div>
        )}
        {!isHovered && (
          <m.div
            layoutId={`media-${uid}`}
            className="absolute inset-0 z-0 bg-black"
          >
            <MediaFrame media={page_media} className="absolute inset-0" />
          </m.div>
        )}
      </MotionBox>
    </LayoutGroup>
  );
};

const GridTourIndex = ({ sectionId, spaces }: any) => {
  return (
    <GridSection
      id={sectionId}
      topSpacer={"None"}
      bottomSpacer={"Medium"}
      className="auto-rows-min xl:auto-rows-[16vw] 2xl:auto-rows-[14vw] 3xl:auto-rows-[12vw]"
    >
      {spaces.map((space: any) => {
        const {
          page: {
            id,
            uid,
            data: { title, max_capacity, square_feet, features },
          },
          page_media,
        } = space;
        return (
          <GridIndexItem
            key={id}
            id={id}
            uid={uid}
            title={title}
            max_capacity={max_capacity}
            square_feet={square_feet}
            features={features}
            page_media={page_media}
          />
        );
      })}
    </GridSection>
  );
};

export default GridTourIndex;
