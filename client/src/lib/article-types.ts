/**
 * Shared data types for data-driven article templates.
 * Both Coverage Q&A and Blog articles use these schemas.
 */

/* ─── Coverage Q&A Article Schema ─── */

export interface CoverageBadgeData {
  plan: string;
  status: "covered" | "not-covered" | "partial";
}

export interface QuickAnswerData {
  text: string;
  badges: CoverageBadgeData[];
}

export interface ComparisonRow {
  planType: string;
  coverage: string;
  icon: string; // lucide icon name
  notes: string;
}

export interface PlanBreakdownData {
  planName: string;
  icon: string;
  iconColor: string;
  coverageLabel: string;
  coverageType: "covered" | "not-covered" | "partial";
  statusBadge?: string; // e.g. "Does NOT cover hearing aids"
  paragraphs: string[];
  whatItCovers?: string[];
  whatItDoesntCover?: string[];
  callout?: {
    type: "warning" | "info" | "success" | "tip";
    title: string;
    text: string;
  };
  costNote?: string; // e.g. "$ Cost: Most people pay $0 in premiums..."
}

export interface CostTableRow {
  [key: string]: string;
}

export interface CostTableData {
  title: string;
  headers: string[];
  rows: CostTableRow[];
  footnote?: string;
}

export interface StepListData {
  title: string;
  steps: string[];
}

export interface ChecklistData {
  title: string;
  items: string[];
  type: "search" | "info" | "tip" | "warning";
}

export interface FAQItemData {
  question: string;
  answer: string;
}

export interface RelatedTopicData {
  title: string;
  description: string;
  slug: string;
}

export interface QuickReferenceItem {
  icon: "check" | "x" | "alert" | "dollar" | "info";
  text: string;
}

export interface AuthorData {
  name: string;
  initials: string;
  role: "Author" | "Reviewer";
  bio: string;
}

export interface ArticleSEO {
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
}

export interface CoverageArticleData {
  slug: string;
  seo?: ArticleSEO;
  title: string;
  subtitle: string;
  category: string;
  dateUpdated: string;
  author: AuthorData;
  reviewer: AuthorData;
  readTime: string;
  youtubeVideoId?: string;
  youtubeVideoTitle?: string;
  buzzsproutUrl?: string;    // Direct MP3 URL from Buzzsprout for podcast player
  podcastDate?: string;      // e.g. "March 12, 2026"
  podcastDuration?: string;  // e.g. "5:14"

  quickAnswer: QuickAnswerData;
  comparisonTable: ComparisonRow[];

  planBreakdowns: PlanBreakdownData[];

  // Optional sections — not every article has all of these
  subNavLinks?: { label: string; href: string }[];
  advantageSteps?: StepListData;
  costTable?: CostTableData;
  exceptionsSection?: {
    title: string;
    items: {
      title: string;
      text: string;
      highlight?: string;
    }[];
  };
  legislativeUpdate?: {
    title: string;
    items: {
      title: string;
      status: "Passed" | "Pending" | "Failed" | "Proposed";
      description: string;
    }[];
  };
  alternativesSection?: {
    title: string;
    paragraphs: string[];
    checklist?: ChecklistData;
  };
  relatedEquipment?: {
    title: string;
    paragraphs: string[];
    callout?: {
      type: "warning" | "info" | "success" | "tip";
      title: string;
      text: string;
    };
  };
  medicaidSection?: {
    title: string;
    paragraphs: string[];
    steps?: StepListData;
  };
  decisionSection?: {
    title: string;
    paragraphs: string[];
    checklist?: ChecklistData;
  };

  faqs: FAQItemData[];
  quickReference: QuickReferenceItem[];
  relatedTopics: RelatedTopicData[];
  sidebarRelatedLinks: string[];

  ctaBanner: {
    title: string;
    text: string;
  };
}

/* ─── Blog Article Schema ─── */

export interface BlogSectionContent {
  type: "paragraph" | "heading" | "table" | "callout" | "list" | "faq";
  // For headings
  level?: 2 | 3;
  text?: string;
  id?: string;
  // For paragraphs
  content?: string;
  // For tables
  headers?: string[];
  rows?: string[][];
  footnote?: string;
  // For callouts
  calloutType?: "info" | "warning" | "success" | "tip";
  calloutTitle?: string;
  calloutText?: string;
  // For lists
  ordered?: boolean;
  items?: string[];
  // For FAQ
  faqs?: FAQItemData[];
}

export interface BlogArticleData {
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
  youtubeVideoId?: string;
  youtubeVideoTitle?: string;

  // Full article content
  keyTakeaways?: string[];
  tableOfContents: { id: string; title: string }[];
  sections: BlogSectionContent[];

  faqs?: FAQItemData[];
  relatedSlugs?: string[];
}
