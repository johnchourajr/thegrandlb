// Event detail pages — uid-keyed map

import type { PageDoc } from "content/types";
import { anniversaryPartiesPage } from "./anniversary-parties.content";
import { barBatMitzvahPage } from "./bar-bat-mitzvah.content";
import { babyShowersPage } from "./baby-showers.content";
import { galasPage } from "./galas.content";
import { graduationPartiesPage } from "./graduation-parties.content";
import { indianWeddingsPage } from "./indian-weddings.content";
import { quincesPage } from "./quinces.content";
import { sweet16Page } from "./sweet-16.content";
import { rehearsalDinnersPage } from "./rehearsal-dinners.content";

export const eventPages: Record<string, PageDoc> = {
  milestones: {
    uid: "milestones",
    data: {
      title: "Milestones",
      headline: "Party in grand style",
      caption: "Celebrate your milestones in style.",
      video_url: null,
      meta_title:
        "Birthday & Anniversary Party Venue in Long Beach, CA | The Grand LB",
      meta_description:
        "Host birthday parties, anniversaries, baby showers, and milestone celebrations at The Grand Long Beach. 7 event spaces for 40-675 guests with in-house catering. 20 min from LAX.",
      slices: [
        {
          type: "image_section",
          video_media: null,
          media: {
            dimensions: {
              width: 2816,
              height: 1826,
            },
            alt: "Milestone celebration at The Grand Long Beach",
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
              text: "Celebrate birthdays, anniversaries, baby showers, and every milestone at The Grand Long Beach. Our experienced event planners help you craft a personalized celebration that fits your needs and budget, from an intimate dinner for 40 to a large-scale party for 675 guests.",
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
              eyebrow: "Sophistication",
              body: [
                {
                  type: "paragraph",
                  text: "Seven elegant indoor and outdoor spaces set the stage for celebrations of every kind, from intimate birthday dinners to large-scale quinces.",
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
              eyebrow: "Flexibility",
              body: [
                {
                  type: "paragraph",
                  text: "With spaces ranging from 40 to 675 guests, we have the right room for every milestone—whether it's an intimate gathering or a large-scale celebration.",
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
              eyebrow: "Customization",
              body: [
                {
                  type: "paragraph",
                  text: "Our event planners work with you to bring your vision to life—from custom decor and lighting to tailored menus that match your celebration's theme.",
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
                    alt: "Birthday party celebration at The Grand Long Beach",
                    url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/39670f24-73de-4ddb-91c8-b992f36ccd00/public",
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
                    alt: "Milestone celebration event setup with elegant table settings",
                    url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/6f029f31-cd81-4ccd-232e-5ee5d19a3a00/public",
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
                    alt: "Anniversary dinner at The Grand Long Beach venue",
                    url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/b974fb0d-4d15-49e8-351b-fa4018109e00/public",
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
                    alt: "Party venue decorated for a milestone celebration",
                    url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/3742c9dc-4bcb-4666-3b4d-0d261819b000/public",
                  },
                },
                {
                  link: null,
                  video_media: null,
                  media: {
                    dimensions: {
                      width: 1848,
                      height: 2464,
                    },
                    alt: "Guests celebrating at a milestone event in Long Beach",
                    url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/eedc2a6f-b2ca-4e4f-ad7e-52754836e100/public",
                  },
                },
                {
                  link: null,
                  video_media: null,
                  media: {
                    dimensions: {
                      width: 1848,
                      height: 2464,
                    },
                    alt: "Elegant event space set up for a birthday party",
                    url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/57e9f3bd-4c87-41fc-efe1-792f35567300/public",
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
              eyebrow: "Parties per week",
              primary_action_link: null,
              secondary_action_link: null,
            },
            {
              headline: "480",
              eyebrow: "Parties last year",
              primary_action_link: null,
              secondary_action_link: null,
            },
            {
              headline: "10",
              eyebrow: "Hours of parties per day",
              primary_action_link: null,
              secondary_action_link: null,
            },
            {
              headline: "Saturday",
              eyebrow: "Most popular party day",
              primary_action_link: null,
              secondary_action_link: null,
            },
            {
              headline: "115",
              eyebrow: "Average party attendance",
              primary_action_link: null,
              secondary_action_link: null,
            },
          ],
        },
      ],
    },
  },
  business: {
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
            alt: "Corporate event setup at The Grand Long Beach",
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
                    alt: "Corporate conference setup at The Grand Long Beach",
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
                    alt: "Business meeting in a private event room at The Grand LB",
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
                    alt: "Corporate event venue with professional AV setup in Long Beach",
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
  },
  weddings: {
    uid: "weddings",
    data: {
      title: "Weddings",
      headline: "Let's get married",
      caption: "Your dream wedding, made simple.",
      video_url: null,
      meta_title:
        "Wedding Venue in Long Beach, CA | The Grand LB | Ceremony & Reception",
      meta_description:
        "Plan your dream wedding at The Grand Long Beach. Indoor and outdoor ceremony and reception spaces for up to 675 guests, in-house catering, and dedicated planners. 20 min from LAX.",
      slices: [
        {
          type: "image_section",
          video_media: null,
          media: {
            dimensions: {
              width: 2816,
              height: 1826,
            },
            alt: "Wedding reception at The Grand Long Beach ballroom",
            url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/d7c0d809-c76f-4f45-62f3-9af5ad5a0400/public",
          },
          bottom_spacer: "None",
        },
        {
          type: "text_section",
          section_id: "intro",
          body: [
            {
              type: "paragraph",
              text: "Your wedding day deserves a venue that rises to the occasion. At The Grand Long Beach, we offer wedding packages for every style and budget—from intimate garden ceremonies on the Palm Terrace to grand ballroom receptions for up to 675 guests. Our dedicated wedding planners handle the details so you can focus on each other.",
              spans: [],
            },
          ],
          primary_action: "Plan Your Wedding",
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
              eyebrow: "Elegant",
              body: [
                {
                  type: "paragraph",
                  text: "Seven indoor and outdoor spaces—from the sunlit Palm Terrace to The Grand Ballroom—provide a stunning setting for your wedding ceremony and reception.",
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
              eyebrow: "Versatility",
              body: [
                {
                  type: "paragraph",
                  text: "Whether you envision a traditional ceremony, a modern celebration, or a multicultural wedding, our spaces adapt to your style with flexible layouts for 40 to 675 guests.",
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
                  text: "In-house catering, AV equipment, on-site parking for 500 cars, and a dedicated wedding planner are included so you can focus on the celebration.",
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
                      width: 2466,
                      height: 1850,
                    },
                    alt: "Wedding ceremony at The Grand Long Beach venue",
                    url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/c647a4c0-5d20-4460-82ad-d029b7c14800/public",
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
                    alt: "Wedding reception table setup with elegant decor",
                    url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/c94179f3-6554-4e3a-0f02-c9818b0e4600/public",
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
                    alt: "Bride and groom at their reception in The Grand Ballroom",
                    url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/358f8b46-075f-469b-567b-4e0e9f02ee00/public",
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
                    alt: "Wedding venue with floral arrangements at The Grand LB",
                    url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/20cb49a5-6155-4016-44a5-eb72a13d9d00/public",
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
                    alt: "Couple dancing at their wedding reception in Long Beach",
                    url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/14280994-4b15-4ee4-d9e5-0ca3e1e4d600/public",
                  },
                },
              ],
            },
          },
          video_media: null,
          asset_position: false,
          items: [
            {
              headline: "25",
              eyebrow: "Average couple age",
              primary_action_link: null,
              secondary_action_link: null,
            },
            {
              headline: "400+",
              eyebrow: "Weddings last year",
              primary_action_link: null,
              secondary_action_link: null,
            },
            {
              headline: "4 hrs",
              eyebrow: "Average wedding duration",
              primary_action_link: null,
              secondary_action_link: null,
            },
            {
              headline: "Saturday",
              eyebrow: "Most popular wedding day",
              body: [
                {
                  type: "paragraph",
                  text: "Talk to our sales team about discounts for other days of the week.",
                  spans: [],
                },
              ],
              primary_action_link: null,
              secondary_action_link: null,
            },
            {
              headline: "320",
              eyebrow: "Average number of wedding guests",
              primary_action_link: null,
              secondary_action_link: null,
            },
          ],
        },
      ],
    },
  },
  quinces: quincesPage,
  "indian-weddings": indianWeddingsPage,
  "sweet-16": sweet16Page,
  "bar-bat-mitzvah": barBatMitzvahPage,
  "graduation-parties": graduationPartiesPage,
  galas: galasPage,
  "baby-showers": babyShowersPage,
  "rehearsal-dinners": rehearsalDinnersPage,
  "anniversary-parties": anniversaryPartiesPage,
};

/** UIDs for generateStaticParams */
export const eventPageUids = [
  "milestones",
  "business",
  "weddings",
  "quinces",
  "indian-weddings",
  "sweet-16",
  "bar-bat-mitzvah",
  "graduation-parties",
  "galas",
  "baby-showers",
  "rehearsal-dinners",
  "anniversary-parties",
];
