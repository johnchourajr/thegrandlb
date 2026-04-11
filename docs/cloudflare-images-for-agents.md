# Cloudflare Images (`imagedelivery.net`) — content meaning and reuse

This document explains **what each referenced photo represents** (from copy in the repo) and **how agents should reuse** Cloudflare Images on landing pages without guessing from pixels alone.

## Do not infer from generated event vertical pages

Files under **`src/app/(site)/events/[uid]/*.content.ts`** (per-uid event verticals) are **excluded from ground truth** for image meaning and reuse. Those pages are known to have **weak or inappropriate image choices** in places. Agents must **not** learn “what an image is for” from how it appears on those pages, and must **not** copy their `alt` text as canonical (the alt export below skips that directory for the same reason).

**Use instead:** [`cloudflare-images-visual-classification.json`](cloudflare-images-visual-classification.json), placements on **home**, **tour** (`tour/content.ts`, `tour/[uid]/content.ts`), **events index** (`events/content.ts`), **FAQ**, **menus**, **about**, **`content/shared.constants.ts`**, and captions on the events index FAQ gallery.

---

**Canonical URL list:** [`cloudflare-images-urls.txt`](cloudflare-images-urls.txt) (146 unique IDs).

**Structured alt text** (where `alt` sits on the line before `url` in TypeScript): [`cloudflare-images-alt-text.json`](cloudflare-images-alt-text.json). **`events/[uid]` is excluded** so alts here are not polluted by the generated verticals. Regenerate after content edits in **included** files:

```bash
node scripts/extract-cf-image-alt-pairs.mjs > docs/cloudflare-images-alt-text.json
```

**Visual classification (every image, human-reviewed from 800px previews):** [`cloudflare-images-visual-classification.json`](cloudflare-images-visual-classification.json). Each entry includes `summary`, `sceneType`, `setting`, `subjects`, optional `estimatedVenueArea` (aligned with tour room slugs where the interior clearly matches), and `suggestedUseTags`. Regenerate the JSON after updating embedded data in `scripts/generate-visual-classification.mjs` and run:

```bash
node scripts/generate-visual-classification.mjs
```

Preview URL used for review: `https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/{imageId}/w=800,q=80,f=webp`

**Tour room detail — which interior photos belong to which space:** [`tour-room-image-ids.json`](tour-room-image-ids.json). Regenerate if `tour/[uid]/content.ts` structure changes:

```bash
node scripts/map-tour-room-images.mjs > docs/tour-room-image-ids.json
```

---

## URL shape and runtime behavior

Pattern:

`https://imagedelivery.net/jq-BfOr8JDGgGxqbx8v5CA/{image-id}/public`

- **`jq-BfOr8JDGgGxqbx8v5CA`** — Cloudflare Images account hash; must match `NEXT_PUBLIC_CF_IMAGES_ACCOUNT_HASH`.
- **`public`** — default variant in stored content; `cloudflareImageLoader` (`src/lib/image-cdn.ts`) rewrites requests to width-specific WebP for caching.

Agents should **keep the full URL** when pasting into `*.content.ts` fields, or use `cfImageUrl(id, …)` if building URLs in code.

---

## How to learn what a photo “is”

1. **Read [`cloudflare-images-visual-classification.json`](cloudflare-images-visual-classification.json)** — Scene summary, subjects, and suggested tags for every ID (independent of any one page’s image choices).
2. **Read `alt` only from trusted files** — The [`cloudflare-images-alt-text.json`](cloudflare-images-alt-text.json) export merges `alt` from `src/` **excluding** `events/[uid]/`. For alts inside included files (FAQ, home, tour detail heroes, etc.), you can still read the source directly.
3. **Read `caption`** — FAQ-style galleries and the **events index** FAQ gallery use `caption` for space names (for example, “The Palm Terrace”, “The Grand Ballroom”).
4. **Read trusted parent pages** — Use `data.title`, headlines, and slice copy on **home**, **tour**, **events index**, **FAQ**, **menus**, **about**, and **shared footer**—not on `events/[uid]/*` verticals—to understand why an image was paired with a story.
5. **Tour interiors without `alt`** — Gallery shots under each room in `tour/[uid]/content.ts` usually have **`alt: null`**. Treat them as **that room’s** photography; use `tour-room-image-ids.json` to map `image-id` → `board-room` | `catalina-room` | … and read that room’s `data.headline`, `data.body`, and `features` for tone.
6. **Team headshots** — `about/content.ts` ties each URL to **`name`** and **`position`**; the image is a portrait of that person (primary or secondary headshot).

