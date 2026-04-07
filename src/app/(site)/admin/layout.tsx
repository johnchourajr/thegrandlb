import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session || session.value !== process.env.ADMIN_PASSWORD) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
        <span className="text-sm font-medium tracking-widest uppercase text-neutral-400">
          The Grand LB — Admin
        </span>
        <a
          href="/"
          className="text-xs text-neutral-500 hover:text-white transition-colors"
        >
          Back to site
        </a>
      </header>
      <main className="px-6 py-10 max-w-5xl mx-auto">{children}</main>
    </div>
  );
}
