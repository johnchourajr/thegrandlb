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
      <h1 className="font-serif text-3xl italic mb-2">Menu Admin</h1>
      <p className="text-black/50 text-sm mb-8">
        Select a menu section to edit.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {MENU_SECTIONS.map(({ uid, label, description }) => (
          <Link
            key={uid}
            href={`/admin/menus/${uid}`}
            className="block rounded-lg border border-black/10 bg-white p-5 hover:border-black/30 hover:shadow-sm transition-all group"
          >
            <h2 className="text-lg font-medium mb-1">
              {label}
            </h2>
            <p className="text-sm text-black/50">{description}</p>
            <span className="mt-4 inline-block text-xs text-black/30 group-hover:text-black/60 transition-colors">
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
