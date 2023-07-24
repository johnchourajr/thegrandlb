import Head from "next/head";

import * as prismicH from "@prismicio/helpers";
import clsx from "clsx";
import Footer from "./Footer";
// import Consent from "./consent";

function stringOneIsNotSimilarToTwo(str1: string, str2: string) {
  return str1.toLowerCase().indexOf(str2.toLowerCase()) === -1;
}

function stringOneHasWordsSimilarToTwo(str1: string, str2: string) {
  if (!str1 || !str2) return false;
  const str1Arr = str1.toLowerCase().split(" ");
  const str2Arr = str2.toLowerCase().split(" ");

  const similarWords = str1Arr.filter((word) => str2Arr.includes(word));

  return similarWords.length > 0;
}

function removeEscapedCharacters(str: string) {
  if (!str === undefined) return "";
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\\n/g, " ")
    .replace(/\\r/g, " ");
}

const LayoutHead = ({ settings, page, headContent }: any) => {
  if (!settings) return null;
  // console.log({ settings, page, headContent });

  const siteTitle = prismicH.asText(settings?.data?.site_title) || "";
  const pageTitle = page?.data?.title || page?.data?.meta_title;
  // const dontShowTitle = pageTitle !== siteTitle;
  // pageTitle does not contain content from siteTitle
  const dontShowTitle = // pagetitle does not contain content from siteTitle
    stringOneHasWordsSimilarToTwo(pageTitle, siteTitle);

  const showTitle = dontShowTitle
    ? ``
    : `${removeEscapedCharacters(
        page?.data?.title || page?.data?.page_title
      )} | `;

  const metaTitle = `${"" || showTitle}${siteTitle}`;

  const siteDesc = prismicH.asText(settings?.data?.site_description);
  const pageDesc = page?.data?.meta_description;
  const desc = pageDesc ? pageDesc : siteDesc;

  const siteImg = settings?.data?.og_image?.url;
  const pageImg = page?.data?.meta_image?.url;
  const img = pageImg ? pageImg : siteImg;

  // console.log({
  //   dontShowTitle,
  //   metaTitle,
  //   pageTitle,
  //   siteTitle,
  //   settings,
  //   page,
  //   headContent,
  // });

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
  navigation,
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
        "relative z-0 mx-auto w-full max-w-[100vw] bg-bg text-black 4xl:max-w-[2500px]",
        wrapperClassName
      )}
    >
      {page && !hidePageUid && <pre>uid: {page?.uid}</pre>}
      <LayoutHead page={page} settings={settings} headContent={headContent} />
      {/* PAGE CONTENT */}
      <main
        id={page?.uid}
        className={clsx("--min-h-[150vh]", "min-h-[25vh]", className)}
      >
        {children}
      </main>
      {/* FOOTER */}
      {navigation && <Footer settings={settings} navigation={navigation} />}
    </div>
  );
};

export default Layout;
