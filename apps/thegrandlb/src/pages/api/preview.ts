/* eslint-disable import/no-anonymous-default-export */

import { redirectToPreviewURL, setPreviewData } from "@prismicio/next";
import { createClient } from "../../../prismicio";

export default async (req: any, res: any) => {
  const client = createClient({ req });

  await setPreviewData({ req, res });

  await redirectToPreviewURL({ req, res, client });
};
