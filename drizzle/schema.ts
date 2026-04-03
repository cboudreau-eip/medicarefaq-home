import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * CMS meta overrides table.
 * Stores owner-edited meta fields that take precedence over static data file values.
 * contentType: "page" | "coverage" | "blog"
 * slug: unique identifier for the page/article (e.g. "about", "when-should-you-enroll-in-medicare-if-still-working")
 */
export const cmsMeta = mysqlTable("cms_meta", {
  id: int("id").autoincrement().primaryKey(),
  contentType: mysqlEnum("contentType", ["page", "coverage", "blog"]).notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  metaTitle: text("metaTitle"),
  metaDescription: text("metaDescription"),
  ogImage: text("ogImage"),
  imageAltText: text("imageAltText"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CmsMeta = typeof cmsMeta.$inferSelect;
export type InsertCmsMeta = typeof cmsMeta.$inferInsert;
