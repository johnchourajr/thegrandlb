import ClientLayout from "@/components/ClientLayout";
import "@/styles/globals.css";
import { Inter, Lexend_Zetta } from "next/font/google";
import localFont from "next/font/local";
import Head from "next/head";

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
};

export default function RootLayoutShell({
  children,
  hideHeader = false,
}: RootLayoutShellProps) {
  return (
    <html lang="en" className={fontStack}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="The Grand Long Beach" />
        <meta name="keywords" content="venue, events, weddings, corporate" />
        <meta name="author" content="The Grand Long Beach" />
        <meta property="og:title" content="The Grand Long Beach" />
        <meta
          property="og:description"
          content="Premier event venue in Long Beach"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://thegrandlb.com" />
        <meta property="og:image" content="/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Grand Long Beach" />
        <meta
          name="twitter:description"
          content="Premier event venue in Long Beach"
        />
        <meta name="twitter:image" content="/logo.png" />
      </Head>
      <body>
        <ClientLayout fontStack={fontStack} hideHeader={hideHeader}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
