// Contact page content

import type { PageDoc } from "content/types";

export const contactPage: PageDoc = {
  "uid": "contact",
  "data": {
    "title": "Contact The Grand",
    "video_url": null,
      "meta_title": "Contact The Grand LB | Phone, Email & Location in Long Beach, CA",
    "meta_description": "Get in touch with The Grand Long Beach. Call (562) 426-0555, email our team, or submit an inquiry. Located at 4101 E. Willow St., Long Beach, CA 90815.",
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
        "type": "text_section",
        "section_id": "intro",
        "body": [
          {
            "type": "paragraph",
            "text": "We'd love to hear about what you're planning. Reach out by phone, email, or inquiry form and our team will get back to you within 2-3 business days. We're open Monday through Saturday and available for tours by appointment.",
            "spans": []
          }
        ],
        "top_spacer": "Small",
        "bottom_spacer": "Small"
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
