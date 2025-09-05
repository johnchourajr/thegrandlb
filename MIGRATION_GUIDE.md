# Next.js App Directory Migration Guide

## Overview

This project has been migrated from the Pages Router to the App Router (Next.js 13+). This migration provides better performance, improved developer experience, and access to new features like Server Components.

## Key Changes

### 1. Directory Structure

- **Before**: `src/pages/` directory
- **After**: `src/app/` directory

### 2. File Naming

- **Before**: `_app.tsx`, `_document.tsx`, `index.tsx`, `[uid].tsx`
- **After**: `layout.tsx`, `page.tsx`, `[uid]/page.tsx`

### 3. API Routes

- **Before**: `src/pages/api/hello.ts`
- **After**: `src/app/api/hello/route.ts`

### 4. Layout System

- **Before**: `_app.tsx` and `_document.tsx` for global layout
- **After**: `app/layout.tsx` for root layout

### 5. Data Fetching

- **Before**: `getStaticProps`, `getServerSideProps`
- **After**: Server Components with direct data fetching

### 6. Metadata

- **Before**: `<Head>` component or `next/head`
- **After**: `generateMetadata()` function or `metadata` export

## Migrated Files

### Pages

- `src/pages/index.tsx` → `src/app/page.tsx`
- `src/pages/[uid].tsx` → `src/app/[uid]/page.tsx`
- `src/pages/about.tsx` → `src/app/about/page.tsx`
- `src/pages/contact.tsx` → `src/app/contact/page.tsx`
- `src/pages/inquire.tsx` → `src/app/inquire/page.tsx`
- `src/pages/404.tsx` → `src/app/not-found.tsx`
- `src/pages/thanks.tsx` → `src/app/thanks/page.tsx`
- `src/pages/map.tsx` → `src/app/map/page.tsx`

### API Routes

- `src/pages/api/hello.ts` → `src/app/api/hello/route.ts`
- `src/pages/api/send-client-email.ts` → `src/app/api/send-client-email/route.ts`
- `src/pages/api/add-to-database.ts` → `src/app/api/add-to-database/route.ts`
- `src/pages/api/exit-preview.ts` → `src/app/api/exit-preview/route.ts`
- `src/pages/api/get-prismic-menus.ts` → `src/app/api/get-prismic-menus/route.ts`
- `src/pages/api/preview.ts` → `src/app/api/preview/route.ts`

## TypeScript Improvements

- Added proper TypeScript types in `src/types/page-props.ts`
- Removed all `any` types from migrated files
- Added proper type definitions for Prismic documents

## Configuration Changes

- Updated `next.config.js` to enable app directory
- Added `experimental.appDir: true` (though this is now default in Next.js 15)

## Benefits of Migration

1. **Server Components**: Better performance with server-side rendering
2. **Improved Layouts**: Nested layouts with better composition
3. **Better Metadata**: Built-in metadata API
4. **Streaming**: Better loading performance
5. **Type Safety**: Improved TypeScript support

## Next Steps

1. Test all pages and API routes
2. Update any remaining references to old routing
3. Consider migrating remaining pages (events, menus, tour, offsite)
4. Remove old pages directory once migration is complete

## Notes

- The migration maintains backward compatibility with existing Prismic integration
- All existing functionality should work as before
- Some pages (events, menus, tour, offsite) still need to be migrated
- The old pages directory can be removed once all pages are migrated
