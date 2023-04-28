import * as prismic from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";
import * as prismicNext from "@prismicio/next";

import sm from "./slicemachine.config.json";

/**
 * The project's Prismic repository name.
 */
export const repositoryName = prismic.getRepositoryName(sm.apiEndpoint);

/**
 * The project's Prismic Link Resolver. This function determines the URL for a given Prismic document.
 *
 * @type {prismicH.LinkResolverFunction}
 */
export const linkResolver = (doc) => {
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
 *
 * @param config {prismicNext.CreateClientConfig} - A configuration object to
 */
export const createClient = (config = {}) => {
  const client = prismic.createClient(sm.apiEndpoint);

  prismicNext.enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  });

  return client;
};
