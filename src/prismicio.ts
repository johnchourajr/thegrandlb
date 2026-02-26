import * as prismic from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";
import * as prismicNext from "@prismicio/next";
import config from "../slicemachine.config.json";

/**
 * The project's Prismic repository name.
 */
export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || config.repositoryName;

/**
 * Route resolvers: define how a document's `url` field is resolved.
 * Must match your Next.js file-system routes.
 *
 * {@link https://prismic.io/docs/route-resolver}
 */
const routes: prismic.ClientConfig["routes"] = [
  { type: "page", path: "/:uid" },
  { type: "event_index_page", path: "/events" },
  { type: "event_page", path: "/events/:uid" },
  { type: "tour_index_page", path: "/tour" },
  { type: "tour_page", path: "/tour/:uid" },
  { type: "offsite_index_page", path: "/offsite" },
  { type: "offsite_page", path: "/offsite/:uid" },
  { type: "inquire_page", path: "/inquire" },
  { type: "inquire_page", path: "/thanks" },
  { type: "menu_page", path: "/menus/:uid" },
];

/**
 * Link Resolver: determines the URL for a given Prismic document.
 */
export const linkResolver: prismicH.LinkResolverFunction = (doc) => {
  if (doc.uid === "home") {
    return "/";
  }

  if (doc.type === "tour_page") {
    return `/tour/${doc.uid}`;
  }

  if (doc.type === "event_page") {
    return `/events/${doc.uid}`;
  }

  if (doc.type === "menu_page") {
    return `/menus/${doc.uid}`;
  }

  if (doc.type === "offsite_page") {
    return `/offsite/${doc.uid}`;
  }

  return `/${doc.uid}`;
};

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 * Uses Next.js Data Cache: all fetches tagged with "prismic" until revalidated.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: prismicNext.CreateClientConfig = {}) => {
  const client = prismic.createClient(repositoryName, {
    routes,
    fetchOptions: {
      next: { tags: ["prismic"] },
      cache: "force-cache",
    },
    ...config,
  });

  prismicNext.enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  });

  return client;
};
