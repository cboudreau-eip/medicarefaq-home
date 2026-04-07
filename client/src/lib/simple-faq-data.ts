/**
 * Simple FAQ Articles — Index
 * Re-exports all batches of scraped FAQ articles.
 */

import type { SimpleFAQArticleData } from "@/lib/article-types";

import { simpleFAQBatch1 } from "./simple-faq-data-batch1";

export const simpleFAQArticles: SimpleFAQArticleData[] = [
  ...simpleFAQBatch1,
];
