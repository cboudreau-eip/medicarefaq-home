/**
 * Unified Search Index
 * Merges blog articles, coverage FAQs, and guides into a single searchable index.
 */

import { blogArticles } from "./blog-articles-data";
import { blogPosts } from "./blog-data";
import { coverageArticles } from "./coverage-data";

/* ─── Unified search result shape ─── */
export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryColor: string;
  type: "blog" | "coverage" | "guide" | "page";
  typeLabel: string;
  href: string;
  readTime?: string;
  author?: string;
  date?: string;
  /** Relevance score (higher = better match) */
  score: number;
}

/* ─── Static guide entries (from Guides.tsx data) ─── */
const guideEntries: Omit<SearchResult, "score">[] = [
  {
    id: "guide-supplement-2026",
    title: "Medicare Supplement Guide 2026",
    description: "A comprehensive guide to all 12 Medigap plan letters, what they cover, how they're priced, and how to choose the right one.",
    category: "Medigap",
    categoryColor: "#7C3AED",
    type: "guide",
    typeLabel: "Guide",
    href: "/medicare-plans/medicare-supplement",
    readTime: "15 min read",
  },
  {
    id: "guide-costs-2026",
    title: "Understanding Medicare Costs in 2026",
    description: "Everything about Medicare premiums, deductibles, coinsurance, and out-of-pocket maximums for 2026 — plus strategies to minimize costs.",
    category: "Costs",
    categoryColor: "#059669",
    type: "guide",
    typeLabel: "Guide",
    href: "/faqs/medicare-costs-in-2026-premiums-deductibles-and-key-changes",
    readTime: "12 min read",
  },
  {
    id: "guide-enrollment",
    title: "When to Enroll in Medicare",
    description: "Your complete enrollment timeline — Initial Enrollment Period, Special Enrollment Periods, Annual Enrollment, and everything in between.",
    category: "Enrollment",
    categoryColor: "#D97706",
    type: "guide",
    typeLabel: "Guide",
    href: "/enrollment/turning-65",
    readTime: "10 min read",
  },
  {
    id: "guide-medicare-vs-medicaid",
    title: "Medicare vs. Medicaid",
    description: "These two programs sound similar but work very differently. Learn who qualifies, what they cover, and whether you can have both.",
    category: "Basics",
    categoryColor: "#0891B2",
    type: "guide",
    typeLabel: "Guide",
    href: "/medicare-101",
    readTime: "8 min read",
  },
  {
    id: "guide-original-medicare",
    title: "Original Medicare Explained",
    description: "How Parts A and B work together to cover hospital and medical services.",
    category: "Medicare Basics",
    categoryColor: "#1B2A4A",
    type: "guide",
    typeLabel: "Guide",
    href: "/medicare-plans/original-medicare",
  },
  {
    id: "guide-advantage",
    title: "Medicare Advantage Guide",
    description: "How Part C plans bundle your coverage and what to watch for.",
    category: "Plan Types",
    categoryColor: "#0D9488",
    type: "guide",
    typeLabel: "Guide",
    href: "/medicare-plans/medicare-advantage",
  },
  {
    id: "guide-part-d",
    title: "Part D Prescription Drug Guide",
    description: "Understanding formularies, coverage stages, and choosing the right drug plan.",
    category: "Prescriptions",
    categoryColor: "#C41230",
    type: "guide",
    typeLabel: "Guide",
    href: "/medicare-plans/part-d",
  },
  {
    id: "guide-medigap-vs-ma",
    title: "Medigap vs. Medicare Advantage",
    description: "The crucial differences and questions to ask before choosing a path.",
    category: "Comparison",
    categoryColor: "#4F46E5",
    type: "guide",
    typeLabel: "Guide",
    href: "/faqs/medicare-supplement-vs-medicare-advantage-crucial-questions-to-ask-before-enrolling",
  },
  {
    id: "guide-eligibility",
    title: "Medicare Eligibility Guide",
    description: "Who qualifies, when you become eligible, and special circumstances.",
    category: "Getting Started",
    categoryColor: "#059669",
    type: "guide",
    typeLabel: "Guide",
    href: "/new-to-medicare/eligibility",
  },
  {
    id: "guide-working-past-65",
    title: "Working Past 65 Guide",
    description: "How employer coverage coordinates with Medicare and when to enroll.",
    category: "Enrollment",
    categoryColor: "#D97706",
    type: "guide",
    typeLabel: "Guide",
    href: "/enrollment/working-past-65",
  },
  {
    id: "guide-supplement-comparison",
    title: "Medicare Supplement Plan Comparison",
    description: "Side-by-side comparison of the most popular Medigap plans.",
    category: "Medigap",
    categoryColor: "#7C3AED",
    type: "guide",
    typeLabel: "Guide",
    href: "/medicare-plans/best-supplement-plans",
  },
  {
    id: "guide-compare-all",
    title: "Compare All Medicare Plans",
    description: "Original Medicare, Medigap, Medicare Advantage, and Part D compared.",
    category: "Comparison",
    categoryColor: "#4F46E5",
    type: "guide",
    typeLabel: "Guide",
    href: "/compare-rates",
  },
  {
    id: "guide-late-penalties",
    title: "Late Enrollment Penalties",
    description: "How penalties are calculated and strategies to avoid them.",
    category: "Enrollment",
    categoryColor: "#D97706",
    type: "guide",
    typeLabel: "Guide",
    href: "/enrollment/late-penalties",
  },
];

