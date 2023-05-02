import clsx from "clsx";
import { m } from "framer-motion";
import ImageBox from "./ImageBox";
import ImageGallery from "./ImageGallery";
import InlineVideoPlayer from "./InlineVideoPlayer";
import { MediaFrameProps } from "./types";

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
}: MediaFrameProps) => {
  const { url: videoUrl }: any = video_media || {};
  const { url: mediaUrl }: any = media || {};

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
      {!gallery && !videoUrl && media && (
        <ImageBox media={media} priority={priority} />
      )}
      {gallery && (
        <ImageGallery
          images={gallery}
          containerClassName="absolute inset-0 z-10 h-full w-full object-cover"
        />
      )}

      <div className="noise" />
    </m.div>
  );
};

export default MediaFrame;
