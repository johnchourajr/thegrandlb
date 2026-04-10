import type { PageDoc } from "content/types";

export const rehearsalDinnersPage: PageDoc = {
  uid: "rehearsal-dinners",
  data: {
    title: "Rehearsal Dinners",
    headline: "The night before, done right",
    caption:
      "An intimate setting for the celebration before the celebration.",
    video_url: null,
    meta_title:
      "Rehearsal Dinner Venue in Long Beach, CA | The Grand LB",
    meta_description:
      "Host your rehearsal dinner at The Grand Long Beach. Intimate indoor and outdoor spaces for 20-200 guests with in-house catering and a dedicated planner. 20 min from LAX.",
    slices: [
      {
        type: "image_section",
        video_media: null,
        media: {
          dimensions: { width: 2816, height: 1826 },
          alt: "Rehearsal dinner table setup at The Grand Long Beach",
          url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/c94179f3-6554-4e3a-0f02-c9818b0e4600/public",
        },
        bottom_spacer: "None",
      },
      {
        type: "text_section",
        section_id: "intro",
        body: [
          {
            type: "paragraph",
            text: "The rehearsal dinner sets the tone for the wedding weekend. At The Grand Long Beach, we offer intimate indoor and outdoor spaces that give the wedding party and close family a chance to connect before the big day. Our in-house kitchen creates custom menus for seated dinners, family-style meals, or cocktail receptions -- and our event planners coordinate the timing so you can move seamlessly between rehearsal and dinner.",
            spans: [],
          },
        ],
        primary_action: "Plan Your Dinner",
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
            eyebrow: "Intimate",
            body: [
              {
                type: "paragraph",
                text: "The Pacific Room, Garden Room, and Board Room provide refined settings for groups of 20 to 140 -- sized to feel warm and personal for your closest guests.",
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
            eyebrow: "Convenient",
            body: [
              {
                type: "paragraph",
                text: "Already hosting your wedding at The Grand? Book the rehearsal dinner in a separate space on-site and simplify logistics for your entire wedding weekend.",
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
            eyebrow: "Custom Menus",
            body: [
              {
                type: "paragraph",
                text: "From plated multi-course dinners to casual buffets, our in-house kitchen builds a menu around your preferences, dietary needs, and budget.",
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
                  alt: "Intimate dining setup for a rehearsal dinner",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/c94179f3-6554-4e3a-0f02-c9818b0e4600/public",
                },
              },
              {
                link: null,
                video_media: null,
                media: {
                  dimensions: { width: 2466, height: 1850 },
                  alt: "Wedding party dinner in a private event room at The Grand LB",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/20cb49a5-6155-4016-44a5-eb72a13d9d00/public",
                },
              },
              {
                link: null,
                video_media: null,
                media: {
                  dimensions: { width: 2466, height: 1850 },
                  alt: "Elegant table setting with floral arrangements at The Grand LB",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/c647a4c0-5d20-4460-82ad-d029b7c14800/public",
                },
              },
            ],
          },
        },
        video_media: null,
        asset_position: false,
        items: [
          {
            headline: "400+",
            eyebrow: "Weddings hosted last year",
            primary_action_link: null,
            secondary_action_link: null,
          },
          {
            headline: "7",
            eyebrow: "Spaces to choose from",
            primary_action_link: null,
            secondary_action_link: null,
          },
          {
            headline: "500",
            eyebrow: "On-site parking spots",
            primary_action_link: null,
            secondary_action_link: null,
          },
          {
            headline: "20 min",
            eyebrow: "From LAX",
            primary_action_link: null,
            secondary_action_link: null,
          },
        ],
      },
    ],
  },
};
