import Header from "@/components/Header";
import { Atkinson_Hyperlegible, Lexend_Zetta } from "@next/font/google";
import localFont from "@next/font/local";
import clsx from "clsx";
import type { AppProps } from "next/app";

import Cursor from "@/components/Cursor";
import "@/styles/globals.css";
import { PrismicPreview } from "@prismicio/next";
import { PrismicProvider } from "@prismicio/react";
import { domAnimation, LazyMotion, MotionConfig } from "framer-motion";
import Link from "next/link";
import { linkResolver, repositoryName } from "prismicio";

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
  return (
    <PrismicProvider
      linkResolver={linkResolver}
      internalLinkComponent={(props) => <Link {...props} />}
    >
      <PrismicPreview repositoryName={repositoryName}>
        <MotionConfig
          transition={{
            ease: [0.19, 1, 0.22, 1],
            duration: 0.3,
          }}
          reducedMotion="user"
        >
          <LazyMotion features={domAnimation}>
            <div
              className={clsx(
                lexend.variable,
                atkinson.variable,
                domaine.variable,
                lexendBold.variable,
                "min-h-screen bg-bg font-sans"
              )}
            >
              {/* HEADER NAV */}
              <Header {...pageProps} />
              {/* PAGE CONTENT */}
              <Component {...pageProps} />
              <Cursor />
            </div>
          </LazyMotion>
        </MotionConfig>
      </PrismicPreview>
    </PrismicProvider>
  );
}
