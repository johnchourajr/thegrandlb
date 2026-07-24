import type { PageDoc } from "content/types";

// Accessibility Statement for The Grand Long Beach.
//
// The conformance claims below are written to reflect the actual state of the
// codebase (see the accessibility audit): honest "Partially Conformant" status
// with WCAG 2.1 Level AA, documenting both what is supported and the known gaps.
// When remediation work changes that state, update this file and the
// "Last updated" date near the top.

export const accessibilityPage: PageDoc = {
  uid: "accessibility",
  data: {
    title: "Accessibility",
    video_url: null,
    meta_title:
      "Accessibility Statement | The Grand LB Event Venue in Long Beach, CA",
    meta_description:
      "The Grand Long Beach is committed to digital and physical accessibility. Read our WCAG 2.1 Level AA accessibility statement, conformance status, supported assistive technology, and how to report a barrier.",
    slices: [
      {
        type: "hero_detail_page_slice",
        headline: "Accessibility",
        video_media: null,
        primary_action_link: null,
      },
      {
        type: "longform_text_section",
        section_id: "accessibility-statement",
        text: [
          {
            type: "paragraph",
            text: "Last updated: July 24, 2026",
            spans: [{ start: 0, end: 27, type: "strong" }],
          },
          {
            type: "paragraph",
            text: "The Grand Long Beach, operated by Choura Venue Services LLC, is committed to making our venue and this website accessible to the widest possible audience, including people with disabilities. Accessibility is part of how we welcome every guest, and we treat it as ongoing work rather than a one-time project.",
            spans: [],
          },
          {
            type: "heading2",
            text: "Conformance status",
            spans: [],
          },
          {
            type: "paragraph",
            text: "The Web Content Accessibility Guidelines (WCAG) define requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA.",
            spans: [
              {
                start: 4,
                end: 47,
                type: "hyperlink",
                data: {
                  link_type: "Web",
                  url: "https://www.w3.org/WAI/standards-guidelines/wcag/",
                  target: "_blank",
                },
              },
            ],
          },
          {
            type: "paragraph",
            text: 'This website is partially conformant with WCAG 2.1 Level AA. "Partially conformant" means that some parts of the content do not yet fully meet the accessibility standard. We assessed conformance through internal manual code review and automated testing, and we are actively remediating the gaps described below. A comprehensive third-party audit with assistive-technology testing has not yet been conducted.',
            spans: [{ start: 16, end: 59, type: "strong" }],
          },
          {
            type: "heading2",
            text: "Standards we work toward",
            spans: [],
          },
          {
            type: "paragraph",
            text: "We aim to meet or exceed the following standards across our digital experience:",
            spans: [],
          },
          {
            type: "list-item",
            text: "WCAG 2.1 Level AA — the international standard published by the World Wide Web Consortium (W3C).",
            spans: [{ start: 0, end: 17, type: "strong" }],
          },
          {
            type: "list-item",
            text: "Section 508 of the U.S. Rehabilitation Act, which references WCAG for information and communication technology.",
            spans: [{ start: 0, end: 11, type: "strong" }],
          },
          {
            type: "list-item",
            text: "ADA Title III, which treats places of public accommodation — and, increasingly, their digital services — as needing to be accessible.",
            spans: [{ start: 0, end: 13, type: "strong" }],
          },
          {
            type: "heading2",
            text: "What we've done",
            spans: [],
          },
          {
            type: "paragraph",
            text: "Accessibility measures currently in place on this website include:",
            spans: [],
          },
          {
            type: "list-item",
            text: "Semantic HTML with landmark regions — header, navigation, main content, and footer — so assistive technology can move around each page.",
            spans: [],
          },
          {
            type: "list-item",
            text: 'A "skip to main content" link as the first focusable element, and a consistent, visible keyboard focus indicator across the site.',
            spans: [],
          },
          {
            type: "list-item",
            text: "Descriptive alternative text for images, managed centrally and checked by automated tooling; decorative images are marked so screen readers can skip them.",
            spans: [],
          },
          {
            type: "list-item",
            text: "Page titles rendered as first-level headings, with true list markup for structured content such as our FAQ and menus.",
            spans: [],
          },
          {
            type: "list-item",
            text: "Navigation built from native buttons and links that is fully operable by keyboard, with expanded and collapsed state exposed on the menus.",
            spans: [],
          },
          {
            type: "list-item",
            text: 'Respect for the operating-system "reduce motion" preference: animations and autoplaying video are reduced or disabled when a visitor requests it.',
            spans: [],
          },
          {
            type: "list-item",
            text: "Inquiry and contact forms built from native form controls, with required fields conveyed to assistive technology.",
            spans: [],
          },
          {
            type: "list-item",
            text: "A document language attribute, support for browser zoom and text resizing to at least 200% without loss of content, and no restriction on pinch-zoom.",
            spans: [],
          },
          {
            type: "heading2",
            text: "Compatibility",
            spans: [],
          },
          {
            type: "paragraph",
            text: "This website is designed to be compatible with current versions of major browsers (Chrome, Firefox, Safari, and Edge) and with commonly used assistive technologies, including:",
            spans: [],
          },
          {
            type: "list-item",
            text: "Screen readers such as VoiceOver, NVDA, JAWS, and TalkBack.",
            spans: [],
          },
          {
            type: "list-item",
            text: "Keyboard-only navigation.",
            spans: [],
          },
          {
            type: "list-item",
            text: "Browser zoom and text resizing up to at least 200%.",
            spans: [],
          },
          {
            type: "list-item",
            text: "Operating-system reduced-motion settings.",
            spans: [],
          },
          {
            type: "heading2",
            text: "Known limitations",
            spans: [],
          },
          {
            type: "paragraph",
            text: "Despite our efforts, some parts of this website are not yet fully accessible. We are aware of the following and are working to resolve them:",
            spans: [],
          },
          {
            type: "list-item",
            text: "On our inquiry form, some field labels are not yet fully associated with their inputs for assistive technology, and some validation messages are announced only briefly.",
            spans: [],
          },
          {
            type: "list-item",
            text: "Heading levels beneath the page title are still being made consistent across some page templates.",
            spans: [],
          },
          {
            type: "list-item",
            text: "Certain accent colors and placeholder text may not yet meet the 4.5:1 contrast minimum in every context.",
            spans: [],
          },
          {
            type: "list-item",
            text: "Some interactive controls, such as the FAQ accordion and the mobile menu button, do not yet fully expose their expanded or collapsed state.",
            spans: [],
          },
          {
            type: "list-item",
            text: "A few highly animated sections (such as parallax and scrolling marquees) and embedded third-party content (such as maps) may not fully meet Level AA, and continuous motion is not entirely stopped under the reduce-motion setting.",
            spans: [],
          },
          {
            type: "heading2",
            text: "Accessibility at the venue",
            spans: [],
          },
          {
            type: "paragraph",
            text: "Beyond the website, The Grand Long Beach is committed to a welcoming, accessible in-person experience. Our facility complies with ADA requirements, including accessible parking, entrances, and restrooms. If you have specific accessibility needs for an event — mobility, seating, dietary, sensory, or otherwise — please let your event coordinator know during planning so we can prepare accommodations in advance.",
            spans: [],
          },
          {
            type: "heading2",
            text: "Feedback and contact",
            spans: [],
          },
          {
            type: "paragraph",
            text: "We welcome your feedback on the accessibility of The Grand Long Beach. If you encounter a barrier, or need information on this site provided in a different format, please let us know and we will do our best to help:",
            spans: [],
          },
          {
            type: "list-item",
            text: "By email: dan@grandfandb.com",
            spans: [
              {
                start: 10,
                end: 28,
                type: "hyperlink",
                data: {
                  link_type: "Web",
                  url: "mailto:dan@grandfandb.com",
                  target: "_blank",
                },
              },
            ],
          },
          {
            type: "list-item",
            text: "By phone: (562) 426-0555",
            spans: [
              {
                start: 10,
                end: 24,
                type: "hyperlink",
                data: {
                  link_type: "Web",
                  url: "tel:+15624260555",
                  target: "_blank",
                },
              },
            ],
          },
          {
            type: "list-item",
            text: "Through our contact page",
            spans: [
              {
                start: 12,
                end: 24,
                type: "hyperlink",
                data: {
                  link_type: "Web",
                  url: "/contact",
                },
              },
            ],
          },
          {
            type: "paragraph",
            text: "We try to acknowledge accessibility feedback within 2 business days and to propose a resolution within 10 business days. When we cannot resolve an issue immediately, we will work with you to provide the information or service you need through an alternative method.",
            spans: [],
          },
        ],
      },
    ],
  },
};
