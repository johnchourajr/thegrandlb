# Cloudflare Images (`imagedelivery.net`) — vision-first content reference

Agents choose and describe images from **what is visible in the frame**, not from prose in the repo.

## Ground truth: vision only

**[`cloudflare-images-visual-classification.json`](cloudflare-images-visual-classification.json)** is the **only** catalog that states what each image ID **shows** (`summary`, `sceneType`, `setting`, `subjects`, optional `estimatedVenueArea`, `suggestedUseTags`). It was built from **human review of 800px previews** (same URL pattern as in `meta.previewUrlTemplate` inside that file).

### `alt` in TypeScript is not trusted for semantics

Strings in `alt` fields next to `url` in `*.content.ts` may be **wrong, SEO-stretched, or legacy**. Do **not** use them to decide what an image depicts or which landing section it belongs in. When you ship a page, you may still **set** `alt` in code for accessibility—but write that string from the **visual classification** (and the actual headline), not by copying an existing `alt` from another file.

### Generated event verticals are not trusted for placement

Files under **`src/app/(site)/events/[uid]/*.content.ts`** are excluded as a guide for **which** image goes with which story. Fix or build those pages by picking IDs from the visual JSON, not by imitating current pairings.

---

**Canonical URL list:** [`cloudflare-images-urls.txt`](cloudflare-images-urls.txt) (146 unique IDs).

**Regenerate visual classifications** (after editing curated entries in the generator script):

```bash
node scripts/generate-visual-classification.mjs
```

**Tour detail: which file chunk an interior ID belongs to** (placement map only—not scene description): [`tour-room-image-ids.json`](tour-room-image-ids.json)

```bash
node scripts/map-tour-room-images.mjs > docs/tour-room-image-ids.json
```

Preview URL pattern used for review: `https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/{imageId}/w=800,q=80,f=webp`

---

## URL shape and runtime behavior

Pattern:

`https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/{image-id}/public`

- **`jq-BfOr8JDGgGxqbx8v5CA`** — Cloudflare Images account hash; must match `NEXT_PUBLIC_CF_IMAGES_ACCOUNT_HASH`.
- **`public`** — default variant in stored content; `cloudflareImageLoader` (`src/lib/image-cdn.ts`) rewrites requests to width-specific WebP for caching.

Agents should **keep the full URL** when pasting into `*.content.ts` fields, or use `cfImageUrl(id, …)` if building URLs in code.

---

## How to pick an image for a landing block

1. Open **[`cloudflare-images-visual-classification.json`](cloudflare-images-visual-classification.json)** and filter/search by `sceneType`, `subjects`, `estimatedVenueArea`, or `suggestedUseTags` to match the section (outdoor vs ballroom vs food vs portrait, etc.).
2. Optionally use **[`tour-room-image-ids.json`](tour-room-image-ids.json)** when you already know the room slug and need IDs that appear in that room’s tour detail document (still confirm each ID’s **`summary`** in the visual JSON).
3. **Captions** in `events/content.ts` (FAQ gallery) label editorial intent by space name—**after** you pick IDs by vision, you can align with those groupings; do not treat captions as a substitute for reading the visual entry per ID.
4. **About team gallery** — `name` / `position` in `about/content.ts` tell you **who** a portrait is; the face still matches the visual JSON `summary` (portrait).

---

## Reusable “stock” venue photos (same ID, many pages)

Many IDs appear on multiple routes. **Ignore** how often they sit on `events/[uid]/*`. Use the **visual JSON** row for each ID.

