import { useState, useEffect, useRef, useCallback } from "react";
import { trpc } from "@/lib/trpc";
import { MessageCircle, X, Send, Loader2, Sparkles, RotateCcw } from "lucide-react";
import { Streamdown } from "streamdown";
import { cn } from "@/lib/utils";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const SUGGESTED_PROMPTS = [
  "What is Medicare?",
  "Am I eligible for Medicare?",
  "What's the difference between Supplement and Advantage?",
  "When can I enroll?",
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [showPulse, setShowPulse] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const chatMutation = trpc.chat.send.useMutation({
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.content },
      ]);
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm sorry, I'm having trouble connecting right now. Please try again, or call our team at (888) 335-8996 for immediate help.",
        },
      ]);
    },
  });

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, chatMutation.isPending]);

  // Focus textarea when chat opens
  useEffect(() => {
    if (isOpen && textareaRef.current) {
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Hide pulse after first open
  useEffect(() => {
    if (isOpen) setShowPulse(false);
  }, [isOpen]);

  const handleSend = useCallback(
    (content: string) => {
      const trimmed = content.trim();
      if (!trimmed || chatMutation.isPending) return;

      const newMessages: ChatMessage[] = [
        ...messages,
        { role: "user", content: trimmed },
      ];
      setMessages(newMessages);
      setInput("");
      chatMutation.mutate({ messages: newMessages });
    },
    [messages, chatMutation]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  const handleReset = () => {
    setMessages([]);
    setInput("");
  };

  return (
    <>
      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-20 right-4 sm:right-6 z-[9999] w-[360px] max-w-[calc(100vw-2rem)] transition-all duration-300 ease-out origin-bottom-right",
          isOpen
            ? "scale-100 opacity-100 translate-y-0 pointer-events-auto"
            : "scale-95 opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        <div className="flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden" style={{ height: "520px" }}>
          {/* Header */}
          <div className="bg-[#0B2D48] px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm leading-tight">
                  Medicare Assistant
                </h3>
                <p className="text-white/60 text-xs">
                  Powered by AI
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <button
                  onClick={handleReset}
                  className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                  title="Start new conversation"
                >
                  <RotateCcw className="w-4 h-4 text-white/70" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-white/70" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50"
          >
            {messages.length === 0 ? (
              <div className="flex flex-col h-full">
                {/* Welcome message */}
                <div className="flex gap-2.5 mb-4">
                  <div className="w-7 h-7 rounded-full bg-[#0B2D48] flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="bg-white rounded-xl rounded-tl-sm px-3.5 py-2.5 shadow-sm border border-gray-100 max-w-[85%]">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Hi there! I'm your Medicare assistant. I can help you understand Medicare plans, enrollment, eligibility, and coverage. What would you like to know?
                    </p>
                  </div>
                </div>

                {/* Suggested prompts */}
                <div className="space-y-2 mt-auto">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide px-1">
                    Common questions
                  </p>
                  {SUGGESTED_PROMPTS.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(prompt)}
                      className="w-full text-left px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-[#0B2D48] hover:text-white hover:border-[#0B2D48] transition-all duration-200 shadow-sm"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex gap-2.5",
                      msg.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-7 h-7 rounded-full bg-[#0B2D48] flex items-center justify-center shrink-0 mt-0.5">
                        <Sparkles className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed",
                        msg.role === "user"
                          ? "bg-[#0B2D48] text-white rounded-tr-sm"
                          : "bg-white text-gray-700 rounded-tl-sm shadow-sm border border-gray-100"
                      )}
                    >
                      {msg.role === "assistant" ? (
                        <div className="prose prose-sm max-w-none [&_p]:text-gray-700 [&_p]:text-sm [&_p]:leading-relaxed [&_li]:text-gray-700 [&_li]:text-sm [&_strong]:text-gray-800 [&_a]:text-[#0B8F8F] [&_a]:no-underline hover:[&_a]:underline">
                          <Streamdown>{msg.content}</Streamdown>
                        </div>
                      ) : (
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      )}
                    </div>
                  </div>
                ))}

                {/* Loading indicator */}
                {chatMutation.isPending && (
                  <div className="flex gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#0B2D48] flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="bg-white rounded-xl rounded-tl-sm px-3.5 py-3 shadow-sm border border-gray-100">
                      <div className="flex gap-1.5">
                        <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 bg-white px-3 py-2.5 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex items-end gap-2"
            >
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Medicare..."
                rows={1}
                className="flex-1 resize-none border border-gray-200 rounded-xl px-3.5 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B2D48]/20 focus:border-[#0B2D48]/40 max-h-24 bg-gray-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || chatMutation.isPending}
                className="w-9 h-9 rounded-xl bg-[#0B2D48] text-white flex items-center justify-center shrink-0 hover:bg-[#0a2640] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                {chatMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </form>
            <p className="text-[10px] text-gray-400 text-center mt-1.5">
              AI-powered. For personalized advice, call{" "}
              <a href="tel:8883358996" className="text-[#0B8F8F] hover:underline">
                (888) 335-8996
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-4 right-4 sm:right-6 z-[9999] w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95",
          isOpen
            ? "bg-gray-600 hover:bg-gray-700"
            : "bg-[#0B2D48] hover:bg-[#0a2640]"
        )}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6 text-white" />
            {showPulse && (
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-[#0B8F8F] rounded-full border-2 border-white animate-pulse" />
            )}
          </>
        )}
      </button>
    </>
  );
}
