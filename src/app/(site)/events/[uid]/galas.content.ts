import type { PageDoc } from "content/types";

export const galasPage: PageDoc = {
  uid: "galas",
  data: {
    title: "Galas & Holiday Events",
    headline: "Set the standard",
    caption:
      "Galas, fundraisers, and holiday events with the polish they demand.",
    video_url: null,
    meta_title: "Gala & Holiday Party Venue in Long Beach, CA | The Grand LB",
    meta_description:
      "Host galas, fundraisers, award ceremonies, and holiday parties at The Grand Long Beach. 7 event spaces for up to 675 guests with in-house catering and AV. 20 min from LAX.",
    slices: [
      {
        type: "image_section",
        video_media: null,
        media: {
          dimensions: { width: 2816, height: 1826 },
          alt: "Formal gala event setup at The Grand Long Beach ballroom",
          url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/2a7a2b5f-e94b-41cf-4694-4c40e9f53d00/public",
        },
        bottom_spacer: "None",
      },
      {
        type: "text_section",
        section_id: "intro",
        body: [
          {
            type: "paragraph",
            text: "Galas, award ceremonies, fundraisers, and holiday parties require a venue that matches the formality of the occasion. At The Grand Long Beach, our team has produced hundreds of high-profile events for nonprofits, corporations, and community organizations across Southern California. From staging and lighting to catering for 675, we deliver the level of service these events demand.",
            spans: [],
          },
        ],
        primary_action: "Plan Your Event",
        primary_action_link: { link_type: "Web", url: "/inquire" },
        secondary_action_link: null,
        top_spacer: "Small",
        bottom_spacer: "Small",
      },
      {
        type: "numbers_section",
        section_id: "features",
        columns: "3 Column",
        top_spacer: "None",
        top_border: true,
        bottom_spacer: "Medium",
        bottom_border: true,
        items: [
          {
            media: {
              dimensions: { width: 85, height: 84 },
              alt: "",
              url: "https://cdn.thegrandlb.com/elegant.svg",
            },
            number: [{ type: "heading1", text: "", spans: [] }],
            eyebrow: "Presentation",
            body: [
              {
                type: "paragraph",
                text: "The Grand Ballroom provides a stage-ready environment with built-in AV, flexible lighting, and layouts that support keynotes, award presentations, and live entertainment.",
                spans: [],
              },
            ],
            action_link: null,
          },
          {
            media: {
              dimensions: { width: 85, height: 84 },
              alt: "",
              url: "https://cdn.thegrandlb.com/flexible.svg",
            },
            eyebrow: "Scale",
            body: [
              {
                type: "paragraph",
                text: "Host an intimate VIP reception for 40 or a seated gala dinner for 675. Our seven spaces allow you to combine cocktail hours, dinner, and after-parties on one property.",
                spans: [],
              },
            ],
            action_link: null,
          },
          {
            media: {
              dimensions: { width: 85, height: 84 },
              alt: "",
              url: "https://cdn.thegrandlb.com/personal.svg",
            },
            eyebrow: "Turnkey",
            body: [
              {
                type: "paragraph",
                text: "In-house catering with plated, buffet, and station options. A dedicated event planner manages vendor coordination, timeline, and day-of execution.",
                spans: [],
              },
            ],
            action_link: null,
          },
        ],
      },
      {
        type: "split_scroll_section",
        section_id: "list",
        gallery: {
          data: {
            gallery_items: [
              {
                link: null,
                video_media: null,
                media: {
                  dimensions: { width: 2464, height: 1848 },
                  alt: "Corporate gala with professional stage and lighting setup",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/023e8045-5fbe-40ff-1d88-2d6f8eaec900/public",
                },
              },
              {
                link: null,
                video_media: null,
                media: {
                  dimensions: { width: 2464, height: 1848 },
                  alt: "Formal dining setup for an award ceremony at The Grand LB",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/b554ec79-70c2-4abb-18a4-f3d4e387ff00/public",
                },
              },
              {
                link: null,
                video_media: null,
                media: {
                  dimensions: { width: 2464, height: 1848 },
                  alt: "Event venue with professional AV and lighting in Long Beach",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/3763f95d-0637-42a6-3c2c-c92111d1ef00/public",
                },
              },
            ],
          },
        },
        video_media: null,
        asset_position: false,
        items: [
          {
            headline: "780",
            eyebrow: "Corporate events last year",
            primary_action_link: null,
            secondary_action_link: null,
          },
          {
            headline: "675",
            eyebrow: "Maximum seated capacity",
            primary_action_link: null,
            secondary_action_link: null,
          },
          {
            headline: "55+",
            eyebrow: "Years of experience",
            primary_action_link: null,
            secondary_action_link: null,
          },
          {
            headline: "500",
            eyebrow: "On-site parking spots",
            primary_action_link: null,
            secondary_action_link: null,
          },
        ],
      },
    ],
  },
};
