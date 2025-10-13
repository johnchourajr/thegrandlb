# Suspicious URLs Requested (October 10, 2025)

This document lists all the suspicious URLs that were requested on your site, causing "No documents were returned" errors.

## Legitimate Bot Requests (Non-Threatening)

These are common files that legitimate services look for:

- `/ads.txt` - Advertising policies (requested by ad networks)
- `/sitemap.xml` - Sitemap for search engines

**Note:** You already have `/robots.txt` in your public folder, which is good!

## Security Scanner / Malicious Bot Requests

These are attempts to find vulnerabilities or exposed files:

### WordPress-Related (You don't use WordPress)

- `/xmlrpc.php` - XML-RPC endpoint used in WordPress attacks

### Environment Files (Sensitive Data Exposure Attempts)

- `/.env.dist` - Looking for exposed environment configuration
- `/.env.dev.local` - Looking for exposed development environment variables

### Suspicious PHP Files (Backdoor/Exploit Attempts)

- `/zxl.php` - Unknown PHP backdoor script
- `/ava.php` - Unknown PHP backdoor script
- `/gdn.php` - Unknown PHP backdoor script

### Random Test Pages (Scanner Probes)

- `/404javascript.js` - Scanner testing for 404 handling
- `/404testpage4525d2fdc` - Automated scanner probe

## Summary

**Total unique suspicious paths: 10**

- Legitimate requests: 2
- Malicious/suspicious requests: 8

## Recommendation

All of these requests are now being handled by:

1. The middleware blocking malicious patterns (returns 403 Forbidden)
2. The 404 handler for legitimate but non-existent files (returns 404 Not Found)

This is normal internet traffic. Your site is properly protected now.

## Timestamps of Attacks

- October 10, 12:31 AM - `ads.txt` requests
- October 10, 12:41 AM - `sitemap.xml` requests
- October 10, 01:17 AM - `sitemap.xml` requests
- October 10, 01:32 AM - `xmlrpc.php` requests
- October 10, 02:15 AM - `sitemap.xml` requests
- October 10, 02:59 AM - `.env.dist`, `.env.dev.local` requests
- October 10, 03:02 AM - `sitemap.xml` requests
- October 10, 03:39 AM - `404javascript.js`, `404testpage4525d2fdc` requests
- October 10, 03:44 AM - `zxl.php`, `ava.php`, `gdn.php` requests

These appear to be automated scans running every 30-60 minutes.
