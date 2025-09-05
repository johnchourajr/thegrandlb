import { redirectToPreviewURL, setPreviewData } from "@prismicio/next";
import type { NextRequest } from "next/server";
import { createClient } from "../../../prismicio";

export async function GET(request: NextRequest) {
  const client = createClient({ req: request });

  const response = new Response();
  await setPreviewData({ req: request, res: response });

  await redirectToPreviewURL({ req: request, res: response, client });

  return response;
}
