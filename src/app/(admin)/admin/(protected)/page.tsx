import Link from "next/link";

const MENU_SECTIONS = [
  {
    uid: "classic",
    label: "Classic",
    description: "Classic banquet and catering menu packages",
  },
  {
    uid: "corporate",
    label: "Corporate",
    description: "Business and corporate event menu packages",
  },
  {
    uid: "milestones",
    label: "Milestones",
    description: "Milestone celebration menu packages",
  },
  {
    uid: "weddings",
    label: "Weddings",
    description: "Wedding and reception menu packages",
  },
];

export default function AdminPage() {
  return (
    <div>
      <h1 className="font-serif text-headline-sm italic mb-2">Menus</h1>
      <p className="text-black/50 text-sm mb-8">
        Select a menu to edit.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {MENU_SECTIONS.map(({ uid, label, description }) => (
          <Link
            key={uid}
            href={`/admin/menus/${uid}`}
            className="block rounded-lg border border-black/10 bg-white p-5 hover:border-black/30 hover:shadow-sm transition-all group"
          >
            <h2 className="text-lg font-medium mb-1">{label}</h2>
            <p className="text-sm text-black/50">{description}</p>
            <span className="mt-4 inline-block text-xs text-black/30 group-hover:text-black/60 transition-colors">
              /admin/menus/{uid} →
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-8 pt-8 border-t border-black/10">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-black/40 mb-3">
          Shared Content
        </h2>
        <Link
          href="/admin/menus/shared"
          className="block rounded-lg border border-dashed border-black/20 bg-black/[0.02] p-5 hover:border-black/40 hover:bg-black/[0.04] transition-all group"
        >
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-medium">Shared Menu Sections</h2>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-black/10 text-black/40">
              Shared
            </span>
          </div>
          <p className="text-sm text-black/50">
            Appetizers, Main Courses, Sweets, and Drinks — used across Classic, Milestones, and Weddings menus.
          </p>
          <span className="mt-4 inline-block text-xs text-black/30 group-hover:text-black/60 transition-colors">
            /admin/menus/shared →
          </span>
        </Link>
      </div>

      <div className="mt-8 pt-8 border-t border-black/10">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-black/40 mb-3">
          Activity
        </h2>
        <Link
          href="/admin/changes"
          className="block rounded-lg border border-black/10 bg-white p-5 hover:border-black/30 hover:shadow-sm transition-all group"
        >
          <h2 className="text-lg font-medium mb-1">Change Log</h2>
          <p className="text-sm text-black/50">
            All menu publishes across every menu, with change details.
          </p>
          <span className="mt-4 inline-block text-xs text-black/30 group-hover:text-black/60 transition-colors">
            /admin/changes →
          </span>
        </Link>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Menu Admin — The Grand LB",
};
