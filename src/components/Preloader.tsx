import clsx from "clsx";
import PageHero from "slices/MainHero";

const convertComponentIntoData = (component: React.ComponentType) => {
  const componentData = {
    name: component.name,
    props: component.defaultProps,
  };

  return componentData;
};
function Preloader({ component }: { component: React.ComponentType }) {
  // console.log(component);

  return (
    <div
      className={clsx(
        "fixed",
        "inset-0 z-[9999] flex items-center justify-center bg-bg text-text"
      )}
    >
      <PageHero
        slices={[]}
        index={0}
        context={{ uid: "uid" }}
        slice={{
          variation: "default",
          version: "sktwi1xtmkfgx8626",
          primary: {
            section_id: "hero",
            headline: [
              {
                type: "heading1",
                text: "Where Moments Become Memories",
                spans: [],
              },
            ],
            video_media: {
              link_type: "Media",
              id: "ZNMonxAAACgAkYGh",
              name: "Homepage 60s--final.mp4",
              kind: "document",
              url: "https://the-grand.cdn.prismic.io/the-grand/7cff637b-d646-493b-9e81-06266373f84c_Homepage+60s--final.mp4",
              size: "43828694",
            },
            media: {
              dimensions: {
                width: 3840,
                height: 2160,
              },
              alt: null,
              copyright: null,
              url: "https://images.prismic.io/the-grand/6eb09764-1687-4954-8f3e-40103c73cf8f_Homepage+60s--final.jpg?auto=compress,format",
              id: "ZNMofxAAACkAkYES",
              edit: {
                x: 0,
                y: 0,
                zoom: 1,
                background: "#fff",
              },
            },
            primary_action: "Make an inquiry",
            primary_action_link: {
              id: "ZC5YBhAAACEA0ymB",
              type: "inquire_page",
              tags: [],
              lang: "en-us",
              slug: "inquire-page",
              first_publication_date: "2023-04-06T05:28:37+0000",
              last_publication_date: "2023-04-06T05:28:37+0000",
              uid: "inquire",
              link_type: "Document",
              isBroken: false,
            },
            secondary_action: "Take a tour",
            secondary_action_link: {
              id: "ZC5XThAAAB8A0yhs",
              type: "tour_index_page",
              tags: [],
              lang: "en-us",
              slug: "tour-index-page",
              first_publication_date: "2023-04-06T05:28:38+0000",
              last_publication_date: "2023-08-10T05:45:32+0000",
              uid: "tour",
              link_type: "Document",
              isBroken: false,
            },
            bottom_spacer: "None",
          },
          id: "page_hero$2b6c6f33-9b66-48f5-b7eb-69abc1366b66",
          slice_type: "page_hero",
          slice_label: null,
        }}
      />
    </div>
  );
}

export default Preloader;
