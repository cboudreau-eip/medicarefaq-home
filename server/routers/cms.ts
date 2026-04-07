import { z } from "zod";
import { eq, and } from "drizzle-orm";
import { getDb } from "../db";
import { cmsMeta } from "../../drizzle/schema";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import { runFullAudit, type PageInput, type FullAuditResult } from "../../shared/seo-audit";
import { SIMPLE_FAQ_SLUGS } from "../../shared/simple-faq-slugs";

const contentTypeSchema = z.enum(["page", "coverage", "blog"]);

// Guard: only the site owner (admin role) can use CMS procedures
const ownerProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Owner access only" });
  }
  return next({ ctx });
});

// ── Page registry (mirrors Admin.tsx) ────────────────────────────────────────
// This is the server-side source of truth for all registered pages.

interface PageDef {
  slug: string;
  label: string;
  path: string;
  contentType: "page" | "coverage" | "blog";
}

const STATIC_PAGES: PageDef[] = [
  { slug: "home", label: "Home", path: "/", contentType: "page" },
  { slug: "about-us", label: "About Us", path: "/about-us", contentType: "page" },
  { slug: "contact", label: "Contact", path: "/contact", contentType: "page" },
  { slug: "blog", label: "Blog", path: "/blog", contentType: "page" },
  { slug: "medicare-101", label: "Medicare 101", path: "/medicare-101", contentType: "page" },
  { slug: "eligibility", label: "Eligibility", path: "/new-to-medicare/eligibility", contentType: "page" },
  { slug: "turning-65", label: "Turning 65", path: "/new-to-medicare/turning-65", contentType: "page" },
  { slug: "medicare-costs", label: "Medicare Costs", path: "/new-to-medicare/costs", contentType: "page" },
  { slug: "checklist", label: "Checklist", path: "/new-to-medicare/checklist", contentType: "page" },
  { slug: "original-medicare", label: "Original Medicare", path: "/original-medicare", contentType: "page" },
  { slug: "medicare-supplement", label: "Medicare Supplement", path: "/medicare-supplements", contentType: "page" },
  { slug: "medicare-advantage", label: "Medicare Advantage", path: "/medicare-part-c/medicare-advantage-plans", contentType: "page" },
  { slug: "part-d", label: "Medicare Part D", path: "/original-medicare/medicare-parts/medicare-part-d", contentType: "page" },
  { slug: "compare-rates", label: "Compare Plans", path: "/compare-rates", contentType: "page" },
  { slug: "plan-costs", label: "Plan Costs", path: "/medicare-plans/costs", contentType: "page" },
  { slug: "supplement-vs-advantage", label: "Supplement vs. Advantage", path: "/medicare-plans/supplement-vs-advantage", contentType: "page" },
  { slug: "best-supplement-plans", label: "Best Supplement Plans", path: "/medicare-plans/best-supplement-plans", contentType: "page" },
  { slug: "enrollment-turning-65", label: "Enrollment: Turning 65", path: "/enrollment/turning-65", contentType: "page" },
  { slug: "working-past-65", label: "Working Past 65", path: "/enrollment/working-past-65", contentType: "page" },
  { slug: "annual-changes", label: "Annual Changes", path: "/enrollment/annual-changes", contentType: "page" },
  { slug: "late-penalties", label: "Late Penalties", path: "/enrollment/late-penalties", contentType: "page" },
  { slug: "how-to-enroll", label: "How to Enroll", path: "/enrollment/how-to-enroll", contentType: "page" },
  { slug: "enrollment-calculator", label: "Enrollment Calculator", path: "/tools/enrollment-timeline", contentType: "page" },
  { slug: "guides", label: "Guides", path: "/library/guides", contentType: "page" },
  { slug: "podcasts", label: "Podcast", path: "/podcasts", contentType: "page" },
  { slug: "videos", label: "Videos", path: "/videos", contentType: "page" },
  { slug: "about-team", label: "About the Team", path: "/library/about", contentType: "page" },
  { slug: "faqs", label: "Coverage FAQs Index", path: "/faqs", contentType: "page" },
  { slug: "search", label: "Search Results", path: "/search", contentType: "page" },
  { slug: "blog-medicare-part-b-deductible", label: "Blog: Medicare Part B Deductible", path: "/blog/medicare-part-b-annual-deductible-explained-what-youll-pay", contentType: "page" },
  { slug: "faqs-does-medicare-cover-medical-alert-systems", label: "Coverage: Medical Alert Systems", path: "/faqs/does-medicare-cover-medical-alert-systems", contentType: "page" },
  { slug: "privacy-policy", label: "Privacy Policy", path: "/privacy-policy", contentType: "page" },
  { slug: "terms-of-use", label: "Terms of Use", path: "/terms-of-use", contentType: "page" },
  // Medigap plan letter pages
  { slug: "medigap-plan-a", label: "Medigap Plan A", path: "/medicare-supplements/plan-a", contentType: "page" },
  { slug: "medigap-plan-b", label: "Medigap Plan B", path: "/medicare-supplements/plan-b", contentType: "page" },
  { slug: "medigap-plan-c", label: "Medigap Plan C", path: "/medicare-supplements/plan-c", contentType: "page" },
  { slug: "medigap-plan-d", label: "Medigap Plan D", path: "/medicare-supplements/plan-d", contentType: "page" },
  { slug: "medigap-plan-f", label: "Medigap Plan F", path: "/medicare-supplements/plan-f", contentType: "page" },
  { slug: "medigap-plan-g", label: "Medigap Plan G", path: "/medicare-supplements/plan-g", contentType: "page" },
  { slug: "medigap-plan-k", label: "Medigap Plan K", path: "/medicare-supplements/plan-k", contentType: "page" },
  { slug: "medigap-plan-l", label: "Medigap Plan L", path: "/medicare-supplements/plan-l", contentType: "page" },
  { slug: "medigap-plan-m", label: "Medigap Plan M", path: "/medicare-supplements/plan-m", contentType: "page" },
  { slug: "medigap-plan-n", label: "Medigap Plan N", path: "/medicare-supplements/plan-n", contentType: "page" },
  { slug: "medigap-high-deductible-plan-g", label: "High Deductible Plan G", path: "/medicare-supplements/high-deductible-plan-g", contentType: "page" },
  { slug: "medigap-high-deductible-plan-f", label: "High Deductible Plan F", path: "/medicare-supplements/high-deductible-plan-f", contentType: "page" },
  // Medigap special pages
  { slug: "medigap-compare", label: "Compare Medigap Plans", path: "/medicare-supplements/compare", contentType: "page" },
  { slug: "medigap-eligibility", label: "Medigap Eligibility", path: "/medicare-supplements/medigap-eligibility", contentType: "page" },
  { slug: "medicare-supplement-plans-2026", label: "Medicare Supplement Plans 2026", path: "/medicare-supplements/medicare-supplement-plans-2026", contentType: "page" },
  // Medigap by-carrier pages
  { slug: "medigap-by-carrier", label: "Medigap by Carrier (Index)", path: "/medicare-supplements/medigap-by-carrier", contentType: "page" },
  { slug: "medigap-carrier-accendo-medicare-supplement-plans", label: "Accendo Medigap Plans", path: "/medicare-supplements/medigap-by-carrier/accendo-medicare-supplement-plans", contentType: "page" },
  { slug: "medigap-carrier-medico-medigap-plans", label: "Medico Medigap Plans", path: "/medicare-supplements/medigap-by-carrier/medico-medigap-plans", contentType: "page" },
  { slug: "medigap-carrier-bankers-fidelity-medigap-plans", label: "Bankers Fidelity Medigap Plans", path: "/medicare-supplements/medigap-by-carrier/bankers-fidelity-medigap-plans", contentType: "page" },
  { slug: "medigap-carrier-united-american-medigap-plans", label: "United American Medigap Plans", path: "/medicare-supplements/medigap-by-carrier/united-american-medigap-plans", contentType: "page" },
  { slug: "medigap-carrier-united-healthcare-medigap-plans", label: "UnitedHealthcare Medigap Plans", path: "/medicare-supplements/medigap-by-carrier/united-healthcare-medigap-plans", contentType: "page" },
  { slug: "medigap-carrier-blue-cross-blue-shield-medigap-plans", label: "Blue Cross Blue Shield Medigap Plans", path: "/medicare-supplements/medigap-by-carrier/blue-cross-blue-shield-medigap-plans", contentType: "page" },
  { slug: "medigap-carrier-cigna-medigap-plans", label: "Cigna Medigap Plans", path: "/medicare-supplements/medigap-by-carrier/cigna-medigap-plans", contentType: "page" },
  { slug: "medigap-carrier-aetna-medicare-supplement-plans", label: "Aetna Medigap Plans", path: "/medicare-supplements/medigap-by-carrier/aetna-medicare-supplement-plans", contentType: "page" },
  { slug: "medigap-carrier-humana-medigap-plans", label: "Humana Medigap Plans", path: "/medicare-supplements/medigap-by-carrier/humana-medigap-plans", contentType: "page" },
  { slug: "medigap-carrier-mutual-of-omaha-medigap-plans", label: "Mutual of Omaha Medigap Plans", path: "/medicare-supplements/medigap-by-carrier/mutual-of-omaha-medigap-plans", contentType: "page" },
  { slug: "medigap-carrier-gpm-medigap-plans", label: "GPM Life Medigap Plans", path: "/medicare-supplements/medigap-by-carrier/gpm-medigap-plans", contentType: "page" },
  { slug: "medigap-carrier-gerber-life-medigap-plans", label: "Gerber Life Medigap Plans", path: "/medicare-supplements/medigap-by-carrier/gerber-life-medigap-plans", contentType: "page" },
  { slug: "medigap-carrier-national-general", label: "National General Medigap Plans", path: "/medicare-supplements/medigap-by-carrier/national-general", contentType: "page" },
  { slug: "medigap-carrier-manhattan-life-medigap-plans", label: "Manhattan Life Medigap Plans", path: "/medicare-supplements/medigap-by-carrier/manhattan-life-medigap-plans", contentType: "page" },
  { slug: "medigap-carrier-oxford-life-medigap-plans", label: "Oxford Life Medigap Plans", path: "/medicare-supplements/medigap-by-carrier/oxford-life-medigap-plans", contentType: "page" },
  // Medigap by-state pages
  { slug: "medigap-by-state", label: "Medigap by State (Index)", path: "/medicare-supplements/medigap-by-state", contentType: "page" },
  { slug: "medigap-state-massachusetts-medigap-plans", label: "Massachusetts Medigap Plans", path: "/medicare-supplements/medigap-by-state/massachusetts-medigap-plans", contentType: "page" },
  { slug: "medigap-state-wisconsin-medigap-plans", label: "Wisconsin Medigap Plans", path: "/medicare-supplements/medigap-by-state/wisconsin-medigap-plans", contentType: "page" },
  { slug: "medigap-state-minnesota-medigap-plans", label: "Minnesota Medigap Plans", path: "/medicare-supplements/medigap-by-state/minnesota-medigap-plans", contentType: "page" },
  { slug: "medigap-state-florida-medigap-plans", label: "Florida Medigap Plans", path: "/medicare-supplements/medigap-by-state/florida-medigap-plans", contentType: "page" },
  { slug: "medigap-state-new-jersey-medigap-plans", label: "New Jersey Medigap Plans", path: "/medicare-supplements/medigap-by-state/new-jersey-medigap-plans", contentType: "page" },
  { slug: "medigap-state-texas-medigap-plans", label: "Texas Medigap Plans", path: "/medicare-supplements/medigap-by-state/texas-medigap-plans", contentType: "page" },
  { slug: "medigap-state-california-medigap-plans", label: "California Medigap Plans", path: "/medicare-supplements/medigap-by-state/california-medigap-plans", contentType: "page" },
  { slug: "medigap-state-connecticut-medigap-plans", label: "Connecticut Medigap Plans", path: "/medicare-supplements/medigap-by-state/connecticut-medigap-plans", contentType: "page" },
  { slug: "medigap-state-arizona-medigap-plans", label: "Arizona Medigap Plans", path: "/medicare-supplements/medigap-by-state/arizona-medigap-plans", contentType: "page" },
  { slug: "medigap-state-georgia-medigap-plans", label: "Georgia Medigap Plans", path: "/medicare-supplements/medigap-by-state/georgia-medigap-plans", contentType: "page" },
  { slug: "medigap-state-pennsylvania-medigap-plans", label: "Pennsylvania Medigap Plans", path: "/medicare-supplements/medigap-by-state/pennsylvania-medigap-plans", contentType: "page" },
  { slug: "medigap-state-oklahoma-medigap-plans", label: "Oklahoma Medigap Plans", path: "/medicare-supplements/medigap-by-state/oklahoma-medigap-plans", contentType: "page" },
  { slug: "medigap-state-vermont-medigap-plans", label: "Vermont Medigap Plans", path: "/medicare-supplements/medigap-by-state/vermont-medigap-plans", contentType: "page" },
  { slug: "medigap-state-new-york-medigap-plans", label: "New York Medigap Plans", path: "/medicare-supplements/medigap-by-state/new-york-medigap-plans", contentType: "page" },
  { slug: "medigap-state-louisiana-medigap-plans", label: "Louisiana Medigap Plans", path: "/medicare-supplements/medigap-by-state/louisiana-medigap-plans", contentType: "page" },
  { slug: "medigap-state-kentucky-medigap-plans", label: "Kentucky Medigap Plans", path: "/medicare-supplements/medigap-by-state/kentucky-medigap-plans", contentType: "page" },
  { slug: "medigap-state-michigan-medigap-plans", label: "Michigan Medigap Plans", path: "/medicare-supplements/medigap-by-state/michigan-medigap-plans", contentType: "page" },
  { slug: "medigap-state-mississippi-medigap-plans", label: "Mississippi Medigap Plans", path: "/medicare-supplements/medigap-by-state/mississippi-medigap-plans", contentType: "page" },
  { slug: "medigap-state-oregon-medigap-plans", label: "Oregon Medigap Plans", path: "/medicare-supplements/medigap-by-state/oregon-medigap-plans", contentType: "page" },
  { slug: "medigap-state-tennessee-medigap-plans", label: "Tennessee Medigap Plans", path: "/medicare-supplements/medigap-by-state/tennessee-medigap-plans", contentType: "page" },
  { slug: "medigap-state-ohio-medigap-plans", label: "Ohio Medigap Plans", path: "/medicare-supplements/medigap-by-state/ohio-medigap-plans", contentType: "page" },
  { slug: "medigap-state-virginia-medigap-plans", label: "Virginia Medigap Plans", path: "/medicare-supplements/medigap-by-state/virginia-medigap-plans", contentType: "page" },
  { slug: "medigap-state-new-mexico-medigap-plans", label: "New Mexico Medigap Plans", path: "/medicare-supplements/medigap-by-state/new-mexico-medigap-plans", contentType: "page" },
];

