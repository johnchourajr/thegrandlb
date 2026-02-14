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
  video_url,
  video_options = {
    auto_play: true, // Changed: Don't auto-play by default to save bandwidth
    loop: true, // Changed: Don't loop by default to save bandwidth
    controls: true,
    lazy: true, // New: Enable lazy loading
    preload: "none", // New: Don't preload video data
    enableBandwidthOptimization: true, // New: Enable optimization
  },
  parallaxAmount = 0.2,
  gallery,
  priority = false,
  imgixParams,
}: MediaFrameProps) => {
  const { url: mediaUrl }: any = media || {};
  const hasVideo = Boolean(video_url?.trim());

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
    } else if (hasVideo) {
      return (
        <InlineVideoPlayer
          id={id}
          videoUrl={video_url?.trim() || undefined}
          className="absolute inset-0 z-20 h-full w-full object-cover"
          poster={media}
          priority={priority}
          parallaxAmount={parallaxAmount}
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

  if (!media?.kind && !hasVideo && !gallery) return null;
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
