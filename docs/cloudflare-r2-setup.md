# Cloudflare account setup for R2 (video CDN)

Plan for setting up Cloudflare so you can use R2 to serve The Grand LB videos from `cdn.thegrandlb.com`. Assumes you may be new to Cloudflare or need a clear sequence.

---

## 1. Create or use a Cloudflare account

- Go to [cloudflare.com](https://www.cloudflare.com) and sign up or log in.
- No credit card is required for R2; Cloudflare offers a free tier that includes R2 usage.

---

## 2. Add your domain (if not already on Cloudflare)

- In the dashboard: **Websites** → **Add a site**.
- Enter `thegrandlb.com` and follow the flow (e.g. scan DNS, then change nameservers at your registrar to the ones Cloudflare gives you).
- If the site is already on Cloudflare, skip to step 3.

---

## 3. Get your Account ID (for R2)

- In the dashboard, open **R2** from the left sidebar (under "Object Storage" or "Storage").
- Or go to any product (e.g. **Workers & Pages**) and look at the right-hand column: **Account ID** is shown there.
- Copy and save it; you will use it as `<ACCOUNT_ID>` in the R2 endpoint:
  `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`

  <!-- https://edca8c03062dc8cc567cc8afb29e8794.r2.cloudflarestorage.com -->

---

## 4. Create the R2 bucket

- **R2** → **Overview** → **Create bucket**.
- **Bucket name:** `grandlb-videos` (must match what the upload script expects; override with `R2_BUCKET` if you use a different name).
- **Location:** choose a region (e.g. Automatic or closest to your users).
- Create the bucket. You do not need to enable any extra settings for basic public read access via custom domain.

---

## 5. Attach the custom domain (cdn.thegrandlb.com)

- Open the bucket **grandlb-videos** → **Settings**.
- Find **Public access** / **Custom Domains** (wording may vary).
- **Connect domain** (or **Add custom domain**).
- Enter: `cdn.thegrandlb.com`.
- Cloudflare will either:
  - Create a CNAME for `cdn.thegrandlb.com` to the R2 endpoint, or
  - Show you a hostname to point to (e.g. `grandlb-videos.<ACCOUNT_ID>.r2.cloudflarestorage.com`).
- If you need to add DNS yourself: in **Websites** → **thegrandlb.com** → **DNS** → **Records**, add:
  - **Type:** CNAME
  - **Name:** `cdn` (so the full name is `cdn.thegrandlb.com`)
  - **Target:** the value Cloudflare gives you for the bucket (often something like `grandlb-videos.<ACCOUNT_ID>.r2.dev` or the R2 public bucket hostname).
- Wait for DNS to propagate (usually a few minutes). The bucket will then be reachable at `https://cdn.thegrandlb.com`.

---

## 6. Create an R2 API token (for uploads)

- **R2** → **Overview** → **Manage R2 API Tokens** (or **Account** → **R2 API Tokens**).
- **Create API token**.
- **Token name:** e.g. `thegrandlb-upload`.
- **Permissions:** at minimum, **Object Read & Write** for the account or for the `grandlb-videos` bucket (if the UI offers bucket-level permissions).
- **Specify bucket(s):** optional; you can limit to `grandlb-videos` if you want.
- Create the token.
- Copy and store:
  - **Access Key ID** → use as `AWS_ACCESS_KEY_ID`
  - **Secret Access Key** → use as `AWS_SECRET_ACCESS_KEY` (shown only once).

---

## 7. Set environment variables and upload

In your terminal (or in `.env.local` / a separate env file you source only when uploading):

```bash
export AWS_ACCESS_KEY_ID="<your R2 Access Key ID>"
export AWS_SECRET_ACCESS_KEY="<your R2 Secret Access Key>"
export R2_ENDPOINT="https://<ACCOUNT_ID>.r2.cloudflarestorage.com"
export R2_BUCKET="grandlb-videos"
```

Then run the project’s upload script:

```bash
bash scripts/upload-to-r2.sh
```

After uploads complete, test a video URL, e.g.:
`https://cdn.thegrandlb.com/<one-of-your-video-filenames>.mp4`

---

## 8. Optional: app environment variable (production only)

In production (e.g. Vercel/Netlify), set only:

- **Name:** `NEXT_PUBLIC_VIDEO_CDN_URL`
- **Value:** `https://cdn.thegrandlb.com`

The app already defaults to this if the variable is unset; setting it makes the CDN base explicit and easy to change later.

**Do not set `AWS_ACCESS_KEY_ID` or `AWS_SECRET_ACCESS_KEY` in Netlify (or Vercel).** Those names are reserved by the platform for their own AWS integration. Your Next.js app does not need R2 credentials at build or runtime; it only needs the public CDN URL above. Use the AWS/R2 credentials only when running `scripts/upload-to-r2.sh` locally (e.g. from `.env.local` or by exporting in your terminal).

---

## Checklist

- [ ] Cloudflare account created or logged in
- [ ] Domain `thegrandlb.com` on Cloudflare (if applicable)
- [ ] Account ID noted for `R2_ENDPOINT`
- [ ] Bucket `grandlb-videos` created
- [ ] Custom domain `cdn.thegrandlb.com` connected to the bucket and DNS set
- [ ] R2 API token created; Access Key ID and Secret stored safely
- [ ] Env vars set; `scripts/upload-to-r2.sh` run successfully
- [ ] (Optional) `NEXT_PUBLIC_VIDEO_CDN_URL` set in production

---

## Reference

- R2 docs: [developers.cloudflare.com/r2](https://developers.cloudflare.com/r2/)
- Custom domains for R2: [R2 custom domains](https://developers.cloudflare.com/r2/buckets/public-access/#custom-domains)
- Upload flow for this project: `docs/video-migration-prismic-to-r2.md` (Step 3)
