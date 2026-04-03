/**
 * Insert the 2 missing hardcoded article pages into cms_meta.
 * Run with: node seed-missing.mjs
 */

import { createConnection } from "mysql2/promise";
import { config } from "dotenv";

config();

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("ERROR: DATABASE_URL not set");
  process.exit(1);
}

const MISSING = [
  {
    contentType: "page",
    slug: "blog-medicare-part-b-deductible",
    metaTitle: "Medicare Part B Annual Deductible Explained: What You'll Pay | MedicareFAQ",
    metaDescription: "Discover how the Medicare Part B annual deductible works, what you will pay, and how Medicare Supplement plans protect your retirement savings.",
    ogImage: "https://www.medicarefaq.com/wp-content/uploads/Medicare-Part-B-Annual-Deductible-Explained-What-Youll-Pay.jpg",
    imageAltText: null,
  },
  {
    contentType: "page",
    slug: "faqs-does-medicare-cover-medical-alert-systems",
    metaTitle: "Does Medicare Cover Life Alert? 2026 Cost & Coverage Guide | MedicareFAQ",
    metaDescription: "Is Life Alert cost covered by Medicare? Learn what Medicare pays for, what it does not cover, and typical medical alert system costs in 2026.",
    ogImage: "https://www.medicarefaq.com/wp-content/uploads/does-medicare-cover-wearable-alert-devices.jpg",
    imageAltText: null,
  },
];

async function seed() {
  const conn = await createConnection(DATABASE_URL);
  let inserted = 0;

  for (const r of MISSING) {
    try {
      await conn.execute(
        `INSERT INTO cms_meta (contentType, slug, metaTitle, metaDescription, ogImage, imageAltText)
         VALUES (?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           metaTitle = IF(metaTitle IS NULL, VALUES(metaTitle), metaTitle),
           metaDescription = IF(metaDescription IS NULL, VALUES(metaDescription), metaDescription),
           ogImage = IF(ogImage IS NULL, VALUES(ogImage), ogImage)`,
        [r.contentType, r.slug, r.metaTitle, r.metaDescription, r.ogImage, r.imageAltText]
      );
      console.log(`  OK ${r.contentType}/${r.slug}`);
      inserted++;
    } catch (err) {
      console.error(`  ERROR ${r.slug}: ${err.message}`);
    }
  }

  await conn.end();
  console.log(`Done! Inserted/updated ${inserted} records.`);
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
