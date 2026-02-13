import RootLayoutShell from "@/components/RootLayoutShell";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootLayoutShell>{children}</RootLayoutShell>;
}
