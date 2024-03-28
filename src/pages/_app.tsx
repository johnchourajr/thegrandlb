import { useEffect, useState } from "react";

/**
 * Vendor
 */
import clsx from "clsx";
import {
  domAnimation,
  LazyMotion,
  MotionConfig,
  type MotionConfigProps,
} from "framer-motion";
import TagManager from "react-gtm-module";

/**
 * Next
 */
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";

/**
 * Prismic
 */
import { PrismicPreview } from "@prismicio/next";
import { PrismicProvider } from "@prismicio/react";
import { repositoryName } from "prismicio";

/**
 * Fonts
 */
import { Atkinson_Hyperlegible, Lexend_Zetta } from "next/font/google";
import localFont from "next/font/local";

/**
 * Components
 */
import AppWrapper from "@/components/AppWrapper";
import Header from "@/components/Header";
import { GTM_ID } from "@/utils/gtm";

/**
 * Styles
 */
import "@/styles/globals.css";

/**
 * Fonts
 */
const lexend = Lexend_Zetta({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-lexend",
  display: "block",
});

const lexendBold = Lexend_Zetta({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-lexend-bold",
  display: "block",
});

const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-atkinson",
  display: "swap",
});

const domaine = localFont({
  src: [
    {
      path: "../styles/domaine-display-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../styles/domaine-display-regular-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-domaine",
  display: "block",
  preload: true,
});

const fontStack = clsx(
  lexend.variable,
  atkinson.variable,
  domaine.variable,
  lexendBold.variable,
  "font-sans"
);

/**
 * Dynamic Components
 */
const DynamicFormOverlay = dynamic(
  () => import("@/components/form/FormOverlay"),
  {
    loading: () => <></>,
  }
);

const DynamicCursor = dynamic(() => import("@/components/Cursor"), {
  loading: () => <></>,
});

const DynamicToastRoot = dynamic(() => import("@/components/ToastRoot"), {
  loading: () => <></>,
});

/**
 * @name App
 */
export default function App({ Component, pageProps }: AppProps) {
  /**
   * State
   */
  const [modalOverlay, setModalOverlay] = useState(false);

  /**
   * Router
   */
  const router = useRouter();

  /**
   * Functions
   */
  const openOverlay = (route: "/inquire" | "/map" | "/thanks") => {
    if (router.pathname === route) return;
    router.push(route);
    setModalOverlay(true);
  };

  const closeOverlay = () => {
    router.back();
    setModalOverlay(false);
  };

  const toggleModalOverlay = (route: "/inquire" | "/map" | "/thanks") => {
    if (modalOverlay) {
      closeOverlay();
    } else {
      openOverlay(route);
    }
  };

  /**
   * Effects
   */
  useEffect(() => {
    TagManager.initialize({ gtmId: GTM_ID });

    const handleRouteChange = (url: string) => {
      TagManager.dataLayer({ dataLayer: { page: url } });
    };
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  useEffect(() => {
    if (
      router.pathname === "/inquire" ||
      router.pathname === "/thanks" ||
      router.pathname === "/map"
    ) {
      setModalOverlay(true);
    } else {
      setModalOverlay(false);
    }
  }, [router.pathname]);

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
          <LazyMotion features={domAnimation}>
            <AppWrapper
              className={clsx(
                fontStack,
                "relative min-h-screen bg-bg transition-colors duration-500 ease-out-expo",
                modalOverlay && "overflow-hidden bg-black"
              )}
            >
              <Header
                modalOverlay={modalOverlay}
                toggleModalOverlay={toggleModalOverlay}
                {...pageProps}
              />
              <Component {...pageProps} />
              <DynamicFormOverlay
                className={fontStack}
                modalOverlay={modalOverlay}
                toggleModalOverlay={toggleModalOverlay}
              />
              <DynamicCursor />
              <DynamicToastRoot />
            </AppWrapper>
          </LazyMotion>
        </MotionConfig>
      </PrismicPreview>
    </PrismicProvider>
  );
}
