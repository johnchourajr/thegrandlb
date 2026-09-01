import { ChangesClient } from "./ChangesClient";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export const metadata = {
  title: "Change Log — The Grand LB Admin",
};

export default function ChangesPage() {
  return <ChangesClient />;
}