/* ─── Static page entries (key site pages) ─── */
const pageEntries: Omit<SearchResult, "score">[] = [
  {
    id: "page-medicare-101",
    title: "Medicare 101",
    description: "Everything you need to know about Medicare — what it is, how it works, and what it covers.",
    category: "Getting Started",
    categoryColor: "#1B2A4A",
    type: "page",
    typeLabel: "Page",
    href: "/medicare-101",
  },
  {
    id: "page-checklist",
    title: "Getting Started Checklist",
    description: "A step-by-step checklist to help you navigate your Medicare enrollment smoothly.",
    category: "Getting Started",
    categoryColor: "#1B2A4A",
    type: "page",
    typeLabel: "Page",
    href: "/new-to-medicare/checklist",
  },
  {
    id: "page-costs",
    title: "Medicare Costs Overview",
    description: "Understand what Medicare costs including premiums, deductibles, copays, and out-of-pocket limits.",
    category: "Costs",
    categoryColor: "#059669",
    type: "page",
    typeLabel: "Page",
    href: "/new-to-medicare/costs",
  },
  {
    id: "page-turning-65",
    title: "Turning 65 — What You Need to Know",
    description: "Your guide to understanding Medicare when you're approaching age 65.",
    category: "Getting Started",
    categoryColor: "#1B2A4A",
    type: "page",
    typeLabel: "Page",
    href: "/new-to-medicare/turning-65",
  },
  {
    id: "page-contact",
    title: "Contact Us",
    description: "Get in touch with our licensed Medicare agents for free, unbiased guidance.",
    category: "Support",
    categoryColor: "#6B7280",
    type: "page",
    typeLabel: "Page",
    href: "/contact",
  },
  {
    id: "page-about",
    title: "About Our Team",
    description: "Meet the licensed Medicare experts at Elite Insurance Partners who power MedicareFAQ.com.",
    category: "About",
    categoryColor: "#6B7280",
    type: "page",
    typeLabel: "Page",
    href: "/library/about",
  },
];

