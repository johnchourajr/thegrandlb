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
