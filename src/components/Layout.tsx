"use client";

import clsx from "clsx";
import type { LayoutProps } from "../types/layout";
import Footer from "./Footer";
import LayoutHead from "./LayoutHead";

const Layout = ({
  settings,
  navigation,
  headContent,
  children,
  page,
  className,
  wrapperClassName,
}: LayoutProps) => {
  return (
    <div
      id="page"
      className={clsx(
        "relative z-0 mx-auto w-full max-w-[100vw] bg-bg text-black 4xl:max-w-[2500px]",
        wrapperClassName,
      )}
    >
      {settings && (
        <LayoutHead page={page} settings={settings} headContent={headContent} />
      )}
      {/* PAGE CONTENT */}
      <main
        id="main-content"
        data-uid={page?.uid || undefined}
        tabIndex={-1}
        className={clsx(
          "--min-h-[150vh]",
          "min-h-[25vh]",
          "focus:outline-none",
          className,
        )}
      >
        {children}
      </main>
      {/* FOOTER */}
      {navigation && <Footer settings={settings} navigation={navigation} />}
    </div>
  );
};

export default Layout;
