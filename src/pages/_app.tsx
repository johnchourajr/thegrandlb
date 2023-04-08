import type { AppProps } from "next/app";
import clsx from "clsx";
import { Lexend_Zetta, Atkinson_Hyperlegible } from "@next/font/google";
import localFont from "@next/font/local";
import Header from "@/components/Header";

import "@/styles/globals.css";
import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";

const lexend = Lexend_Zetta({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lexend",
});

const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-atkinson",
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
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MotionConfig>
      <LazyMotion features={domAnimation}>
        <div
          className={clsx(
            lexend.variable,
            atkinson.variable,
            domaine.variable,
            "font-sans"
          )}
        >
          {/* HEADER NAV */}
          <Header {...pageProps} />
          {/* PAGE CONTENT */}
          <Component {...pageProps} />
        </div>
      </LazyMotion>
    </MotionConfig>
  );
}
