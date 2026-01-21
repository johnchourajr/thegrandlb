# Bandwidth Optimization Plan

## Latest Findings (Jan 2026)

Based on the latest Prismic bandwidth report (January 2026):

- Videos: 95.8% of total bandwidth (153.27 GB of 160.02 GB)
- Images: 6.75 GB (4.2% of total bandwidth)
- API calls: negligible compared to media delivery

Top bandwidth consumers:

- Homepage 60s video (Homepage 60s--final.mp4): 62.18 GB (8,368 requests, thegrandlb.com)
- Footer Peak 15s video: 16.55 GB
- Community Section 30s video: 9.19 GB
- Tour Index 15s video: 7.88 GB
- Homepage 60s video (grandfandb.com referrer): 7.44 GB

Conclusion: video delivery is the primary bandwidth driver. Optimizing video will
have the largest impact.

## Historical Findings (Oct 2025)

Based on Prismic bandwidth logs analysis (October 2025), the main consumers are:

### 1. Video Files (Primary Issue - ~160GB total)

- Homepage 60s final.mp4: 94.2 GB (11,321 requests)
- Footer Peak 15s final.mp4: 22.2 GB (3,717 requests)
- Community Section 30s final.mp4: 16.2 GB (1,366 requests)
- Tour Index 15s final.mp4: 10.9 GB (1,723 requests)
- Events Index 15s final.mp4: 9.3 GB (1,092 requests)

### 2. Image Files (~1.6GB total)

- Homepage 60s final.jpg: 810 MB (1,804 requests)
- Noise.png: 156 MB (2,917 requests)
- Multiple responsive image variants

### 3. API Calls (~150MB total)

- 10,000+ calls to navigation, settings, fragments
- Repeated queries without caching

## Optimization Strategy

The plan below focuses on the highest bandwidth drivers first.

### Execution Plan (Draft)

1. Confirm top video assets in Prismic analytics and list exact pages using them.
2. Quick win: compress and replace the top 3 videos in Prismic; verify visual quality.
3. Implement lazy loading and poster-first playback for non-hero videos.
4. Select a video CDN and migrate the top 3 videos; update Prismic entries to external URLs.
5. Migrate remaining large videos, then re-audit bandwidth after 1-2 weeks.

Decision checkpoint:
- Stop after step 2 for minimal change, or continue to step 4 for long-term savings.

### Phase 1: Video Optimization (Priority 1 - Immediate Impact)

#### 1.1 Video Compression & Format Optimization

- [ ] Compress all video files to reduce file size by 60-80%
- [ ] Convert to modern formats (WebM, AV1) with MP4 fallback
- [ ] Implement adaptive bitrate streaming
- [ ] Use poster images as placeholders

#### 1.2 Video Loading Strategy

- [ ] Implement lazy loading for videos
- [ ] Add "click to play" for non-hero videos
- [ ] Preload only above-the-fold videos
- [ ] Use intersection observer for video loading

#### 1.3 Self-Hosting Videos

- [ ] Move large videos to a video CDN or object storage (Cloudflare Stream, Mux, Vimeo, S3)
- [ ] Keep only small preview clips in Prismic
- [ ] Use Prismic for metadata, external hosting for files

### Phase 2: Image Optimization (Priority 2)

#### 2.1 Reduce Image Size Variants

- [ ] Optimize device sizes in next.config.js
- [ ] Remove unnecessary breakpoints
- [ ] Implement more aggressive compression

#### 2.2 Background Texture Optimization

- [ ] Optimize noise.png (156MB, 2,917 requests)
- [ ] Consider CSS-generated noise or smaller pattern
- [ ] Use data URLs for small textures

#### 2.3 Image Delivery Optimization

- [ ] Implement WebP/AVIF with fallbacks
- [ ] Add proper caching headers
- [ ] Use progressive JPEG for large images

### Phase 3: API Call Optimization (Priority 3)

#### 3.1 Implement Request Caching

- [ ] Add Redis/Memory cache for frequent queries
- [ ] Cache navigation and settings data
- [ ] Implement stale-while-revalidate strategy

#### 3.2 Reduce API Calls

- [ ] Batch similar requests
- [ ] Cache fragment data at build time
- [ ] Use static generation where possible

#### 3.3 Optimize Query Patterns

- [ ] Review and optimize fetchLinks usage
- [ ] Combine related queries
- [ ] Use GraphQuery for complex data needs

### Phase 4: Monitoring & Maintenance

#### 4.1 Bandwidth Monitoring

- [ ] Set up Prismic bandwidth alerts
- [ ] Implement analytics for asset usage
- [ ] Regular review of top consumers

#### 4.2 Performance Monitoring

- [ ] Add Core Web Vitals tracking
- [ ] Monitor LCP for video/image loading
- [ ] Set up bandwidth usage dashboard

## Expected Impact

### Video Optimization

- **Potential Savings**: 60-80% reduction in video bandwidth
- **Estimated Impact**: ~100-130GB savings
- **Implementation Time**: 1-2 weeks

### Image Optimization

- **Potential Savings**: 40-60% reduction in image bandwidth
- **Estimated Impact**: ~600MB-1GB savings
- **Implementation Time**: 3-5 days

### API Optimization

- **Potential Savings**: 50-70% reduction in API calls
- **Estimated Impact**: ~75-100MB savings + faster load times
- **Implementation Time**: 1 week

## Total Potential Bandwidth Reduction: 70-85%


