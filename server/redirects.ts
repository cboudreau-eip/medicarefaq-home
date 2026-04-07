import type { Request, Response, NextFunction } from "express";

/**
 * 301 Redirect map for old rebuild URLs → new live-site-matching URLs.
 * These redirects ensure that any bookmarked or cached links to the
 * old rebuild URL structure are permanently redirected to the correct paths.
 */
const REDIRECT_MAP: Record<string, string> = {
  // Batch 1 renames
  "/about": "/about-us",
  "/get-started": "/compare-rates",
  "/medicare-plans/compare": "/compare-rates",
  "/library/podcast": "/podcasts",

  // Batch 3 — /coverage was a duplicate route for /faqs
  "/coverage": "/faqs",

  // Batch 4 renames
  "/medicare-plans/original-medicare": "/original-medicare",
  "/medicare-plans/medicare-supplement": "/medicare-supplements",
  "/medicare-plans/medicare-advantage": "/medicare-part-c/medicare-advantage-plans",
  "/medicare-plans/part-d": "/original-medicare/medicare-parts/medicare-part-d",
  "/library/videos": "/videos",
};

/**
 * Express middleware that performs 301 permanent redirects for old URLs.
 * Must be registered before the static file / SPA handler.
 */
export function redirectMiddleware(req: Request, res: Response, next: NextFunction) {
  // Only redirect GET requests (not API calls, POST, etc.)
  if (req.method !== "GET") return next();

  // Skip API and asset routes
  if (req.path.startsWith("/api/") || req.path.startsWith("/assets/")) return next();

  // Normalize path: strip trailing slash (except root)
  const normalizedPath = req.path.length > 1 ? req.path.replace(/\/$/, "") : req.path;

  const target = REDIRECT_MAP[normalizedPath];
  if (target) {
    // Preserve query string if present
    const queryString = req.originalUrl.includes("?")
      ? "?" + req.originalUrl.split("?").slice(1).join("?")
      : "";
    return res.redirect(301, target + queryString);
  }

  next();
}