const COVERAGE_SLUGS = [
  "does-medicare-cover-dental-implants",
  "does-medicare-cover-glasses",
  "does-medicare-cover-hearing-aids",
  "does-medicare-cover-chiropractic-care",
  "does-medicare-cover-acupuncture",
  "does-medicare-cover-sleep-apnea",
  "does-medicare-cover-cataract-surgery",
  "does-medicare-cover-hospice",
  "does-medicare-cover-dentures",
  "does-medicare-cover-mental-health",
  "does-medicare-cover-ozempic",
  "does-medicare-cover-speech-therapy",
  "does-medicare-cover-copd",
  "does-medicare-cover-pre-existing-conditions",
  "does-medicare-cover-prosthetic-devices",
  "when-should-you-enroll-in-medicare-if-still-working",
  "medicare-advantage-extra-benefits-explained-whats-really-included",
  "medicare-supplement-vs-medicare-advantage-crucial-questions-to-ask-before-enrolling",
  "medicare-supplement-vs-medicare-advantage-for-veterans-choosing-the-right-coverage",
  "medicare-costs-in-2026-premiums-deductibles-and-key-changes",
  "does-medicare-cover-life-alert",
  "is-medicare-free",
  "25-medicare-qas-you-should-know",
  "new-medicare-changes",
  "do-disposable-adult-diaper-manufacturers-have-assistance-programs-for-free-or-reduced-cost-depends",
  "will-medicare-supplement-plan-g-pay-for-anesthesia-for-pain-management",
  "does-medicare-cover-a-shower-transfer-bench",
  "medicare-silversneakers-program",
  "medicare-annual-notice-of-change-letter",
  "medicare-give-back-benefit",
  "why-medicare-advantage-plans-are-bad",
  "medigap-vs-medicare-advantage",
  "medicare-special-enrollment-period",
  "medicare-advantage-open-enrollment-period",
  "fehb-and-medicare",
  "medicare-creditable-coverage",
  "medicare-part-d-penalty",
  "medicare-cost-sharing-plans",
  "medicare-maximum-out-of-pocket",
  "medicare-annual-enrollment-period",
];

