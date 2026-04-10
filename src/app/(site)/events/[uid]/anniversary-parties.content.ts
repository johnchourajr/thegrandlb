import type { PageDoc } from "content/types";

export const anniversaryPartiesPage: PageDoc = {
  uid: "anniversary-parties",
  data: {
    title: "Anniversary Parties",
    headline: "Celebrate the years together",
    caption: "Mark the milestone with a venue that honors the journey.",
    video_url: null,
    meta_title: "Anniversary Party Venue in Long Beach, CA | The Grand LB",
    meta_description:
      "Host an anniversary party at The Grand Long Beach. Elegant indoor and outdoor event spaces for 40-675 guests with in-house catering and dedicated planners. 20 min from LAX.",
    slices: [
      {
        type: "image_section",
        video_media: null,
        media: {
          dimensions: { width: 2816, height: 1826 },
          alt: "Anniversary celebration dinner at The Grand Long Beach",
          url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/b974fb0d-4d15-49e8-351b-fa4018109e00/public",
        },
        bottom_spacer: "None",
      },
      {
        type: "text_section",
        section_id: "intro",
        body: [
          {
            type: "paragraph",
            text: "Whether it is a golden 50th anniversary or a first-year celebration, The Grand Long Beach provides the setting your milestone deserves. Our seven indoor and outdoor spaces accommodate everything from intimate dinners for close family to large-scale parties with live music and dancing. Our team has been hosting celebrations for over 55 years—we know what it takes to make an anniversary feel truly special.",
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
            eyebrow: "Elegant",
            body: [
              {
                type: "paragraph",
                text: "Our ballrooms and garden spaces set an elegant tone for anniversary celebrations—from candlelit dinners to lively cocktail receptions with photo montages.",
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
            eyebrow: "Flexible",
            body: [
              {
                type: "paragraph",
                text: "Host 40 close family members in The Garden Room or 675 guests in The Grand Ballroom. We match the space to the scope of your celebration.",
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
            eyebrow: "Personal Touch",
            body: [
              {
                type: "paragraph",
                text: "In-house catering with customizable menus, AV for slideshows and speeches, and a dedicated planner who brings your vision to life.",
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
                  alt: "Anniversary dinner setup with elegant decor",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/b974fb0d-4d15-49e8-351b-fa4018109e00/public",
                },
              },
              {
                link: null,
                video_media: null,
                media: {
                  dimensions: { width: 2464, height: 1848 },
                  alt: "Outdoor terrace celebration at The Grand Long Beach",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/9d0dccc6-cc37-4965-8019-d351ad9f3700/public",
                },
              },
              {
                link: null,
                video_media: null,
                media: {
                  dimensions: { width: 2464, height: 1848 },
                  alt: "Guests celebrating a milestone at The Grand LB",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/eedc2a6f-b2ca-4e4f-ad7e-52754836e100/public",
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
            headline: "55+",
            eyebrow: "Years of hosting celebrations",
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
        ],
      },
    ],
  },
};