| Image ID | Use the visual JSON `summary` (one-line gist) | Agent use |
|----------|-----------------------------------------------|-------------|
| `ba00e56c-e108-4405-26e1-f16ba5b35c00` | Grand ballroom, chandeliers, formal rounds | Large ballroom / FAQ venue |
| `9d0dccc6-cc37-4965-8019-d351ad9f3700` | Outdoor terrace, string lights, palms | Outdoor / Palm Terrace |
| `6f029f31-cd81-4ccd-232e-5ee5d19a3a00` | Plated table, glassware, centerpiece | Catering / elegance |
| `023e8045-5fbe-40ff-1d88-2d6f8eaec900` | Aerial campus and city grid | Location / scale |
| `3742c9dc-4bcb-4666-3b4d-0d261819b000` | Ballroom party, color wash, dance floor | Reception / DJ energy |
| `39670f24-73de-4ddb-91c8-b992f36ccd00` | Ballroom, pink wash, DJ, dance floor | Dance-forward celebration |
| `8b05ce0f-a2a7-4abb-5de6-233074cd7c00` | Venue exterior daytime | Arrival / exterior |
| `b974fb0d-4d15-49e8-351b-fa4018109e00` | Conservatory-style dining with guests | Seated dinner / garden mood |
| `eedc2a6f-b2ca-4e4f-ad7e-52754836e100` | Seated guests, balloons, celebration | Social proof / party |
| `2a7a2b5f-e94b-41cf-4694-4c40e9f53d00` | Large ballroom, stage, screen, uplighting | Corporate / gala scale |
| `b554ec79-70c2-4abb-18a4-f3d4e387ff00` | Meeting / presentation with audience | Breakout / session |
| `3763f95d-0637-42a6-3c2c-c92111d1ef00` | Ballroom AV, projection, magenta wash | AV-heavy program |
| `c647a4c0-5d20-4460-82ad-d029b7c14800` | Indoor ceremony, arch, guests | Ceremony wide |
| `c94179f3-6554-4e3a-0f02-c9818b0e4600` | Tall white florals, candles, tables | Reception tables |
| `20cb49a5-6155-4016-44a5-eb72a13d9d00` | Head table florals, sweetheart style | Head table / decor |

If copy and the visual **`summary`** disagree, **change the image ID** or upload new art—do not bend language to fit a mismatched frame.

---

## Page-level hero stills (IDs + where they load)

Look up each ID in the visual JSON for the scene.

| Page / slice | Image ID |
|--------------|----------|
| Home `page_hero` | `b41a724a-b3ad-40ae-57df-98a1b8ce3400` |
| Home `homepage_location` | `52b8ff11-1b88-41c1-72e8-512662e19700` |
| Events index hero | `cfe41bb3-f218-430d-868d-99feb6668300` |
| Events index → Quinces tile | `39670f24-73de-4ddb-91c8-b992f36ccd00` |
| Tour index hero | `569cb5d0-cd2b-433e-6f65-d237efee8900` |
| Tour index space tiles | `856df71a-3832-4963-6cc1-1fc9c6115c00`, `550c0c0b-0622-40ff-8bb5-652e4d630400`, `a035a74c-382a-4391-b4a1-70313da9ff00`, `23b476ce-ac42-4720-9881-fd7dfa9ab300`, `701687bb-7fe3-46ad-40c7-b4574f704300`, `0e026458-c661-4886-4be5-66945466f500`, `553cdde0-df5f-4907-932f-2805da4e4600` (order matches `page.uid` in `tour/content.ts`: grand-ballroom → board-room) |
| Menus index hero | `8c590e41-1860-402a-44a1-767881408e00` |
| Global footer CTA (`ctaFooter`) | `9c4a00e5-743d-41fc-f500-8e35b371b000` |

Tour **detail** hero stills (one per room page in `tour/[uid]/content.ts`):

- `a4c776c5-dfdb-4a6a-e959-6646d4905900` — board-room  
- `a1f4b734-5327-4aeb-7c5c-80715d53f100` — catalina-room  
- `35d98bbb-5f73-4176-3020-759e692d6700` — palm-terrace  
- `6e2b5666-7f70-41c7-4916-139093221700` — monarch-room  
- `c8b247ca-ab6b-4f95-0af4-e412e6ad4c00` — grand-ballroom  
- `30e7d61c-d2c4-423e-3bd3-d7498839bd00` — garden-room  
- `e931f5af-d53c-4108-d65b-dab7f149de00` — pacific-room  

