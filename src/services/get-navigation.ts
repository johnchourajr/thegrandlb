import { createClient } from "prismicio";

export const getNavigation = async ({ previewData }: any) => {
  const client = createClient({ previewData });

  const [navigation] = await Promise.all([client.getByType("nav_links")]);

  return {
    navigation,
  };
};
