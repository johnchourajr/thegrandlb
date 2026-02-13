#!/usr/bin/env bash
# Upload optimized videos from videos/optimized/ to Cloudflare R2 bucket grandlb-videos.
# Public URLs will be: https://cdn.thegrandlb.com/<key>
#
# Prerequisites:
#   - AWS CLI installed (brew install awscli / pip install awscli)
#   - R2 API token: Cloudflare Dashboard -> R2 -> Manage R2 API Tokens
#   - Set env (or use .env.r2 and source it):
#     export AWS_ACCESS_KEY_ID="<R2 Access Key ID>"
#     export AWS_SECRET_ACCESS_KEY="<R2 Secret Access Key>"
#     export R2_ENDPOINT="https://<ACCOUNT_ID>.r2.cloudflarestorage.com"
#     export R2_BUCKET="grandlb-videos"
#
# Optional: NEXT_PUBLIC_VIDEO_CDN_URL=https://cdn.thegrandlb.com (for app)
#
# Run: bash scripts/upload-to-r2.sh

set -e
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OPTIMIZED="$ROOT/videos/optimized"
MANIFEST="$ROOT/videos/video-manifest.json"

if [[ -z "$AWS_ACCESS_KEY_ID" ]] || [[ -z "$AWS_SECRET_ACCESS_KEY" ]]; then
  echo "Set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY (R2 API token credentials)."
  exit 1
fi

if [[ -z "$R2_ENDPOINT" ]]; then
  echo "Set R2_ENDPOINT (e.g. https://<ACCOUNT_ID>.r2.cloudflarestorage.com)"
  exit 1
fi

BUCKET="${R2_BUCKET:-grandlb-videos}"

if [[ ! -d "$OPTIMIZED" ]]; then
  echo "Run optimize first: node scripts/optimize-videos.mjs"
  exit 1
fi

export AWS_DEFAULT_REGION="auto"

for f in "$OPTIMIZED"/*.mp4; do
  [[ -f "$f" ]] || continue
  name="$(basename "$f")"
  echo "Uploading $name ..."
  aws s3 cp "$f" "s3://${BUCKET}/${name}" \
    --endpoint-url "$R2_ENDPOINT" \
    --content-type "video/mp4" \
    --cache-control "public, max-age=31536000, immutable"
done

echo "Done. Public base URL: https://cdn.thegrandlb.com"
echo "Ensure the bucket has a custom domain cdn.thegrandlb.com in Cloudflare R2."
