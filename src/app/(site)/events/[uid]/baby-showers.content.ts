import type { PageDoc } from "content/types";

export const babyShowersPage: PageDoc = {
  uid: "baby-showers",
  data: {
    title: "Baby Showers",
    headline: "Celebrate the newest arrival",
    caption: "An event space as special as the little one on the way.",
    video_url: null,
    meta_title: "Baby Shower Venue in Long Beach, CA | The Grand LB",
    meta_description:
      "Host a baby shower at The Grand Long Beach. Intimate indoor and outdoor event spaces for 40-200 guests with in-house catering and dedicated planners in Long Beach, CA.",
    slices: [
      {
        type: "image_section",
        video_media: null,
        media: {
          dimensions: { width: 2816, height: 1826 },
          alt: "Elegant plated table: glassware, flatware, centerpiece in warm light.",
          url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/6f029f31-cd81-4ccd-232e-5ee5d19a3a00/public",
        },
        bottom_spacer: "None",
      },
      {
        type: "text_section",
        section_id: "intro",
        body: [
          {
            type: "paragraph",
            text: "A baby shower should feel personal and warm. At The Grand Long Beach, our intimate event spaces—from the sun-drenched Garden Room to the indoor-outdoor Monarch Room—give you a setting that feels elevated without being overdone. Our in-house catering handles everything from brunch spreads to afternoon tea service, and our event planners help bring your theme to life.",
            spans: [],
          },
        ],
        primary_action: "Plan Your Shower",
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
            eyebrow: "Intimate Spaces",
            body: [
              {
                type: "paragraph",
                text: "The Garden Room, Pacific Room, and Monarch Room offer cozy, light-filled settings that are ideal for showers of 40 to 280 guests—sized to feel full and festive.",
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
            eyebrow: "Customizable",
            body: [
              {
                type: "paragraph",
                text: "Choose your layout, your color scheme, and your menu. Whether it is a garden brunch or an evening cocktail party, we adapt the space to your vision.",
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
            eyebrow: "Stress-Free",
            body: [
              {
                type: "paragraph",
                text: "In-house catering, setup, and a dedicated event planner mean the parents-to-be can relax and enjoy the day instead of worrying about logistics.",
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
                  alt: "Outdoor terrace reception under string lights with palm trees.",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/9d0dccc6-cc37-4965-8019-d351ad9f3700/public",
                },
              },
              {
                link: null,
                video_media: null,
                media: {
                  dimensions: { width: 2464, height: 1848 },
                  alt: "Ballroom with bright stage lighting and dance floor (party energy).",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/57e9f3bd-4c87-41fc-efe1-792f35567300/public",
                },
              },
              {
                link: null,
                video_media: null,
                media: {
                  dimensions: { width: 2464, height: 1848 },
                  alt: "Garden room or conservatory-style space with guests at tables.",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/b974fb0d-4d15-49e8-351b-fa4018109e00/public",
                },
              },
            ],
          },
        },
        video_media: null,
        asset_position: false,
        items: [
          {
            headline: "480",
            eyebrow: "Parties hosted last year",
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
