/**
 * Simple FAQ Articles — Index
 * Re-exports all batches of scraped FAQ articles.
 * Total: 202 articles across 5 batches.
 */

import type { SimpleFAQArticleData } from "@/lib/article-types";

import { simpleFAQBatch1 } from "./simple-faq-data-batch1";
import { simpleFAQBatch2 } from "./simple-faq-data-batch2";
import { simpleFAQBatch3 } from "./simple-faq-data-batch3";
import { simpleFAQBatch4 } from "./simple-faq-data-batch4";
import { simpleFAQBatch5 } from "./simple-faq-data-batch5";

export const simpleFAQArticles: SimpleFAQArticleData[] = [
  ...simpleFAQBatch1,
  ...simpleFAQBatch2,
  ...simpleFAQBatch3,
  ...simpleFAQBatch4,
  ...simpleFAQBatch5,
];
