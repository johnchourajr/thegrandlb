import React from "react";
import Helmet from "react-helmet";

import { slugify } from "../functions/util";
import { siteDetails } from "../../data/siteDetails";

const Head = ({ location }) => {
  const pathname =
    location.pathname === "/" ? "home" : slugify(location.pathname);

  return (
    <Helmet
      title={siteDetails.title}
      link={[
        {
          rel: "apple-touch-icon",
          sizes: "152x152",
          href: "/img/favicon/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/img/favicon/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/img/favicon/favicon-16x16.png",
        },
        { rel: "manifest", href: "/img/favicon/site.webmanifest" },
        {
          rel: "mask-icon",
          href: "/img/favicon/safari-pinned-tab.svg",
          color: "#edfaff",
        },
      ]}
      meta={[
        // Basics
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, shrink-to-fit=yes",
        },
        { name: "title", content: siteDetails.title },
        { name: "description", content: siteDetails.description },
        { name: "msapplication-TileColor", content: "#edfaff" },
        { name: "theme-color", content: "#edfaff" },
        {
          name: "google-site-verification",
          content: "XHmqEhH34GAy4c1dwKbIUDWtyRW52BwYIeutvuNHtCI",
        },

        // Open Graph / Facebook
        { property: "og:type", content: "website" },
        { property: "og:url", content: siteDetails.url },
        { property: "og:title", content: siteDetails.title },
        { property: "og:description", content: siteDetails.description },
        { property: "og:image", content: siteDetails.socialCard },

        // Twitter
        { property: "twitter:card", content: "summary_large_image" },
        { property: "twitter:url", content: siteDetails.url },
        { property: "twitter:title", content: siteDetails.title },
        { property: "twitter:description", content: siteDetails.description },
        { property: "twitter:image", content: siteDetails.socialCard },
      ]}
      htmlAttributes={{ class: pathname, lang: "en" }}
      bodyAttributes={{ class: pathname }}
    />
  );
};

export default Head;