---

## Reusable “stock” venue photos (same ID, many pages)

These IDs appear in **multiple** files (often including `events/[uid]/` **plus** FAQ or index pages). **Do not** take the event vertical’s pairing as guidance. Use **[`cloudflare-images-visual-classification.json`](cloudflare-images-visual-classification.json)** for what the frame actually shows, and use **FAQ / events index / home** when you need an editorial precedent.

| Image ID | What it shows (visual index) | Typical use (agent) |
|----------|------------------------------|---------------------|
| `ba00e56c-e108-4405-26e1-f16ba5b35c00` | Grand Ballroom, chandeliers, formal rounds | Large ballroom hero; FAQ venue column |
| `9d0dccc6-cc37-4965-8019-d351ad9f3700` | Outdoor terrace, string lights, palms | Outdoor / Palm Terrace story |
| `6f029f31-cd81-4ccd-232e-5ee5d19a3a00` | Plated table, glassware, centerpiece | Catering, elegance, FAQ catering |
| `023e8045-5fbe-40ff-1d88-2d6f8eaec900` | Aerial campus / city grid | Location, scale, logistics |
| `3742c9dc-4bcb-4666-3b4d-0d261819b000` | Ballroom party, purple-blue wash, dance floor | Reception / DJ / dance energy (check visual summary vs headline) |
| `39670f24-73de-4ddb-91c8-b992f36ccd00` | Ballroom, pink wash, DJ, dance floor | Dance-forward celebration (verify copy matches scene) |
| `8b05ce0f-a2a7-4abb-5de6-233074cd7c00` | Venue exterior daytime | Arrival, FAQ booking |
| `b974fb0d-4d15-49e8-351b-fa4018109e00` | Conservatory-style dining with guests | Garden-room / seated dinner mood |
| `eedc2a6f-b2ca-4e4f-ad7e-52754836e100` | Seated guests, balloons, celebration | Social proof, party energy |
| `2a7a2b5f-e94b-41cf-4694-4c40e9f53d00` | Large ballroom, stage, screen, uplighting | Corporate or gala scale |
| `b554ec79-70c2-4abb-18a4-f3d4e387ff00` | Meeting / presentation with audience | Corporate breakout or session |
| `3763f95d-0637-42a6-3c2c-c92111d1ef00` | Ballroom AV, projection, magenta wash | AV-heavy program |
| `c647a4c0-5d20-4460-82ad-d029b7c14800` | Indoor ceremony, arch, guests | Ceremony establishing |
| `c94179f3-6554-4e3a-0f02-c9818b0e4600` | Tall white florals, candles, tables | Reception / rehearsal tablescape |
| `20cb49a5-6155-4016-44a5-eb72a13d9d00` | Head table florals, sweetheart style | Decor-forward head table |

If the visual summary and your landing copy disagree, **pick a different image ID** or add new photography in Cloudflare Images—do not stretch a stock ID to fit a mismatched story.

---

## Page-level hero stills (single primary story)

