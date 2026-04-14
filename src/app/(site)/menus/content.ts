// Menus index page content

import type { PageDoc } from "content/types";

export const menuIndexPage: PageDoc = {
  uid: "menus",
  data: {
    title: "Menus at The Grand",
    video_url:
      "https://cdn.thegrandlb.com/ea3bc056-e211-4f3b-8ccd-cb66fcc14a3c-menu-index-final.mp4",
    media: {
      dimensions: {
        width: 3840,
        height: 2160,
      },
      alt: "Chef garnishing a plated dish with precision (hands and plate).",
      url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/8c590e41-1860-402a-44a1-767881408e00/public",
    },
    meta_title: null,
    meta_description: null,
    slices: [
      {
        type: "text_section",
        section_id: "intro",
        body: [
          {
            type: "paragraph",
            text: "We know that food brings people together. That's why we've created menus with a variety of offerings to elevate your event experience. Our culinary team takes great care to prepare each dish to perfection and tailor it to meet the diverse tastes and dietary needs of your guests. ",
            spans: [],
          },
        ],
        primary_action_link: null,
        secondary_action_link: null,
        top_spacer: "None",
        top_border: false,
        bottom_spacer: "None",
        bottom_border: true,
      },
      {
        type: "tile_grid",
        section_id: "grid",
        theme: "Cream",
        top_spacer: "Medium",
        items: [
          {
            headline: "Classic Menu",
            body: "Experience timeless elegance with our classic menu packages, featuring elevated versions of your favorite dishes.",
            link: {
              link_type: "Web",
              url: "/menus/classic",
            },
            theme: "White/Black",
            size: "Default",
            direction: "Col",
            col_start: "Start 2",
            col_span: "Span 5",
            row_start: "Start 1",
            row_span: "Span 2",
          },
          {
            headline: "Wedding Packages Menu",
            body: "Make your special day even more memorable with our exquisite wedding menu packages, customizable to your tastes and preferences.",
            link: {
              link_type: "Web",
              url: "/menus/weddings",
            },
            theme: "White/Black",
            size: "Default",
            direction: "Col",
            col_start: "Start 7",
            col_span: "Span 5",
            row_start: "Start 1",
            row_span: "Span 2",
          },
          {
            headline: "Business Packages Menu",
            body: "Impress your colleagues and clients with our sophisticated corporate menu packages, designed to elevate any business event.",
            link: {
              link_type: "Web",
              url: "/menus/corporate",
            },
            theme: "White/Black",
            size: "Default",
            direction: "Col",
            col_start: "Start 2",
            col_span: "Span 5",
            row_start: "Start 3",
            row_span: "Span 2",
          },
          {
            headline: "Milestone Packages Menu",
            body: "Celebrate life's big moments with a variety of delicious and customizable options for any occasion.",
            link: {
              link_type: "Web",
              url: "/menus/milestones",
            },
            theme: "White/Black",
            size: "Default",
            direction: "Col",
            col_start: "Start 7",
            col_span: "Span 5",
            row_start: "Start 3",
            row_span: "Span 2",
          },
        ],
      },
      {
        type: "numbers_section",
        section_id: "offsite-menus",
        title: "Offsite Catering Menus",
        columns: "3 Column",
        inset: true,
        top_border: false,
        bottom_spacer: "Medium",
        bottom_border: false,
        items: [
          {
            eyebrow: "Classic \nCatering Menu",
            body: [
              {
                type: "paragraph",
                text: "Download PDF ↘ ",
                spans: [
                  {
                    start: 0,
                    end: 12,
                    type: "hyperlink",
                    data: {
                      link_type: "Web",
                      url: "https://files.thegrandlb.com/offsite-catering/2023-classic-catering-menu.pdf",
                      target: "_blank",
                    },
                  },
                ],
              },
            ],
            action_link: null,
          },
          {
            eyebrow: "Milestones \nCatering Menu",
            body: [
              {
                type: "paragraph",
                text: "Download PDF ↘",
                spans: [
                  {
                    start: 0,
                    end: 12,
                    type: "hyperlink",
                    data: {
                      link_type: "Web",
                      url: "https://files.thegrandlb.com/offsite-catering/2023-milestone-catering-menu.pdf",
                      target: "_blank",
                    },
                  },
                ],
              },
            ],
            action_link: null,
          },
          {
            eyebrow: "Wedding \nCatering Menu",
            body: [
              {
                type: "paragraph",
                text: "Download PDF ↘",
                spans: [
                  {
                    start: 0,
                    end: 12,
                    type: "hyperlink",
                    data: {
                      link_type: "Web",
                      url: "https://files.thegrandlb.com/offsite-catering/2023-wedding-catering-menu.pdf",
                      target: "_blank",
                    },
                  },
                ],
              },
            ],
            action_link: null,
          },
        ],
      },
      {
        type: "faq_section",
        section_id: "faq",
        title: "All the answers",
        gallery: {
          data: {
            gallery_items: [
              {
                link: null,
                video_media: null,
                media: {
                  dimensions: {
                    width: 1850,
                    height: 2466,
                  },
                  alt: "Kitchen or prep line with chefs working.",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/72908b93-f2c2-44c4-ccb0-b3294d921400/public",
                },
              },
              {
                link: null,
                video_media: null,
                media: {
                  dimensions: {
                    width: 1850,
                    height: 2466,
                  },
                  alt: "Passed hors d'oeuvre tray with bruschetta-like bites (service detail).",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/34a92d62-a25b-4a27-422f-2e8777714600/public",
                },
              },
              {
                link: null,
                video_media: null,
                media: {
                  dimensions: {
                    width: 2466,
                    height: 1850,
                  },
                  alt: "Chef garnishing small bites on a tray.",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/f8325240-f0c7-4319-7703-026e3d803000/public",
                },
              },
              {
                link: null,
                video_media: null,
                media: {
                  dimensions: {
                    width: 2467,
                    height: 1850,
                  },
                  alt: "Plated dessert with berry garnish and chocolate decoration.",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/45e64cf1-7202-4c5e-634b-1965815d2400/public",
                },
              },
              {
                link: null,
                video_media: null,
                media: {
                  dimensions: {
                    width: 1850,
                    height: 2466,
                  },
                  alt: "Chef torching or finishing a dish at the pass.",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/c86282c4-c74f-46ed-b93e-f618390c0e00/public",
                },
              },
              {
                link: null,
                video_media: null,
                media: {
                  dimensions: {
                    width: 2467,
                    height: 1850,
                  },
                  alt: "Plated entree with vegetables and sauce (food hero).",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/98e95b5f-8018-45cb-e8e2-c26b9c68bd00/public",
                },
              },
            ],
          },
        },
        video_media: null,
        asset_position: true,
        items: [
          {
            question: [
              {
                type: "paragraph",
                text: "What type of cuisine does The Grand offer on its menus?",
                spans: [],
              },
            ],
            answer: [
              {
                type: "paragraph",
                text: "The Grand offers a variety of cuisine styles to cater to different tastes and preferences. Our menus range from classic American fare to international dishes and can be customized to meet your specific needs.",
                spans: [],
              },
            ],
          },
          {
            question: [
              {
                type: "paragraph",
                text: "Can The Grand accommodate dietary restrictions and allergies? ",
                spans: [],
              },
            ],
            answer: [
              {
                type: "paragraph",
                text: "Yes, The Grand can accommodate dietary restrictions and allergies. We work closely with our clients to ensure that all guests are able to enjoy the event and have a memorable experience. Please inform us of any dietary restrictions or allergies in advance so that we can plan accordingly.",
                spans: [],
              },
            ],
          },
          {
            question: [
              {
                type: "paragraph",
                text: "How are the menus priced at The Grand? ",
                spans: [],
              },
            ],
            answer: [
              {
                type: "paragraph",
                text: "The menus at The Grand are priced per person and vary depending on the selected menu items and service style. We offer a range of options to fit different budgets and can work with you to create a menu that meets your needs.",
                spans: [],
              },
            ],
          },
          {
            question: [
              {
                type: "paragraph",
                text: "Can The Grand provide bar services for events? ",
                spans: [],
              },
            ],
            answer: [
              {
                type: "paragraph",
                text: "Yes, The Grand can provide bar services for events. We offer a variety of beverage packages and can create custom cocktails to complement your menu.",
                spans: [],
              },
            ],
          },
          {
            question: [
              {
                type: "paragraph",
                text: "Can we do a tasting before finalizing our menu? ",
                spans: [],
              },
            ],
            answer: [
              {
                type: "paragraph",
                text: "Yes, The Grand offers tastings for events. We can schedule a tasting to help you select the perfect menu items for your event. Please contact our events team to schedule a tasting.",
                spans: [],
              },
            ],
          },
          {
            question: [
              {
                type: "paragraph",
                text: "How far in advance do we need to finalize our menu? ",
                spans: [],
              },
            ],
            answer: [
              {
                type: "paragraph",
                text: "We recommend finalizing your menu at least four weeks prior to your event to ensure that we have enough time to source ingredients and prepare the dishes to our high standards. However, we can often accommodate last-minute menu changes if necessary. Please contact our events team to discuss your needs.",
                spans: [],
              },
            ],
          },
        ],
      },
    ],
  },
};
