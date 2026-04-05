"use client";

import {
  DynamicAppWrapper,
  DynamicCursor,
  DynamicFormOverlay,
  DynamicLazyMotion,
  DynamicToastRoot,
} from "@/components/DynamicExports";
import { ModalProvider, useModalContext } from "@/contexts/ModalContext";
import { getExtra } from "@/services/get-extra";
import clsx from "clsx";
import { domAnimation, MotionConfig, MotionConfigProps } from "framer-motion";
import { Suspense, useEffect, useState } from "react";
import Header from "./Header";

export type ClientLayoutProps = {
  children: React.ReactNode;
  fontStack: string;
  hideHeader?: boolean;
  /** When provided (from layout server fetch), Header shows nav on first paint and client getExtra is skipped. */
  initialNavigation?: import("content/types").SharedDoc | null;
};

function ClientLayoutContent({
  children,
  fontStack,
  hideHeader = false,
  initialNavigation,
}: ClientLayoutProps) {
  const { modalOverlay } = useModalContext();
  const [navigation, setNavigation] = useState<import("content/types").SharedDoc | null>(
    initialNavigation ?? null
  );

  useEffect(() => {
    if (initialNavigation !== undefined) return;
    const fetchNavigation = async () => {
      try {
        const extra = await getExtra({});
        setNavigation(extra.navigation);
      } catch (error) {
        console.error("Failed to fetch navigation:", error);
      }
    };

    fetchNavigation();
  }, [initialNavigation]);

  const motionConfig = {
    transition: {
      ease: [0.19, 1, 0.22, 1],
      duration: 0.3,
    },
    reducedMotion: "user",
  } as MotionConfigProps;

  return (
    <DynamicAppWrapper
        className={clsx(
          fontStack,
          "relative min-h-screen bg-bg transition-colors duration-500 ease-out-expo",
          modalOverlay && "overflow-hidden bg-black"
        )}
      >
        {!hideHeader && <Header navigation={navigation} />}
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
  );
}

export default function ClientLayout(props: ClientLayoutProps) {
  return (
    <ModalProvider>
      <ClientLayoutContent {...props} />
    </ModalProvider>
  );
}
