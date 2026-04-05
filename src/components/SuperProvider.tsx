import { ReactNode } from "react";

import { MotionConfig, MotionConfigProps } from "framer-motion";

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
  return <MotionConfig {...motionConfig}>{children}</MotionConfig>;
};

export default SuperProvider;
