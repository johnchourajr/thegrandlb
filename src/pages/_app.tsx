import { useEffect, useState } from "react";

/**
 * Vendor
 */
import clsx from "clsx";
import type { AppProps } from "next/app";
import { NextRouter, useRouter } from "next/router";
import TagManager from "react-gtm-module";

/**
 * Fonts
 */
import { Atkinson_Hyperlegible, Lexend_Zetta } from "next/font/google";
import localFont from "next/font/local";

/**
 * Components
 */
import {
  DynamicAppWrapper,
  DynamicCursor,
  DynamicFormOverlay,
  DynamicHeader,
  DynamicToastRoot,
} from "@/components/DynamicExports";

/**
 * Utils
 */
import { GTM_ID } from "@/utils/gtm";

/**
 * Styles
 */
import Preloader from "@/components/Preloader";
import SuperProvider from "@/components/SuperProvider";
import "@/styles/globals.css";
import { MotionConfigProps } from "framer-motion";

/**
 * Fonts
 */
const lexend = Lexend_Zetta({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-lexend",
  display: "swap",
});

const lexendBold = Lexend_Zetta({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-lexend-bold",
  display: "swap",
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
  display: "swap",
  preload: true,
});

const fontStack = clsx(
  lexend.variable,
  atkinson.variable,
  domaine.variable,
  lexendBold.variable,
  "font-sans"
);

const motionConfig = {
  transition: {
    ease: [0.19, 1, 0.22, 1],
    duration: 0.3,
  },
  reducedMotion: "user",
} as MotionConfigProps;

/**
 * @name App
 */
export default function App({ Component, pageProps }: AppProps) {
  /**
   * State
   */
  const [modalOverlay, setModalOverlay] = useState(false);
  const [didMount, setDidMount] = useState(false);

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
    if (router.pathname !== "/") return setDidMount(true);
    const timeout = setTimeout(() => setDidMount(true), 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (!didMount) return;
    TagManager.initialize({ gtmId: GTM_ID });

    const handleRouteChange = (url: string) => {
      TagManager.dataLayer({ dataLayer: { page: url } });
    };
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, didMount]);

  const handleModalOverlay = (router: NextRouter) => {
    if (
      router.pathname === "/inquire" ||
      router.pathname === "/thanks" ||
      router.pathname === "/map"
    ) {
      setModalOverlay(true);
    } else {
      setModalOverlay(false);
    }
  };

  useEffect(() => {
    handleModalOverlay(router);
  }, [router]);

  return (
    <SuperProvider>
      {!didMount ? (
        <Preloader />
      ) : (
        <DynamicAppWrapper
          className={clsx(
            fontStack,
            "relative min-h-screen bg-bg transition-colors duration-500 ease-out-expo",
            modalOverlay && "overflow-hidden bg-black"
          )}
        >
          <DynamicHeader
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
        </DynamicAppWrapper>
      )}
    </SuperProvider>
  );
}
