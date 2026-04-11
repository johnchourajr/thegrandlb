// Events index page content

import type { PageDoc } from "content/types";

export const eventIndexPage: PageDoc = {
  uid: "events",
  data: {
    title: "Your Grand Moment",
    video_url:
      "https://cdn.thegrandlb.com/9e5d872e-81ca-46e2-93e4-7d952055014c-events-index-15s-final.mp4",
    media: {
      dimensions: {
        width: 3840,
        height: 2160,
      },
      alt: "Elegant ballroom interior with rounds, chandeliers, soft uplighting.",
      url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/cfe41bb3-f218-430d-868d-99feb6668300/public",
    },
    headline: "No matter your thing, we're here for you.",
    body: "Every occasion deserves a personalized touch. Our seven indoor and outdoor event spaces in Long Beach accommodate 40 to 675 guests—flexible enough for weddings, quinceañeras, corporate conferences, and everything in between.",
    event_pages: [
      {
        page_media: {
          dimensions: {
            width: 2464,
            height: 1849,
          },
          alt: "Outdoor ceremony or reception on lawn with white chairs and floral arch.",
          url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/17986f96-43c9-44bb-705c-10d3e326b600/public",
        },
        page: {
          uid: "weddings",
          data: {
            caption: "Your dream wedding, made simple.",
            title: "Weddings",
            headline: "Let's get married",
          },
        },
      },
      {
        page_media: {
          dimensions: {
            width: 2464,
            height: 1849,
          },
          alt: "Ballroom with cake table, dessert spread, and pink lighting.",
          url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/f7ffd2cf-564c-4fd8-006e-ff1219868b00/public",
        },
        page: {
          uid: "milestones",
          data: {
            caption: "Celebrate your milestones in style.",
            title: "Milestones",
            headline: "Party in grand style",
          },
        },
      },
      {
        page_media: {
          dimensions: {
            width: 2464,
            height: 1849,
          },
          alt: "Conference or seminar room with screen and classroom rows.",
          url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/d3737cc7-41a3-499b-cca7-9269111c0b00/public",
        },
        page: {
          uid: "business",
          data: {
            caption: "Elevate your events with our professional touch.",
            title: "Business",
            headline: "Business meets pleasure",
          },
        },
      },
      {
        page_media: {
          dimensions: {
            width: 2464,
            height: 1849,
          },
          alt: "Ballroom with pink uplighting, dance floor, and DJ booth.",
          url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/39670f24-73de-4ddb-91c8-b992f36ccd00/public",
        },
        page: {
          uid: "quinces",
          data: {
            caption:
              "A quinceañera venue as unforgettable as the moment itself.",
            title: "Quinces",
            headline: "Celebrate her grand day",
          },
        },
      },
      {
        page: {
          uid: "tour",
        },
      },
    ],
    meta_title:
      "Event Venue in Long Beach, CA | Weddings, Quinceañeras & Corporate Events",
    meta_description:
      "The Grand Long Beach is a 40,000 sq ft event venue for weddings, quinceañeras, corporate events, and private celebrations. 7 spaces for 40-675 guests with in-house catering. 20 min from LAX.",
    slices: [
      {
        type: "numbers_section",
        section_id: "features",
        columns: "3 Column",
        inset: false,
        top_spacer: "None",
        top_border: false,
        bottom_spacer: "None",
        bottom_border: false,
        items: [
          {
            media: {
              dimensions: {
                width: 56,
                height: 56,
              },
              alt: null,
              url: "https://cdn.thegrandlb.com/elegant.svg",
            },
            number: [
              {
                type: "heading1",
                text: "",
                spans: [],
              },
            ],
            eyebrow: "Elegant",
            body: [
              {
                type: "paragraph",
                text: "Sophisticated spaces and stunning decor for your special occasion.",
                spans: [],
              },
            ],
            action_link: null,
          },
          {
            media: {
              dimensions: {
                width: 56,
                height: 56,
              },
              alt: null,
              url: "https://cdn.thegrandlb.com/flexible.svg",
            },
            number: [
              {
                type: "heading1",
                text: "",
                spans: [],
              },
            ],
            eyebrow: "Versatile",
            body: [
              {
                type: "paragraph",
                text: "Spaces for weddings, conferences, trade shows, and more.",
                spans: [],
              },
            ],
            action_link: null,
          },
          {
            media: {
              dimensions: {
                width: 56,
                height: 56,
              },
              alt: null,
              url: "https://cdn.thegrandlb.com/personal.svg",
            },
            number: [
              {
                type: "heading1",
                text: "",
                spans: [],
              },
            ],
            eyebrow: "Personal",
            body: [
              {
                type: "paragraph",
                text: "Experienced team for personalized service and tailored events.",
                spans: [],
              },
            ],
            action_link: null,
          },
        ],
      },
      {
        type: "text_section",
        section_id: "moments",
        body: [
          {
            type: "paragraph",
            text: "We are here for all of life's moments, from intimate family celebrations to large-scale corporate conferences and everything in between. Our team of professionals can help make your wedding, baby shower, anniversary, birthday party, quinceañera, gala, sports banquet, trade show, fundraiser, church service, memorial service, or any event a lasting memory.",
            spans: [],
          },
        ],
        primary_action: "Make an Inquiry",
        primary_action_link: {
          link_type: "Web",
          url: "/inquire",
        },
        secondary_action_link: null,
        top_spacer: "Small",
        top_border: true,
        bottom_spacer: "Medium",
        bottom_border: true,
      },
      {
        type: "faq_section",
        section_id: "faq",
        title: "All the answers",
        gallery: {
          data: {
            gallery_items: [
              {
                caption: "The Palm Terrace",
                link: null,
                video_media: null,
                media: {
                  dimensions: {
                    width: 2464,
                    height: 1848,
                  },
                  alt: "Outdoor terrace reception under string lights with palm trees.",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/9d0dccc6-cc37-4965-8019-d351ad9f3700/public",
                },
              },
              {
                caption: "The Palm Terrace",
                link: null,
                video_media: null,
                media: {
                  dimensions: {
                    width: 2464,
                    height: 1848,
                  },
                  alt: "Outdoor terrace with white drapery altar and palm trees (ceremony).",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/45647c84-beeb-4396-f30c-dd2846eec100/public",
                },
              },
              {
                caption: "The Grand Ballroom",
                link: null,
                video_media: null,
                media: {
                  dimensions: {
                    width: 2464,
                    height: 1848,
                  },
                  alt: "Grand Ballroom with ornate ceiling, crystal chandeliers, formal rounds.",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/ba00e56c-e108-4405-26e1-f16ba5b35c00/public",
                },
              },
              {
                caption: "The Palm Terrace",
                link: null,
                video_media: null,
                media: {
                  dimensions: {
                    width: 2464,
                    height: 1848,
                  },
                  alt: "Outdoor reception under string lights with palm trees.",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/166c57dc-8df9-4af7-b71d-1acd17872100/public",
                },
              },
              {
                caption: "The Monarch Patio",
                link: null,
                video_media: null,
                media: {
                  dimensions: {
                    width: 2464,
                    height: 1848,
                  },
                  alt: "Outdoor patio at dusk: long banquet tables, market lights, palm silhouettes.",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/07acd8a1-873a-46a9-2481-8b8de3197b00/public",
                },
              },
              {
                caption: "The Grand Ballroom",
                link: null,
                video_media: null,
                media: {
                  dimensions: {
                    width: 1848,
                    height: 2464,
                  },
                  alt: "Grand Ballroom vertical shot: dramatic ceiling, chandeliers, long perspective toward stage.",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/0061dc98-91d8-48c7-a03c-391748748a00/public",
                },
              },
              {
                caption: "The Garden Room",
                link: null,
                video_media: null,
                media: {
                  dimensions: {
                    width: 1848,
                    height: 2464,
                  },
                  alt: "Garden Room vertical: tall windows, garden mural, chandelier.",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/889f2c5d-d996-4f19-c5c3-6da3daa08b00/public",
                },
              },
              {
                caption: "The Palm Terrace",
                link: null,
                video_media: null,
                media: {
                  dimensions: {
                    width: 2464,
                    height: 1848,
                  },
                  alt: "Outdoor terrace with string lights and palm trees.",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/bc27becf-bed9-4be0-7e8d-125bfa267200/public",
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
                text: "What types of events can you host?",
                spans: [],
              },
            ],
            answer: [
              {
                type: "paragraph",
                text: "The Grand Long Beach is a versatile event venue for weddings, quinceañeras, corporate meetings, conferences, trade shows, banquets, birthday parties, anniversary celebrations, baby showers, galas, fundraisers, bar and bat mitzvahs, sweet 16 parties, graduation parties, retirement parties, product launches, awards ceremonies, and more.",
                spans: [],
              },
            ],
          },
          {
            question: [
              {
                type: "paragraph",
                text: "What are the catering options available?",
                spans: [],
              },
            ],
            answer: [
              {
                type: "paragraph",
                text: "The Grand Long Beach offers a variety of menus prepared by the full-service on-site kitchen and a team of experienced chefs. If you prefer outside catering vendors, please discuss with our sales team.",
                spans: [],
              },
            ],
          },
          {
            question: [
              {
                type: "paragraph",
                text: "What are the parking options available?",
                spans: [],
              },
            ],
            answer: [
              {
                type: "paragraph",
                text: "The Grand Long Beach has a large parking lot that can accommodate up to 500 cars. The venue also has a valet parking service available for an additional fee.",
                spans: [],
              },
            ],
          },
        ],
      },
    ],
  },
};
