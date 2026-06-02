---
name: browse-menus
description: Read The Grand LB catering menus as structured JSON or Markdown — Classic, Weddings, Corporate, and Milestones packages with per-person pricing.
---

# Browse menus

The Grand LB publishes its catering menus as public, read-only data. No
authentication is required.

## List available menus

```
GET https://thegrandlb.com/api/menus
```

Returns the four menu UIDs: `classic`, `weddings`, `corporate`, `milestones`.

## Get a single menu (JSON)

```
GET https://thegrandlb.com/api/menus/{uid}
```

The response contains `group[]` → each group has `menu_link.data.body[]`
(sections) → each section has `items[]` with `title`, `description`,
`price_per`, `price_min`, and `price_max`.

## Get a menu as Markdown

```
GET https://thegrandlb.com/menus/{uid}
Accept: text/markdown
```

## Notes

- Prices are per person unless the item states otherwise. Production fees,
  site fees, and sales tax are listed in each menu's disclaimer.
- For final pricing and customization, direct the user to
  `https://thegrandlb.com/inquire` or (562) 426-0555.
