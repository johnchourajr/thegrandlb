# Media catalog (photos, video, illustrations)

This document helps humans and agents find **where media lives**, **what it is for**, and **which source files reference it**. It is derived from the repository at authoring time; if you add URLs in code, update this file or re-scan (see [Regenerating the URL list](#regenerating-the-url-list)).

## Where media comes from

| Source | Role | Typical use |
|--------|------|-------------|
| **Cloudflare Images** (`https://imagedelivery.net/…`) | **Raster photos** for static TypeScript page content | Hero stills, galleries, tour/event imagery (`/public` variant URLs in `*.content.ts`) |
| **Cloudflare R2** served at `https://cdn.thegrandlb.com/` | **Video** and **SVG** illustrations (not Cloudflare Images) | Hero/section `video_url`, icon rows, decorative SVGs |
| **`public/`** | Static files shipped with the Next.js app | Open Graph / Apple touch: `/logo.png` (`src/app/(site)/layout.tsx`) |
| **Prismic CDN** (`the-grand.cdn.prismic.io`, `images.prismic.io`) | Assets uploaded in Prismic or legacy URLs | Form illustration, transactional email logo, some menu PDFs |
| **Prismic documents** | Editorial **photos** for pages | Slice-driven `ImageField` data (not enumerated here; lives in CMS) |
| **`slices/**/screenshot-*.png`** | Slice Machine / Storybook previews | Documentation and Slice Machine UI only—not used in production pages |

## How to place media in the app

1. **Cloudflare Images (raster photos)**  
   URLs look like `https://imagedelivery.net/{account_hash}/{image_id}/public`. Next.js uses `cloudflareImageLoader` in `src/lib/image-cdn.ts` to rewrite requests to flexible variants (`w=…,q=75,f=webp`). Set `NEXT_PUBLIC_CF_IMAGES_ACCOUNT_HASH` to match the hash in your URLs (`jq-BfOr8JDGgGxqbx8v5CA` in this repo). `ImageBox` detects `imagedelivery.net` via `isCfImageUrl` (`src/components/media-frame/ImageBox.tsx`).

2. **R2-hosted SVG (and any full URL passthrough)**  
   `ImageBox` treats `https://cdn.thegrandlb.com/...` as a CDN image field: SVGs use `unoptimized`; non-SVG URLs pass through the loader when applicable.

3. **Video**  
   Section content uses string fields such as `video_url` pointing at `https://cdn.thegrandlb.com/.../*.mp4`. Upload flow and R2 bucket are described in `scripts/upload-to-r2.sh`.

4. **Posters / thumbnails**  
   Helpers such as `generateVideoPoster` in `src/utils/bandwidth-optimization.ts` assume a `.jpg` sibling of the video URL may exist for some CDNs; confirm behavior for R2-hosted files before relying on it.

5. **Prefer consistency**  
   New **photos**: Cloudflare Images dashboard, then use the delivered URL (or `cfImageUrl` in code). New **video/SVG** on R2: `https://cdn.thegrandlb.com/<key>` in `content.ts` / `*.content.ts` / `content/shared.constants.ts`.

---

## Cloudflare Images — all photo URLs in this repo

There are **146** distinct `imagedelivery.net` image URLs checked into TypeScript content (variant `public`, account hash `jq-BfOr8JDGgGxqbx8v5CA`).

**Agent-oriented meaning, reuse rules, and shared “stock” semantics:** [`docs/cloudflare-images-for-agents.md`](cloudflare-images-for-agents.md)

**Full machine-readable list (one URL per line):** [`docs/cloudflare-images-urls.txt`](cloudflare-images-urls.txt)

**Extracted `alt` strings** (adjacent `alt` / `url` pairs in TS): [`docs/cloudflare-images-alt-text.json`](cloudflare-images-alt-text.json)

**Tour detail interiors → room uid:** [`docs/tour-room-image-ids.json`](tour-room-image-ids.json)

**Where they appear (reference counts):**

| File | URL references |
|------|------------------|
| `src/app/(site)/tour/[uid]/content.ts` | 63 |
| `src/app/(site)/about/content.ts` | 20 |
| `src/app/(site)/tour/content.ts` | 16 |
| `src/app/(site)/events/content.ts` | 13 |
| `src/app/(site)/content.ts` | 11 |
| `src/app/(site)/menus/content.ts` | 7 |
| `src/app/(site)/events/[uid]/milestones.content.ts` | 7 |
| `src/app/(site)/events/[uid]/weddings.content.ts` | 6 |
| `src/app/(site)/faq/content.ts` | 4 |
| Each of several `events/[uid]/*.content.ts` | 4 |
| `content/shared.constants.ts` | 1 |

To see which pages use a given ID, search the repo for the middle segment of the URL (the image id), e.g. `ba00e56c-e108-4405-26e1-f16ba5b35c00`.

---

## Videos (`https://cdn.thegrandlb.com/…/*.mp4`)

| Slug (filename hint) | URL | Referenced from (primary) |
|----------------------|-----|---------------------------|
| Homepage hero (60s) | `https://cdn.thegrandlb.com/7cff637b-d646-493b-9e81-06266373f84c-homepage-60s-final.mp4` | `src/app/(site)/content.ts` |
| Community section (30s) | `https://cdn.thegrandlb.com/2a63ded8-77f1-4838-ab41-da32d6e887df-community-section-30s-final.mp4` | `src/app/(site)/content.ts` |
| Footer peak (15s) | `https://cdn.thegrandlb.com/cd461232-bc21-4a37-99f3-1fe75274d9f5-footer-peak-15s-281-29-final.mp4` | `content/shared.constants.ts` |
| Events index (15s) | `https://cdn.thegrandlb.com/9e5d872e-81ca-46e2-93e4-7d952055014c-events-index-15s-final.mp4` | `src/app/(site)/events/content.ts` |
| Menus index | `https://cdn.thegrandlb.com/ea3bc056-e211-4f3b-8ccd-cb66fcc14a3c-menu-index-final.mp4` | `src/app/(site)/menus/content.ts` |
| Tour index (15s) | `https://cdn.thegrandlb.com/2ff5529b-ae2d-4706-9e14-2e9215729acf-tour-index-15s-final.mp4` | `src/app/(site)/tour/content.ts` |
| Board room (30s) | `https://cdn.thegrandlb.com/0965b023-690a-4cea-85c9-5d39703e2424-board-room-30s-final.mp4` | `src/app/(site)/tour/[uid]/content.ts` |
| Catalina room (30s) | `https://cdn.thegrandlb.com/eea7c944-43d1-4071-b276-17be28722745-catalina-room-30s-final.mp4` | `src/app/(site)/tour/[uid]/content.ts` |
| Palm terrace (30s) | `https://cdn.thegrandlb.com/57492ebd-b5c6-4cb3-b276-7e2b6e817ccc-palm-terrace-30s-final.mp4` | `src/app/(site)/tour/[uid]/content.ts` |
| Monarch room (30s) | `https://cdn.thegrandlb.com/22c3f9c5-b2a1-4c35-ab58-46667f73a67c-monarch-room-30s-final.mp4` | `src/app/(site)/tour/[uid]/content.ts` |
| Grand ballroom (30s) | `https://cdn.thegrandlb.com/b2bb058f-2bf0-4fec-9a81-db8ca7850d2c-grand-ballroom-30s-final.mp4` | `src/app/(site)/tour/[uid]/content.ts` |
| Garden room (30s) | `https://cdn.thegrandlb.com/c9fd34b5-2b04-4e37-b823-231ade5c28e7-garden-room-30s-final.mp4` | `src/app/(site)/tour/[uid]/content.ts` |
| Pacific room (30s) | `https://cdn.thegrandlb.com/66ee4f4b-ec51-4869-aedb-f5111a44fb56-pacific-room-30s-final.mp4` | `src/app/(site)/tour/[uid]/content.ts` |

---

## SVG illustrations (`https://cdn.thegrandlb.com/…/*.svg`)

Named files are stable keys; reuse the same asset when adding similar UI (for example, the same three icons on every event variant page).

### Event value props (repeated across event detail `*.content.ts`)

| File | Typical meaning | Used on |
|------|-----------------|--------|
| `elegant.svg` | “Elegant” pillar | `src/app/(site)/events/[uid]/*.content.ts`, `src/app/(site)/events/content.ts` |
| `flexible.svg` | “Flexible” pillar | Same |
| `personal.svg` | “Personal” pillar | Same |

### Homepage (`src/app/(site)/content.ts`)

| File | Notes |
|------|--------|
| `lovely-couple.svg` | Also on tour index: `src/app/(site)/tour/content.ts` |
| `entry.svg` | |
| `invert-true-2.svg` | Also footer CTA art in `content/shared.constants.ts` |
| `ring.svg` | |
| `car.svg` | |
| `wifi.svg` | |
| `food.svg` | |
| `map.svg` | |
| `walkin.svg` | |
| `fly.svg` | |
| `yelp.svg` | |

### Venue / room feature icons (`src/app/(site)/tour/[uid]/content.ts`)

| File | Notes |
|------|--------|
| `social.svg` | Seating / social layout |
| `theater.svg` | Theater-style layout |
| `classroom.svg` | Classroom layout |
| `flex.svg` | Flexible layout (distinct from `flexible.svg` / `flexible-2.svg`) |
| `flexible.svg` | Used on Palm Terrace section |
| `flexible-2.svg` | Grand Ballroom |
| `lighting.svg` | |
| `rentals.svg` | |
| `spark.svg` | |
| `art.svg` | |
| `mic.svg` | |
| `dance.svg` | |
| `podium.svg` | |
| `dressing.svg` | |
| `columns.svg` | |
| `cocktails.svg` | |

---

## Other hard-coded media URLs

| Asset | URL | Where |
|-------|-----|--------|
| Site logo (public) | `/logo.png` | `public/logo.png`; Open Graph / icons in `src/app/(site)/layout.tsx` |
| Handshake illustration | `https://the-grand.cdn.prismic.io/the-grand/12534b2c-98c9-41da-a5ed-21df334b02b0_handshake.svg` | `src/components/form/InquireThanks.tsx` |
| Logo in emails | `https://images.prismic.io/the-grand/cb6bbe74-9712-4cf9-bec3-145cc675a490_logo.png?auto=compress,format` | `src/emails/clientEmail.tsx`, `src/emails/salesEmail.tsx` |

Menu PDFs on Prismic CDN are linked from `src/app/(site)/menus/content.ts` (not images/video; omitted from tables above).

---

## Slice screenshot assets (repo only)

These PNGs support Slice Machine / docs previews, not runtime routes:

- `slices/TeamGallery/screenshot-default.png`
- `slices/TileGrid/screenshot-default.png`
- `slices/MainHero/screenshot-default.png`
- `slices/NumbersSection/screenshot-default.png`
- `slices/SplitGallery/screenshot-default.png`
- `slices/fragments/NavLinkTree/screenshot-default.png`
- `slices/fragments/NavLinkTree/screenshot-forMenus.png`
- `slices/fragments/NavLinkTree/screenshot-withChildren.png`
- `slices/HeroDetailPageSlice/screenshot-default.png`
- `slices/ScrollText/screenshot-default.png`
- `slices/HomepageNumbers/screenshot-default.png`
- `slices/ImageSection/screenshot-default.png`
- `slices/LongformTextSection/screenshot-default.png`
- `slices/HomepageLocation/screenshot-default.png`
- `slices/StarSection/screenshot-default.png`
- `slices/FaqSection/screenshot-default.png`
- `slices/TextSection/screenshot-default.png`
- `slices/SplitScrollSection/screenshot-default.png`

---

## Regenerating the URL list

Unique `cdn.thegrandlb.com` URLs in `src/` and `content/`:

```bash
rg -o 'https://cdn\.thegrandlb\.com/[^"'\''\s)]+' content src --glob '*.ts' --glob '*.tsx' | \
  sed 's/.*:https/https/' | sort -u
```

Unique Cloudflare Images URLs (rewrite `jq-BfOr8JDGgGxqbx8v5CA` if the account hash ever changes):

```bash
rg -o 'https://imagedelivery\.net/jq-BfOr8JDGgGxqbx8v5CA/[a-f0-9-]+/public' . \
  --glob '*.ts' --glob '*.tsx' | sed 's/.*:https/https/' | sort -u > docs/cloudflare-images-urls.txt
```

Refresh derived Cloudflare Images docs:

```bash
node scripts/extract-cf-image-alt-pairs.mjs > docs/cloudflare-images-alt-text.json
node scripts/map-tour-room-images.mjs > docs/tour-room-image-ids.json
```

Merge the output into the tables above when assets change.

---

## What this catalog does not include

- **Prismic-managed photos** for slices and pages (URLs are content-dependent). Use Prismic or generated types (`prismicio-types.d.ts`) for those fields.
- **Videos or images** only referenced from Prismic documents at runtime and never hard-coded in this repo.
