"use client";

import {
  DynamicAppWrapper,
  DynamicCursor,
  DynamicFormOverlay,
  DynamicLazyMotion,
  DynamicPrismicProvider,
  DynamicToastRoot,
} from "@/components/DynamicExports";
import Link from "@/components/Link";
import { ModalProvider, useModalContext } from "@/contexts/ModalContext";
import { getExtra } from "@/services/get-extra";
import clsx from "clsx";
import { domAnimation, MotionConfig, MotionConfigProps } from "framer-motion";
import { Suspense, useEffect, useState } from "react";
import Header from "./Header";

export type ClientLayoutProps = {
  children: React.ReactNode;
  fontStack: string;
};

function ClientLayoutContent({ children, fontStack }: ClientLayoutProps) {
  const { modalOverlay } = useModalContext();
  const [navigation, setNavigation] = useState<any>(null);

  useEffect(() => {
    const fetchNavigation = async () => {
      try {
        const extra = await getExtra({});
        setNavigation(extra.navigation);
      } catch (error) {
        console.error("Failed to fetch navigation:", error);
      }
    };

    fetchNavigation();
  }, []);

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
      <DynamicAppWrapper
        className={clsx(
          fontStack,
          "relative min-h-screen bg-bg transition-colors duration-500 ease-out-expo",
          modalOverlay && "overflow-hidden bg-black"
        )}
      >
        <Header navigation={navigation} />
        <Suspense>
          <MotionConfig {...motionConfig}>
            <DynamicLazyMotion features={domAnimation}>
              {children}
            </DynamicLazyMotion>
          </MotionConfig>
        </Suspense>
        <DynamicFormOverlay />
        <DynamicCursor />
        <DynamicToastRoot />
      </DynamicAppWrapper>
    </DynamicPrismicProvider>
  );
}

export default function ClientLayout(props: ClientLayoutProps) {
  return (
    <ModalProvider>
      <ClientLayoutContent {...props} />
    </ModalProvider>
  );
}