/* ─── Build the full index ─── */
function buildIndex(): Omit<SearchResult, "score">[] {
  const items: Omit<SearchResult, "score">[] = [];
  const seenSlugs = new Set<string>();

  // 1. Blog articles (full data)
  for (const a of blogArticles) {
    if (seenSlugs.has(a.slug)) continue;
    seenSlugs.add(a.slug);
    items.push({
      id: `blog-${a.slug}`,
      title: a.title,
      description: a.excerpt,
      category: a.category,
      categoryColor: a.categoryColor,
      type: "blog",
      typeLabel: "Blog",
      href: `/blog/${a.slug}`,
      readTime: a.readTime,
      author: a.author,
      date: a.date,
    });
  }

  // 2. Legacy blog posts (only if not already in blogArticles)
  for (const p of blogPosts) {
    if (seenSlugs.has(p.slug)) continue;
    seenSlugs.add(p.slug);
    items.push({
      id: `blog-${p.slug}`,
      title: p.title,
      description: p.excerpt,
      category: p.category,
      categoryColor: p.categoryColor,
      type: "blog",
      typeLabel: "Blog",
      href: `/blog/${p.slug}`,
      readTime: p.readTime,
      author: p.author,
      date: p.date,
    });
  }

  // 3. Coverage articles
  for (const a of coverageArticles) {
    items.push({
      id: `coverage-${a.slug}`,
      title: a.title,
      description: a.subtitle,
      category: a.category,
      categoryColor:
        a.category === "Medicare Coverage"
          ? "#059669"
          : a.category === "Medicare Enrollment"
            ? "#2563EB"
            : a.category === "Medicare Advantage"
              ? "#D97706"
              : a.category === "Medicare Supplement (Medigap)"
                ? "#7C3AED"
                : a.category === "Medicare Part D"
                  ? "#C41230"
                  : "#1B2A4A",
      type: "coverage",
      typeLabel: "Coverage FAQ",
      href: `/faqs/${a.slug}`,
      readTime: a.readTime,
      author: a.author.name,
      date: a.dateUpdated,
    });
  }

  // 4. Guides
  items.push(...guideEntries);

  // 5. Key pages
  items.push(...pageEntries);

  return items;
}

const searchIndex = buildIndex();

/* ─── Search function ─── */
export function searchContent(query: string): SearchResult[] {
  if (!query.trim()) return [];

  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 1);

  if (terms.length === 0) return [];

  const results: SearchResult[] = [];

  for (const item of searchIndex) {
    let score = 0;
    const titleLower = item.title.toLowerCase();
    const descLower = item.description.toLowerCase();
    const catLower = item.category.toLowerCase();
    const fullQuery = query.toLowerCase().trim();

    for (const term of terms) {
      // Title matches (highest weight)
      if (titleLower === fullQuery) {
        score += 100;
      } else if (titleLower.startsWith(term)) {
        score += 25;
      } else if (titleLower.includes(term)) {
        score += 15;
      }

      // Description matches
      if (descLower.includes(term)) {
        score += 8;
      }

      // Category matches
      if (catLower.includes(term)) {
        score += 5;
      }

      // Type label matches
      if (item.typeLabel.toLowerCase().includes(term)) {
        score += 3;
      }
    }

    // Bonus for matching all terms
    const allTermsMatch = terms.every(
      (t) => titleLower.includes(t) || descLower.includes(t) || catLower.includes(t)
    );
    if (allTermsMatch) {
      score += 10;
    }

    if (score > 0) {
      results.push({ ...item, score });
    }
  }

  // Sort by score descending, then by type priority (guides > coverage > blog > page)
  const typePriority: Record<string, number> = {
    guide: 4,
    coverage: 3,
    blog: 2,
    page: 1,
  };

  results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return (typePriority[b.type] || 0) - (typePriority[a.type] || 0);
  });

  return results;
}

/** Get content type counts for a query */
export function getTypeCounts(results: SearchResult[]) {
  const counts: Record<string, number> = {
    all: results.length,
    blog: 0,
    coverage: 0,
    guide: 0,
    page: 0,
  };
  for (const r of results) {
    counts[r.type] = (counts[r.type] || 0) + 1;
  }
  return counts;
}

/** Get total content count */
export function getTotalContentCount() {
  return searchIndex.length;
}
