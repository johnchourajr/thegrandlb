import { PrismicNextImage } from "@prismicio/next";
import { EmptyLinkField, FilledLinkToMediaField } from "@prismicio/types";
import clsx from "clsx";
import { m } from "framer-motion";
import ImageGallery from "./ImageGallery";
import InlineVideoPlayer from "./InlineVideoPlayer";

interface MediaFrameProps {
  className?: string;
  media: any;
  video_media?: FilledLinkToMediaField | EmptyLinkField<"Media">;
  video_options?: {
    auto_play?: boolean;
    loop?: boolean;
    controls?: boolean;
  };
  gallery?: any;
  priority?: boolean;
  overlay?: boolean;
}

const MediaFrame = ({
  className,
  media,
  video_media,
  video_options = {
    auto_play: true,
    loop: true,
    controls: false,
  },
  gallery,
  priority = false,
  overlay = true,
}: MediaFrameProps) => {
  const { url: videoUrl }: any = video_media || {};

  if (!media.kind && !videoUrl && !gallery) return null;
  return (
    <m.div className={clsx("media-frame", className)}>
      {videoUrl && (
        <InlineVideoPlayer
          media={video_media}
          className="absolute inset-0 z-20 h-full w-full object-cover"
          poster={media}
          {...video_options}
        />
      )}
      {media && (
        <PrismicNextImage
          field={media}
          className="absolute inset-0 z-10 h-full w-full object-cover"
          priority={priority}
        />
      )}
      {gallery && <ImageGallery images={gallery} />}

      <div className="noise" />
    </m.div>
  );
};

export default MediaFrame;
