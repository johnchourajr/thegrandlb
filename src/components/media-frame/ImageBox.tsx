import { PrismicNextImage, PrismicNextImageProps } from "@prismicio/next";
import clsx from "clsx";
import Image from "next/image";
import { cloudflareImageLoader, isCfImageUrl } from "@/lib/image-cdn";
import { MediaFrameProps } from "./types";

export type CdnImageField = {
  url: string;
  alt?: string | null;
  width?: number;
  height?: number;
};

type ImageBoxProps = {
  id?: string;
  media: MediaFrameProps["media"] | CdnImageField;
  priority?: boolean;
  imgixParams?: PrismicNextImageProps["imgixParams"];
  className?: string;
  customAlt?: string;
  decorative?: boolean;
} & Omit<PrismicNextImageProps, "field" | "priority">;

const RESPONSIVE_SIZES =
  "(min-width: 1440px) 1440px, (min-width: 1080px) 1080px, (min-width: 640px) 640px, 100vw";

function isCdnImageField(
  media: ImageBoxProps["media"]
): media is CdnImageField {
  if (!media || typeof media !== "object") return false;
  const url = (media as CdnImageField).url;
  if (!url) return false;
  return isCfImageUrl(url) || url.startsWith("https://cdn.thegrandlb.com/");
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
  const loading = priority ? "eager" : "lazy";

  if (isCdnImageField(media)) {
    return (
      <Image
        id={id}
        src={media.url}
        alt={decorative ? "" : (customAlt ?? media.alt ?? "")}
        loader={cloudflareImageLoader}
        width={media.width ?? 1920}
        height={media.height ?? 1080}
        priority={priority}
        loading={loading}
        sizes={RESPONSIVE_SIZES}
        className={clsx(className)}
      />
    );
  }

  const hasCustomAlt = customAlt ? { alt: customAlt } : undefined;
  const field = media
    ? ({ ...media, hasCustomAlt } as PrismicNextImageProps["field"])
    : undefined;

  return (
    <PrismicNextImage
      id={id}
      field={field}
      className={clsx(className)}
      priority={priority}
      loading={loading}
      sizes={RESPONSIVE_SIZES}
      imgixParams={{
        q: 75,
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
