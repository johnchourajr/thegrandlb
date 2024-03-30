import dynamic from "next/dynamic";

/**
 * Dynamic Components
 */
const DynamicSuperProvider = dynamic(
  () => import("@/components/SuperProvider"),
  {
    ssr: false,
  }
);

const DynamicAppWrapper = dynamic(() => import("@/components/AppWrapper"), {
  ssr: false,
});

const DynamicHeader = dynamic(() => import("@/components/Header"), {
  ssr: false,
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
