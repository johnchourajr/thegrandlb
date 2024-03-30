import { ReactNode } from "react";

import {
  domAnimation,
  LazyMotion,
  MotionConfig,
  MotionConfigProps,
} from "framer-motion";
import Link from "next/link";
/**
 * Prismic
 */
import { PrismicPreview } from "@prismicio/next";
import { PrismicProvider } from "@prismicio/react";
import { repositoryName } from "prismicio";

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
      <PrismicPreview repositoryName={repositoryName}>
        <MotionConfig {...motionConfig}>
          <LazyMotion features={domAnimation}>{children}</LazyMotion>
        </MotionConfig>
      </PrismicPreview>
    </PrismicProvider>
  );
};

export default SuperProvider;
