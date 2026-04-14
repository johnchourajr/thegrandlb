// Home page content

import type { PageDoc } from "content/types";

export const homePage: PageDoc = {
  uid: "home",
  data: {
    title: "The Grand Long Beach Event Center",
    video_url: null,
    meta_title:
      "The Grand LB | Premier Event Venue & Weddings in Long Beach, CA",
    meta_description:
      "SoCal's premier 40,000 sqft event venue for weddings, corporate events, and milestone celebrations. 7 unique spaces, in-house catering, and 55+ years of expertise. 20 minutes from LAX.",
    slices: [
      {
        type: "page_hero",
        section_id: "hero",
        headline: "Where Moments Become Memories",
        video_media: null,
        video_url:
          "https://cdn.thegrandlb.com/7cff637b-d646-493b-9e81-06266373f84c-homepage-60s-final.mp4",
        media: {
          dimensions: {
            width: 3840,
            height: 2160,
          },
          alt: "Twilight exterior of the venue with palms and dramatic sky.",
          url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/b41a724a-b3ad-40ae-57df-98a1b8ce3400/public",
        },
        primary_action: "Make an Inquiry",
        primary_action_link: {
          link_type: "Web",
          url: "/inquire",
        },
        secondary_action: "Take a Tour",
        secondary_action_link: {
          link_type: "Web",
          url: "/tour",
        },
        bottom_spacer: "None",
      },
      {
        type: "tile_grid",
        section_id: "home-tiles",
        top_spacer: "None",
        bottom_spacer: "Small",
        items: [
          {
            media: {
              dimensions: {
                width: 217,
                height: 216,
              },
              alt: "Couple illustration",
              url: "https://cdn.thegrandlb.com/lovely-couple.svg",
            },
            headline: "Tour the spaces",
            body: "Explore our venue virtually and discover the grand possibilities for your next event.",
            link: {
              link_type: "Web",
              url: "/tour",
            },
            theme: "White/Black",
            col_start: "Start 1",
            col_span: "Span 4",
            row_start: "Start 1",
            row_span: "Span 2",
          },
          {
            media: {
              dimensions: {
                width: 216,
                height: 216,
              },
              alt: "The grand entrance",
              url: "https://cdn.thegrandlb.com/entry.svg",
            },
            headline: "See what we do",
            body: "Experience our exceptional events and services first-hand through our gallery and client testimonials.",
            link: {
              link_type: "Web",
              url: "/events",
            },
            theme: "White/Black",
            col_start: "Start 5",
            col_span: "Span 4",
            row_start: "Start 2",
            row_span: "Span 2",
          },
          {
            card_fragment: {
              data: {
                headline: "Inquire Today",
                direction: "Col Reverse",
                col_start: "Start 9",
                media: {
                  dimensions: {
                    width: 216,
                    height: 216,
                  },
                  alt: null,
                  url: "https://cdn.thegrandlb.com/invert-true-2.svg",
                },
                row_start: "Start 1",
                theme: "Gold/Black",
                row_span: "Span 3",
                size: "Large",
                col_span: "Span 4",
                link: {
                  link_type: "Web",
                  url: "/inquire",
                },
                eyebrow: "Let's Talk",
              },
            },
            media: {
              dimensions: {
                width: 217,
                height: 216,
              },
              alt: "A phone ringing off the hook",
              url: "https://cdn.thegrandlb.com/ring.svg",
            },
            eyebrow: "Let's talk",
            headline: "Inquire today",
            link: {
              link_type: "Web",
              url: "/inquire",
            },
            theme: "Gold/Black",
            size: "Large",
            direction: "Col Reverse",
            col_start: "Start 9",
            col_span: "Span 4",
            row_start: "Start 1",
            row_span: "Span 3",
          },
          {
            headline: "See our menus",
            link: {
              link_type: "Web",
              url: "/menus",
            },
            theme: "Outlined",
            col_start: "Start 5",
            col_span: "Span 4",
            row_start: "Start 1",
            row_span: "Span 1",
          },
          {
            headline: "Meet the team",
            link: {
              link_type: "Web",
              url: "/about",
            },
            theme: "Outlined",
            col_start: "Start 1",
            col_span: "Span 4",
            row_start: "Start 3",
            row_span: "Span 1",
          },
        ],
      },
      {
        type: "scroll_text",
        section_id: "scroller",
        top_title: "Your Grand",
        line_one: "Quinces & Birthdays & Engagements & Weddings & Banquets &",
        line_two: "Conferences & Church Services & Pageants & Fundraisers &",
        bottom_title: "Start here.",
        primary_action: "See the Possibilities",
        primary_action_link: {
          link_type: "Web",
          url: "/events",
        },
        top_spacer: "Large",
        bottom_spacer: "Small",
      },
      {
        type: "split_gallery",
        section_id: "gallery",
        gallery_left: {
          data: {
            gallery_items: [
              {
                caption: "Grand Exterior",
                link: null,
                video_media: null,
                media: {
                  dimensions: {
                    width: 2464,
                    height: 1849,
                  },
                  alt: "Daytime exterior of the modern venue facade and signage.",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/62bc010e-8ab6-42cd-5207-9160ff96f700/public",
                },
              },
              {
                caption: "Grand Walkway",
                link: null,
                video_media: null,
                media: {
                  dimensions: {
                    width: 2465,
                    height: 1849,
                  },
                  alt: "Palm-lined walkway leading toward the lit venue entrance.",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/1433ea04-6645-4d6a-2468-cf8b4fb04100/public",
                },
              },
              {
                caption: "Grand Entrance",
                link: null,
                video_media: null,
                media: {
                  dimensions: {
                    width: 2465,
                    height: 1849,
                  },
                  alt: "Grand entrance hallway with chandelier and checkered floor.",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/da91e312-621d-4a89-4ec7-c627dbcfe100/public",
                },
              },
              {
                link: null,
                video_media: null,
                media: {
                  dimensions: {
                    width: 1849,
                    height: 2464,
                  },
                  alt: "Large event hall with rounds, stage, and blue lighting accents.",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/5dc64eb6-f953-4d0a-479f-ba4ab10fc500/public",
                },
              },
            ],
          },
        },
        gallery_right: {
          data: {
            gallery_items: [
              {
                link: null,
                video_media: null,
                media: {
                  dimensions: {
                    width: 1847,
                    height: 2464,
                  },
                  alt: "Close table setting with glassware and low floral centerpiece.",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/babaa885-4edc-4fb7-63c6-5693245c4e00/public",
                },
              },
              {
                link: null,
                video_media: null,
                media: {
                  dimensions: {
                    width: 2465,
                    height: 1848,
                  },
                  alt: "Reception tables with tall floral centerpieces and ambient uplighting.",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/17563442-2ec9-45eb-9451-d8dfdbd20b00/public",
                },
              },
              {
                link: null,
                video_media: null,
                media: {
                  dimensions: {
                    width: 1845,
                    height: 2464,
                  },
                  alt: "Guests mingling in a warmly lit reception space.",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/d8b7f538-ec4f-4688-e22b-f6706a576a00/public",
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
                  alt: "Large ballroom with blue uplighting and stage.",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/6d437bce-c364-42fa-aa3d-8686a2fa3f00/public",
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
                  alt: "Close-up of a tall floral centerpiece with candles and glassware.",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/531e6536-68f1-4105-86e5-fe56512fdd00/public",
                },
              },
            ],
          },
        },
        offset_reverse: true,
        top_spacer: "Large",
        bottom_spacer: "Medium",
      },
      {
        type: "homepage_numbers",
        section_id: "numbers",
        title: "By the Numbers",
        top_spacer: "Large",
        bottom_spacer: "None",
        number_list: {
          data: {
            primary_action_link: {
              link_type: "Web",
              url: "/tour",
            },
            bullet_list: [
              {
                media: {
                  dimensions: {
                    width: 71,
                    height: 70,
                  },
                  alt: null,
                  url: "https://cdn.thegrandlb.com/car.svg",
                },
                body: [
                  {
                    type: "paragraph",
                    text: "Dedicated Parking Structure",
                    spans: [],
                  },
                ],
                action_link: null,
              },
              {
                media: {
                  dimensions: {
                    width: 70,
                    height: 70,
                  },
                  alt: null,
                  url: "https://cdn.thegrandlb.com/wifi.svg",
                },
                body: [
                  {
                    type: "paragraph",
                    text: "Complimentary Wi-Fi",
                    spans: [],
                  },
                ],
                action_link: null,
              },
              {
                media: {
                  dimensions: {
                    width: 71,
                    height: 70,
                  },
                  alt: null,
                  url: "https://cdn.thegrandlb.com/food.svg",
                },
                body: [
                  {
                    type: "paragraph",
                    text: "World Class Kitchen",
                    spans: [],
                  },
                ],
                action_link: null,
              },
            ],
            numberlist: [
              {
                number: [
                  {
                    type: "heading1",
                    text: "11",
                    spans: [],
                  },
                ],
                eyebrow: "Acres",
                action_link: null,
              },
              {
                number: [
                  {
                    type: "heading1",
                    text: "40K",
                    spans: [],
                  },
                ],
                eyebrow: "Square Feet",
                action_link: null,
              },
              {
                number: [
                  {
                    type: "heading1",
                    text: "7",
                    spans: [],
                  },
                ],
                eyebrow: "Spaces",
                action_link: null,
              },
            ],
            primary_action: "Take a tour",
          },
        },
      },
      {
        type: "homepage_location",
        section_id: "locale",
        video_media: null,
        video_url:
          "https://cdn.thegrandlb.com/2a63ded8-77f1-4838-ab41-da32d6e887df-community-section-30s-final.mp4",
        media: {
          dimensions: {
            width: 3840,
            height: 2160,
          },
          alt: "Aerial twilight over the venue block and adjacent streets.",
          url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/52b8ff11-1b88-41c1-72e8-512662e19700/public",
        },
        title: "Family-owned and rooted.",
        description:
          "This place is more than just a venue, it's a hub of social activity that sits at the center of the Long Beach community, where people from all walks of life can come together to celebrate, network, and make memories that last a lifetime. Our 55+ years of expertise and local roots make us the premier event venue for all your SoCal events.",
        top_spacer: "Large",
        bottom_spacer: "Large",
        address_label: "Find Us",
        address: [
          {
            type: "paragraph",
            text: "4101 E. Willow St.\nLong Beach, CA 90815",
            spans: [],
          },
        ],
        action_text: "Get Directions",
        action_link: {
          link_type: "Web",
          url: "https://www.google.com/maps/place/4101-e-willow-st,+long-beach-ca-90815/",
          target: "_blank",
        },
        bullet_list: {
          data: {
            bullet_list: [
              {
                media: {
                  dimensions: {
                    width: 71,
                    height: 70,
                  },
                  alt: null,
                  url: "https://cdn.thegrandlb.com/map.svg",
                },
                body: [
                  {
                    type: "paragraph",
                    text: "20 Minutes from \nLAX Airport",
                    spans: [],
                  },
                ],
                action_link: null,
              },
              {
                media: {
                  dimensions: {
                    width: 70,
                    height: 70,
                  },
                  alt: null,
                  url: "https://cdn.thegrandlb.com/walkin.svg",
                },
                body: [
                  {
                    type: "paragraph",
                    text: "Walking Distance to \nHotel Accommodations",
                    spans: [],
                  },
                ],
                action_link: null,
              },
              {
                media: {
                  dimensions: {
                    width: 71,
                    height: 70,
                  },
                  alt: null,
                  url: "https://cdn.thegrandlb.com/fly.svg",
                },
                body: [
                  {
                    type: "paragraph",
                    text: "5 Minutes from \nLong Beach Airport",
                    spans: [],
                  },
                ],
                action_link: null,
              },
            ],
          },
        },
      },
      {
        type: "star_section",
        section_id: "ratings",
        title: "The proof is in the pudding",
        top_spacer: "Large",
        bottom_spacer: "None",
        show_customer_reviews: true,
        items: [
          {
            logo: {
              dimensions: {
                width: 118,
                height: 59,
              },
              alt: "Yelp Logo",
              url: "https://cdn.thegrandlb.com/yelp.svg",
            },
            name: "Yelp",
            stars: 4.5,
            reviews: "200+",
            link: {
              link_type: "Web",
              url: "https://www.yelp.com/biz/the-grand-long-beach-long-beach",
              target: "_blank",
            },
          },
          {
            name: "The Knot",
            stars: 4.9,
            reviews: "15+",
            link: {
              link_type: "Web",
              url: "https://www.theknot.com/marketplace/the-grand-long-beach-long-beach-ca-620906",
              target: "_blank",
            },
          },
          {
            name: "Wedding Wire",
            stars: 4.4,
            reviews: "50+",
            link: {
              link_type: "Web",
              url: "https://www.weddingwire.com/biz/the-grand-long-beach-long-beach/05b58faf6174714e.html",
              target: "_blank",
            },
          },
        ],
      },
      {
        type: "tile_grid",
        section_id: "discover",
        headline: "Discover more and\nmore Grand.",
        theme: "White",
        top_spacer: "Large",
        bottom_spacer: "Large",
        items: [
          {
            eyebrow: "See Our Spaces",
            headline: "Tour The Grand Spaces",
            body: "Explore our venue virtually and discover the grand possibilities for your next event.",
            link: {
              link_type: "Web",
              url: "/tour",
            },
            theme: "Black/White",
            size: "Large",
            col_start: "Start 2",
            col_span: "Span 5",
            row_start: "Start 1",
            row_span: "Span 3",
          },
          {
            eyebrow: "See Our Menus",
            headline: "A Taste of Grand",
            body: "Our in-house catering team delivers innovative cuisine tailored to your event. From plated dinners to action stations, every menu is designed to impress your guests and elevate the occasion.",
            link: {
              link_type: "Web",
              url: "/menus",
            },
            theme: "Creme/Black",
            size: "Large",
            col_start: "Start 7",
            col_span: "Span 5",
            row_start: "Start 1",
            row_span: "Span 3",
          },
        ],
      },
    ],
  },
};
