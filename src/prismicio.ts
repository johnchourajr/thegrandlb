/**
 * Link Resolver: determines the URL for a given document.
 */
export const linkResolver = (doc: {
  uid?: string | null;
  type?: string;
  [key: string]: unknown;
}): string => {
  if (doc.uid === "home") return "/";
  if (doc.type === "tour_page") return `/tour/${doc.uid}`;
  if (doc.type === "event_page") return `/events/${doc.uid}`;
  if (doc.type === "menu_page") return `/menus/${doc.uid}`;
  if (doc.type === "offsite_page") return `/offsite/${doc.uid}`;
  return `/${doc.uid}`;
};
