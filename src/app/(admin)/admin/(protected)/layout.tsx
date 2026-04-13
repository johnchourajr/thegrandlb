import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  const isDev = process.env.NODE_ENV === "development";
  if (!isDev && (!session || session.value !== process.env.ADMIN_PASSWORD)) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-cream text-black">
      <header className="border-b border-black/10 px-10 py-3 flex items-center justify-between">
        <a
          href="/admin"
          className="text-string-default font-lexend font uppercase text-black/60 hover:text-black transition-colors"
        >
          The Grand Content
        </a>
        <a
          href="/"
          className="text-xs text-black/40 hover:text-black transition-colors"
        >
          Back to site
        </a>
      </header>
      <main className="px-10 py-8 w-full mx-auto">{children}</main>
    </div>
  );
}
