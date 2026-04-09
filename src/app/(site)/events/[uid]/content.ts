// Event detail pages — uid-keyed map

import type { PageDoc } from "content/types";

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
  quinces: {
    uid: "quinces",
    data: {
      title: "Quinces",
      headline: "Celebrate her grand day",
      caption: "A quinceañera venue as unforgettable as the moment itself.",
      video_url: null,
      meta_title:
        "Quinceañera Venue in Long Beach, CA | The Grand LB | Quince Party",
      meta_description:
        "Host your quinceañera at The Grand Long Beach. 7 elegant indoor and outdoor event spaces for up to 675 guests, in-house catering, and bilingual event coordinators in Long Beach, CA.",
      slices: [
        {
          type: "image_section",
          video_media: null,
          media: {
            dimensions: {
              width: 2816,
              height: 1826,
            },
            alt: "Quinceañera celebration at The Grand Long Beach ballroom with elegant decor",
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
              text: "A quinceañera marks one of life's most meaningful milestones. At The Grand Long Beach, we help families create celebrations that honor tradition while reflecting each young woman's personality. Our experienced bilingual event coordinators handle the details—from the waltz rehearsal space to the last dance—so your family can focus on the celebration.",
              spans: [],
            },
          ],
          primary_action: "Plan Your Quinceañera",
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
          bottom_spacer: "Small",
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
              eyebrow: "Tradition",
              body: [
                {
                  type: "paragraph",
                  text: "Our ballrooms and event spaces provide a stunning backdrop for the waltz, the changing of shoes, and every meaningful tradition of the quinceañera ceremony.",
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
                  text: "Whether you're hosting 40 close family members or 675 guests for a grand fiesta, we have seven spaces that fit your vision and your guest list.",
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
                  text: "In-house catering with customizable menus, bilingual coordinators, AV for your DJ or live band, and a dedicated planner to bring your theme to life.",
                  spans: [],
                },
              ],
              action_link: null,
            },
          ],
        },
        {
          type: "text_section",
          section_id: "details",
          body: [
            {
              type: "paragraph",
              text: "From the grand entrance to the last toast, The Grand Long Beach has been hosting quinceañeras and milestone celebrations for over 55 years. Our team understands the cultural significance of this tradition and works closely with families to make sure every element—from the chambelanes' entrance to the surprise dance—is executed with care.",
              spans: [],
            },
            {
              type: "paragraph",
              text: "Our venue is located in the heart of Long Beach, just 20 minutes from LAX, making it easy for family and friends traveling from across Southern California and beyond. With on-site parking for up to 500 cars, your guests will arrive stress-free.",
              spans: [],
            },
          ],
          primary_action: null,
          primary_action_link: null,
          secondary_action_link: null,
          top_spacer: "Small",
          top_border: true,
          bottom_spacer: "Small",
          bottom_border: false,
        },
        {
          type: "faq_section",
          section_id: "faq",
          title: "Quinceañera FAQs",
          gallery: {
            data: {
              gallery_items: [
                {
                  caption: "The Grand Ballroom",
                  link: null,
                  video_media: null,
                  media: {
                    dimensions: {
                      width: 2464,
                      height: 1848,
                    },
                    alt: "Grand Ballroom set up for a quinceañera celebration",
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
                    alt: "Palm Terrace outdoor event space for quinceañera photos",
                    url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/9d0dccc6-cc37-4965-8019-d351ad9f3700/public",
                  },
                },
                {
                  caption: "The Monarch Room",
                  link: null,
                  video_media: null,
                  media: {
                    dimensions: {
                      width: 2464,
                      height: 1848,
                    },
                    alt: "Monarch Room decorated for a quinceañera party",
                    url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/3742c9dc-4bcb-4666-3b4d-0d261819b000/public",
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
                  text: "How many guests can you accommodate for a quinceañera?",
                  spans: [],
                },
              ],
              answer: [
                {
                  type: "paragraph",
                  text: "We have seven event spaces that range from intimate rooms for 40 guests to The Grand Ballroom, which seats up to 675. Most quinceañeras at our venue host between 150 and 400 guests.",
                  spans: [],
                },
              ],
            },
            {
              question: [
                {
                  type: "paragraph",
                  text: "Do you offer quinceañera packages?",
                  spans: [],
                },
              ],
              answer: [
                {
                  type: "paragraph",
                  text: "Yes. We offer customizable quince packages that include the venue, in-house catering, a dedicated event coordinator, tables, chairs, linens, and AV equipment. Our sales team will work with you to build a package that fits your budget and your vision.",
                  spans: [],
                },
              ],
            },
            {
              question: [
                {
                  type: "paragraph",
                  text: "Can we bring our own DJ, decorations, or outside vendors?",
                  spans: [],
                },
              ],
              answer: [
                {
                  type: "paragraph",
                  text: "Absolutely. You are welcome to bring your own DJ, decorators, photographer, and other vendors. We do ask that all outside vendors meet our safety and insurance requirements. Our team can also recommend trusted local vendors we've worked with.",
                  spans: [],
                },
              ],
            },
            {
              question: [
                {
                  type: "paragraph",
                  text: "Is there space for the waltz rehearsal?",
                  spans: [],
                },
              ],
              answer: [
                {
                  type: "paragraph",
                  text: "Yes. We can arrange rehearsal time in your booked space before the event day. Talk to your event coordinator about scheduling a walkthrough and rehearsal.",
                  spans: [],
                },
              ],
            },
            {
              question: [
                {
                  type: "paragraph",
                  text: "Do you have bilingual staff?",
                  spans: [],
                },
              ],
              answer: [
                {
                  type: "paragraph",
                  text: "Yes. Many of our event coordinators and staff members are bilingual in English and Spanish. We want every family to feel comfortable throughout the planning process and on the day of the celebration.",
                  spans: [],
                },
              ],
            },
            {
              question: [
                {
                  type: "paragraph",
                  text: "What catering options are available for quinceañeras?",
                  spans: [],
                },
              ],
              answer: [
                {
                  type: "paragraph",
                  text: "Our in-house kitchen offers customizable menus including plated dinners, buffet service, and action stations. We can accommodate a range of cuisines and dietary needs. If you prefer an outside caterer, please discuss options with our sales team.",
                  spans: [],
                },
              ],
            },
          ],
        },
      ],
    },
  },
  "indian-weddings": {
    uid: "indian-weddings",
    data: {
      title: "Indian Weddings",
      headline: "Your grand celebration, honored",
      caption:
        "A venue built for the scale and beauty of South Asian weddings.",
      video_url: null,
      meta_title:
        "Indian Wedding Venue in Long Beach, CA | South Asian Weddings | The Grand LB",
      meta_description:
        "Host your Indian wedding at The Grand Long Beach. Indoor and outdoor spaces for up to 675 guests, in-house catering, and flexible layouts for baraat, ceremony, and reception. 20 min from LAX.",
      slices: [
        {
          type: "image_section",
          video_media: null,
          media: {
            dimensions: { width: 2816, height: 1826 },
            alt: "Grand Ballroom set up for a large Indian wedding reception at The Grand Long Beach",
            url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/ba00e56c-e108-4405-26e1-f16ba5b35c00/public",
          },
          bottom_spacer: "None",
        },
        {
          type: "text_section",
          section_id: "intro",
          body: [
            {
              type: "paragraph",
              text: "Indian weddings are multi-day celebrations that deserve a venue built for grandeur. At The Grand Long Beach, our 40,000 sq ft property provides the space and flexibility for every event in your wedding weekend -- from the mehndi and sangeet to the baraat procession, ceremony, and reception. Our 11-acre grounds give you room for the baraat entrance, and our seven indoor and outdoor spaces adapt to each function's unique needs.",
              spans: [],
            },
          ],
          primary_action: "Plan Your Wedding",
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
          bottom_spacer: "Small",
          items: [
            {
              media: {
                dimensions: { width: 85, height: 84 },
                alt: "",
                url: "https://cdn.thegrandlb.com/elegant.svg",
              },
              number: [{ type: "heading1", text: "", spans: [] }],
              eyebrow: "Scale",
              body: [
                {
                  type: "paragraph",
                  text: "The Grand Ballroom seats up to 675 guests for the reception, with additional spaces for the ceremony, cocktail hour, and pre-wedding events -- all on a single property.",
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
                  text: "Multiple events across multiple days? Our team coordinates room turnovers, vendor access, and logistics so each function flows seamlessly into the next.",
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
              eyebrow: "In-House Catering",
              body: [
                {
                  type: "paragraph",
                  text: "Our kitchen works with you to create menus that reflect your heritage -- from traditional Indian cuisine to fusion options. We accommodate vegetarian, vegan, and dietary requirements for large guest counts.",
                  spans: [],
                },
              ],
              action_link: null,
            },
          ],
        },
        {
          type: "text_section",
          section_id: "details",
          body: [
            {
              type: "paragraph",
              text: "The Grand Long Beach has hosted South Asian weddings of every tradition -- Hindu, Sikh, Muslim, and interfaith. Our outdoor Palm Terrace and 11-acre grounds provide a natural setting for the baraat procession, while The Grand Ballroom offers the scale and acoustics for a lively sangeet or reception with live music and dancing.",
              spans: [],
            },
            {
              type: "paragraph",
              text: "Located in the heart of Long Beach, just 20 minutes from LAX, our venue is easy to reach for family traveling from across the country and abroad. On-site parking accommodates up to 500 cars, and nearby hotels offer group rates for out-of-town guests.",
              spans: [],
            },
          ],
          primary_action: null,
          primary_action_link: null,
          secondary_action_link: null,
          top_spacer: "Small",
          top_border: true,
          bottom_spacer: "Small",
          bottom_border: false,
        },
        {
          type: "faq_section",
          section_id: "faq",
          title: "Indian Wedding FAQs",
          gallery: {
            data: {
              gallery_items: [
                {
                  caption: "The Grand Ballroom",
                  link: null,
                  video_media: null,
                  media: {
                    dimensions: { width: 2464, height: 1848 },
                    alt: "Grand Ballroom configured for a large Indian wedding celebration",
                    url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/ba00e56c-e108-4405-26e1-f16ba5b35c00/public",
                  },
                },
                {
                  caption: "The Palm Terrace",
                  link: null,
                  video_media: null,
                  media: {
                    dimensions: { width: 2464, height: 1848 },
                    alt: "Palm Terrace outdoor space for baraat procession and ceremonies",
                    url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/9d0dccc6-cc37-4965-8019-d351ad9f3700/public",
                  },
                },
                {
                  caption: "The Monarch Room",
                  link: null,
                  video_media: null,
                  media: {
                    dimensions: { width: 2464, height: 1848 },
                    alt: "Monarch Room set up for a sangeet or mehndi event",
                    url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/3742c9dc-4bcb-4666-3b4d-0d261819b000/public",
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
                  text: "Can you host a full Indian wedding weekend with multiple events?",
                  spans: [],
                },
              ],
              answer: [
                {
                  type: "paragraph",
                  text: "Yes. We regularly host multi-day celebrations including mehndi, sangeet, ceremony, and reception. Our team coordinates room setups, vendor schedules, and turnovers across events so each function gets its own dedicated space and attention.",
                  spans: [],
                },
              ],
            },
            {
              question: [
                {
                  type: "paragraph",
                  text: "Is there space for a baraat procession?",
                  spans: [],
                },
              ],
              answer: [
                {
                  type: "paragraph",
                  text: "Absolutely. Our 11-acre grounds and outdoor spaces provide room for the baraat procession, whether you are arriving by horse, car, or on foot with your party. We work with you and your vendors to plan the route and logistics.",
                  spans: [],
                },
              ],
            },
            {
              question: [
                {
                  type: "paragraph",
                  text: "Can your kitchen prepare Indian cuisine?",
                  spans: [],
                },
              ],
              answer: [
                {
                  type: "paragraph",
                  text: "Our in-house kitchen can work with you on customized menus. We also welcome outside caterers specializing in Indian cuisine. Discuss your preferences with our sales team during the planning process.",
                  spans: [],
                },
              ],
            },
            {
              question: [
                {
                  type: "paragraph",
                  text: "How many guests can you accommodate?",
                  spans: [],
                },
              ],
              answer: [
                {
                  type: "paragraph",
                  text: "The Grand Ballroom seats up to 675 guests for a reception. For ceremonies with a mandap setup, capacity depends on the layout. Our team will help you plan the right configuration for your guest count.",
                  spans: [],
                },
              ],
            },
            {
              question: [
                {
                  type: "paragraph",
                  text: "Do you allow fire ceremonies or open flames for Hindu ceremonies?",
                  spans: [],
                },
              ],
              answer: [
                {
                  type: "paragraph",
                  text: "We accommodate traditional ceremonies that involve fire elements like the Agni (sacred fire). Our team works with you and the officiant to ensure all safety requirements are met while respecting the significance of the ceremony.",
                  spans: [],
                },
              ],
            },
            {
              question: [
                {
                  type: "paragraph",
                  text: "Are there hotels nearby for out-of-town guests?",
                  spans: [],
                },
              ],
              answer: [
                {
                  type: "paragraph",
                  text: "Yes. Several hotels near our Long Beach venue offer group rates for wedding guests. We are also just 20 minutes from LAX, making travel convenient for guests flying in from across the country or internationally.",
                  spans: [],
                },
              ],
            },
          ],
        },
      ],
    },
  },
  "sweet-16": {
    uid: "sweet-16",
    data: {
      title: "Sweet 16",
      headline: "Make it a night to remember",
      caption: "A Sweet 16 celebration as bold as the guest of honor.",
      video_url: null,
      meta_title:
        "Sweet 16 Party Venue in Long Beach, CA | The Grand LB",
      meta_description:
        "Throw a Sweet 16 party at The Grand Long Beach. 7 event spaces for 40-675 guests with in-house catering, DJ-ready AV, and dedicated event planners in Long Beach, CA. 20 min from LAX.",
      slices: [
        {
          type: "image_section",
          video_media: null,
          media: {
            dimensions: { width: 2816, height: 1826 },
            alt: "Sweet 16 party celebration at The Grand Long Beach venue",
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
              text: "A Sweet 16 is a once-in-a-lifetime milestone. At The Grand Long Beach, we give your celebration the space and style it deserves -- from intimate dinners with close friends to full-scale parties with a DJ, dance floor, and custom lighting. Our event planners handle the details so the guest of honor and their family can enjoy every moment.",
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
                  text: "From uplighting and photo backdrops to themed decor, our spaces transform into the vibe your teen envisions -- elegant, modern, or all-out fun.",
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
                    alt: "Party venue with dance floor setup for a Sweet 16",
                    url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/39670f24-73de-4ddb-91c8-b992f36ccd00/public",
                  },
                },
                {
                  link: null,
                  video_media: null,
                  media: {
                    dimensions: { width: 2464, height: 1848 },
                    alt: "Elegant table settings for a birthday celebration at The Grand LB",
                    url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/6f029f31-cd81-4ccd-232e-5ee5d19a3a00/public",
                  },
                },
                {
                  link: null,
                  video_media: null,
                  media: {
                    dimensions: { width: 2464, height: 1848 },
                    alt: "Decorated event space for a milestone birthday party",
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
  },
  "bar-bat-mitzvah": {
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
  },
  "graduation-parties": {
    uid: "graduation-parties",
    data: {
      title: "Graduation Parties",
      headline: "They earned this moment",
      caption:
        "Celebrate the graduate with a party that matches the achievement.",
      video_url: null,
      meta_title:
        "Graduation Party Venue in Long Beach, CA | The Grand LB",
      meta_description:
        "Host a graduation party at The Grand Long Beach. 7 event spaces for 40-675 guests, in-house catering, and outdoor terraces. Near CSULB and LBSU. 20 min from LAX.",
      slices: [
        {
          type: "image_section",
          video_media: null,
          media: {
            dimensions: { width: 2816, height: 1826 },
            alt: "Graduation party celebration at The Grand Long Beach",
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
              text: "From high school diplomas to doctoral degrees, every graduation marks years of hard work. At The Grand Long Beach, we help families celebrate the graduate with a party that feels as big as the accomplishment -- whether that means a backyard-style gathering on the Palm Terrace or a formal dinner in The Grand Ballroom. Located minutes from CSULB and Long Beach City College, we are the local choice for graduation season.",
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
                  text: "Choose from seven spaces including sun-filled terraces for casual celebrations and climate-controlled ballrooms for formal events -- or combine both for the best of each.",
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
                    alt: "Outdoor terrace celebration at The Grand Long Beach",
                    url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/9d0dccc6-cc37-4965-8019-d351ad9f3700/public",
                  },
                },
                {
                  link: null,
                  video_media: null,
                  media: {
                    dimensions: { width: 2464, height: 1848 },
                    alt: "Event space with elegant table settings for a celebration",
                    url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/6f029f31-cd81-4ccd-232e-5ee5d19a3a00/public",
                  },
                },
                {
                  link: null,
                  video_media: null,
                  media: {
                    dimensions: { width: 2464, height: 1848 },
                    alt: "Guests at a celebration event in Long Beach",
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
  },
  galas: {
    uid: "galas",
    data: {
      title: "Galas & Holiday Events",
      headline: "Set the standard",
      caption:
        "Galas, fundraisers, and holiday events with the polish they demand.",
      video_url: null,
      meta_title:
        "Gala & Holiday Party Venue in Long Beach, CA | The Grand LB",
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
  },
  "baby-showers": {
    uid: "baby-showers",
    data: {
      title: "Baby Showers",
      headline: "Celebrate the newest arrival",
      caption:
        "An event space as special as the little one on the way.",
      video_url: null,
      meta_title:
        "Baby Shower Venue in Long Beach, CA | The Grand LB",
      meta_description:
        "Host a baby shower at The Grand Long Beach. Intimate indoor and outdoor event spaces for 40-200 guests with in-house catering and dedicated planners in Long Beach, CA.",
      slices: [
        {
          type: "image_section",
          video_media: null,
          media: {
            dimensions: { width: 2816, height: 1826 },
            alt: "Elegant baby shower celebration at The Grand Long Beach venue",
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
              text: "A baby shower should feel personal and warm. At The Grand Long Beach, our intimate event spaces -- from the sun-drenched Garden Room to the indoor-outdoor Monarch Room -- give you a setting that feels elevated without being overdone. Our in-house catering handles everything from brunch spreads to afternoon tea service, and our event planners help bring your theme to life.",
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
                  text: "The Garden Room, Pacific Room, and Monarch Room offer cozy, light-filled settings that are ideal for showers of 40 to 280 guests -- sized to feel full and festive.",
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
                    alt: "Outdoor terrace set up for an intimate celebration",
                    url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/9d0dccc6-cc37-4965-8019-d351ad9f3700/public",
                  },
                },
                {
                  link: null,
                  video_media: null,
                  media: {
                    dimensions: { width: 2464, height: 1848 },
                    alt: "Intimate event space with elegant decor at The Grand LB",
                    url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/57e9f3bd-4c87-41fc-efe1-792f35567300/public",
                  },
                },
                {
                  link: null,
                  video_media: null,
                  media: {
                    dimensions: { width: 2464, height: 1848 },
                    alt: "Beautiful garden-view event room in Long Beach",
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
  },
  "rehearsal-dinners": {
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
  },
  "anniversary-parties": {
    uid: "anniversary-parties",
    data: {
      title: "Anniversary Parties",
      headline: "Celebrate the years together",
      caption:
        "Mark the milestone with a venue that honors the journey.",
      video_url: null,
      meta_title:
        "Anniversary Party Venue in Long Beach, CA | The Grand LB",
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
              text: "Whether it is a golden 50th anniversary or a first-year celebration, The Grand Long Beach provides the setting your milestone deserves. Our seven indoor and outdoor spaces accommodate everything from intimate dinners for close family to large-scale parties with live music and dancing. Our team has been hosting celebrations for over 55 years -- we know what it takes to make an anniversary feel truly special.",
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
                  text: "Our ballrooms and garden spaces set an elegant tone for anniversary celebrations -- from candlelit dinners to lively cocktail receptions with photo montages.",
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
  },
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
