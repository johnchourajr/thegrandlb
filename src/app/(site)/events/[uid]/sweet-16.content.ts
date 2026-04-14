import type { PageDoc } from "content/types";

export const sweet16Page: PageDoc = {
  uid: "sweet-16",
  data: {
    title: "Sweet 16",
    headline: "Make it a night to remember",
    caption: "A Sweet 16 celebration as bold as the guest of honor.",
    video_url: null,
    meta_title: "Sweet 16 Party Venue in Long Beach, CA | The Grand LB",
    meta_description:
      "Throw a Sweet 16 party at The Grand Long Beach. 7 event spaces for 40-675 guests with in-house catering, DJ-ready AV, and dedicated event planners in Long Beach, CA. 20 min from LAX.",
    slices: [
      {
        type: "image_section",
        video_media: null,
        media: {
          dimensions: { width: 2816, height: 1826 },
          alt: "Ballroom with pink uplighting, dance floor, and DJ booth.",
          url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/39670f24-73de-4ddb-91c8-b992f36ccd00/public",
        },
        bottom_spacer: "None",
      },
      {
        type: "text_section",
        section_id: "intro",
        body: [
          {
            type: "paragraph",
            text: "A Sweet 16 is a once-in-a-lifetime milestone. At The Grand Long Beach, we give your celebration the space and style it deserves—from intimate dinners with close friends to full-scale parties with a DJ, dance floor, and custom lighting. Our event planners handle the details so the guest of honor and their family can enjoy every moment.",
            spans: [],
          },
        ],
        primary_action: "Plan Your Party",
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
            eyebrow: "Atmosphere",
            body: [
              {
                type: "paragraph",
                text: "From uplighting and photo backdrops to themed decor, our spaces transform into the vibe your teen envisions—elegant, modern, or all-out fun.",
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
            eyebrow: "Right-Sized",
            body: [
              {
                type: "paragraph",
                text: "Whether it is 40 guests in The Garden Room or 300 in The Catalina Room, we match the space to your guest list so the party feels full and energetic.",
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
            eyebrow: "All-Inclusive",
            body: [
              {
                type: "paragraph",
                text: "In-house catering, AV for your DJ, on-site parking for up to 500 cars, and a dedicated event planner who keeps the night running on schedule.",
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
                  alt: "Ballroom with cake table, dessert spread, and pink lighting.",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/f7ffd2cf-564c-4fd8-006e-ff1219868b00/public",
                },
              },
              {
                link: null,
                video_media: null,
                media: {
                  dimensions: { width: 2464, height: 1848 },
                  alt: "Elegant plated table: glassware, flatware, centerpiece in warm light.",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/6f029f31-cd81-4ccd-232e-5ee5d19a3a00/public",
                },
              },
              {
                link: null,
                video_media: null,
                media: {
                  dimensions: { width: 2464, height: 1848 },
                  alt: "Ballroom with vibrant purple and blue stage lighting and dance floor.",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/3742c9dc-4bcb-4666-3b4d-0d261819b000/public",
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
            headline: "Saturday",
            eyebrow: "Most popular party day",
            primary_action_link: null,
            secondary_action_link: null,
          },
        ],
      },
    ],
  },
};
