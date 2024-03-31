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

const DynamicPrismicProvider = dynamic(
  () => import("@prismicio/react").then((mod) => mod.PrismicProvider),
  {
    ssr: false,
  }
);

const DynamicPrismicPreview = dynamic(
  () => import("@prismicio/next").then((mod) => mod.PrismicPreview),
  {
    ssr: false,
  }
);

const DynamicMotionConfig = dynamic(
  () => import("framer-motion").then((mod) => mod.MotionConfig),
  {
    ssr: false,
  }
);

const DynamicLazyMotion = dynamic(
  () => import("framer-motion").then((mod) => mod.LazyMotion),
  {
    ssr: false,
  }
);

const DynamicAppWrapper = dynamic(() => import("@/components/AppWrapper"), {
  loading: () => <></>,
});

const DynamicHeader = dynamic(() => import("@/components/Header"), {
  loading: () => <></>,
});

const DynamicFormOverlay = dynamic(
  () => import("@/components/form/FormOverlay"),
  {
    ssr: false,
  }
);

const DynamicCursor = dynamic(() => import("@/components/Cursor"), {
  ssr: false,
});

const DynamicToastRoot = dynamic(() => import("@/components/ToastRoot"), {
  ssr: false,
});

export {
  DynamicSuperProvider,
  DynamicPrismicProvider,
  DynamicPrismicPreview,
  DynamicMotionConfig,
  DynamicLazyMotion,
  DynamicAppWrapper,
  DynamicHeader,
  DynamicFormOverlay,
  DynamicCursor,
  DynamicToastRoot,
};
