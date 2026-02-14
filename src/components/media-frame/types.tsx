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
  video_url?: string | null;
  video_options?: {
    auto_play?: boolean;
    loop?: boolean;
    controls?: boolean;
    lazy?: boolean;
    preload?: "none" | "metadata" | "auto";
    enableBandwidthOptimization?: boolean;
  };
  parallaxAmount?: number;
  gallery?: any;
  priority?: boolean;
  overlay?: boolean;
  imgixParams?: Record<string, string | number>;
}
