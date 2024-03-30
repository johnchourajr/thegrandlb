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
  DynamicAppWrapper,
  DynamicHeader,
  DynamicFormOverlay,
  DynamicCursor,
  DynamicToastRoot,
};
