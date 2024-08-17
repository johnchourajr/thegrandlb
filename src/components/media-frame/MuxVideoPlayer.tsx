import clsx from "clsx";
import { m } from "framer-motion";
import BackgroundVideo from "next-video/background-video";
import ParallaxWrapper from "../ParallaxWrapper";

export type MuxVideoPlayerProps = {
  id?: string;
  video?: any;
  className?: string;
};

export function MuxVideoPlayer({ id, video, className }: MuxVideoPlayerProps) {
  return (
    <m.div id={id} layoutId={id} className={clsx("media-frame", className)}>
      <ParallaxWrapper>
        <div
          className={clsx(
            "noise absolute inset-0 z-20 h-full w-full bg-black object-cover opacity-20"
          )}
        />
        <BackgroundVideo
          src={video}
          disableTracking
          metadataVideoTitle="Homepage 60s--final"
          metadataVideoId="homepage-60s-final"
          className="!absolute inset-0 h-full w-full"
          autoPlay
          playsInline
          muted
          loop
          controls={false}
          style={{
            "--media-object-fit": "cover",
          }}
        />
      </ParallaxWrapper>
      <div className="noise" />
    </m.div>
  );
}
