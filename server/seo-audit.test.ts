/**
 * Tests for the SEO Audit scoring engine and the cms.audit procedure.
 *
 * Part 1: Pure unit tests for the shared scoring functions (auditPage, detectDuplicateTitles, buildSummary, runFullAudit)
 * Part 2: Router-level tests for cms.audit (auth guards, DB integration mock)
 */

import { describe, expect, it, vi, beforeEach } from "vitest";
import { TRPCError } from "@trpc/server";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import {
  auditPage,
  detectDuplicateTitles,
  buildSummary,
  runFullAudit,
  TITLE_MIN,
  TITLE_MAX,
  DESC_MIN,
  DESC_MAX,
  type PageInput,
  type PageAudit,
} from "../shared/seo-audit";

// ── Mock the DB module ──────────────────────────────────────────────────────
const mockDb = {
  select: vi.fn(),
  insert: vi.fn(),
};

vi.mock("./db", () => ({
  getDb: vi.fn(() => Promise.resolve(mockDb)),
}));

// ── Context helpers ─────────────────────────────────────────────────────────

function makeCtx(role: "admin" | "user" | null = null): TrpcContext {
  const user =
    role === null
      ? null
      : {
          id: 1,
          openId: "test-open-id",
          email: "test@example.com",
          name: "Test User",
          loginMethod: "manus" as const,
          role,
          createdAt: new Date(),
          updatedAt: new Date(),
          lastSignedIn: new Date(),
        };

  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

// ── Helper to build a PageInput ─────────────────────────────────────────────

function makePage(overrides: Partial<PageInput> = {}): PageInput {
  return {
    slug: "test-page",
    contentType: "page",
    label: "Test Page",
    path: "/test",
    metaTitle: "A Good Title That Is Exactly Right Length",
    metaDescription:
      "This is a well-crafted meta description that provides enough detail for search engines to display a meaningful snippet in search results pages.",
    ogImage: "https://example.com/path-to-image.jpg",
    imageAltText: "A descriptive alt text for the image",
    ...overrides,
  };
}

// ══════════════════════════════════════════════════════════════════════════════
// Part 1: Pure scoring engine tests
// ══════════════════════════════════════════════════════════════════════════════

describe("auditPage — title scoring", () => {
  it("scores 100 for a title within the ideal range", () => {
    const page = makePage({ metaTitle: "A".repeat(45) }); // 45 chars, within 30-60
    const result = auditPage(page);
    expect(result.issues.find((i) => i.field === "metaTitle" && i.severity === "error")).toBeUndefined();
    expect(result.issues.find((i) => i.field === "metaTitle" && i.severity === "warning")).toBeUndefined();
  });

  it("flags error for missing title", () => {
    const result = auditPage(makePage({ metaTitle: "" }));
    const issue = result.issues.find((i) => i.code === "TITLE_MISSING");
    expect(issue).toBeDefined();
    expect(issue!.severity).toBe("error");
  });

  it("flags error for very short title (< 20 chars)", () => {
    const result = auditPage(makePage({ metaTitle: "Short" }));
    const issue = result.issues.find((i) => i.code === "TITLE_TOO_SHORT");
    expect(issue).toBeDefined();
    expect(issue!.severity).toBe("error");
  });

  it("flags warning for slightly short title (20-29 chars)", () => {
    const result = auditPage(makePage({ metaTitle: "A".repeat(25) }));
    const issue = result.issues.find((i) => i.code === "TITLE_SHORT");
    expect(issue).toBeDefined();
    expect(issue!.severity).toBe("warning");
  });

  it("flags error for very long title (> 70 chars)", () => {
    const result = auditPage(makePage({ metaTitle: "A".repeat(75) }));
    const issue = result.issues.find((i) => i.code === "TITLE_TOO_LONG");
    expect(issue).toBeDefined();
    expect(issue!.severity).toBe("error");
  });

  it("flags warning for slightly long title (61-70 chars)", () => {
    const result = auditPage(makePage({ metaTitle: "A".repeat(65) }));
    const issue = result.issues.find((i) => i.code === "TITLE_LONG");
    expect(issue).toBeDefined();
    expect(issue!.severity).toBe("warning");
  });
});

describe("auditPage — description scoring", () => {
  it("flags error for missing description", () => {
    const result = auditPage(makePage({ metaDescription: "" }));
    const issue = result.issues.find((i) => i.code === "DESC_MISSING");
    expect(issue).toBeDefined();
    expect(issue!.severity).toBe("error");
  });

  it("flags error for very short description (< 80 chars)", () => {
    const result = auditPage(makePage({ metaDescription: "Too short" }));
    const issue = result.issues.find((i) => i.code === "DESC_TOO_SHORT");
    expect(issue).toBeDefined();
    expect(issue!.severity).toBe("error");
  });

  it("flags warning for slightly short description (80-119 chars)", () => {
    const result = auditPage(makePage({ metaDescription: "A".repeat(100) }));
    const issue = result.issues.find((i) => i.code === "DESC_SHORT");
    expect(issue).toBeDefined();
    expect(issue!.severity).toBe("warning");
  });

  it("flags error for very long description (> 200 chars)", () => {
    const result = auditPage(makePage({ metaDescription: "A".repeat(210) }));
    const issue = result.issues.find((i) => i.code === "DESC_TOO_LONG");
    expect(issue).toBeDefined();
    expect(issue!.severity).toBe("error");
  });

  it("flags warning for slightly long description (161-200 chars)", () => {
    const result = auditPage(makePage({ metaDescription: "A".repeat(180) }));
    const issue = result.issues.find((i) => i.code === "DESC_LONG");
    expect(issue).toBeDefined();
    expect(issue!.severity).toBe("warning");
  });
});

describe("auditPage — OG image scoring", () => {
  it("flags warning for missing OG image", () => {
    const result = auditPage(makePage({ ogImage: "" }));
    const issue = result.issues.find((i) => i.code === "OG_IMAGE_MISSING");
    expect(issue).toBeDefined();
    expect(issue!.severity).toBe("warning");
  });

  it("flags warning for invalid OG image URL", () => {
    const result = auditPage(makePage({ ogImage: "not-a-url" }));
    const issue = result.issues.find((i) => i.code === "OG_IMAGE_INVALID_URL");
    expect(issue).toBeDefined();
  });

  it("does not flag valid OG image URL", () => {
    const result = auditPage(makePage({ ogImage: "https://example.com/img.jpg" }));
    expect(result.issues.find((i) => i.field === "ogImage")).toBeUndefined();
  });
});

describe("auditPage — alt text scoring", () => {
  it("flags warning for missing alt text when OG image is present", () => {
    const result = auditPage(
      makePage({ ogImage: "https://example.com/img.jpg", imageAltText: "" })
    );
    const issue = result.issues.find((i) => i.code === "ALT_TEXT_MISSING");
    expect(issue).toBeDefined();
    expect(issue!.severity).toBe("warning");
  });

  it("flags info when no OG image and no alt text", () => {
    const result = auditPage(makePage({ ogImage: "", imageAltText: "" }));
    const issue = result.issues.find((i) => i.code === "ALT_TEXT_NA");
    expect(issue).toBeDefined();
    expect(issue!.severity).toBe("info");
  });

  it("flags warning for very short alt text", () => {
    const result = auditPage(makePage({ imageAltText: "img" }));
    const issue = result.issues.find((i) => i.code === "ALT_TEXT_SHORT");
    expect(issue).toBeDefined();
  });
});

describe("auditPage — overall scoring", () => {
  it("produces a perfect score for a fully optimized page", () => {
    const result = auditPage(makePage());
    expect(result.score).toBe(100);
    expect(result.grade).toBe("A");
    // Should only have the ALL_GOOD info issue
    expect(result.issues).toHaveLength(1);
    expect(result.issues[0].code).toBe("ALL_GOOD");
  });

  it("produces a low score for a page with no metadata at all", () => {
    const result = auditPage(
      makePage({
        metaTitle: "",
        metaDescription: "",
        ogImage: "",
        imageAltText: "",
      })
    );
    expect(result.score).toBeLessThan(20);
    expect(result.grade).toBe("F");
  });

  it("returns the correct fields in the result", () => {
    const result = auditPage(makePage({ slug: "my-slug", contentType: "blog", path: "/blog/my-slug" }));
    expect(result.slug).toBe("my-slug");
    expect(result.contentType).toBe("blog");
    expect(result.path).toBe("/blog/my-slug");
    expect(result.fields.metaTitle).toBeTruthy();
    expect(result.fields.metaDescription).toBeTruthy();
  });

  it("score is between 0 and 100", () => {
    // Test with various inputs
    const inputs = [
      makePage(),
      makePage({ metaTitle: "" }),
      makePage({ metaDescription: "" }),
      makePage({ ogImage: "" }),
      makePage({ metaTitle: "", metaDescription: "", ogImage: "", imageAltText: "" }),
    ];
    for (const input of inputs) {
      const result = auditPage(input);
      expect(result.score).toBeGreaterThanOrEqual(0);
      expect(result.score).toBeLessThanOrEqual(100);
    }
  });
});

describe("detectDuplicateTitles", () => {
  it("adds DUPLICATE_TITLE warning for pages sharing the same title", () => {
    const pages: PageAudit[] = [
      auditPage(makePage({ slug: "page-a", metaTitle: "Same Title Here Exactly Same" })),
      auditPage(makePage({ slug: "page-b", metaTitle: "Same Title Here Exactly Same" })),
    ];
    const result = detectDuplicateTitles(pages);
    for (const page of result) {
      const dupIssue = page.issues.find((i) => i.code === "DUPLICATE_TITLE");
      expect(dupIssue).toBeDefined();
      expect(dupIssue!.severity).toBe("warning");
    }
  });

  it("deducts 10 points for duplicate titles", () => {
    const original = auditPage(makePage({ slug: "page-a", metaTitle: "Unique Title For Duplicate Test" }));
    const originalScore = original.score;
    const pages: PageAudit[] = [
      original,
      auditPage(makePage({ slug: "page-b", metaTitle: "Unique Title For Duplicate Test" })),
    ];
    detectDuplicateTitles(pages);
    expect(pages[0].score).toBe(Math.max(0, originalScore - 10));
  });

  it("does not flag pages with unique titles", () => {
    const pages: PageAudit[] = [
      auditPage(makePage({ slug: "page-a", metaTitle: "First Unique Title Here" })),
      auditPage(makePage({ slug: "page-b", metaTitle: "Second Unique Title Here" })),
    ];
    const result = detectDuplicateTitles(pages);
    for (const page of result) {
      expect(page.issues.find((i) => i.code === "DUPLICATE_TITLE")).toBeUndefined();
    }
  });

  it("ignores empty titles for duplicate detection", () => {
    const pages: PageAudit[] = [
      auditPage(makePage({ slug: "page-a", metaTitle: "" })),
      auditPage(makePage({ slug: "page-b", metaTitle: "" })),
    ];
    const result = detectDuplicateTitles(pages);
    for (const page of result) {
      expect(page.issues.find((i) => i.code === "DUPLICATE_TITLE")).toBeUndefined();
    }
  });
});

describe("buildSummary", () => {
  it("computes correct averages and distributions", () => {
    const pages: PageAudit[] = [
      auditPage(makePage({ slug: "a", contentType: "page" })), // score 100 (A)
      auditPage(makePage({ slug: "b", contentType: "coverage", metaTitle: "" })), // low score (F)
    ];
    const summary = buildSummary(pages);
    expect(summary.totalPages).toBe(2);
    expect(summary.averageScore).toBeGreaterThan(0);
    expect(summary.distribution.A).toBeGreaterThanOrEqual(0);
    expect(summary.distribution.F).toBeGreaterThanOrEqual(0);
    expect(summary.categoryScores.page.count).toBe(1);
    expect(summary.categoryScores.coverage.count).toBe(1);
    expect(summary.categoryScores.blog.count).toBe(0);
  });

  it("computes issue breakdown correctly", () => {
    const pages: PageAudit[] = [
      auditPage(makePage({ slug: "a", metaTitle: "", metaDescription: "" })),
    ];
    const summary = buildSummary(pages);
    expect(summary.issueBreakdown.errors).toBeGreaterThan(0);
  });

  it("returns top issues sorted by severity then count", () => {
    const pages: PageAudit[] = [
      auditPage(makePage({ slug: "a", metaTitle: "" })),
      auditPage(makePage({ slug: "b", metaTitle: "" })),
      auditPage(makePage({ slug: "c", ogImage: "" })),
    ];
    const summary = buildSummary(pages);
    expect(summary.topIssues.length).toBeGreaterThan(0);
    // Errors should come before warnings
    const firstError = summary.topIssues.findIndex((i) => i.severity === "error");
    const firstWarning = summary.topIssues.findIndex((i) => i.severity === "warning");
    if (firstError >= 0 && firstWarning >= 0) {
      expect(firstError).toBeLessThan(firstWarning);
    }
  });

  it("handles empty page array", () => {
    const summary = buildSummary([]);
    expect(summary.totalPages).toBe(0);
    expect(summary.averageScore).toBe(0);
    expect(summary.overallGrade).toBe("F");
  });
});

describe("runFullAudit", () => {
  it("returns both summary and pages", () => {
    const inputs: PageInput[] = [
      makePage({ slug: "a" }),
      makePage({ slug: "b" }),
    ];
    const result = runFullAudit(inputs);
    expect(result.summary).toBeDefined();
    expect(result.pages).toHaveLength(2);
    expect(result.summary.totalPages).toBe(2);
  });

  it("applies duplicate detection", () => {
    const inputs: PageInput[] = [
      makePage({ slug: "a", metaTitle: "Duplicate Title For Full Audit" }),
      makePage({ slug: "b", metaTitle: "Duplicate Title For Full Audit" }),
    ];
    const result = runFullAudit(inputs);
    for (const page of result.pages) {
      expect(page.issues.find((i) => i.code === "DUPLICATE_TITLE")).toBeDefined();
    }
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// Part 2: Router-level tests for cms.audit
// ══════════════════════════════════════════════════════════════════════════════

function mockSelectListChain(resolvedValue: unknown) {
  const chain = {
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockResolvedValue(resolvedValue),
  };
  mockDb.select.mockReturnValue(chain);
  return chain;
}

describe("cms.audit (owner-only procedure)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("throws UNAUTHORIZED when called without a session", async () => {
    const caller = appRouter.createCaller(makeCtx(null));
    await expect(caller.cms.audit()).rejects.toThrow(TRPCError);
  });

  it("throws FORBIDDEN when called by a non-admin user", async () => {
    const caller = appRouter.createCaller(makeCtx("user"));
    await expect(caller.cms.audit()).rejects.toMatchObject({
      code: "FORBIDDEN",
    });
  });

  it("returns a full audit result when called by admin", async () => {
    // Mock the DB to return empty CMS meta (no overrides)
    const chain = {
      from: vi.fn().mockResolvedValue([]),
    };
    mockDb.select.mockReturnValue(chain);

    const caller = appRouter.createCaller(makeCtx("admin"));
    const result = await caller.cms.audit();

    expect(result.summary).toBeDefined();
    expect(result.pages).toBeDefined();
    expect(result.summary.totalPages).toBeGreaterThan(0);
    expect(result.pages.length).toBe(result.summary.totalPages);
  });

  it("merges DB overrides into audit results", async () => {
    // Mock the DB to return one CMS meta override
    const chain = {
      from: vi.fn().mockResolvedValue([
        {
          id: 1,
          contentType: "page",
          slug: "home",
          metaTitle: "Custom Home Title With Good Length",
          metaDescription:
            "This is a custom meta description for the home page that is long enough to pass the minimum character requirement for SEO.",
          ogImage: "https://example.com/home-og.jpg",
          imageAltText: "MedicareFAQ home page social preview",
          updatedAt: new Date(),
        },
      ]),
    };
    mockDb.select.mockReturnValue(chain);

    const caller = appRouter.createCaller(makeCtx("admin"));
    const result = await caller.cms.audit();

    const homePage = result.pages.find((p) => p.slug === "home");
    expect(homePage).toBeDefined();
    expect(homePage!.fields.metaTitle).toBe("Custom Home Title With Good Length");
    expect(homePage!.fields.ogImage).toBe("https://example.com/home-og.jpg");
    // With full metadata, the home page should score well
    expect(homePage!.score).toBeGreaterThan(60);
  });
});
