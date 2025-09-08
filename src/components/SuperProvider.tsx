import { ReactNode } from "react";

import { MotionConfig, MotionConfigProps } from "framer-motion";
import Link from "next/link";
/**
 * Prismic
 */
import { PrismicProvider } from "@prismicio/react";

export type SuperProviderProps = {
  children: ReactNode;
};

export const SuperProvider = ({ children }: SuperProviderProps) => {
  const motionConfig = {
    transition: {
      ease: [0.19, 1, 0.22, 1],
      duration: 0.3,
    },
    reducedMotion: "user",
  } as MotionConfigProps;
  return (
    <PrismicProvider internalLinkComponent={(props) => <Link {...props} />}>
      {/* Temporarily disabled PrismicPreview due to type issues */}
      {/* <PrismicPreview repositoryName={repositoryName}> */}
      <MotionConfig {...motionConfig}>{children}</MotionConfig>
      {/* </PrismicPreview> */}
    </PrismicProvider>
  );
};

export default SuperProvider;
