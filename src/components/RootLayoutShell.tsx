import ClientLayout from "@/components/ClientLayout";
import { GTM_ID } from "@/utils/gtm";
import { repositoryName } from "@/prismicio";
import type { ExtraData } from "@/types/services";
import { GoogleTagManager } from "@next/third-parties/google";
import "@/styles/globals.css";
import { PrismicPreview } from "@prismicio/next";
import type { FC } from "react";
import { Inter, Lexend_Zetta } from "next/font/google";

/** Typed alias: PrismicPreview can return Promise<Element> in App Router; TS expects Element. */
const Preview: FC<{ repositoryName: string }> = PrismicPreview as FC<{
  repositoryName: string;
}>;
import localFont from "next/font/local";

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

const inter = Inter({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-inter",
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
});

const fontStack = [
  domaine.variable,
  lexend.variable,
  lexendBold.variable,
  inter.variable,
].join(" ");

type RootLayoutShellProps = {
  children: React.ReactNode;
  hideHeader?: boolean;
  initialExtra?: ExtraData;
};

export default function RootLayoutShell({
  children,
  hideHeader = false,
  initialExtra,
}: RootLayoutShellProps) {
  return (
    <html lang="en" className={fontStack}>
      <GoogleTagManager gtmId={GTM_ID} />
      <body>
        <ClientLayout
          fontStack={fontStack}
          hideHeader={hideHeader}
          initialNavigation={initialExtra?.navigation ?? undefined}
        >
          {children}
        </ClientLayout>
        <Preview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
