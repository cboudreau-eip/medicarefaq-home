export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryColor: string;
  date: string;
  author: string;
  reviewer: string;
  readTime: string;
  featured?: boolean;
  image: string;
}

export interface ArticleSection {
  id: string;
  title: string;
  level: number;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "medicare-part-b-annual-deductible-explained",
    title: "Medicare Part B Annual Deductible Explained: What You'll Pay",
    excerpt:
      "Understanding the Part B deductible is one of the most important steps in protecting your retirement savings. Learn how the $283 deductible works in 2026.",
    category: "Medicare Costs",
    categoryColor: "#C41230",
    date: "March 12, 2026",
    author: "David Haass",
    reviewer: "Ashlee Zareczny",
    readTime: "12 min read",
    featured: true,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop",
  },
  {
    slug: "medicare-automatic-vs-manual-enrollment",
    title:
      "Navigating Your Coverage: Medicare Automatic Enrollment vs. Manual Enrollment Explained",
    excerpt:
      "Learn the key differences between automatic and manual Medicare enrollment, and find out which path applies to your situation.",
    category: "Enrollment",
    categoryColor: "#D97706",
    date: "March 10, 2026",
    author: "David Haass",
    reviewer: "Ashlee Zareczny",
    readTime: "10 min read",
    featured: true,
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=500&fit=crop",
  },
  {
    slug: "medicare-supplement-vs-advantage-transparency",
    title:
      "Medicare Supplement vs. Medicare Advantage: Coverage Transparency Explained",
    excerpt:
      "Compare how Medicare Supplement and Medicare Advantage plans handle coverage transparency, costs, and provider access.",
    category: "Medicare Plans",
    categoryColor: "#1B2A4A",
    date: "March 5, 2026",
    author: "David Haass",
    reviewer: "Ashlee Zareczny",
    readTime: "14 min read",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=500&fit=crop",
  },
  {
    slug: "medigap-free-look-period",
    title:
      "Understanding the Medigap Free Look Period: Your 30-Day Safety Net",
    excerpt:
      "The Medigap free look period gives you 30 days to try a new Medicare Supplement plan risk-free. Here's how it works.",
    category: "Medicare Supplement",
    categoryColor: "#4F46E5",
    date: "February 28, 2026",
    author: "David Haass",
    reviewer: "Ashlee Zareczny",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop",
  },
  {
    slug: "medicare-supplement-pre-existing-conditions",
    title:
      "Medicare Supplement and Pre-Existing Conditions: What You Need to Know",
    excerpt:
      "Pre-existing conditions can affect your Medigap options. Learn about guaranteed issue rights and when insurers can use medical underwriting.",
    category: "Medicare Supplement",
    categoryColor: "#4F46E5",
    date: "February 20, 2026",
    author: "David Haass",
    reviewer: "Ashlee Zareczny",
    readTime: "11 min read",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&h=500&fit=crop",
  },
  {
    slug: "medicare-part-d-explained",
    title: "Medicare Part D: How Prescription Drug Coverage Works in 2026",
    excerpt:
      "A complete guide to Medicare Part D prescription drug plans, including costs, coverage stages, and how to choose the right plan.",
    category: "Medicare Plans",
    categoryColor: "#1B2A4A",
    date: "February 15, 2026",
    author: "David Haass",
    reviewer: "Ashlee Zareczny",
    readTime: "13 min read",
    image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=800&h=500&fit=crop",
  },
  {
    slug: "turning-65-medicare-checklist",
    title: "Turning 65? Your Complete Medicare Enrollment Checklist",
    excerpt:
      "Don't miss a deadline. This step-by-step checklist covers everything you need to do before, during, and after turning 65.",
    category: "Getting Started",
    categoryColor: "#0D9488",
    date: "February 10, 2026",
    author: "David Haass",
    reviewer: "Ashlee Zareczny",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=500&fit=crop",
  },
  {
    slug: "medicare-advantage-vs-original-medicare",
    title: "Medicare Advantage vs. Original Medicare: Which Is Right for You?",
    excerpt:
      "Compare the two main paths for Medicare coverage — Original Medicare with Medigap vs. Medicare Advantage — to find your best fit.",
    category: "Medicare Plans",
    categoryColor: "#1B2A4A",
    date: "February 5, 2026",
    author: "David Haass",
    reviewer: "Ashlee Zareczny",
    readTime: "15 min read",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop",
  },
  {
    slug: "medicare-costs-2026-overview",
    title: "Medicare Costs in 2026: Premiums, Deductibles, and Out-of-Pocket Expenses",
    excerpt:
      "A comprehensive breakdown of all Medicare costs for 2026, including Part A, Part B, Part D, and Medigap premiums.",
    category: "Medicare Costs",
    categoryColor: "#C41230",
    date: "January 28, 2026",
    author: "David Haass",
    reviewer: "Ashlee Zareczny",
    readTime: "16 min read",
    image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&h=500&fit=crop",
  },
];

export const articleTableOfContents: ArticleSection[] = [
  { id: "how-deductible-works", title: "How the Part B Deductible Works", level: 2 },
  { id: "after-meeting-deductible", title: "What Happens After Meeting the Deductible", level: 2 },
  { id: "deductible-vs-premium", title: "Deductible vs Premium vs Coinsurance", level: 2 },
  { id: "premium-key-differences", title: "Part B Premiums vs. Deductible: Key Differences", level: 2 },
  { id: "services-that-count", title: "Services That Count Toward the Deductible", level: 2 },
  { id: "preventive-services", title: "Preventive Services You Don't Pay For", level: 2 },
  { id: "deductible-changes", title: "Deductible Changes by Year", level: 2 },
  { id: "out-of-pocket-costs", title: "How the Deductible Affects Out-of-Pocket Costs", level: 2 },
  { id: "tips-managing-costs", title: "Tips for Managing Part B Costs", level: 2 },
  { id: "who-this-is-for", title: "Who This Is For / Who This Isn't For", level: 2 },
  { id: "final-thoughts", title: "Final Thoughts", level: 2 },
  { id: "faqs", title: "Frequently Asked Questions", level: 2 },
];

export const categories = [
  { name: "All Posts", color: "#1B2A4A" },
  { name: "Medicare Costs", color: "#C41230" },
  { name: "Enrollment", color: "#D97706" },
  { name: "Medicare Plans", color: "#1B2A4A" },
  { name: "Medicare Supplement", color: "#4F46E5" },
  { name: "Getting Started", color: "#0D9488" },
];
