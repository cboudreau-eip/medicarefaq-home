/**
 * useSEO — injects per-page <title>, <meta>, <link rel="canonical">,
 * Open Graph, and Twitter Card tags via react-helmet-async.
 *
 * Usage:
 *   useSEO({
 *     title: "Page Title | MedicareFAQ",
 *     description: "Meta description text.",
 *     canonical: "https://www.medicarefaq.com/path/",
 *     ogImage: "https://www.medicarefaq.com/wp-content/uploads/image.jpg",
 *     ogType: "article",          // defaults to "website"
 *     modifiedTime: "2026-03-13", // optional, for article pages
 *   });
 */

import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  modifiedTime?: string;
}

const SITE_NAME = "MedicareFAQ";
const TWITTER_HANDLE = "@medicarefaq";
const FACEBOOK_PAGE = "https://facebook.com/medicarefaq";
const DEFAULT_OG_IMAGE =
  "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg";

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function useSEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  modifiedTime,
}: SEOProps) {
  useEffect(() => {
    // <title>
    document.title = title;

    // Standard meta
    setMeta("description", description);
    setMeta("robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");

    // Open Graph
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", ogType, "property");
    setMeta("og:site_name", SITE_NAME, "property");
    setMeta("og:image", ogImage, "property");
    setMeta("og:locale", "en_US", "property");
    if (canonical) setMeta("og:url", canonical, "property");
    if (ogType === "article") {
      setMeta("article:publisher", FACEBOOK_PAGE, "property");
      if (modifiedTime) setMeta("article:modified_time", modifiedTime, "property");
    }

    // Twitter Card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:site", TWITTER_HANDLE);
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage);

    // Canonical
    if (canonical) setLink("canonical", canonical);
  }, [title, description, canonical, ogImage, ogType, modifiedTime]);
}
