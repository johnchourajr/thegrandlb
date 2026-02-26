import RootLayoutShell from "@/components/RootLayoutShell";
import JsonLdLocalBusiness from "@/components/JsonLdLocalBusiness";
import { getExtra } from "@/services/get-extra";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

const SITE_DESCRIPTION =
  "SoCal's premier 40,000 sq ft event venue in Long Beach. Weddings, corporate events and private celebrations. 20 min from LAX.";

export const metadata: Metadata = {
  metadataBase: new URL("https://thegrandlb.com"),
  title: {
    default: "The Grand LB | Premier Event Venue & Weddings in Long Beach, CA",
    template: "%s | The Grand LB",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "event venue Long Beach",
    "wedding venue Long Beach",
    "corporate events Long Beach",
    "private events SoCal",
  ],
  authors: [{ name: "The Grand Long Beach" }],
  openGraph: {
    title: "The Grand LB | Premier Event Venue & Weddings in Long Beach, CA",
    description: SITE_DESCRIPTION,
    type: "website",
    url: "https://thegrandlb.com",
    siteName: "The Grand LB",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Grand LB | Premier Event Venue & Weddings in Long Beach, CA",
    description: SITE_DESCRIPTION,
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
    <RootLayoutShell initialExtra={initialExtra}>
      <JsonLdLocalBusiness />
      {children}
      <Analytics />
    </RootLayoutShell>
  );
}
