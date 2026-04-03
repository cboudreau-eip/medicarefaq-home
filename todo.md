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
- [x] Seeded cmsMeta table with all 89 static meta values from page files and data files
- [x] Fixed Admin.tsx COVERAGE_SLUGS and BLOG_SLUGS to match actual data file slugs
- [x] Added 2 missing hardcoded standalone article pages to CMS admin panel (91 total)
- [x] Rebuilt CMS admin panel with Option B layout: sidebar + card grid + slide-over drawer
- [x] Audited every footer link — fixed 3 broken coverage links, removed Accessibility dead link
- [x] Created Privacy Policy page (/privacy-policy) with full legal content
- [x] Created Terms of Use page (/terms-of-use) with full legal content
- [x] Added Privacy Policy and Terms of Use to CMS admin panel (now 33 standalone pages)
- [x] Seeded Privacy Policy and Terms of Use meta into the database
- [x] Added Tailwind Typography plugin for proper prose styling on legal pages

## Upcoming / Next Steps

- [ ] Generate sitemap.xml listing all URLs
- [ ] Add JSON-LD structured data (FAQPage schema for coverage articles, Article schema for blog posts)
- [ ] Consider expanding CMS to manage article content (not just meta tags)
- [ ] Astro migration (planned for production deployment)

## In Progress

- [x] Build AI-powered live chat widget (floating bottom-right corner)
- [x] Create backend tRPC procedure for AI chat with Medicare-focused system prompt
- [x] Build floating chat bubble UI component with message history
- [x] Wire chat widget into app layout so it appears on every page
- [x] Wrote and passed 6 vitest tests for chat router
- [x] Fix chat widget: welcome message cut off at bottom, COMMON QUESTIONS label overlapping with message text
