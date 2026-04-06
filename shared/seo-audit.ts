/**
 * SEO Audit Scoring Engine
 *
 * Pure functions for analyzing SEO metadata and producing per-page scores,
 * issue flags, and site-wide summaries. No database or framework dependencies.
 */

// ── Types ────────────────────────────────────────────────────────────────────

export type IssueSeverity = "error" | "warning" | "info";

export interface SEOIssue {
  field: "metaTitle" | "metaDescription" | "ogImage" | "imageAltText" | "canonical" | "duplicate";
  severity: IssueSeverity;
  code: string;
  message: string;
  suggestion?: string;
}

export interface PageAudit {
  slug: string;
  contentType: "page" | "coverage" | "blog";
  label: string;
  path: string;
  score: number; // 0-100
  grade: "A" | "B" | "C" | "D" | "F";
  issues: SEOIssue[];
  fields: {
    metaTitle: string;
    metaDescription: string;
    ogImage: string;
    imageAltText: string;
  };
}

export interface SiteAuditSummary {
  totalPages: number;
  averageScore: number;
  overallGrade: "A" | "B" | "C" | "D" | "F";
  distribution: {
    A: number;
    B: number;
    C: number;
    D: number;
    F: number;
  };
  issueBreakdown: {
    errors: number;
    warnings: number;
    info: number;
  };
  topIssues: { code: string; message: string; count: number; severity: IssueSeverity }[];
  categoryScores: {
    page: { count: number; avgScore: number };
    coverage: { count: number; avgScore: number };
    blog: { count: number; avgScore: number };
  };
}

export interface FullAuditResult {
  summary: SiteAuditSummary;
  pages: PageAudit[];
}

// ── Constants ────────────────────────────────────────────────────────────────

export const TITLE_MIN = 30;
export const TITLE_MAX = 60;
export const TITLE_WARN_MIN = 20;
export const TITLE_WARN_MAX = 70;

export const DESC_MIN = 120;
export const DESC_MAX = 160;
export const DESC_WARN_MIN = 80;
export const DESC_WARN_MAX = 200;

// ── Scoring weights (total = 100) ────────────────────────────────────────────

const WEIGHT_TITLE = 30;
const WEIGHT_DESCRIPTION = 30;
const WEIGHT_OG_IMAGE = 25;
const WEIGHT_ALT_TEXT = 15;

// ── Score helpers ────────────────────────────────────────────────────────────

function scoreToGrade(score: number): "A" | "B" | "C" | "D" | "F" {
  if (score >= 90) return "A";
  if (score >= 75) return "B";
  if (score >= 60) return "C";
  if (score >= 40) return "D";
  return "F";
}

// ── Per-page audit ───────────────────────────────────────────────────────────

export interface PageInput {
  slug: string;
  contentType: "page" | "coverage" | "blog";
  label: string;
  path: string;
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  imageAltText: string;
}

