# Bandwidth Optimization Plan

## Current Bandwidth Issues

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

- [ ] Move large videos to self-hosted solution (Vercel, Cloudflare, AWS S3)
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


