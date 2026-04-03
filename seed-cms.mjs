/**
 * Seed the cmsMeta table with all static meta values extracted from page files.
 * Run with: node seed-cms.mjs
 *
 * Column names match the Drizzle schema exactly:
 *   contentType, slug, metaTitle, metaDescription, ogImage, imageAltText
 *
 * Uses INSERT ... ON DUPLICATE KEY UPDATE so it's safe to re-run.
 * Existing user-edited values are NOT overwritten (uses COALESCE).
 */

import { readFileSync } from "fs";
import { createConnection } from "mysql2/promise";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

config();

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("ERROR: DATABASE_URL not set");
  process.exit(1);
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const seedData = JSON.parse(
  readFileSync(join(__dirname, "../cms_seed_data.json"), "utf8")
);

async function seed() {
  const conn = await createConnection(DATABASE_URL);
  console.log(`Connected. Seeding ${seedData.length} records...`);

  let inserted = 0;
  let updated = 0;
  let skipped = 0;

  for (const record of seedData) {
    const { contentType, slug, title, description, ogImage } = record;

    try {
      // Try to insert; if duplicate, update only NULL fields (preserve user edits)
      const result = await conn.execute(
        `INSERT INTO cms_meta (contentType, slug, metaTitle, metaDescription, ogImage, imageAltText)
         VALUES (?, ?, ?, ?, ?, NULL)
         ON DUPLICATE KEY UPDATE
           metaTitle = COALESCE(metaTitle, VALUES(metaTitle)),
           metaDescription = COALESCE(metaDescription, VALUES(metaDescription)),
           ogImage = COALESCE(ogImage, VALUES(ogImage))`,
        [contentType, slug, title || null, description || null, ogImage || null]
      );
      const affectedRows = result[0].affectedRows;
      if (affectedRows === 1) inserted++;
      else if (affectedRows === 2) updated++;
      else skipped++;
    } catch (err) {
      console.error(`  ERROR ${contentType}/${slug}: ${err.message}`);
    }
  }

  await conn.end();
  console.log(`\nDone!`);
  console.log(`  Inserted (new): ${inserted}`);
  console.log(`  Updated (filled nulls): ${updated}`);
  console.log(`  Skipped (already had values): ${skipped}`);
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