export function auditPage(page: PageInput): PageAudit {
  const issues: SEOIssue[] = [];
  let titleScore = 0;
  let descScore = 0;
  let ogScore = 0;
  let altScore = 0;

  const title = (page.metaTitle ?? "").trim();
  const desc = (page.metaDescription ?? "").trim();
  const ogImage = (page.ogImage ?? "").trim();
  const altText = (page.imageAltText ?? "").trim();

  // ── Title scoring ──
  if (!title) {
    issues.push({
      field: "metaTitle",
      severity: "error",
      code: "TITLE_MISSING",
      message: "Meta title is missing",
      suggestion: "Add a descriptive title between 30-60 characters",
    });
    titleScore = 0;
  } else {
    const len = title.length;
    if (len < TITLE_WARN_MIN) {
      issues.push({
        field: "metaTitle",
        severity: "error",
        code: "TITLE_TOO_SHORT",
        message: `Title is only ${len} characters (minimum recommended: ${TITLE_MIN})`,
        suggestion: `Expand the title to at least ${TITLE_MIN} characters for better SEO`,
      });
      titleScore = 20;
    } else if (len < TITLE_MIN) {
      issues.push({
        field: "metaTitle",
        severity: "warning",
        code: "TITLE_SHORT",
        message: `Title is ${len} characters (recommended: ${TITLE_MIN}-${TITLE_MAX})`,
        suggestion: `Consider expanding to ${TITLE_MIN}+ characters`,
      });
      titleScore = 60;
    } else if (len > TITLE_WARN_MAX) {
      issues.push({
        field: "metaTitle",
        severity: "error",
        code: "TITLE_TOO_LONG",
        message: `Title is ${len} characters (maximum recommended: ${TITLE_MAX})`,
        suggestion: `Shorten to under ${TITLE_MAX} characters to avoid truncation in search results`,
      });
      titleScore = 30;
    } else if (len > TITLE_MAX) {
      issues.push({
        field: "metaTitle",
        severity: "warning",
        code: "TITLE_LONG",
        message: `Title is ${len} characters (recommended max: ${TITLE_MAX})`,
        suggestion: `Consider shortening to under ${TITLE_MAX} characters`,
      });
      titleScore = 70;
    } else {
      titleScore = 100;
    }
  }

  // ── Description scoring ──
  if (!desc) {
    issues.push({
      field: "metaDescription",
      severity: "error",
      code: "DESC_MISSING",
      message: "Meta description is missing",
      suggestion: "Add a compelling description between 120-160 characters",
    });
    descScore = 0;
  } else {
    const len = desc.length;
    if (len < DESC_WARN_MIN) {
      issues.push({
        field: "metaDescription",
        severity: "error",
        code: "DESC_TOO_SHORT",
        message: `Description is only ${len} characters (minimum recommended: ${DESC_MIN})`,
        suggestion: `Expand to at least ${DESC_MIN} characters for better click-through rates`,
      });
      descScore = 20;
    } else if (len < DESC_MIN) {
      issues.push({
        field: "metaDescription",
        severity: "warning",
        code: "DESC_SHORT",
        message: `Description is ${len} characters (recommended: ${DESC_MIN}-${DESC_MAX})`,
        suggestion: `Consider expanding to ${DESC_MIN}+ characters`,
      });
      descScore = 60;
    } else if (len > DESC_WARN_MAX) {
      issues.push({
        field: "metaDescription",
        severity: "error",
        code: "DESC_TOO_LONG",
        message: `Description is ${len} characters (maximum recommended: ${DESC_MAX})`,
        suggestion: `Shorten to under ${DESC_MAX} characters to avoid truncation`,
      });
      descScore = 30;
    } else if (len > DESC_MAX) {
      issues.push({
        field: "metaDescription",
        severity: "warning",
        code: "DESC_LONG",
        message: `Description is ${len} characters (recommended max: ${DESC_MAX})`,
        suggestion: `Consider shortening to under ${DESC_MAX} characters`,
      });
      descScore = 70;
    } else {
      descScore = 100;
    }
  }

  // ── OG Image scoring ──
  if (!ogImage) {
    issues.push({
      field: "ogImage",
      severity: "warning",
      code: "OG_IMAGE_MISSING",
      message: "Open Graph image is missing",
      suggestion: "Add an OG image (1200x630px recommended) for better social sharing",
    });
    ogScore = 0;
  } else if (!ogImage.startsWith("http")) {
    issues.push({
      field: "ogImage",
      severity: "warning",
      code: "OG_IMAGE_INVALID_URL",
      message: "OG image URL appears invalid (should start with http)",
      suggestion: "Use a full absolute URL for the OG image",
    });
    ogScore = 40;
  } else {
    ogScore = 100;
  }

  // ── Alt Text scoring ──
  if (!altText) {
    if (ogImage) {
      issues.push({
        field: "imageAltText",
        severity: "warning",
        code: "ALT_TEXT_MISSING",
        message: "Image alt text is missing (OG image has no description)",
        suggestion: "Add descriptive alt text for accessibility and SEO",
      });
      altScore = 0;
    } else {
      // No image, no alt text needed — neutral
      issues.push({
        field: "imageAltText",
        severity: "info",
        code: "ALT_TEXT_NA",
        message: "No OG image set, so alt text is not applicable",
      });
      altScore = 50; // neutral — don't penalize heavily
    }
  } else if (altText.length < 10) {
    issues.push({
      field: "imageAltText",
      severity: "warning",
      code: "ALT_TEXT_SHORT",
      message: `Alt text is only ${altText.length} characters — may not be descriptive enough`,
      suggestion: "Write a more descriptive alt text (10+ characters)",
    });
    altScore = 50;
  } else {
    altScore = 100;
  }

  // If no issues at all, add a positive info
  if (issues.length === 0) {
    issues.push({
      field: "metaTitle",
      severity: "info",
      code: "ALL_GOOD",
      message: "All SEO fields are properly configured",
    });
  }

  const score = Math.round(
    (titleScore * WEIGHT_TITLE +
      descScore * WEIGHT_DESCRIPTION +
      ogScore * WEIGHT_OG_IMAGE +
      altScore * WEIGHT_ALT_TEXT) /
      100
  );

  return {
    slug: page.slug,
    contentType: page.contentType,
    label: page.label,
    path: page.path,
    score,
    grade: scoreToGrade(score),
    issues,
    fields: {
      metaTitle: title,
      metaDescription: desc,
      ogImage,
      imageAltText: altText,
    },
  };
}

