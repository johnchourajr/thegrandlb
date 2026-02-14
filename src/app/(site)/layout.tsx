import RootLayoutShell from "@/components/RootLayoutShell";
import { getExtra } from "@/services/get-extra";
import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://thegrandlb.com"),
  title: {
    default: "The Grand Long Beach",
    template: "%s | The Grand LB",
  },
  description: "Premier event venue in Long Beach",
  keywords: ["venue", "events", "weddings", "corporate"],
  authors: [{ name: "The Grand Long Beach" }],
  openGraph: {
    title: "The Grand Long Beach",
    description: "Premier event venue in Long Beach",
    type: "website",
    url: "https://thegrandlb.com",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Grand Long Beach",
    description: "Premier event venue in Long Beach",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
  },
};

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialExtra = await getExtra({});
  return (
    <RootLayoutShell initialExtra={initialExtra}>{children}</RootLayoutShell>
  );
}
