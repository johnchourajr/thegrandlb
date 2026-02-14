"use client";

import { GridSection } from "@/components/GridSection";
import ImageGallery, {
  type ImageItem,
} from "@/components/media-frame/ImageGallery";
import MotionBox from "@/components/MotionBox";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import { useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Props for `SplitGallery`.
 */
export type SplitGalleryProps = SliceComponentProps<
  Content.SplitGallerySlice | any
>;

const SplitGallery = ({ slice }: SplitGalleryProps): JSX.Element => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const { gallery_left, gallery_right } = slice.primary ?? {};
  const galleryLeftData = (gallery_left as { data?: { gallery_items?: ImageItem[] } } | null)?.data;
  const galleryRightData = (gallery_right as { data?: { gallery_items?: ImageItem[] } } | null)?.data;
  const leftItems: ImageItem[] = galleryLeftData?.gallery_items ?? [];
  const rightItems: ImageItem[] = galleryRightData?.gallery_items ?? [];

  const progress = useSpring(scrollYProgress, { damping: 100, stiffness: 300 });

  const yRight = useTransform(progress, [0.1, 1], [`5%`, `0%`]);

  const yLeft = useTransform(progress, [0.1, 1], [`0%`, `5%`]);

  return (
    <>
      <GridSection
        id={slice.primary.section_id}
        gridSectionRef={ref}
        bottomSpacer={slice.primary.bottom_spacer}
        topSpacer={slice.primary.top_spacer}
        className={clsx("!gap-0")}
        overflowHidden={false}
      >
        {gallery_left && (
          <MotionBox
            className={clsx(
              "col-span-full mb-2 md:col-span-2 md:mb-0 lg:col-span-6"
            )}
            style={{ y: yLeft }}
          >
            <ImageGallery
              images={leftItems}
              cycleDuration={9000}
              controlPosition="Bottom Left"
              outerControls={true}
              className={clsx("aspect-square", "md:!rounded-br-none")}
              imgixParams={{
                w: 640,
              }}
            />
          </MotionBox>
        )}
        {gallery_right && (
          <MotionBox
            className={clsx(
              "col-span-full sm:pt-20 md:col-span-2 md:pt-24 lg:col-span-6 lg:pt-28"
            )}
            style={{ y: yRight }}
          >
            <ImageGallery
              images={rightItems}
              delayStart={9000 / 2}
              cycleDuration={9000}
              autoPlay={false}
              controlPosition="Top Right"
              outerControls={true}
              className={clsx("aspect-square", "md:!rounded-tl-none")}
              imgixParams={{
                w: 1280,
              }}
            />
          </MotionBox>
        )}
      </GridSection>
    </>
  );
};

export default SplitGallery;
