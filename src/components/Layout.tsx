import Head from "next/head";

import * as prismicH from "@prismicio/helpers";
// import Consent from "./consent";

const LayoutHead = ({ settings, page, headContent }: any) => {
  const siteTitle = prismicH.asText(settings?.data?.site_title);
  const pageTitle =
    prismicH.asText(page?.data?.title) || page?.data?.meta_title;
  const dontShowTitle = pageTitle !== siteTitle;
  const showTitle = dontShowTitle
    ? `${prismicH.asText(page?.data?.title)} | `
    : ``;

  const metaTitle = `${showTitle}${siteTitle}`;

  const siteDesc = prismicH.asText(settings?.data?.site_description);
  const pageDesc = page?.data?.meta_description;
  const desc = pageDesc ? pageDesc : siteDesc;

  const siteImg = settings?.data?.og_image.url;
  const pageImg = page?.data?.meta_image.url;
  const img = pageImg ? pageImg : siteImg;

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={desc} />

      <meta property="og:title" content={metaTitle} />
      <meta name="og:description" content={desc} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={img} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />

      {headContent}
    </Head>
  );
};

const Layout = ({ settings, headContent, children, page }: any) => {
  return (
    <div className="mx-auto w-full max-w-[2000px] text-black">
      <LayoutHead page={page} settings={settings} headContent={headContent} />
      <main className="min-h-[50vh]">{children}</main>
      {/* <Consent /> */}
    </div>
  );
};

export default Layout;