---

## Events index FAQ gallery (caption groups IDs only)

In `events/content.ts`, captions group IDs by **space label**. Confirm each ID against the visual JSON before reusing on another page.

| Caption | Image IDs (order in file) |
|---------|---------------------------|
| The Palm Terrace | `9d0dccc6-cc37-4965-8019-d351ad9f3700`, `45647c84-beeb-4396-f30c-dd2846eec100`, `166c57dc-8df9-4af7-b71d-1acd17872100`, `bc27becf-bed9-4be0-7e8d-125bfa267200` |
| The Grand Ballroom | `ba00e56c-e108-4405-26e1-f16ba5b35c00`, `0061dc98-91d8-48c7-a03c-391748748a00` |
| The Monarch Patio | `07acd8a1-873a-46a9-2481-8b8de3197b00` |
| The Garden Room | `889f2c5d-d996-4f19-c5c3-6da3daa08b00` |

---

## Homepage split gallery (`content.ts`)

| Column | ID | Caption in file (if any) |
|--------|-----|--------------------------|
| Left | `62bc010e-8ab6-42cd-5207-9160ff96f700` | Grand Exterior |
| Left | `1433ea04-6645-4d6a-2468-cf8b4fb04100` | Grand Walkway |
| Left | `da91e312-621d-4a89-4ec7-c627dbcfe100` | Grand Entrance |
| Left | `5dc64eb6-f953-4d0a-479f-ba4ab10fc500` | — |
| Right | `babaa885-4edc-4fb7-63c6-5693245c4e00` | — |
| Right | `17563442-2ec9-45eb-9451-d8dfdbd20b00` | — |
| Right | `d8b7f538-ec4f-4688-e22b-f6706a576a00` | — |
| Right | `6d437bce-c364-42fa-aa3d-8686a2fa3f00` | — |
| Right | `531e6536-68f1-4105-86e5-fe56512fdd00` | — |

Scene content for every ID above is in the visual JSON (`summary` / `subjects`).

---

## Event vertical pages (`events/[uid]/*`)

Use **`cloudflare-images-visual-classification.json`** to choose or replace images. Do **not** copy another vertical’s gallery because its `alt` strings look convenient. When you add an image to markup, write **`alt`** from the same visual entry you used to justify the pick.

---

## Tour index “stats” galleries (`tour/content.ts`)

Two `split_scroll_section` blocks each include a four-image gallery with **no** per-image captions in content. Select and describe images using the visual JSON only; slice copy (“11 acres”, “7 spaces”, etc.) is layout context, not a description of a specific frame.

---

## Menus FAQ gallery (`menus/content.ts`)

IDs: `72908b93`, `34a92d62`, `f8325240`, `45e64cf1`, `c86282c4`, `98e95b5f` — use visual JSON (`sceneType` food / kitchen) next to menu copy.

---

## About page

- **Split scroll** — IDs `12559b25-b543-4fe7-c999-e7d746b7a000`, `d8ca11cb-4683-497a-f327-21606bc31a00`: check visual JSON for mood (exterior night, kitchen line).
- **Team gallery** — each `primary_media` / `secondary_media` URL is a named portrait; visual JSON marks `portrait_staff`; do not reuse as anonymous stock.

---

## Agent rules (summary)

1. **Semantics** — Only **[`cloudflare-images-visual-classification.json`](cloudflare-images-visual-classification.json)** (plus optional **`tour-room-image-ids.json`** for tour placement).
2. **Not for semantics** — Existing **`alt`** strings in the repo; image placement on **`events/[uid]/*`** pages.
3. **Accessibility `alt`** — When you output HTML/TS content, write `alt` to match the **visual** `summary` and your section (do not trust legacy `alt`).
4. **Dimensions** — Copy `dimensions` from a working `media` object with the same ID if you need stable layout hints.
