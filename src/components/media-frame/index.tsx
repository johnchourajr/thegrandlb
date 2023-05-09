import clsx from "clsx";
import { m } from "framer-motion";
import ImageBox from "./ImageBox";
import ImageGallery from "./ImageGallery";
import InlineVideoPlayer from "./InlineVideoPlayer";
import { MediaFrameProps } from "./types";

const MediaFrame = ({
  id,
  className,
  media,
  video_media,
  video_options = {
    auto_play: true,
    loop: true,
    controls: true,
  },
  gallery,
  priority = false,
}: MediaFrameProps) => {
  const { url: videoUrl }: any = video_media || {};
  const { url: mediaUrl }: any = media || {};

  const renderMedia = () => {
    if (gallery?.data) {
      const {
        data: { gallery_items },
      } = gallery as any;
      return (
        <ImageGallery
          id={id}
          images={gallery_items}
          containerClassName="absolute inset-0 z-10 h-full w-full object-cover"
        />
      );
    } else if (videoUrl) {
      return (
        <InlineVideoPlayer
          id={id}
          media={video_media}
          className="absolute inset-0 z-20 h-full w-full object-cover"
          poster={media}
          {...video_options}
        />
      );
    } else if (mediaUrl) {
      return (
        <ImageBox
          id={id}
          media={media}
          priority={priority}
          className="absolute inset-0 z-20 h-full w-full object-cover"
        />
      );
    } else return null;
  };

  if (!media?.kind && !videoUrl && !gallery) return null;
  return (
    <m.div id={id} layoutId={id} className={clsx("media-frame", className)}>
      {renderMedia()}
      <div className="noise" />
    </m.div>
  );
};

export default MediaFrame;
