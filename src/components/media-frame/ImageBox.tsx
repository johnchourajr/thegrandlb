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
  /** Kept for API compatibility — ignored; all images are served via first-party CDN */
  imgixParams?: Record<string, string | number>;
  className?: string;
  customAlt?: string;
  decorative?: boolean;
  sizes?: string;
};

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
  imgixParams: _ignored,
  className,
  customAlt,
  decorative,
  sizes = RESPONSIVE_SIZES,
}: ImageBoxProps) => {
  const loading = priority ? "eager" : "lazy";

  if (isCdnImageField(media)) {
    const isSvg = media.url.endsWith(".svg");
    return (
      <Image
        id={id}
        src={media.url}
        alt={decorative ? "" : (customAlt ?? media.alt ?? "")}
        {...(isSvg
          ? { unoptimized: true }
          : { loader: cloudflareImageLoader, sizes })}
        width={media.width ?? 1920}
        height={media.height ?? 1080}
        priority={priority}
        loading={loading}
        className={clsx(className)}
      />
    );
  }

  // Fallback for any media with a URL that isn't a first-party CDN field
  const m = media as Record<string, unknown> | null | undefined;
  const url = typeof m?.url === "string" ? m.url : null;
  if (!url) return null;

  return (
    <Image
      id={id}
      src={url}
      alt={decorative ? "" : (customAlt ?? (typeof m?.alt === "string" ? m.alt : ""))}
      unoptimized
      width={typeof m?.width === "number" ? m.width : 1920}
      height={typeof m?.height === "number" ? m.height : 1080}
      priority={priority}
      loading={loading}
      sizes={sizes}
      className={clsx(className)}
    />
  );
};

export default ImageBox;
