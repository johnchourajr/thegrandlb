import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { m } from "framer-motion";
import InlineVideoPlayer from "./InlineVideoPlayer";

interface MediaFrameProps {
  className?: string;
  media: any;
  video_media?: {
    link_type: string;
    name: string;
    kind: string;
    url: string;
    size: number;
  };
  video_options?: {
    auto_play?: boolean;
    loop?: boolean;
    controls?: boolean;
  };
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
  overlay = true,
}: MediaFrameProps) => {
  return (
    <m.div className={clsx("media-frame", className)}>
      {video_media && (
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
        />
      )}
    </m.div>
  );
};

export default MediaFrame;
