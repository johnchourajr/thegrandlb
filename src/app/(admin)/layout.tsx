import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter, Lexend_Zetta } from "next/font/google";
import localFont from "next/font/local";

const lexend = Lexend_Zetta({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-lexend",
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
      path: "../../styles/domaine-display-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../styles/domaine-display-regular-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-domaine",
  display: "swap",
});

const fontStack = [domaine.variable, lexend.variable, inter.variable].join(" ");

export const metadata: Metadata = {
  title: {
    default: "Admin — The Grand LB",
    template: "%s — The Grand LB Admin",
  },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontStack}>
      <body className="font-sans bg-cream text-black antialiased">
        {children}
      </body>
    </html>
  );
}
