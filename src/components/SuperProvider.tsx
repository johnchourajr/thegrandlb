import { ReactNode } from "react";

import { MotionConfig, MotionConfigProps } from "framer-motion";
import Link from "next/link";
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
      <MotionConfig {...motionConfig}>{children}</MotionConfig>
    </PrismicProvider>
  );
};

export default SuperProvider;
