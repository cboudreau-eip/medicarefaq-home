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
    slug: "medicare-part-b-annual-deductible-explained-what-youll-pay",
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
