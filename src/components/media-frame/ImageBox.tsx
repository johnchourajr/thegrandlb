import { PrismicNextImage, PrismicNextImageProps } from "@prismicio/next";
import clsx from "clsx";
import { MediaFrameProps } from "./types";

interface ImageBoxProps {
  media: MediaFrameProps["media"];
  priority?: PrismicNextImageProps["priority"];
  imgixParams?: PrismicNextImageProps["imgixParams"];
  className?: string;
}

const ImageBox = ({
  media,
  priority,
  imgixParams,
  className,
  ...rest
}: ImageProps) => {
  return (
    <PrismicNextImage
      field={media}
      className={clsx(
        "absolute inset-0 z-10 h-full w-full object-cover",
        className
      )}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      imgixParams={{
        q: 60,
        maxWidth: 1280,
        fm: "webp",
        ...imgixParams,
      }}
      {...rest}
    />
  );
};

export default ImageBox;
