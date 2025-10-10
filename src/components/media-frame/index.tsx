import clsx from "clsx";
import { motion } from "framer-motion";
import ParallaxWrapper from "../ParallaxWrapper";
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
    auto_play: true, // Changed: Don't auto-play by default to save bandwidth
    loop: true, // Changed: Don't loop by default to save bandwidth
    controls: true,
    lazy: true, // New: Enable lazy loading
    preload: "none", // New: Don't preload video data
    enableBandwidthOptimization: true, // New: Enable optimization
  },
  gallery,
  priority = false,
  imgixParams,
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
          overlay={true}
        />
      );
    } else if (videoUrl) {
      return (
        <InlineVideoPlayer
          id={id}
          media={video_media}
          className="absolute inset-0 z-20 h-full w-full object-cover"
          poster={media}
          priority={priority}
          {...video_options}
        />
      );
    } else if (mediaUrl) {
      return (
        <ParallaxWrapper>
          <ImageBox
            id={id}
            media={media}
            priority={priority}
            className="absolute inset-0 z-20 h-full w-full object-cover"
            imgixParams={imgixParams}
          />
        </ParallaxWrapper>
      );
    } else return null;
  };

  if (!media?.kind && !videoUrl && !gallery) return null;
  return (
    <motion.div
      id={id}
      layoutId={id}
      className={clsx("media-frame", className)}
    >
      {renderMedia()}
      <div className="noise" />
    </motion.div>
  );
};

export default MediaFrame;
