/**
 * Simple FAQ Articles — Index
 * Re-exports all batches of scraped FAQ articles.
 */

import type { SimpleFAQArticleData } from "@/lib/article-types";

import { simpleFAQBatch1 } from "./simple-faq-data-batch1";
import { simpleFAQBatch2 } from "./simple-faq-data-batch2";
import { simpleFAQBatch3 } from "./simple-faq-data-batch3";

export const simpleFAQArticles: SimpleFAQArticleData[] = [
  ...simpleFAQBatch1,
  ...simpleFAQBatch2,
  ...simpleFAQBatch3,
];
