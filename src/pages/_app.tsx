import Header from "@/components/Header";
import { Atkinson_Hyperlegible, Lexend_Zetta } from "@next/font/google";
import localFont from "@next/font/local";
import clsx from "clsx";
import type { AppProps } from "next/app";

import AppWrapper from "@/components/AppWrapper";
import Cursor from "@/components/Cursor";
import FormOverlay from "@/components/form/FormOverlay";
import "@/styles/globals.css";
import { PrismicPreview } from "@prismicio/next";
import { PrismicProvider } from "@prismicio/react";
import { domAnimation, LazyMotion, MotionConfig } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { repositoryName } from "prismicio";
import { useEffect, useState } from "react";

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

export default function App({ Component, pageProps }: AppProps) {
  const [modalOverlay, setModalOverlay] = useState(false);
  const router = useRouter();
  // when navigating to /inquire set state to true

  const openInquire = () => {
    if (router.pathname === "/inquire") return;
    router.push("/inquire");
    setModalOverlay(true);
  };

  const closeInquire = () => {
    // navigate to previous page
    router.back();
    setModalOverlay(false);
  };

  const toggleModalOverlay = () => {
    if (modalOverlay) {
      closeInquire();
    } else {
      openInquire();
    }
  };

  useEffect(() => {
    if (router.pathname === "/inquire") {
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
            <AppWrapper
              className={clsx(
                fontStack,
                "relative min-h-screen bg-bg transition-colors duration-1000 ease-out-expo",
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
              <FormOverlay
                className={fontStack}
                modalOverlay={modalOverlay}
                toggleModalOverlay={toggleModalOverlay}
              />
              <Cursor />
            </AppWrapper>
          </LazyMotion>
        </MotionConfig>
      </PrismicPreview>
    </PrismicProvider>
  );
}
