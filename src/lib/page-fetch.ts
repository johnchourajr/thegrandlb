import { redirect } from "next/navigation";

/**
 * Fetches a page document and redirects to the parent if not found.
 * Logs a [404] warning server-side for observability.
 */
export async function fetchPageOrRedirect<T>(
  fetch: () => Promise<T>,
  { redirectTo, logPath }: { redirectTo: string; logPath: string }
): Promise<T> {
  let result: T;
  try {
    result = await fetch();
  } catch {
    console.warn(`[404] ${logPath} — not found`);
    redirect(redirectTo);
  }
  if (!result) {
    console.warn(`[404] ${logPath} — not found`);
    redirect(redirectTo);
  }
  return result;
}
