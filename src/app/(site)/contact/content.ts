// Contact page content

import type { PageDoc } from "content/types";

export const contactPage: PageDoc = {
  "uid": "contact",
  "data": {
    "title": "Contact The Grand",
    "video_url": null,
    "meta_title": null,
    "meta_description": null,
    "slices": [
      {
        "type": "hero_detail_page_slice",
        "section_id": "hero",
        "headline": "SAY HEY",
        "caption": "However you'd like",
        "video_media": null,
        "primary_action_link": null
      },
      {
        "type": "tile_grid",
        "theme": "Cream",
        "items": [
          {
            "headline": "Submit an inquiry",
            "link": {
              "link_type": "Web",
              "url": "/inquire"
            },
            "theme": "Outlined",
            "col_start": "Start 2",
            "col_span": "Span 10"
          },
          {
            "headline": "Call us at (562) 426-0555",
            "link": {
              "link_type": "Web",
              "url": "tel:+15624260555",
              "target": "_blank"
            },
            "theme": "Outlined",
            "col_start": "Start 2",
            "col_span": "Span 10"
          },
          {
            "headline": "Email us at dan@grandfandb.com",
            "link": {
              "link_type": "Web",
              "url": "mailto:dan@grandfandb.com",
              "target": "_blank"
            },
            "theme": "Outlined",
            "col_start": "Start 2",
            "col_span": "Span 10"
          },
          {
            "headline": "Instagram",
            "link": {
              "link_type": "Web",
              "url": "https://www.instagram.com/thegrandlb/",
              "target": "_blank"
            },
            "theme": "Outlined",
            "col_start": "Start 2",
            "col_span": "Span 5"
          },
          {
            "headline": "Facebook",
            "link": {
              "link_type": "Web",
              "url": "https://www.facebook.com/TheGrandLB/",
              "target": "_blank"
            },
            "theme": "Outlined",
            "col_start": "Start 7",
            "col_span": "Span 5"
          }
        ]
      }
    ]
  }
};
