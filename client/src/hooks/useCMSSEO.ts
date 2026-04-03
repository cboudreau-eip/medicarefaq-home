/**
 * useCMSSEO — wraps useSEO with database override support.
 *
 * Fetches any CMS override stored for this contentType + slug.
 * DB values take precedence over the static props passed in.
 * Falls back gracefully to static values if no override exists.
 *
 * Usage (in CoverageTemplate, BlogTemplate, or any page):
 *   useCMSSEO({
 *     contentType: "coverage",
 *     slug: article.slug,
 *     title: article.seo?.title ?? article.title,
 *     description: article.seo?.description ?? "",
 *     canonical: article.seo?.canonical,
 *     ogImage: article.seo?.ogImage,
 *     ogType: "article",
 *   });
 */

import { trpc } from "@/lib/trpc";
import { useSEO } from "./useSEO";

type ContentType = "page" | "coverage" | "blog";

interface CMSSEOProps {
  contentType: ContentType;
  slug: string;
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  modifiedTime?: string;
}

export function useCMSSEO({
  contentType,
  slug,
  title,
  description,
  canonical,
  ogImage,
  ogType,
  modifiedTime,
}: CMSSEOProps) {
  // Fetch DB override — non-blocking, returns null if not found
  const { data: override } = trpc.cms.get.useQuery(
    { contentType, slug },
    { retry: false }
  );

  // Merge: DB override wins over static props
  const resolvedTitle = override?.metaTitle || title;
  const resolvedDescription = override?.metaDescription || description;
  const resolvedOgImage = override?.ogImage || ogImage;

  useSEO({
    title: resolvedTitle,
    description: resolvedDescription,
    canonical,
    ogImage: resolvedOgImage,
    ogType,
    modifiedTime,
  });

  // Return the resolved imageAltText so templates can use it
  return {
    imageAltText: override?.imageAltText ?? null,
  };
}
