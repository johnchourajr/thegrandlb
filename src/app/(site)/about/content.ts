// About page content

import type { PageDoc } from "content/types";

export const aboutPage: PageDoc = {
  uid: "about",
  data: {
    title: "About The Grand",
    video_url: null,
    meta_title: "About The Grand LB | Family-Owned Event Venue Since 1969",
    meta_description:
      "Meet the team behind The Grand Long Beach. Family-owned since 1969, our 65+ member team produces over 1,000 events each year across 7 distinctive spaces in Long Beach, CA.",
    slices: [
      {
        type: "hero_detail_page_slice",
        section_id: "hero",
        headline: "LET’S MAKE A MOMENT",
        caption: "Meet your grand team",
        video_media: null,
        primary_action: "Contact Sales",
        primary_action_link: {
          link_type: "Web",
          url: "/inquire",
        },
      },
      {
        type: "split_scroll_section",
        section_id: "about-scroll",
        gallery: {
          data: {
            gallery_items: [
              {
                link: null,
                video_media: null,
                media: {
                  dimensions: {
                    width: 1920,
                    height: 1280,
                  },
                  alt: "Evening exterior of the venue with porte-cochere lighting and arriving cars.",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/12559b25-b543-4fe7-c999-e7d746b7a000/public",
                },
              },
              {
                link: null,
                video_media: null,
                media: {
                  dimensions: {
                    width: 1920,
                    height: 1280,
                  },
                  alt: "Kitchen pass with plated dishes lined up for service.",
                  url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/d8ca11cb-4683-497a-f327-21606bc31a00/public",
                },
              },
            ],
          },
        },
        video_media: null,
        asset_position: true,
        items: [
          {
            headline_size: "md",
            headline: "We’ve been doing this since 1969.",
            body: [
              {
                type: "paragraph",
                text: "We are a family-oriented team creating once in a lifetime experiences for our guests.\nOur 65+ talented, energetic, and professional team members produce over 1,000 unique events every year.",
                spans: [],
              },
            ],
            primary_action_link: null,
            secondary_action_link: null,
          },
          {
            headline_size: "md",
            headline: "Bar-none event professionals.",
            body: [
              {
                type: "paragraph",
                text: "Our event planners, managers, and operations team bring decades of combined experience to every celebration. From the first inquiry to the final send-off, we handle the details so you can be present for the moments that matter.",
                spans: [],
              },
            ],
            primary_action_link: null,
            secondary_action_link: null,
          },
          {
            headline_size: "md",
            headline: "No-nonsense kitchen staff.",
            body: [
              {
                type: "paragraph",
                text: "Led by Executive Chef Jesus Gonzalez, our in-house culinary team crafts menus that match the scale and style of your event. Whether it's a plated dinner for 50 or stations for 600, every dish is prepared on-site with care.",
                spans: [],
              },
            ],
            primary_action_link: null,
            secondary_action_link: null,
          },
        ],
      },
      {
        type: "team_gallery",
        items: [
          {
            name: "Jim \nChoura",
            position: "CEO & Owner",
            primary_media: {
              dimensions: {
                width: 768,
                height: 768,
              },
              alt: "Professional headshot of a man in a dark suit (team portrait).",
              url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/0a830e64-16a7-4af8-f53a-1ea322919e00/public",
            },
            secondary_media: {
              dimensions: {
                width: 768,
                height: 768,
              },
              alt: "Portrait of a woman in a black blazer (team headshot).",
              url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/22fb4442-0635-4729-391b-6a6fac7af400/public",
            },
          },
          {
            name: "Melanie \nChoura",
            position: "Owner",
            primary_media: {
              dimensions: {
                width: 768,
                height: 768,
              },
              alt: "Portrait of a woman in a black blazer (team headshot).",
              url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/bc23dc72-1b4e-454b-9572-15465ee2a800/public",
            },
          },
          {
            name: "Dan \nD'sa",
            position: "Director",
            primary_media: {
              dimensions: {
                width: 768,
                height: 768,
              },
              alt: "Portrait of a man in a suit (team headshot).",
              url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/dfcae997-e4ab-43db-9b06-6b58ccbfec00/public",
            },
            secondary_media: {
              dimensions: {
                width: 768,
                height: 768,
              },
              alt: "Casual outdoor portrait of a man in a Grand staff polo.",
              url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/12712332-36fa-4d26-10c8-35f35f3c4c00/public",
            },
          },
          {
            name: "Rachael\nBarcza",
            position: "Director of Administration",
            primary_media: {
              dimensions: {
                width: 768,
                height: 768,
              },
              alt: "Headshot of a woman with curly hair in business attire.",
              url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/2c55bfad-d55a-4464-8afe-8a622a5e0c00/public",
            },
          },
          {
            name: "Gilberto\nVasquez",
            position: "Director of Operations",
            primary_media: {
              dimensions: {
                width: 1175,
                height: 1174,
              },
              alt: "Portrait of a man in a suit jacket (team headshot).",
              url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/dc4d9630-6872-458e-7223-8e94e5fb8800/public",
            },
            secondary_media: {
              dimensions: {
                width: 768,
                height: 768,
              },
              alt: "Outdoor portrait of a man in Grand polo (team).",
              url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/792ee76a-6878-4c90-8b77-9448f34b9b00/public",
            },
          },
          {
            name: "Elexis\nWright",
            position: "Assistant Director of Operations",
            primary_media: {
              dimensions: {
                width: 768,
                height: 768,
              },
              alt: "Portrait of a woman in a black blazer (team headshot).",
              url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/5c5a5a88-be98-49ee-62ab-80e5f1b16a00/public",
            },
          },
          {
            name: "Jesus\nGonzalez",
            position: "Executive Chef",
            primary_media: {
              dimensions: {
                width: 768,
                height: 768,
              },
              alt: "Chef in whites arms crossed in commercial kitchen.",
              url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/b6065055-4022-4fb1-948f-9285a0a87000/public",
            },
          },
          {
            name: "Marissa\nHofer",
            position: "Event Manager",
            primary_media: {
              dimensions: {
                width: 768,
                height: 768,
              },
              alt: "Portrait of a woman in a black blazer (team headshot).",
              url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/e925b2b4-950d-43f6-8234-d209195abe00/public",
            },
          },
          {
            name: "Lisa\nDeLeon",
            position: "Office Manager",
            primary_media: {
              dimensions: {
                width: 768,
                height: 768,
              },
              alt: "Portrait of a woman at a reception desk with Grand logo wall.",
              url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/b0c44b08-2811-4899-5f8b-b84dac06ff00/public",
            },
            secondary_media: {
              dimensions: {
                width: 768,
                height: 768,
              },
              alt: "Portrait of a woman at a reception desk with Grand logo wall.",
              url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/b0c44b08-2811-4899-5f8b-b84dac06ff00/public",
            },
          },
          {
            name: "Mariaelena\nGonzalez",
            position: "Event Manager",
            primary_media: {
              dimensions: {
                width: 768,
                height: 768,
              },
              alt: "Portrait of a woman in a black blazer (team headshot).",
              url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/b386e330-b61e-4c9d-310d-304b20000000/public",
            },
          },
          {
            name: "Yvette\nDeLeon",
            position: "Details Manager",
            primary_media: {
              dimensions: {
                width: 768,
                height: 768,
              },
              alt: "Portrait of a woman in a black blazer (team headshot).",
              url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/3b611b74-29b4-4561-a6a3-001dbbaad600/public",
            },
          },
          {
            name: "Alexis\nCastaneda",
            position: "Details Manager",
            primary_media: {
              dimensions: {
                width: 768,
                height: 768,
              },
              alt: "Portrait of a woman in a black blazer (team headshot).",
              url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/796ef0d9-fc84-4199-a3b2-1376b7918800/public",
            },
          },
          {
            name: "Briella\nVan Horn",
            position: "Front Desk Coordinator",
            primary_media: {
              dimensions: {
                width: 768,
                height: 768,
              },
              alt: "Young woman smiling at reception desk with Grand logo wall.",
              url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/43ae91e7-b3e8-428a-f770-1b4a14dda300/public",
            },
          },
          {
            name: "Nicole\nRidley",
            position: "Event Manager, The Rancho Los Alamitos",
            primary_media: {
              dimensions: {
                width: 768,
                height: 768,
              },
              alt: "Portrait of a woman in a black blazer (team headshot).",
              url: "https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/dc01d6e5-c70a-4930-ade2-7f7c4cd4af00/public",
            },
            website_label: "Visit The Rancho Los Alamitos",
            website_link: {
              link_type: "Web",
              url: "https://www.rancholosalamitos.org/",
              target: "_blank",
            },
          },
        ],
      },
    ],
  },
};
