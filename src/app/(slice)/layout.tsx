import RootLayoutShell from "@/components/RootLayoutShell";

export default function SliceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootLayoutShell hideHeader>{children}</RootLayoutShell>;
}
