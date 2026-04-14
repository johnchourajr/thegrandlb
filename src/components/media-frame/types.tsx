import type { ImageItem } from "./ImageGallery";

export type ControlPosition =
  | "Bottom Right"
  | "Top Right"
  | "Bottom Left"
  | "Top Left";

export type SetPositionResult = { container: string; controls: string };

export interface GalleryControlsProps {
  outerControls?: boolean;
  setPosition: (position: ControlPosition) => SetPositionResult;
  images: ImageItem[];
  controlPosition: ControlPosition;
  currentImageIndex: number;
  handleNavigateToIndex: (index: number) => void;
  isPlaying: boolean;
  handlePlayPauseClick: () => void;
}

/** Image-shaped field with optional url (e.g. fragment_media slice data). */
export type MediaFrameMedia = {
  url?: string | null;
  [key: string]: unknown;
} | null | undefined;

/** Gallery slice data with gallery_items. */
export type MediaFrameGallery =
  | { data?: { gallery_items?: ImageItem[] }; [key: string]: unknown }
  | null;

export interface MediaFrameProps {
  id?: string;
  className?: string;
  media?: MediaFrameMedia;
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
  gallery?: MediaFrameGallery;
  priority?: boolean;
  overlay?: boolean;
  imgixParams?: Record<string, string | number>;
}
