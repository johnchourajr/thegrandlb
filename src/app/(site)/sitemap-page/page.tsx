import { getExtra } from "@/services/get-extra";
import Layout from "@components/Layout";
import { GridSection } from "@/components/GridSection";
import Link from "next/link";

export const revalidate = false;

const sitemapPage = {
  uid: "sitemap",
  data: {
    title: "Sitemap",
    meta_title: "Sitemap | The Grand LB",
    meta_description:
      "Browse all pages on The Grand Long Beach website. Event venues, tour spaces, menus, and more.",
    slices: [],
  },
};

type SitemapLink = {
  label: string;
  href: string;
};

type SitemapSection = {
  title: string;
  links: SitemapLink[];
};

const sections: SitemapSection[] = [
  {
    title: "Main Pages",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Make an Inquiry", href: "/inquire" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Tour Our Spaces",
    links: [
      { label: "Tour Overview", href: "/tour" },
      { label: "Interactive Map", href: "/map" },
      { label: "The Grand Ballroom", href: "/tour/grand-ballroom" },
      { label: "The Palm Terrace", href: "/tour/palm-terrace" },
      { label: "The Catalina Room", href: "/tour/catalina-room" },
      { label: "The Monarch Room", href: "/tour/monarch-room" },
      { label: "The Garden Room", href: "/tour/garden-room" },
      { label: "The Pacific Room", href: "/tour/pacific-room" },
      { label: "The Board Room", href: "/tour/board-room" },
    ],
  },
  {
    title: "Events",
    links: [
      { label: "Events Overview", href: "/events" },
      { label: "Weddings", href: "/events/weddings" },
      { label: "Quinceañeras", href: "/events/quinces" },
      { label: "Milestones", href: "/events/milestones" },
      { label: "Corporate & Business", href: "/events/business" },
    ],
  },
  {
    title: "More Celebrations",
    links: [
      { label: "Indian Weddings", href: "/events/indian-weddings" },
      { label: "Sweet 16", href: "/events/sweet-16" },
      { label: "Bar & Bat Mitzvah", href: "/events/bar-bat-mitzvah" },
      { label: "Graduation Parties", href: "/events/graduation-parties" },
      { label: "Galas & Holiday Events", href: "/events/galas" },
      { label: "Baby Showers", href: "/events/baby-showers" },
      { label: "Rehearsal Dinners", href: "/events/rehearsal-dinners" },
      { label: "Anniversary Parties", href: "/events/anniversary-parties" },
    ],
  },
  {
    title: "Menus",
    links: [
      { label: "Menus Overview", href: "/menus" },
      { label: "Classic Menu", href: "/menus/classic" },
      { label: "Wedding Menu", href: "/menus/weddings" },
      { label: "Milestones Menu", href: "/menus/milestones" },
      { label: "Corporate Menu", href: "/menus/corporate" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

export default async function Page() {
  const { settings, navigation } = await getExtra({});

  return (
    <Layout page={sitemapPage} settings={settings} navigation={navigation}>
      <GridSection
        id="sitemap-hero"
        topSpacer="Large"
        bottomSpacer="Small"
        overflowHidden={false}
      >
        <div className="col-span-full xl:col-span-10 xl:col-start-2">
          <h1 className="font-serif text-headline-3xl leading-headline-3xl tracking-headline-3xl uppercase">
            Sitemap
          </h1>
          <p className="mt-4 max-w-2xl font-lexend text-string-default leading-base tracking-tighter">
            Browse all pages on The Grand Long Beach website.
          </p>
        </div>
      </GridSection>

      <GridSection
        id="sitemap-content"
        topSpacer="Small"
        bottomSpacer="Large"
        overflowHidden={false}
      >
        <div className="col-span-full xl:col-span-10 xl:col-start-2 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-lexend text-string-default leading-base tracking-narrow uppercase font-lexend-bold mb-4 border-b border-black pb-2">
                {section.title}
              </h2>
              <ul className="flex flex-col gap-1">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group relative inline-flex font-lexend text-string-small leading-base tracking-tighter py-1 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </GridSection>
    </Layout>
  );
}

export async function generateMetadata() {
  return {
    title: "Sitemap",
    description:
      "Browse all pages on The Grand Long Beach website. Event venues, tour spaces, menus, and more.",
  };
}
