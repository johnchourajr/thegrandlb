/**
 * Structured, machine-readable facts about The Grand LB.
 *
 * Single source of truth for the agent-facing features (Markdown-for-agents,
 * WebMCP tools, API catalog descriptions). Keep this in sync with
 * `public/llms.txt`, which is the human-curated companion.
 */

export const SITE_ORIGIN = "https://thegrandlb.com";

export type VenueSpace = {
  name: string;
  capacity: string;
  description: string;
};

export type SitePage = {
  title: string;
  path: string;
  description: string;
};

export const venueInfo = {
  name: "The Grand LB",
  legalName: "The Grand Long Beach",
  operator: "Choura Venue Services LLC",
  tagline:
    "SoCal's premier 40,000 sq ft event venue in Long Beach, CA. Weddings, quinceañeras, corporate events, galas, and private celebrations. 20 minutes from LAX.",
  address: {
    street: "4101 E. Willow St.",
    city: "Long Beach",
    state: "CA",
    postalCode: "90815",
    country: "US",
  },
  phone: "(562) 426-0555",
  website: SITE_ORIGIN,
  keyDetails: [
    "Total venue size: 40,000 sq ft on 11 acres",
    "Guest capacity: 40–675 depending on space",
    "Seven distinct indoor and outdoor event spaces",
    "In-house kitchen with full-service catering",
    "On-site parking for up to 500 cars, complimentary; valet available",
    "ADA accessible",
    "Bilingual staff (English and Spanish)",
    "20 minutes from LAX; 5 minutes from Long Beach Airport",
    "55+ years of operating expertise",
  ],
  spaces: [
    {
      name: "The Grand Ballroom",
      capacity: "up to 675 guests",
      description: "Largest space.",
    },
    {
      name: "The Palm Terrace",
      capacity: "outdoor",
      description: "Outdoor courtyard space.",
    },
    {
      name: "The Catalina Room",
      capacity: "mid-size",
      description: "Mid-size indoor space.",
    },
    {
      name: "The Monarch Room",
      capacity: "mid-size",
      description: "Mid-size indoor space.",
    },
    {
      name: "The Garden Room",
      capacity: "intimate",
      description: "Intimate indoor/outdoor space.",
    },
    {
      name: "The Pacific Room",
      capacity: "flexible",
      description: "Flexible breakout or ceremony space.",
    },
    {
      name: "The Board Room",
      capacity: "up to 40 guests",
      description: "Executive meeting room.",
    },
  ] satisfies VenueSpace[],
  eventTypes: [
    "weddings",
    "Indian weddings",
    "quinceañeras",
    "sweet 16 parties",
    "bar and bat mitzvahs",
    "graduation parties",
    "anniversary parties",
    "baby showers",
    "rehearsal dinners",
    "galas",
    "corporate meetings",
    "conferences",
    "trade shows",
    "fundraisers",
    "product launches",
    "award ceremonies",
  ],
  catering: {
    summary:
      "In-house kitchen with full-service catering. Plated dinners, buffet, and action stations. Customizable menus including Classic, Weddings, Corporate, and Milestones packages.",
    dietary:
      "Accommodates vegetarian, vegan, gluten-free, kosher-style, halal, and other dietary needs. Hosted and cash bar options available.",
    menuUids: ["classic", "weddings", "corporate", "milestones"],
  },
} as const;

/** Primary navigable pages, mirrored from llms.txt. */
export const sitePages: SitePage[] = [
  { title: "Homepage", path: "/", description: "Overview of The Grand LB." },
  { title: "About", path: "/about", description: "About the venue and team." },
  { title: "Tour all spaces", path: "/tour", description: "Tour the seven event spaces." },
  { title: "Events we host", path: "/events", description: "Event types and inspiration." },
  { title: "Menus", path: "/menus", description: "Catering menus and packages." },
  { title: "FAQ", path: "/faq", description: "Common questions about hosting an event." },
  { title: "Offsite events", path: "/offsite", description: "Offsite catering and events." },
  { title: "Interactive map", path: "/map", description: "Map of the venue." },
  { title: "Contact", path: "/contact", description: "Contact details." },
  { title: "Inquire / Book", path: "/inquire", description: "Submit an inquiry to book an event." },
];