// ── Duplicate title detection ────────────────────────────────────────────────

export function detectDuplicateTitles(pages: PageAudit[]): PageAudit[] {
  const titleMap = new Map<string, PageAudit[]>();

  for (const page of pages) {
    const title = page.fields.metaTitle.toLowerCase().trim();
    if (!title) continue;
    if (!titleMap.has(title)) titleMap.set(title, []);
    titleMap.get(title)!.push(page);
  }

  for (const [title, group] of Array.from(titleMap.entries())) {
    if (group.length > 1) {
      for (const page of group) {
        page.issues.push({
          field: "duplicate",
          severity: "warning",
          code: "DUPLICATE_TITLE",
          message: `Title "${title}" is shared with ${group.length - 1} other page(s)`,
          suggestion: "Each page should have a unique title for better SEO",
        });
        // Deduct 10 points for duplicates
        page.score = Math.max(0, page.score - 10);
        page.grade = scoreToGrade(page.score);
      }
    }
  }

  return pages;
}

// ── Site-wide summary ────────────────────────────────────────────────────────

export function buildSummary(pages: PageAudit[]): SiteAuditSummary {
  const totalPages = pages.length;
  const avgScore = totalPages > 0 ? Math.round(pages.reduce((sum, p) => sum + p.score, 0) / totalPages) : 0;

  const distribution = { A: 0, B: 0, C: 0, D: 0, F: 0 };
  const issueBreakdown = { errors: 0, warnings: 0, info: 0 };
  const issueCounts = new Map<string, { code: string; message: string; count: number; severity: IssueSeverity }>();

  const categoryData: Record<string, { total: number; scoreSum: number }> = {
    page: { total: 0, scoreSum: 0 },
    coverage: { total: 0, scoreSum: 0 },
    blog: { total: 0, scoreSum: 0 },
  };

  for (const page of pages) {
    distribution[page.grade]++;
    categoryData[page.contentType].total++;
    categoryData[page.contentType].scoreSum += page.score;

    for (const issue of page.issues) {
      issueBreakdown[issue.severity === "error" ? "errors" : issue.severity === "warning" ? "warnings" : "info"]++;

      if (issue.code !== "ALL_GOOD" && issue.code !== "ALT_TEXT_NA") {
        const existing = issueCounts.get(issue.code);
        if (existing) {
          existing.count++;
        } else {
          issueCounts.set(issue.code, {
            code: issue.code,
            message: issue.message.replace(/\d+ characters?/, "N characters"),
            count: 1,
            severity: issue.severity,
          });
        }
      }
    }
  }

  const topIssues = Array.from(issueCounts.values())
    .sort((a, b) => {
      const severityOrder = { error: 0, warning: 1, info: 2 };
      if (severityOrder[a.severity] !== severityOrder[b.severity]) {
        return severityOrder[a.severity] - severityOrder[b.severity];
      }
      return b.count - a.count;
    })
    .slice(0, 10);

  const categoryScores = {
    page: {
      count: categoryData.page.total,
      avgScore: categoryData.page.total > 0 ? Math.round(categoryData.page.scoreSum / categoryData.page.total) : 0,
    },
    coverage: {
      count: categoryData.coverage.total,
      avgScore: categoryData.coverage.total > 0 ? Math.round(categoryData.coverage.scoreSum / categoryData.coverage.total) : 0,
    },
    blog: {
      count: categoryData.blog.total,
      avgScore: categoryData.blog.total > 0 ? Math.round(categoryData.blog.scoreSum / categoryData.blog.total) : 0,
    },
  };

  return {
    totalPages,
    averageScore: avgScore,
    overallGrade: scoreToGrade(avgScore),
    distribution,
    issueBreakdown,
    topIssues,
    categoryScores,
  };
}

// ── Full audit runner ────────────────────────────────────────────────────────

export function runFullAudit(inputs: PageInput[]): FullAuditResult {
  let pages = inputs.map(auditPage);
  pages = detectDuplicateTitles(pages);
  const summary = buildSummary(pages);
  return { summary, pages };
}
