"use client";

import clsx from "clsx";
import type { LayoutProps } from "../types/layout";
import BandwidthMonitor from "./BandwidthMonitor";
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
        wrapperClassName
      )}
    >
      {settings && (
        <LayoutHead page={page} settings={settings} headContent={headContent} />
      )}
      {/* PAGE CONTENT */}
      <main
        id={page?.uid || undefined}
        className={clsx("--min-h-[150vh]", "min-h-[25vh]", className)}
      >
        {children}
      </main>
      {/* FOOTER */}
      {navigation && <Footer settings={settings} navigation={navigation} />}
      {/* BANDWIDTH MONITOR */}
      <BandwidthMonitor />
    </div>
  );
};

export default Layout;
