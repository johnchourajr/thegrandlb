import { PrismicNextImage, PrismicNextImageProps } from "@prismicio/next";
import clsx from "clsx";
import { MediaFrameProps } from "./types";

interface ImageBoxProps {
  id?: string;
  media: MediaFrameProps["media"];
  priority?: PrismicNextImageProps["priority"];
  imgixParams?: PrismicNextImageProps["imgixParams"];
  className?: string;
  customAlt?: string;
  decorative?: boolean;
}

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

  // const srcSet = buildWidthSrcSet(media.url, media.dimensions.width);

  return (
    <PrismicNextImage
      id={id}
      field={{ ...media, hasCustomAlt }}
      className={clsx(className)}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      sizes="(min-width: 60em) 24vw, (min-width: 28em) 45vw, 100vw"
      imgixParams={{
        q: 70,
        dpr: 2,
        fm: "webp",
        ...imgixParams,
      }}
      alt={decorative ? "" : undefined}
      fallbackAlt={""}
      {...rest}
    />
  );
};

export default ImageBox;
