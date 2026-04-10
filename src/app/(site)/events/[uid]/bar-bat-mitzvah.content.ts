import type { PageDoc } from "content/types";

export const barBatMitzvahPage: PageDoc = {
  uid: "bar-bat-mitzvah",
  data: {
    title: "Bar & Bat Mitzvah",
    headline: "A celebration of tradition",
    caption:
      "Mark the milestone with a venue that rises to the occasion.",
    video_url: null,
    meta_title:
      "Bar Mitzvah & Bat Mitzvah Venue in Long Beach, CA | The Grand LB",
    meta_description:
      "Celebrate your Bar or Bat Mitzvah at The Grand Long Beach. 7 indoor and outdoor event spaces for 40-675 guests, in-house kosher-style catering options, and dedicated planners. 20 min from LAX.",
    slices: [
      {
        type: "image_section",
        video_media: null,
        media: {
          dimensions: { width: 2816, height: 1826 },
          alt: "Event space set up for a Bar Mitzvah celebration at The Grand Long Beach",
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
            text: "A Bar or Bat Mitzvah is a milestone that calls for a meaningful celebration. At The Grand Long Beach, we provide the setting, the service, and the attention to detail that let families focus on what matters most -- honoring the young person at the center of it all. From elegant seated dinners to high-energy dance parties, our team builds the event around your vision.",
            spans: [],
          },
        ],
        primary_action: "Plan Your Celebration",
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
            eyebrow: "Elegance",
            body: [
              {
                type: "paragraph",
                text: "Our ballrooms and event spaces set the stage for a celebration that balances tradition with fun -- from the candle-lighting ceremony to the hora.",
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
            eyebrow: "Flexibility",
            body: [
              {
                type: "paragraph",
                text: "Host 40 guests in an intimate setting or up to 675 in The Grand Ballroom. We configure the space to fit your format -- whether that includes a DJ, live entertainment, or both.",
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
            eyebrow: "Full Service",
            body: [
              {
                type: "paragraph",
                text: "In-house catering with customizable menus, AV equipment for montage videos and music, on-site parking for 500 cars, and a dedicated event planner.",
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
                  alt: "Elegant table settings for a milestone celebration",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/6f029f31-cd81-4ccd-232e-5ee5d19a3a00/public",
                },
              },
              {
                link: null,
                video_media: null,
                media: {
                  dimensions: { width: 2464, height: 1848 },
                  alt: "Party setup with decorations in a Long Beach event venue",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/3742c9dc-4bcb-4666-3b4d-0d261819b000/public",
                },
              },
              {
                link: null,
                video_media: null,
                media: {
                  dimensions: { width: 2464, height: 1848 },
                  alt: "Guests celebrating at a milestone event at The Grand LB",
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
            headline: "115",
            eyebrow: "Average party attendance",
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
