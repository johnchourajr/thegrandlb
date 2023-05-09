import Head from "next/head";

import * as prismicH from "@prismicio/helpers";
import clsx from "clsx";
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
      <meta property="og:site_name" content={siteTitle || ""} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />

      {headContent}
    </Head>
  );
};

const Layout = ({
  settings,
  headContent,
  children,
  page,
  hidePageUid = false,
  className,
  wrapperClassName,
}: any) => {
  return (
    <div
      id="page"
      className={clsx(
        "relative z-0 mx-auto w-full max-w-[100vw] bg-bg  text-black 4xl:max-w-[2500px]",
        wrapperClassName
      )}
    >
      {page && !hidePageUid && <pre>uid: {page?.uid}</pre>}
      {/* <LayoutHead page={page} settings={settings} headContent={headContent} /> */}
      <main id={page?.uid} className={clsx("min-h-[150vh]", className)}>
        {children}
      </main>
      {/* <Consent /> */}

      <div className="min-h-[50vh] w-full bg-white"></div>
    </div>
  );
};

export default Layout;
