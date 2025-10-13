import type { MetadataRoute } from "next";
import { createClient } from "../../prismicio";

const BASE_URL = "https://thegrandlb.com"; // Update to your actual domain

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = createClient();

  // Static routes with priorities
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/inquire`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/map`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/menus`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/menus/classic`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/menus/corporate`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/menus/milestones`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/menus/weddings`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/events`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/tour`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/offsite`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  try {
    // Fetch all dynamic pages from Prismic
    const [pages, eventPages, tourPages, offsitePages] = await Promise.all([
      client.getAllByType("page").catch(() => []),
      client.getAllByType("event_page").catch(() => []),
      client.getAllByType("tour_page").catch(() => []),
      client.getAllByType("offsite_page").catch(() => []),
    ]);

    // Generate dynamic routes
    const dynamicRoutes: MetadataRoute.Sitemap = [
      ...pages.map((page) => ({
        url: `${BASE_URL}/${page.uid}`,
        lastModified: new Date(page.last_publication_date || new Date()),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
      ...eventPages.map((page) => ({
        url: `${BASE_URL}/events/${page.uid}`,
        lastModified: new Date(page.last_publication_date || new Date()),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
      ...tourPages.map((page) => ({
        url: `${BASE_URL}/tour/${page.uid}`,
        lastModified: new Date(page.last_publication_date || new Date()),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
      ...offsitePages.map((page) => ({
        url: `${BASE_URL}/offsite/${page.uid}`,
        lastModified: new Date(page.last_publication_date || new Date()),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ];

    return [...staticRoutes, ...dynamicRoutes];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Fallback to static routes only if Prismic fails
    return staticRoutes;
  }
}