const BLOG_SLUGS = [
  "medicare-costs-2025",
  "how-is-medicare-part-d-changing-in-2026",
  "the-essentials-medicare-supplement-vs-medicare-advantage-explained",
  "your-guide-to-medicare-enrollment-periods-when-to-sign-up",
  "10-questions-to-ask-before-buying-a-medicare-supplement-plan",
  "key-questions-to-ask-when-comparing-medicare-advantage-plans",
  "the-top-5-mistakes-people-make-during-medicare-annual-enrollment-and-how-to-avoid-them",
  "new-in-2025-medicares-part-d-payment-plan-explained",
  "understanding-medigap-premiums-does-a-higher-price-mean-better-coverage",
  "how-medigap-plans-affect-your-overall-medicare-costs",
  "navigating-your-coverage-medicare-automatic-enrollment-vs-manual-enrollment-explained",
  "medicare-supplement-vs-medicare-advantage-coverage-transparency-explained",
  "how-the-medigap-free-look-period-protects-you",
  "medicare-part-b-annual-deductible-explained-what-youll-pay",
  "medicare-supplement-and-pre-existing-conditions-what-you-need-to-know",
  "how-the-medicare-part-b-giveback-can-lower-your-monthly-costs",
  "medicare-advantage-for-chronic-conditions-what-you-need-to-know",
  "understanding-how-medicare-works-with-employer-health-plans",
  "why-medicare-supplements-offer-peace-of-mind",
  "why-medicare-supplements-offer-network-free-healthcare",
];

