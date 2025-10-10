import { PrismicNextImage, PrismicNextImageProps } from "@prismicio/next";
import clsx from "clsx";
import { MediaFrameProps } from "./types";

type ImageBoxProps = {
  id?: string;
  media: MediaFrameProps["media"];
  priority?: PrismicNextImageProps["priority"];
  imgixParams?: PrismicNextImageProps["imgixParams"];
  className?: string;
  customAlt?: string;
  decorative?: boolean;
} & Omit<PrismicNextImageProps, "field">;

const ImageBox = ({
  id,
  media,
  priority,
  imgixParams,
  className,
  customAlt,
  decorative,
  ...rest
}: ImageBoxProps) => {
  const hasCustomAlt = customAlt && { alt: customAlt };

  return (
    <PrismicNextImage
      id={id}
      field={{ ...media, hasCustomAlt }}
      className={clsx(className)}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      sizes="(min-width: 1440px) 1440px, (min-width: 1080px) 1080px, (min-width: 640px) 640px, 100vw"
      imgixParams={{
        q: 75, // Reduced quality for bandwidth savings
        fm: "webp",
        auto: ["compress", "format"],
        fit: "max",
        ...imgixParams,
      }}
      alt={decorative ? "" : undefined}
      fallbackAlt={""}
      {...rest}
    />
  );
};

export default ImageBox;
