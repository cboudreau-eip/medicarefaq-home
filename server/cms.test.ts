/**
 * Tests for the CMS meta overrides router.
 *
 * Tests the three procedures:
 *   - cms.get       (public — reads a single override by contentType + slug)
 *   - cms.list      (owner-only — lists all overrides for a content type)
 *   - cms.upsert    (owner-only — creates or updates an override)
 *
 * Uses an in-memory mock of the DB layer so no real database is required.
 */

import { describe, expect, it, vi, beforeEach } from "vitest";
import { TRPCError } from "@trpc/server";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// ── Mock the DB module so tests don't need a real database ────────────────────
const mockDb = {
  select: vi.fn(),
  insert: vi.fn(),
};

vi.mock("./db", () => ({
  getDb: vi.fn(() => Promise.resolve(mockDb)),
}));

// ── Context helpers ───────────────────────────────────────────────────────────

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

// ── Helpers to chain Drizzle-style query builder mocks ───────────────────────

function mockSelectChain(resolvedValue: unknown) {
  const chain = {
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    limit: vi.fn().mockResolvedValue(resolvedValue),
  };
  mockDb.select.mockReturnValue(chain);
  return chain;
}

function mockSelectListChain(resolvedValue: unknown) {
  const chain = {
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockResolvedValue(resolvedValue),
  };
  mockDb.select.mockReturnValue(chain);
  return chain;
}

function mockInsertChain() {
  const chain = {
    values: vi.fn().mockReturnThis(),
    onDuplicateKeyUpdate: vi.fn().mockResolvedValue(undefined),
  };
  mockDb.insert.mockReturnValue(chain);
  return chain;
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("cms.get (public procedure)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns null when no override exists", async () => {
    mockSelectChain([]);
    const caller = appRouter.createCaller(makeCtx(null));
    const result = await caller.cms.get({ contentType: "page", slug: "home" });
    expect(result).toBeNull();
  });

  it("returns the override row when one exists", async () => {
    const row = {
      id: 1,
      contentType: "page",
      slug: "home",
      metaTitle: "Custom Home Title",
      metaDescription: "Custom description",
      ogImage: null,
      imageAltText: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockSelectChain([row]);
    const caller = appRouter.createCaller(makeCtx(null));
    const result = await caller.cms.get({ contentType: "page", slug: "home" });
    expect(result).toMatchObject({ metaTitle: "Custom Home Title" });
  });

  it("is accessible without authentication", async () => {
    mockSelectChain([]);
    // No user context — should not throw
    const caller = appRouter.createCaller(makeCtx(null));
    await expect(caller.cms.get({ contentType: "coverage", slug: "does-medicare-cover-dental" })).resolves.toBeNull();
  });
});

describe("cms.list (owner-only procedure)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("throws UNAUTHORIZED when called without a session", async () => {
    const caller = appRouter.createCaller(makeCtx(null));
    await expect(caller.cms.list({ contentType: "page" })).rejects.toThrow(TRPCError);
  });

  it("throws FORBIDDEN when called by a non-admin user", async () => {
    const caller = appRouter.createCaller(makeCtx("user"));
    await expect(caller.cms.list({ contentType: "page" })).rejects.toMatchObject({
      code: "FORBIDDEN",
    });
  });

  it("returns all overrides for the content type when called by admin", async () => {
    const rows = [
      { id: 1, contentType: "page", slug: "home", metaTitle: "Home Override" },
      { id: 2, contentType: "page", slug: "about", metaTitle: "About Override" },
    ];
    mockSelectListChain(rows);
    const caller = appRouter.createCaller(makeCtx("admin"));
    const result = await caller.cms.list({ contentType: "page" });
    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({ slug: "home" });
  });
});

describe("cms.upsert (owner-only procedure)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("throws UNAUTHORIZED when called without a session", async () => {
    const caller = appRouter.createCaller(makeCtx(null));
    await expect(
      caller.cms.upsert({ contentType: "page", slug: "home", metaTitle: "New Title" })
    ).rejects.toThrow(TRPCError);
  });

  it("throws FORBIDDEN when called by a non-admin user", async () => {
    const caller = appRouter.createCaller(makeCtx("user"));
    await expect(
      caller.cms.upsert({ contentType: "page", slug: "home", metaTitle: "New Title" })
    ).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("returns success:true when admin upserts an override", async () => {
    mockInsertChain();
    const caller = appRouter.createCaller(makeCtx("admin"));
    const result = await caller.cms.upsert({
      contentType: "page",
      slug: "home",
      metaTitle: "Updated Home Title",
      metaDescription: "Updated description",
    });
    expect(result).toEqual({ success: true });
  });

  it("calls insert with the correct values", async () => {
    const chain = mockInsertChain();
    const caller = appRouter.createCaller(makeCtx("admin"));
    await caller.cms.upsert({
      contentType: "coverage",
      slug: "does-medicare-cover-dental",
      metaTitle: "Dental Coverage Title",
      ogImage: "https://example.com/image.jpg",
    });
    expect(chain.values).toHaveBeenCalledWith(
      expect.objectContaining({
        contentType: "coverage",
        slug: "does-medicare-cover-dental",
        metaTitle: "Dental Coverage Title",
        ogImage: "https://example.com/image.jpg",
      })
    );
  });
});
