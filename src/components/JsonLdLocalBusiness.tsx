import type { EventVenue, WithContext } from "schema-dts";

/**
 * LocalBusiness JSON-LD for SEO. Rendered on all site pages so search engines
 * can show accurate business info (name, address, phone, etc.) in results.
 * Typed with schema-dts for Schema.org validation at compile time.
 */
const LOCAL_BUSINESS_JSON_LD: WithContext<EventVenue> = {
  "@context": "https://schema.org",
  "@type": "EventVenue",
  name: "The Grand LB",
  description:
    "SoCal's premier 40,000 sq ft event venue in Long Beach. Weddings, corporate events and private celebrations. 20 min from LAX.",
  url: "https://thegrandlb.com",
  telephone: "+1-562-426-0555",
  address: {
    "@type": "PostalAddress",
    streetAddress: "4101 E. Willow St",
    addressLocality: "Long Beach",
    addressRegion: "CA",
    postalCode: "90815",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 33.7872,
    longitude: -118.1295,
  },
};

export default function JsonLdLocalBusiness() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(LOCAL_BUSINESS_JSON_LD),
      }}
    />
  );
}
