import Header from "@/components/Header";
import clsx from "clsx";
import type { AppProps } from "next/app";
import { Atkinson_Hyperlegible, Lexend_Zetta } from "next/font/google";
import localFont from "next/font/local";

import AppWrapper from "@/components/AppWrapper";
import "@/styles/globals.css";
import { GTM_ID } from "@/utils/gtm";
import { PrismicPreview } from "@prismicio/next";
import { PrismicProvider } from "@prismicio/react";
import { domAnimation, LazyMotion, MotionConfig } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { repositoryName } from "prismicio";
import { useEffect, useState } from "react";
import TagManager from "react-gtm-module";

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

export default function App({ Component, pageProps }: AppProps) {
  const [modalOverlay, setModalOverlay] = useState(false);
  const router = useRouter();
  // when navigating to /inquire set state to true

  const openOverlay = (route: "/inquire" | "/map" | "/thanks") => {
    if (router.pathname === route) return;
    router.push(route);
    setModalOverlay(true);
  };

  const closeOverlay = () => {
    // navigate to previous page
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

  useEffect(() => {
    TagManager.initialize({ gtmId: GTM_ID });

    // Listen for route changes and track pageviews
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

  const fontStack = clsx(
    lexend.variable,
    atkinson.variable,
    domaine.variable,
    lexendBold.variable,
    "font-sans"
  );

  return (
    <PrismicProvider internalLinkComponent={(props) => <Link {...props} />}>
      <PrismicPreview repositoryName={repositoryName}>
        <MotionConfig
          transition={{
            ease: [0.19, 1, 0.22, 1],
            duration: 0.3,
          }}
          reducedMotion="user"
        >
          <LazyMotion features={domAnimation}>
            {/* APP WRAPPER */}
            <AppWrapper
              className={clsx(
                fontStack,
                "relative min-h-screen bg-bg transition-colors duration-500 ease-out-expo",
                modalOverlay && "overflow-hidden bg-black"
              )}
            >
              {/* HEADER NAV */}
              <Header
                modalOverlay={modalOverlay}
                toggleModalOverlay={toggleModalOverlay}
                {...pageProps}
              />
              {/* PAGE CONTENT */}
              <Component {...pageProps} />
              {/* FORM OVERLAY */}
              <DynamicFormOverlay
                className={fontStack}
                modalOverlay={modalOverlay}
                toggleModalOverlay={toggleModalOverlay}
              />
              {/* CURSOR */}
              <DynamicCursor />
              {/* <CursorNew /> */}
              {/* TOASTS */}
              <DynamicToastRoot />
            </AppWrapper>
          </LazyMotion>
        </MotionConfig>
      </PrismicPreview>
    </PrismicProvider>
  );
}
