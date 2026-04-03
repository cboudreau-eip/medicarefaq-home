/**
 * Clear all existing cmsMeta records and re-seed from the JSON file.
 * Run with: node reseed-cms.mjs
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

async function reseed() {
  const conn = await createConnection(DATABASE_URL);

  // Clear all existing records
  const [deleteResult] = await conn.execute("DELETE FROM cms_meta");
  console.log(`Cleared ${deleteResult.affectedRows} existing records.`);

  // Re-insert all records
  let inserted = 0;
  for (const record of seedData) {
    const { contentType, slug, title, description, ogImage } = record;
    try {
      await conn.execute(
        `INSERT INTO cms_meta (contentType, slug, metaTitle, metaDescription, ogImage, imageAltText)
         VALUES (?, ?, ?, ?, ?, NULL)`,
        [contentType, slug, title || null, description || null, ogImage || null]
      );
      inserted++;
    } catch (err) {
      console.error(`  ERROR ${contentType}/${slug}: ${err.message}`);
    }
  }

  await conn.end();
  console.log(`Done! Inserted ${inserted} records.`);
}

reseed().catch((err) => {
  console.error("Reseed failed:", err.message);
  process.exit(1);
});
