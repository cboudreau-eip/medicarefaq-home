# MedicareFAQ Project TODO

## Completed Work

- [x] Built 93 total pages: 33 standalone pages, 40 coverage FAQ articles, 20 blog articles
- [x] Implemented full SEO metadata infrastructure using react-helmet-async / useSEO hook
- [x] Added complete meta tags (title, description, canonical, OG, Twitter Card) to ALL 93 pages
- [x] Scraped meta values from live medicarefaq.com to match existing SEO
- [x] Upgraded project from client-side-only to full-stack (Node.js backend + MySQL/TiDB database)
- [x] Implemented useSEO hook that dynamically injects meta tags per page
- [x] Added podcast audio player component to coverage articles (Buzzsprout integration)
- [x] Redesigned homepage hero section with trust indicators and journey buttons
- [x] Reduced spacing between header elements per design feedback
- [x] Built CMS admin panel at /admin route (owner-only via Manus OAuth)
- [x] Created seo_overrides (cmsMeta) database table via Drizzle schema migration
- [x] Built tRPC CMS router with get (public), list (owner-only), upsert (owner-only) procedures
- [x] Built Admin UI with three tabs: Standalone Pages (29), Coverage Articles (40), Blog Articles (20)
- [x] Added search/filter within each tab
- [x] Added "Edited" badge and edited count indicator for pages with DB overrides
- [x] Implemented inline edit form: Meta Title, Meta Description, OG Image URL, Image Alt Text
- [x] Slugs shown but NOT editable (to prevent breaking links)
- [x] Save Changes writes to database and immediately shows "Edited" badge
- [x] Created useCMSSEO hook that fetches DB overrides and merges with static values
- [x] Wired useCMSSEO into CoverageTemplate.tsx (all 40 coverage articles)
- [x] Wired useCMSSEO into BlogTemplate.tsx (all 20 blog articles)
- [x] Batch-updated all 29 standalone page files to use useCMSSEO (DB overrides take precedence)
- [x] Wrote and passed 10 vitest tests for CMS router (get, list, upsert procedures)
- [x] Verified database persistence: saved overrides survive page reload

## Upcoming / Next Steps

- [ ] Generate sitemap.xml listing all 93 URLs
- [ ] Add JSON-LD structured data (FAQPage schema for coverage articles, Article schema for blog posts)
- [ ] Consider expanding CMS to manage article content (not just meta tags)
- [ ] Astro migration (planned for production deployment)
