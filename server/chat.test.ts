import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the LLM module before importing the router
vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn(),
}));

import { invokeLLM } from "./_core/llm";
const mockedInvokeLLM = vi.mocked(invokeLLM);

import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createMockCtx(): TrpcContext {
  return {
    req: {} as any,
    res: {} as any,
    user: null,
  };
}

describe("Chat Router", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should send a message and return AI response", async () => {
    mockedInvokeLLM.mockResolvedValueOnce({
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: "Medicare is a federal health insurance program.",
          },
          finish_reason: "stop",
        },
      ],
    } as any);

    const caller = appRouter.createCaller(createMockCtx());
    const result = await caller.chat.send({
      messages: [{ role: "user", content: "What is Medicare?" }],
    });

    expect(result.content).toBe(
      "Medicare is a federal health insurance program."
    );
    expect(mockedInvokeLLM).toHaveBeenCalledTimes(1);
  });

  it("should include system prompt in LLM call", async () => {
    mockedInvokeLLM.mockResolvedValueOnce({
      choices: [
        {
          index: 0,
          message: { role: "assistant", content: "Test response" },
          finish_reason: "stop",
        },
      ],
    } as any);

    const caller = appRouter.createCaller(createMockCtx());
    await caller.chat.send({
      messages: [{ role: "user", content: "Hello" }],
    });

    const callArgs = mockedInvokeLLM.mock.calls[0][0];
    expect(callArgs.messages[0].role).toBe("system");
    expect(callArgs.messages[0].content).toContain("Medicare");
    expect(callArgs.messages[0].content).toContain("MedicareFAQ.com");
  });

  it("should pass conversation history to LLM", async () => {
    mockedInvokeLLM.mockResolvedValueOnce({
      choices: [
        {
          index: 0,
          message: { role: "assistant", content: "Follow-up response" },
          finish_reason: "stop",
        },
      ],
    } as any);

    const caller = appRouter.createCaller(createMockCtx());
    await caller.chat.send({
      messages: [
        { role: "user", content: "What is Medicare?" },
        {
          role: "assistant",
          content: "Medicare is a federal health insurance program.",
        },
        { role: "user", content: "Tell me more about Part A" },
      ],
    });

    const callArgs = mockedInvokeLLM.mock.calls[0][0];
    // System prompt + 3 conversation messages
    expect(callArgs.messages).toHaveLength(4);
    expect(callArgs.messages[1].content).toBe("What is Medicare?");
    expect(callArgs.messages[3].content).toBe("Tell me more about Part A");
  });

  it("should handle LLM returning non-string content gracefully", async () => {
    mockedInvokeLLM.mockResolvedValueOnce({
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: [{ type: "text", text: "complex" }],
          },
          finish_reason: "stop",
        },
      ],
    } as any);

    const caller = appRouter.createCaller(createMockCtx());
    const result = await caller.chat.send({
      messages: [{ role: "user", content: "Hello" }],
    });

    // Should fall back to the error message since content is not a string
    expect(result.content).toContain("(888) 335-8996");
  });

  it("should reject empty messages array", async () => {
    const caller = appRouter.createCaller(createMockCtx());
    await expect(
      caller.chat.send({ messages: [] })
    ).rejects.toThrow();
  });

  it("should be a public procedure (no auth required)", async () => {
    mockedInvokeLLM.mockResolvedValueOnce({
      choices: [
        {
          index: 0,
          message: { role: "assistant", content: "Hello!" },
          finish_reason: "stop",
        },
      ],
    } as any);

    // Call with null user (unauthenticated)
    const caller = appRouter.createCaller(createMockCtx());
    const result = await caller.chat.send({
      messages: [{ role: "user", content: "Hi" }],
    });

    expect(result.content).toBe("Hello!");
  });
});
