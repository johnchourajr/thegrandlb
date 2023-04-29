import SliceData from "@/components/dev/SliceData";
import { GridSection } from "@/components/GridSection";
import Headline from "@/components/Headline";
import Tick from "@/components/TickerContainer";
import clsx from "clsx";

/**
 * @typedef {import("@prismicio/client").Content.ScrollTextSlice} ScrollTextSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ScrollTextSlice>} ScrollTextProps
 * @param { ScrollTextProps }
 */
const ScrollText = ({ slice }) => (
  <>
    <GridSection>
      {slice.primary.line_one && (
        <Tick
          toLeft={false}
          className={clsx("col-span-full")}
          aria-label={`${slice.primary.line_one} ${slice.primary.line_two}`}
        >
          <Headline
            as="span"
            size={"2xl"}
            className={`inline-flex !whitespace-pre py-6`}
            disableMotion
            emphasis
            aria-hidden={true}
          >
            {slice.primary.line_one}{" "}
          </Headline>
        </Tick>
      )}
      {slice.primary.line_two && (
        <Tick toLeft={true} className={clsx("col-span-full -mt-6")}>
          <Headline
            as="span"
            size={"2xl"}
            className={`inline-flex !whitespace-pre pb-6`}
            disableMotion
            emphasis
            aria-hidden={true}
          >
            {slice.primary.line_two}{" "}
          </Headline>
        </Tick>
      )}
    </GridSection>
    <SliceData slice={slice} />
  </>
);

export default ScrollText;
