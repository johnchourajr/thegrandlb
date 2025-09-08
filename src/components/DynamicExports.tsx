import dynamic from "next/dynamic";

/**
 * Dynamic Components
 */
const DynamicSuperProvider = dynamic(
  () => import("@/components/SuperProvider"),
  {
    loading: () => <></>,
  }
);

const DynamicPrismicProvider = dynamic(() =>
  import("@prismicio/react").then((mod) => mod.PrismicProvider)
);

const DynamicPrismicPreview = dynamic(
  () => import("@prismicio/next").then((mod) => mod.PrismicPreview) as any
);

const DynamicMotionConfig = dynamic(() =>
  import("framer-motion").then((mod) => mod.MotionConfig)
);

const DynamicLazyMotion = dynamic(() =>
  import("framer-motion").then((mod) => mod.LazyMotion)
);

const DynamicAppWrapper = dynamic(() => import("@/components/AppWrapper"), {
  loading: () => <></>,
});

const DynamicHeader = dynamic(() => import("@/components/Header"));

const DynamicFormOverlay = dynamic(
  () => import("@/components/form/FormOverlay")
);

const DynamicCursor = dynamic(() => import("@/components/Cursor"));

const DynamicToastRoot = dynamic(() => import("@/components/ToastRoot"));

// import HeroDetailPage from "@/components/HeroDetailPage";
const DynamicHeroDetailPage = dynamic(
  () => import("@/components/HeroDetailPage")
);

const DynamicCtaFooter = dynamic(() => import("@/components/CtaFooter"), {});

const DynamicTileFooter = dynamic(() => import("@/components/TileFooter"), {});

// import { MenuPageContent } from "@/components/MenuPageContent";
const DynamicMenuPageContent = dynamic(() =>
  import("@/components/MenuPageContent").then((mod) => mod.MenuPageContent)
);

const DynamicSliceZone = dynamic(() => import("@/components/ClientSliceZone"));

export {
  DynamicAppWrapper,
  DynamicCtaFooter,
  DynamicCursor,
  DynamicFormOverlay,
  DynamicHeader,
  DynamicHeroDetailPage,
  DynamicLazyMotion,
  DynamicMenuPageContent,
  DynamicMotionConfig,
  DynamicPrismicPreview,
  DynamicPrismicProvider,
  DynamicSliceZone,
  DynamicSuperProvider,
  DynamicTileFooter,
  DynamicToastRoot,
};
