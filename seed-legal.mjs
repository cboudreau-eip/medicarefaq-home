import mysql from "mysql2/promise";
import * as dotenv from "dotenv";
dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);

const records = [
  {
    content_type: "page",
    slug: "privacy-policy",
    meta_title: "Privacy Policy | MedicareFAQ.com",
    meta_description:
      "Read the MedicareFAQ.com privacy policy to understand how we collect, use, and protect your personal information.",
    og_image: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg",
    image_alt_text: null,
  },
  {
    content_type: "page",
    slug: "terms-of-use",
    meta_title: "Terms of Use | MedicareFAQ.com",
    meta_description:
      "Review the terms and conditions governing your use of MedicareFAQ.com, operated by Elite Insurance Partners.",
    og_image: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg",
    image_alt_text: null,
  },
];

for (const r of records) {
  await connection.execute(
    `INSERT INTO cms_meta (contentType, slug, metaTitle, metaDescription, ogImage, imageAltText)
     VALUES (?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       metaTitle = VALUES(metaTitle),
       metaDescription = VALUES(metaDescription),
       ogImage = VALUES(ogImage),
       imageAltText = VALUES(imageAltText)`,
    [r.content_type, r.slug, r.meta_title, r.meta_description, r.og_image, r.image_alt_text ?? null]
  );
  console.log(`✓ Seeded: ${r.slug}`);
}

await connection.end();
console.log("Done.");