| Page / slice | Image ID | Meaning (from `alt` or page copy) |
|--------------|----------|-----------------------------------|
| Home `page_hero` | `b41a724a-b3ad-40ae-57df-98a1b8ce3400` | Venue **exterior at twilight** |
| Home `homepage_location` | `52b8ff11-1b88-41c1-72e8-512662e19700` | **Aerial** of venue and neighborhood |
| Events index hero | `cfe41bb3-f218-430d-868d-99feb6668300` | **Interior** with elegant decor |
| Events index → Quinces tile | `39670f24-73de-4ddb-91c8-b992f36ccd00` | Quinceañera ballroom (see shared table) |
| Tour index hero | `569cb5d0-cd2b-433e-6f65-d237efee8900` | Tour landing hero (no `alt` in content; **tour index** marketing still) |
| Tour index space tiles | `856df71a-3832-4963-6cc1-1fc9c6115c00`, `550c0c0b-0622-40ff-8bb5-652e4d630400`, `a035a74c-382a-4391-b4a1-70313da9ff00`, `23b476ce-ac42-4720-9881-fd7dfa9ab300`, `701687bb-7fe3-46ad-40c7-b4574f704300`, `0e026458-c661-4886-4be5-66945466f500`, `553cdde0-df5f-4907-932f-2805da4e4600` | Thumbnails for **Grand Ballroom, Palm Terrace, Monarch, Catalina, Garden, Pacific, Board Room** — pair with matching `page.uid` in `tour/content.ts` |
| Menus index hero | `8c590e41-1860-402a-44a1-767881408e00` | Menus landing hero (no `alt`; **culinary / dining** context from page title) |
| Global footer CTA (`ctaFooter`) | `9c4a00e5-743d-41fc-f500-8e35b371b000` | Footer video poster still (see `content/shared.constants.ts`; no `alt`) |

Tour **detail** hero stills (these **do** have `alt` in `tour/[uid]/content.ts`):

- `a4c776c5-dfdb-4a6a-e959-6646d4905900` — Board Room  
- `a1f4b734-5327-4aeb-7c5c-80715d53f100` — Catalina Room  
- `35d98bbb-5f73-4176-3020-759e692d6700` — Palm Terrace  
- `6e2b5666-7f70-41c7-4916-139093221700` — Monarch Room  
- `c8b247ca-ab6b-4f95-0af4-e412e6ad4c00` — Grand Ballroom  
- `30e7d61c-d2c4-423e-3bd3-d7498839bd00` — Garden Room  
- `e931f5af-d53c-4108-d65b-dab7f149de00` — Pacific Room  

---

## Events index FAQ gallery (caption = space)

In `events/content.ts`, gallery items pair **caption** with image:

| Caption | Image IDs (in order they appear) |
|---------|----------------------------------|
| The Palm Terrace | `9d0dccc6-cc37-4965-8019-d351ad9f3700`, `45647c84-beeb-4396-f30c-dd2846eec100`, `166c57dc-8df9-4af7-b71d-1acd17872100`, `bc27becf-bed9-4be0-7e8d-125bfa267200` |
| The Grand Ballroom | `ba00e56c-e108-4405-26e1-f16ba5b35c00`, `0061dc98-91d8-48c7-a03c-391748748a00` |
| The Monarch Patio | `07acd8a1-873a-46a9-2481-8b8de3197b00` |
| The Garden Room | `889f2c5d-d996-4f19-c5c3-6da3daa08b00` |

Use captions as the **ground truth** for which exterior or patio angle is which when reusing on new pages.

---

## Homepage split gallery (`content.ts`)

Left column captions / alts:

| ID | Caption (if any) | Alt |
|----|------------------|-----|
| `62bc010e-8ab6-42cd-5207-9160ff96f700` | Grand Exterior | The Grand Long Beach venue exterior |
| `1433ea04-6645-4d6a-2468-cf8b4fb04100` | Grand Walkway | Palm-lined walkway |
| `da91e312-621d-4a89-4ec7-c627dbcfe100` | Grand Entrance | Entrance with elegant lighting |
| `5dc64eb6-f953-4d0a-479f-ba4ab10fc500` | — | Event setup |

Right column (no captions; use alt):