function slugToLabel(s: string) {
  return s.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

// Build the full page registry for audit
function getAllPageDefs(): PageDef[] {
  const pages: PageDef[] = [...STATIC_PAGES];

  for (const slug of [...COVERAGE_SLUGS, ...SIMPLE_FAQ_SLUGS]) {
    pages.push({
      slug,
      label: slugToLabel(slug),
      path: `/faqs/${slug}`,
      contentType: "coverage",
    });
  }

  for (const slug of BLOG_SLUGS) {
    pages.push({
      slug,
      label: slugToLabel(slug),
      path: `/blog/${slug}`,
      contentType: "blog",
    });
  }

  return pages;
}

export const cmsRouter = router({
  // Get all CMS overrides for a given content type
  list: ownerProcedure
    .input(z.object({ contentType: contentTypeSchema }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });
      return db
        .select()
        .from(cmsMeta)
        .where(eq(cmsMeta.contentType, input.contentType));
    }),

  // Get a single CMS override by contentType + slug (public — anonymous visitors need this too)
  get: publicProcedure
    .input(z.object({ contentType: contentTypeSchema, slug: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });
      const rows = await db
        .select()
        .from(cmsMeta)
        .where(and(eq(cmsMeta.contentType, input.contentType), eq(cmsMeta.slug, input.slug)))
        .limit(1);
      return rows[0] ?? null;
    }),

  // Upsert a CMS override (create or update)
  upsert: ownerProcedure
    .input(
      z.object({
        contentType: contentTypeSchema,
        slug: z.string().min(1),
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
        ogImage: z.string().optional(),
        imageAltText: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });

      await db
        .insert(cmsMeta)
        .values({
          contentType: input.contentType,
          slug: input.slug,
          metaTitle: input.metaTitle ?? null,
          metaDescription: input.metaDescription ?? null,
          ogImage: input.ogImage ?? null,
          imageAltText: input.imageAltText ?? null,
        })
        .onDuplicateKeyUpdate({
          set: {
            metaTitle: input.metaTitle ?? null,
            metaDescription: input.metaDescription ?? null,
            ogImage: input.ogImage ?? null,
            imageAltText: input.imageAltText ?? null,
          },
        });

      return { success: true };
    }),

  // ── SEO Audit ──────────────────────────────────────────────────────────────
  // Returns a full site-wide SEO audit with per-page scores and a summary.
  audit: ownerProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });

    // Fetch all CMS meta rows from the database
    const allMeta = await db.select().from(cmsMeta);

    // Build a lookup map: "contentType:slug" -> meta row
    const metaMap = new Map<string, typeof allMeta[number]>();
    for (const row of allMeta) {
      metaMap.set(`${row.contentType}:${row.slug}`, row);
    }

    // Build PageInput array from the registry, merging DB data
    const pageDefs = getAllPageDefs();
    const inputs: PageInput[] = pageDefs.map((def) => {
      const key = `${def.contentType}:${def.slug}`;
      const meta = metaMap.get(key);
      return {
        slug: def.slug,
        contentType: def.contentType,
        label: def.label,
        path: def.path,
        metaTitle: meta?.metaTitle ?? "",
        metaDescription: meta?.metaDescription ?? "",
        ogImage: meta?.ogImage ?? "",
        imageAltText: meta?.imageAltText ?? "",
      };
    });

    return runFullAudit(inputs);
  }),
});
