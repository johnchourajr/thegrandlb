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
      <h1 className="text-2xl font-semibold tracking-tight mb-2">
        Menu Admin
      </h1>
      <p className="text-neutral-400 text-sm mb-8">
        Select a menu section to edit.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {MENU_SECTIONS.map(({ uid, label, description }) => (
          <Link
            key={uid}
            href={`/admin/menus/${uid}`}
            className="block rounded-lg border border-neutral-800 bg-neutral-900 p-6 hover:border-neutral-600 hover:bg-neutral-800 transition-colors group"
          >
            <h2 className="text-lg font-medium mb-1 group-hover:text-white transition-colors">
              {label}
            </h2>
            <p className="text-sm text-neutral-500">{description}</p>
            <span className="mt-4 inline-block text-xs text-neutral-600 group-hover:text-neutral-400 transition-colors">
              /admin/menus/{uid} →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export const metadata = {
  title: "Menu Admin — The Grand LB",
};
