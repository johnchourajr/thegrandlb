import type { EmptyLinkField, FilledLinkToMediaField } from "@prismicio/types";
import type { ImageItem } from "./ImageGallery";

export interface GalleryControlsProps {
  outerControls?: boolean;
  setPosition: (
    position: "Bottom Right" | "Top Right" | "Bottom Left" | "Top Left"
  ) => any;
  images: ImageItem[];
  controlPosition: "Bottom Right" | "Top Right" | "Bottom Left" | "Top Left";
  currentImageIndex: number;
  handleNavigateToIndex: (index: number) => void;
  isPlaying: boolean;
  handlePlayPauseClick: () => void;
}

export interface MediaFrameProps {
  id?: string;
  className?: string;
  media: any;
  /** @deprecated Use video_url instead */
  video_media?: FilledLinkToMediaField | EmptyLinkField<"Media">;
  /** When set (CDN URL from CMS), used instead of video_media URL. */
  video_url?: string | null;
  video_options?: {
    auto_play?: boolean;
    loop?: boolean;
    controls?: boolean;
    lazy?: boolean;
    preload?: "none" | "metadata" | "auto";
    enableBandwidthOptimization?: boolean;
  };
  gallery?: any;
  priority?: boolean;
  overlay?: boolean;
  imgixParams?: Record<string, string | number>;
}
