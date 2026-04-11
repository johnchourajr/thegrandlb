import type { PageDoc } from "content/types";

export const businessPage: PageDoc = {
  uid: "business",
  data: {
    title: "Business",
    headline: "Business meets pleasure",
    caption: "Elevate your events with our professional touch.",
    video_url: null,
    meta_title:
      "Corporate Event Venue in Long Beach, CA | Conferences & Meetings | The Grand LB",
    meta_description:
      "Book corporate events, conferences, meetings, and team offsites at The Grand Long Beach. 7 flexible spaces for 10-675 guests, in-house catering, AV support, and free parking. 20 min from LAX.",
    slices: [
      {
        type: "image_section",
        video_media: null,
        media: {
          dimensions: {
            width: 2816,
            height: 1826,
          },
          alt: "Large ballroom for corporate or gala: stage, screen, rounds with uplighting.",
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
            text: "Elevate your corporate events at The Grand Long Beach and leave a lasting impression. Whether you're planning an executive meeting, a large conference, a team offsite, or a product launch, our event planners tailor every detail to your agenda and budget—just 20 minutes from LAX.",
            spans: [],
          },
        ],
        primary_action: "Plan Your Event",
        primary_action_link: {
          link_type: "Web",
          url: "/inquire",
        },
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
              dimensions: {
                width: 85,
                height: 84,
              },
              alt: "",
              url: "https://cdn.thegrandlb.com/elegant.svg",
            },
            number: [
              {
                type: "heading1",
                text: "",
                spans: [],
              },
            ],
            eyebrow: "Professionalism",
            body: [
              {
                type: "paragraph",
                text: "From boardroom strategy sessions to large-scale conferences, our spaces are equipped to make your team and your clients feel right at home.",
                spans: [],
              },
            ],
            action_link: null,
          },
          {
            media: {
              dimensions: {
                width: 85,
                height: 84,
              },
              alt: "",
              url: "https://cdn.thegrandlb.com/flexible.svg",
            },
            number: [
              {
                type: "heading1",
                text: "",
                spans: [],
              },
            ],
            eyebrow: "Scalability",
            body: [
              {
                type: "paragraph",
                text: "Need a focused boardroom for 10 or a ballroom for 675? We have seven spaces that flex to fit your headcount, format, and AV requirements.",
                spans: [],
              },
            ],
            action_link: null,
          },
          {
            media: {
              dimensions: {
                width: 85,
                height: 84,
              },
              alt: "",
              url: "https://cdn.thegrandlb.com/personal.svg",
            },
            eyebrow: "Full Service",
            body: [
              {
                type: "paragraph",
                text: "In-house catering, AV support, and a dedicated event planner are included so you can focus on your agenda, not the logistics.",
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
                  dimensions: {
                    width: 2464,
                    height: 1848,
                  },
                  alt: "High aerial of the venue campus, parking, and surrounding city grid.",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/023e8045-5fbe-40ff-1d88-2d6f8eaec900/public",
                },
              },
              {
                link: null,
                video_media: null,
                media: {
                  dimensions: {
                    width: 2464,
                    height: 1848,
                  },
                  alt: "Conference room with presenter and seated attendees.",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/b554ec79-70c2-4abb-18a4-f3d4e387ff00/public",
                },
              },
              {
                link: null,
                video_media: null,
                media: {
                  dimensions: {
                    width: 2464,
                    height: 1848,
                  },
                  alt: "Conference or gala room with stage, screen, and magenta uplighting.",
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
            headline: "5",
            eyebrow: "Average meetings per week",
            primary_action_link: null,
            secondary_action_link: null,
          },
          {
            headline: "780",
            eyebrow: "Meetings last year",
            primary_action_link: null,
            secondary_action_link: null,
          },
          {
            headline: "Thursday",
            eyebrow: "Most popular meeting day",
            primary_action_link: null,
            secondary_action_link: null,
          },
          {
            headline: "55",
            eyebrow: "Average meeting attendance",
            primary_action_link: null,
            secondary_action_link: null,
          },
        ],
      },
    ],
  },
};
