import type { PageDoc } from "content/types";

export const graduationPartiesPage: PageDoc = {
  uid: "graduation-parties",
  data: {
    title: "Graduation Parties",
    headline: "They earned this moment",
    caption:
      "Celebrate the graduate with a party that matches the achievement.",
    video_url: null,
    meta_title: "Graduation Party Venue in Long Beach, CA | The Grand LB",
    meta_description:
      "Host a graduation party at The Grand Long Beach. 7 event spaces for 40-675 guests, in-house catering, and outdoor terraces. Near CSULB and LBSU. 20 min from LAX.",
    slices: [
      {
        type: "image_section",
        video_media: null,
        media: {
          dimensions: { width: 2816, height: 1826 },
          alt: "Daytime exterior of the venue with porte-cochere and landscaping.",
          url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/8b05ce0f-a2a7-4abb-5de6-233074cd7c00/public",
        },
        bottom_spacer: "None",
      },
      {
        type: "text_section",
        section_id: "intro",
        body: [
          {
            type: "paragraph",
            text: "From high school diplomas to doctoral degrees, every graduation marks years of hard work. At The Grand Long Beach, we help families celebrate the graduate with a party that feels as big as the accomplishment—whether that means a backyard-style gathering on the Palm Terrace or a formal dinner in The Grand Ballroom. Located minutes from CSULB and Long Beach City College, we are the local choice for graduation season.",
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
            eyebrow: "Indoor & Outdoor",
            body: [
              {
                type: "paragraph",
                text: "Choose from seven spaces including sun-filled terraces for casual celebrations and climate-controlled ballrooms for formal events—or combine both for the best of each.",
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
            eyebrow: "Any Size",
            body: [
              {
                type: "paragraph",
                text: "Hosting a small family dinner or a class-wide blowout? Our rooms range from 40 to 675 guests, and our team helps you pick the right one for your group.",
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
            eyebrow: "Hassle-Free",
            body: [
              {
                type: "paragraph",
                text: "In-house catering, AV for slideshows and speeches, on-site parking, and a planner who keeps the schedule on track so you can focus on celebrating.",
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
                  alt: "Elegant plated table: glassware, flatware, centerpiece in warm light.",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/6f029f31-cd81-4ccd-232e-5ee5d19a3a00/public",
                },
              },
              {
                link: null,
                video_media: null,
                media: {
                  dimensions: { width: 2464, height: 1848 },
                  alt: "Guests seated at a celebration with balloons and centerpieces.",
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
