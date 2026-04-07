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
- [x] Update chat button: red branding color (#C41230), larger size (64px), pulsing ring animation

## SEO Audit Dashboard

- [x] Add new tRPC procedure `cms.audit` that returns per-page SEO scores and issue flags
- [x] Define SEO scoring rules: title length (30-60 chars), description length (120-160 chars), OG image present, alt text present, duplicate title detection
- [x] Add "SEO Audit" tab/view to the CMS admin panel sidebar navigation
- [x] Build site-wide SEO score summary with overall grade (A-F) and category breakdowns
- [x] Build per-page issue cards showing specific problems with severity (error/warning/info)
- [x] Add title length validation: flag too short (<30 chars) and too long (>60 chars)
- [x] Add description length validation: flag too short (<120 chars) and too long (>160 chars)
- [x] Add missing OG image detection with count and page list
- [x] Add missing alt text detection with count and page list
- [x] Add duplicate title detection across all pages
- [x] Add one-click "Fix" actions: link to CMS editor for pages with issues
- [x] Build visual score distribution chart (how many pages at each score level)
- [x] Add export audit report functionality (CSV download)
- [x] Write vitest tests for cms.audit procedure and scoring logic (35 tests, all passing)

## URL Restructure — Match Live Site URLs

- [x] Batch 1: Restructure Standalone/Other page URLs to match live site (/about→/about-us, /medicare-plans/compare→/compare-rates, /library/podcast→/podcasts)
- [x] Batch 2: Restructure Blog post URLs to match live site (no changes needed — 19 of 20 are new content, 1 exact match already correct)
- [x] Batch 3: Restructure Coverage/FAQ page URLs to match live site (removed duplicate /coverage route, 20 of 40 already match spreadsheet exactly, 20 are new content at /faqs/)
- [x] Batch 4: Restructure Medicare Plans page URLs to match live site (/original-medicare, /medicare-supplements, /medicare-part-c/medicare-advantage-plans, /original-medicare/medicare-parts/medicare-part-d, /videos)
- [x] Add 301 redirect map for old rebuild URLs (9 redirects, all verified with curl returning 301)
- [x] Update all internal links (nav, mega menu, footer, CTAs, cross-references)
- [x] Update data files with new slugs
- [x] Update CMS slug references

## Missing FAQ Pages — Add 202 Scraped Articles

- [x] Created SimpleFAQTemplate component for rendering scraped content
- [x] Created SimpleFAQArticleData type in article-types.ts
- [x] Wired SimpleFAQTemplate into CoverageTemplate routing (fallback lookup)
- [x] Batch 1: Added top 50 FAQ articles by traffic (14,038 sessions/mo)
- [x] Batch 2: Added next 50 FAQ articles (3,259 sessions/mo)
- [x] Batch 3: Added next 50 FAQ articles (1,553 sessions/mo)
- [x] Batch 4: Added next 50 FAQ articles (771 sessions/mo)
- [x] Batch 5: Added final 2 FAQ articles (21 sessions/mo)
- [x] Registered 202 SimpleFAQ slugs in CMS admin panel (Admin.tsx) and server-side CMS router (cms.ts)
- [x] SEO audit now includes all 202 SimpleFAQ articles via shared SIMPLE_FAQ_SLUGS registry
- [x] Write vitest tests for SimpleFAQ data integrity (8 tests, all passing)

## Missing Pages — Batch Build (161 pages from Pages to Keep doc)

### Medicare Supplement Plan Pages (15 pages)
- [x] /medicare-supplements/plan-g
- [x] /medicare-supplements/plan-f
- [x] /medicare-supplements/plan-n
- [x] /medicare-supplements/high-deductible-plan-g
- [x] /medicare-supplements/plan-c
- [x] /medicare-supplements/plan-d
- [x] /medicare-supplements/high-deductible-plan-f
- [x] /medicare-supplements/plan-b
- [x] /medicare-supplements/plan-a
- [x] /medicare-supplements/plan-l
- [x] /medicare-supplements/plan-k
- [x] /medicare-supplements/plan-m
- [x] /medicare-supplements/compare
- [x] /medicare-supplements/medigap-eligibility
- [x] /medicare-supplements/medicare-supplement-plans-2026

### Medigap by Carrier Pages (15 pages)
- [x] /medicare-supplements/medigap-by-carrier (index)
- [x] /medicare-supplements/medigap-by-carrier/accendo-medicare-supplement-plans
- [x] /medicare-supplements/medigap-by-carrier/medico-medigap-plans
- [x] /medicare-supplements/medigap-by-carrier/bankers-fidelity-medigap-plans
- [x] /medicare-supplements/medigap-by-carrier/united-american-medigap-plans
- [x] /medicare-supplements/medigap-by-carrier/united-healthcare-medigap-plans
- [x] /medicare-supplements/medigap-by-carrier/blue-cross-blue-shield-medigap-plans
- [x] /medicare-supplements/medigap-by-carrier/cigna-medigap-plans
- [x] /medicare-supplements/medigap-by-carrier/aetna-medicare-supplement-plans
- [x] /medicare-supplements/medigap-by-carrier/humana-medigap-plans
- [x] /medicare-supplements/medigap-by-carrier/mutual-of-omaha-medigap-plans
- [x] /medicare-supplements/medigap-by-carrier/gpm-medigap-plans
- [x] /medicare-supplements/medigap-by-carrier/gerber-life-medigap-plans
- [x] /medicare-supplements/medigap-by-carrier/national-general
- [x] /medicare-supplements/medigap-by-carrier/manhattan-life-medigap-plans
- [x] /medicare-supplements/medigap-by-carrier/oxford-life-medigap-plans

### Medigap by State Pages (21 pages)
- [x] /medicare-supplements/medigap-by-state (index)
- [x] /medicare-supplements/medigap-by-state/massachusetts-medigap-plans
- [x] /medicare-supplements/medigap-by-state/wisconsin-medigap-plans
- [x] /medicare-supplements/medigap-by-state/minnesota-medigap-plans
- [x] /medicare-supplements/medigap-by-state/florida-medigap-plans
- [x] /medicare-supplements/medigap-by-state/new-jersey-medigap-plans
- [x] /medicare-supplements/medigap-by-state/texas-medigap-plans
- [x] /medicare-supplements/medigap-by-state/california-medigap-plans
- [x] /medicare-supplements/medigap-by-state/connecticut-medigap-plans
- [x] /medicare-supplements/medigap-by-state/arizona-medigap-plans
- [x] /medicare-supplements/medigap-by-state/georgia-medigap-plans
- [x] /medicare-supplements/medigap-by-state/pennsylvania-medigap-plans
- [x] /medicare-supplements/medigap-by-state/oklahoma-medigap-plans
- [x] /medicare-supplements/medigap-by-state/vermont-medigap-plans
- [x] /medicare-supplements/medigap-by-state/new-york-medigap-plans
- [x] /medicare-supplements/medigap-by-state/louisiana-medigap-plans
- [x] /medicare-supplements/medigap-by-state/kentucky-medigap-plans
- [x] /medicare-supplements/medigap-by-state/michigan-medigap-plans
- [x] /medicare-supplements/medigap-by-state/mississippi-medigap-plans
- [x] /medicare-supplements/medigap-by-state/oregon-medigap-plans
- [x] /medicare-supplements/medigap-by-state/tennessee-medigap-plans
- [x] /medicare-supplements/medigap-by-state/ohio-medigap-plans
- [x] /medicare-supplements/medigap-by-state/virginia-medigap-plans
- [x] /medicare-supplements/medigap-by-state/new-mexico-medigap-plans

### Original Medicare Sub-Pages (15 pages)
- [ ] /original-medicare/medicare-parts/medicare-part-a
- [ ] /original-medicare/medicare-parts/medicare-part-b
- [ ] /original-medicare/medicare-parts/medicare-part-d/silverscript
- [ ] /original-medicare/medicare-parts/medicare-part-d/medicare-part-d-plans-2026
- [ ] /original-medicare/medicare-parts/medicare-part-d/medicare-part-d-enrollment-periods
- [ ] /original-medicare/medicare-parts/medicare-part-d/medicare-part-d-eligibility
- [ ] /original-medicare/medicare-parts/medicare-part-d/medicare-part-d-coverage-gap
- [ ] /original-medicare/medicare-parts/medicare-part-d/medicare-part-d-formulary
- [ ] /original-medicare/medicare-parts/medicare-part-d/medicare-part-d-late-enrollment-penalty
- [ ] /original-medicare/medicare-parts/medicare-part-d/medicare-part-d-deductible
- [ ] /original-medicare/medicare-parts/medicare-part-d/medicare-part-d-cost
- [ ] /original-medicare/medicare-parts/medicare-part-d/medicare-part-d-drug-tiers
- [ ] /original-medicare/medicare-parts/medicare-part-d/medicare-part-d-prior-authorization
- [ ] /original-medicare/medicare-parts/medicare-part-d/medicare-part-d-step-therapy
- [ ] /original-medicare/medicare-parts/medicare-part-d/medicare-part-d-exceptions-and-appeals

### Caregiver Guide (6 pages)
- [ ] /guide-to-being-a-caregiver (index)
- [ ] /guide-to-being-a-caregiver/caregiver-assistance
- [ ] /guide-to-being-a-caregiver/who-qualifies-as-a-caregiver-under-medicare-rules
- [ ] /guide-to-being-a-caregiver/how-to-become-a-caregiver
- [ ] /guide-to-being-a-caregiver/what-are-the-4-types-of-caregivers
- [ ] /guide-to-being-a-caregiver/what-is-a-caregiver

### Medicare Advantage Sub-Pages (9 pages)
- [ ] /medicare-part-c (index)
- [ ] /medicare-part-c/medicare-advantage-plan-hmo-pos
- [ ] /medicare-part-c/medicare-advantage-eligibility
- [ ] /medicare-part-c/medicare-advantage-enrollment-periods
- [ ] /medicare-part-c/medicare-advantage-plan-snp
- [ ] /medicare-part-c/medicare-advantage-plan-pffs
- [ ] /medicare-part-c/medicare-advantage-plan-ppo
- [ ] /medicare-part-c/medicare-advantage-costs
- [ ] /medicare-part-c/medicare-advantage-vs-original-medicare
