import { ReactNode } from "react";

import { domAnimation, MotionConfigProps } from "framer-motion";
import Link from "next/link";

import { repositoryName } from "prismicio";
import {
  DynamicLazyMotion,
  DynamicMotionConfig,
  DynamicPrismicPreview,
  DynamicPrismicProvider,
} from "./DynamicExports";

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
    <DynamicPrismicProvider
      internalLinkComponent={(props) => <Link {...props} />}
    >
      <DynamicPrismicPreview repositoryName={repositoryName}>
        <DynamicMotionConfig {...motionConfig}>
          <DynamicLazyMotion features={domAnimation}>
            {children}
          </DynamicLazyMotion>
        </DynamicMotionConfig>
      </DynamicPrismicPreview>
    </DynamicPrismicProvider>
  );
};

export default SuperProvider;
