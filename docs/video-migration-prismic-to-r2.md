# Video migration: Prismic CDN to Cloudflare R2

Background videos are served from Cloudflare R2 (`cdn.thegrandlb.com`) instead of Prismic to avoid bandwidth overages. The app rewrites Prismic video URLs to R2 at runtime.

## Steps (one-time migration)

### 1. Audit and download

From the project root:

```bash
node scripts/audit-prismic-videos.mjs
```

- Fetches all document types from the Prismic API and collects every Prismic CDN video URL.
- Downloads each video to `videos/original/`.
- Writes `videos/video-manifest.json` with: `originalPrismicUrl`, `targetFilename`, `sources`, `originalSizeBytes`.

Review the manifest and confirm which components/pages reference each video.

### 2. Optimize for web

Requires `ffmpeg` on PATH:

```bash
node scripts/optimize-videos.mjs
```

- Reads `videos/video-manifest.json`, processes each file in `videos/original/`.
- Writes optimized MP4s to `videos/optimized/` (CRF 28, no audio, faststart).
- Updates the manifest with `optimizedSizeBytes` and `optimizedPath`.

Check the script output for total size before/after and approximate savings.

### 3. Upload to R2

1. Set up Cloudflare R2 and the custom domain: see [Cloudflare R2 setup](cloudflare-r2-setup.md). Create R2 bucket `grandlb-videos` and attach custom domain `cdn.thegrandlb.com`.
2. Create an R2 API token and set:

   ```bash
   export AWS_ACCESS_KEY_ID="<R2 Access Key ID>"
   export AWS_SECRET_ACCESS_KEY="<R2 Secret Access Key>"
   export R2_ENDPOINT="https://<ACCOUNT_ID>.r2.cloudflarestorage.com"
   export R2_BUCKET="grandlb-videos"
   ```

3. Run:

   ```bash
   bash scripts/upload-to-r2.sh
   ```

Videos are uploaded with `Content-Type: video/mp4` and `Cache-Control: public, max-age=31536000, immutable`.

### 4. App configuration

- `src/lib/cdn.ts` defines `VIDEO_CDN_BASE` (from `NEXT_PUBLIC_VIDEO_CDN_URL` or `https://cdn.thegrandlb.com`) and `videoUrlFromCdn()`.
- `InlineVideoPlayer` uses `videoUrlFromCdn()` so any Prismic video URL from the API is rewritten to the R2 URL.
- Optional: set `NEXT_PUBLIC_VIDEO_CDN_URL=https://cdn.thegrandlb.com` in `.env.production` (see `.env.example`).

No Prismic content needs to be edited; URLs are rewritten when rendering.

## R2 key mapping

Prismic CDN URLs are converted to R2 object keys by taking the URL path’s last segment, slugifying it, and using `.mp4`. This matches the `targetFilename` in the audit script (e.g. `Homepage 60s final.mp4` -> `homepage-60s-final.mp4`). If your upload filenames differ from this, use `setPrismicToR2KeyMapper()` in `src/lib/cdn.ts` to provide a custom mapping.

## Videos only in Prismic content

Videos that appear only inside Prismic content fields (e.g. rich text or link fields) and are not passed through `MediaFrame` / `InlineVideoPlayer` are not rewritten automatically. Those would need to be updated in the Prismic dashboard to point to R2 URLs, or the rendering code updated to run their URLs through `videoUrlFromCdn()`.

## Files touched

- `scripts/audit-prismic-videos.mjs` – audit and download
- `scripts/optimize-videos.mjs` – ffmpeg optimization
- `scripts/upload-to-r2.sh` – R2 upload
- `src/lib/cdn.ts` – CDN base and URL rewrite
- `src/components/media-frame/InlineVideoPlayer.tsx` – uses `videoUrlFromCdn()`
- `next.config.js` – `cdn.thegrandlb.com` in `images.remotePatterns`
- `.env.example` – `NEXT_PUBLIC_VIDEO_CDN_URL`
