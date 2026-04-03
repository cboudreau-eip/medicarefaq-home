import { z } from "zod";
import { eq, and } from "drizzle-orm";
import { getDb } from "../db";
import { cmsMeta } from "../../drizzle/schema";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { TRPCError } from "@trpc/server";

const contentTypeSchema = z.enum(["page", "coverage", "blog"]);

// Guard: only the site owner (admin role) can use CMS procedures
const ownerProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Owner access only" });
  }
  return next({ ctx });
});

export const cmsRouter = router({
  // Get all CMS overrides for a given content type
  list: ownerProcedure
    .input(z.object({ contentType: contentTypeSchema }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });
      return db
        .select()
        .from(cmsMeta)
        .where(eq(cmsMeta.contentType, input.contentType));
    }),

  // Get a single CMS override by contentType + slug (public — anonymous visitors need this too)
  get: publicProcedure
    .input(z.object({ contentType: contentTypeSchema, slug: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });
      const rows = await db
        .select()
        .from(cmsMeta)
        .where(and(eq(cmsMeta.contentType, input.contentType), eq(cmsMeta.slug, input.slug)))
        .limit(1);
      return rows[0] ?? null;
    }),

  // Upsert a CMS override (create or update)
  upsert: ownerProcedure
    .input(
      z.object({
        contentType: contentTypeSchema,
        slug: z.string().min(1),
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
        ogImage: z.string().optional(),
        imageAltText: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });

      await db
        .insert(cmsMeta)
        .values({
          contentType: input.contentType,
          slug: input.slug,
          metaTitle: input.metaTitle ?? null,
          metaDescription: input.metaDescription ?? null,
          ogImage: input.ogImage ?? null,
          imageAltText: input.imageAltText ?? null,
        })
        .onDuplicateKeyUpdate({
          set: {
            metaTitle: input.metaTitle ?? null,
            metaDescription: input.metaDescription ?? null,
            ogImage: input.ogImage ?? null,
            imageAltText: input.imageAltText ?? null,
          },
        });

      return { success: true };
    }),
});
