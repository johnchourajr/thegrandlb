import { PrismicNextImage, PrismicNextImageProps } from "@prismicio/next";
import clsx from "clsx";
import { MediaFrameProps } from "./types";

interface ImageBoxProps {
  media: MediaFrameProps["media"];
  priority?: PrismicNextImageProps["priority"];
  imgixParams?: PrismicNextImageProps["imgixParams"];
  className?: string;
  alt?: "";
}

const ImageBox = ({
  media,
  priority,
  imgixParams,
  className,
  alt,
  ...rest
}: ImageBoxProps) => {
  return (
    <PrismicNextImage
      field={media}
      className={clsx(className)}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      imgixParams={{
        q: 60,
        maxWidth: 1280,
        fm: "webp",
        ...imgixParams,
      }}
      alt={alt || undefined}
      {...rest}
    />
  );
};

export default ImageBox;