| ID | Alt |
|----|-----|
| `babaa885-4edc-4fb7-63c6-5693245c4e00` | Elegant table setting |
| `17563442-2ec9-45eb-9451-d8dfdbd20b00` | Wedding reception decor |
| `d8b7f538-ec4f-4688-e22b-f6706a576a00` | Guests celebrating |
| `6d437bce-c364-42fa-aa3d-8686a2fa3f00` | Large ballroom configuration |
| `531e6536-68f1-4105-86e5-fe56512fdd00` | Floral arrangement detail |

---

## Event vertical heroes and galleries

Each `src/app/(site)/events/[uid]/*.content.ts` file has an **`image_section`** (first slice) and often a **`split_scroll_section`** gallery. Alts are written for **SEO and accessibility** and describe the shot (for example Indian wedding ballroom, corporate AV, baby shower). Prefer **reusing the whole file’s gallery** when cloning a vertical; if you mix IDs across verticals, re-read `cloudflare-images-alt-text.json` so the visible scene matches the headline.

**Weddings** (`weddings.content.ts`): hero `d7c0d809-…` (ballroom reception); gallery includes ceremony, tables, couple, florals, first dance (`c647a4c0`, `c94179f3`, `358f8b46`, `20cb49a5`, `14280994`).

---

## Tour index “stats” galleries (`tour/content.ts`)

Two `split_scroll_section` blocks use **two separate four-image galleries** (no per-image `alt`). Copy is about **acreage, seven spaces, two outdoor terraces**. Treat images as **general venue lifestyle / architecture** supporting those stats, not a specific named room unless you add captions.

---

## Menus FAQ gallery (`menus/content.ts`)

Six vertical food / service images (`72908b93`, `34a92d62`, `f8325240`, `45e64cf1`, `c86282c4`, `98e95b5f`) — no alts. Use for **menu, kitchen, plated service, tastings** adjacent copy only.

---

## About page

- **Split scroll** (`12559b25-…`, `d8ca11cb-…`): no `alt`; paired with copy about **since 1969**, **event professionals**, **kitchen** — use as **team / heritage / kitchen** mood imagery.
- **Team gallery**: each `primary_media` / `secondary_media` URL is a **named team member portrait**; do not reuse a portrait as anonymous stock on another page without explicit intent.

---

## Agent rules for landing pages

1. **Match image to headline** — Start from [`cloudflare-images-visual-classification.json`](cloudflare-images-visual-classification.json); then align with `caption` or trusted-file `alt` when present.
2. **Do not infer from `events/[uid]/*`** — Treat those pages as **not authoritative** for which image belongs where.
3. **Do not invent scene details** — If `alt` is null and the ID is only in `tour-room-image-ids.json`, describe it as “[Room name] interior gallery” rather than inventing decor specifics.
4. **Respect shared-stock semantics** — IDs in the shared table work across many event types; narrow the story with **surrounding copy**, not by mislabeling the photo.
5. **Team portraits are people-specific** — See About content; avoid repurposing as generic “staff” unless the design calls for that person.
6. **Add `alt` when you add reuse** — If you place an image on a new page, supply `alt` consistent with the visual classification and the section’s truth.
7. **Dimensions** — Preserve `dimensions` from an existing **trusted** usage when copying a `media` object so layout hints stay stable.

---

## IDs with no exported `alt` (remaining ~108)

They are still valid production images: **tour interior galleries**, **tour index** tiles and stats galleries, **menus** gallery, **about** scroll, **footer** CTA, and **event index** cards where `alt` is null. For those:

- Use **`tour-room-image-ids.json`** for tour detail interiors.
- Use **parent `page_media` → `page.data.title`** on the tour index for space tiles.
- Use **slice titles and body** on menus / about for thematic fit.

When you add meaningful `alt` in source for those assets, re-run `extract-cf-image-alt-pairs.mjs` so this documentation layer stays automatic.
