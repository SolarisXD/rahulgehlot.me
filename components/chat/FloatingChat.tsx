"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import Image from "next/image";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

const quickPrompts = [
  { label: "Experience", message: "Tell me about your professional experience" },
  { label: "Projects", message: "What projects have you worked on?" },
  { label: "Contact", message: "How can I get in touch with you?" },
];

const followUpPool = [
  "What's the most interesting bug you've fixed?",
  "What are you learning right now?",
  "Tell me about your freelance workflow",
  "What tools do you use daily?",
  "What's your favorite project?",
  "Do you prefer frontend or backend?",
  "What's your approach to testing?",
  "How do you stay updated with tech?",
  "What would you build differently?",
  "How did you get into programming?",
  "What's a tech trend you're skeptical about?",
  "What's the hardest problem you've solved?",
  "What's your daily routine like?",
  "What's a mistake you learned from?",
];

// ─── Animation variants ──────────────────────────────────────────────

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: 16,
    scale: 0.96,
    transition: { duration: 0.15, ease: "easeIn" },
  },
};

const launcherVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.15, ease: "easeIn" },
  },
};

const messageVariants: Variants = {
  hidden: (role: string) => ({
    opacity: 0,
    x: role === "user" ? 20 : -20,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────

function pickRandom<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

// ─── Inline formatter ─────────────────────────────────────────────
// Renders **bold**, *italic*, `code`, [links](url), bare URLs, and
// email addresses as React elements.

function renderInline(text: string): React.ReactNode {
  // Order matters: markdown syntax first, then bare URLs/emails so
  // [text](url) isn't double-matched.
  const pattern =
    /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(`(.+?)`)|(\[(.+?)\]\((.+?)\))|(https?:\/\/[^\s<]+)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  const tokens: { type: string; value: string; href?: string }[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: "text", value: text.slice(lastIndex, match.index) });
    }
    if (match[1]) {
      tokens.push({ type: "bold", value: match[2]! });
    } else if (match[3]) {
      tokens.push({ type: "italic", value: match[4]! });
    } else if (match[5]) {
      tokens.push({ type: "code", value: match[6]! });
    } else if (match[7]) {
      tokens.push({ type: "link", value: match[8]!, href: match[9]! });
    } else if (match[10]) {
      // Bare URL - trim trailing punctuation
      let url = match[10]!;
      url = url.replace(/[.,;:!?)]+$/, "");
      tokens.push({ type: "link", value: url, href: url });
    } else if (match[11]) {
      // Email address
      const email = match[11]!;
      tokens.push({ type: "link", value: email, href: `mailto:${email}` });
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    tokens.push({ type: "text", value: text.slice(lastIndex) });
  }

  return tokens.map((t, i) => {
    switch (t.type) {
      case "bold":
        return <strong key={i}>{t.value}</strong>;
      case "italic":
        return <em key={i}>{t.value}</em>;
      case "code":
        return (
          <code
            key={i}
            className="bg-card border border-border rounded px-1 py-0.5 text-xs font-mono"
          >
            {t.value}
          </code>
        );
      case "link": {
        const isAnchor = t.href?.startsWith("#");
        return (
          <a
            key={i}
            href={t.href}
            target={isAnchor ? undefined : "_blank"}
            rel={isAnchor ? undefined : "noopener noreferrer"}
            onClick={
              isAnchor
                ? (e) => {
                  e.preventDefault();
                  const el = document.querySelector(t.href!);
                  el?.scrollIntoView({ behavior: "smooth" });
                }
                : undefined
            }
            className="underline decoration-1 underline-offset-2 text-[#3b82f6] dark:text-[#60a5fa] hover:text-[#2563eb] dark:hover:text-[#93c5fd] transition-colors cursor-pointer font-medium"
          >
            {t.value}
          </a>
        );
      }
      default:
        return t.value;
    }
  });
}

// ─── Message formatter with paragraphs & line breaks ─────────────
function renderMessage(text: string): React.ReactNode {
  const paragraphs = text.split(/\n{2,}/).filter(Boolean);
  if (paragraphs.length === 0) return null;

  const elements: React.ReactNode[] = [];

  paragraphs.forEach((para, pi) => {
    if (pi > 0) {
      // Gap between paragraphs
      elements.push(<br key={`gap-${pi}`} />);
    }
    const lines = para.split("\n");
    lines.forEach((line, li) => {
      if (li > 0) {
        elements.push(<br key={`br-${pi}-${li}`} />);
      }
      elements.push(
        <Fragment key={`l-${pi}-${li}`}>{renderInline(line)}</Fragment>
      );
    });
  });

  return elements;
}

// ─── Typewriter text ────────────────────────────────────────────────
// Reveals text character by character during streaming.

function TypewriterText({
  text,
  isStreaming,
}: {
  text: string;
  isStreaming: boolean;
}) {
  // Show first few chars instantly so the bubble isn't blank on mount
  const initialLen = Math.min(6, text.length);
  const [displayLen, setDisplayLen] = useState(initialLen);
  const displayRef = useRef(initialLen);

  // Catch up immediately when streaming stops
  useEffect(() => {
    if (!isStreaming && displayRef.current < text.length) {
      displayRef.current = text.length;
      setDisplayLen(text.length);
    }
  }, [isStreaming, text.length]);

  // Advance at a steady pace during streaming
  useEffect(() => {
    if (displayRef.current >= text.length || !isStreaming) return;

    const timer = setTimeout(() => {
      const next = Math.min(displayRef.current + 2, text.length);
      displayRef.current = next;
      setDisplayLen(next);
    }, 20);

    return () => clearTimeout(timer);
  }, [displayLen, text.length, isStreaming]);

  return <>{renderMessage(text.slice(0, displayLen))}</>;
}

// ─── Thinking indicator ──────────────────────────────────────────────

function ThinkingIndicator() {
  return (
    <span className="inline-flex items-center gap-1.5">
      <motion.span
        className="text-[#3b82f6] dark:text-[#b0d4e8] text-sm"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        Rahul is thinking
      </motion.span>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-[#3b82f6] dark:bg-[#b0d4e8]"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            delay: i * 0.25,
          }}
        />
      ))}
    </span>
  );
}

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const msgIdRef = useRef(0);
  const prevLoadingRef = useRef(false);

  // Regenerate suggested questions when a response finishes
  useEffect(() => {
    if (prevLoadingRef.current && !isLoading) {
      setSuggestions(pickRandom(followUpPool, 2));
    }
    prevLoadingRef.current = isLoading;
  }, [isLoading]);

  // Listen for open-chat event from Hero CTA
  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener("open-chat", handler);
    return () => window.removeEventListener("open-chat", handler);
  }, []);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  async function sendMessage(content: string) {
    if (!content.trim() || isLoading) return;

    setSuggestions([]);

    const id = ++msgIdRef.current;
    const userMessage: Message = { id, role: "user", content: content.trim() };
    const assistantId = ++msgIdRef.current;
    const assistantMessage: Message = { id: assistantId, role: "assistant", content: "" };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const conversation = messages
        .concat(userMessage)
        .map((m) => ({ role: m.role, content: m.content }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversation }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({ error: "Request failed" }));
        throw new Error(err.error || `HTTP ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response stream");

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);

          if (data === "[DONE]") break;

          try {
            const parsed = JSON.parse(data);
            if (parsed.error) throw new Error(parsed.error);
            if (parsed.text) {
              setMessages((prev) => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                if (last.role === "assistant") {
                  updated[updated.length - 1] = { ...last, content: last.content + parsed.text };
                }
                return updated;
              });
            }
          } catch {
            // skip malformed chunks
          }
        }
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Something went wrong";
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last.role === "assistant") {
          updated[updated.length - 1] = {
            ...last,
            content: `Sorry, I couldn't process that. ${errorMsg}`,
          };
        }
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleQuickPrompt(message: string) {
    sendMessage(message);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <>
      {/* ─── Launcher button ──────────────────────────────── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="launcher"
            variants={launcherVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#3b82f6] dark:bg-[#b0d4e8] text-white dark:text-[#0a0a0a] flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity"
            aria-label="Open chat"
          >
            <span className="absolute top-1 right-1 w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <MessageCircle size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ─── Chat panel ───────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:w-[400px] h-[100dvh] sm:h-[560px]"
          >
            {/* Panel container */}
            <div className="h-full rounded-none sm:rounded-lg border border-[#3b82f6]/25 dark:border-[#b0d4e8]/20 bg-white dark:bg-[#0a0a0a] shadow-2xl overflow-hidden">
              {/* Inner panel */}
              <div className="h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#3b82f6]/20 dark:border-[#b0d4e8]/15 shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full overflow-hidden ring-1 ring-[#3b82f6]/30 dark:ring-[#b0d4e8]/30">
                      <Image src="/profile_pic.png" alt="Rahul" width={28} height={28} className="object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#222] dark:text-[#e0e0e0] leading-tight">Rahul Gehlot</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 text-[#999] dark:text-[#666] hover:text-[#3b82f6] dark:hover:text-[#b0d4e8] transition-colors rounded-md hover:bg-black/5 dark:hover:bg-white/5"
                    aria-label="Close chat"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* ─── Content area ─────────────────────────── */}
                {messages.length === 0 ? (
                  /* Initial state - welcome + guide chips */
                  <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#3b82f6]/10 dark:bg-[#b0d4e8]/10 flex items-center justify-center mb-4 ring-1 ring-[#3b82f6]/20 dark:ring-[#b0d4e8]/20">
                      <MessageCircle size={22} className="text-[#3b82f6] dark:text-[#b0d4e8]" />
                    </div>
                    <p className="text-sm text-[#666] dark:text-[#999] mb-1 max-w-[240px]">
                      Ask me about my background, skills, and projects.
                    </p>
                    <p className="text-xs text-[#999] dark:text-[#555] mb-5">
                      I reply in first person as Rahul.
                    </p>
                    <div className="flex gap-2 w-full max-w-xs justify-center">
                      {quickPrompts.map((p) => (
                        <button
                          key={p.label}
                          onClick={() => handleQuickPrompt(p.message)}
                          disabled={isLoading}
                          className="px-3.5 py-1.5 text-xs rounded-full border border-[#3b82f6]/40 dark:border-[#b0d4e8]/40 text-[#3b82f6] dark:text-[#b0d4e8] bg-[#3b82f6]/10 dark:bg-[#b0d4e8]/5 hover:bg-[#3b82f6]/20 dark:hover:bg-[#b0d4e8]/15 hover:border-[#3b82f6]/60 dark:hover:border-[#b0d4e8]/60 transition-all disabled:opacity-50 font-medium"
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Chat state - message list */
                  <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 chat-scrollbar">
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        custom={msg.role}
                        variants={messageVariants}
                        initial="hidden"
                        animate="visible"
                        className={`flex items-end gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"
                          }`}
                      >
                        {/* Assistant avatar */}
                        {msg.role === "assistant" && (
                          <div className="shrink-0 w-7 h-7 rounded-full overflow-hidden ring-1 ring-[#3b82f6]/30 dark:ring-[#b0d4e8]/30 flex items-center justify-center">
                            <Image
                              src="/profile_pic.png"
                              alt="Rahul"
                              width={28}
                              height={28}
                              className="object-cover"
                            />
                          </div>
                        )}

                        {/* Bubble */}
                        <div
                          className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${msg.role === "user"
                            ? "bg-[#3b82f6] dark:bg-[#b0d4e8] text-white dark:text-[#0a0a0a] rounded-br-sm"
                            : "bg-[#f0f2f5] dark:bg-[#1e3038] border border-[#3b82f6]/25 dark:border-[#b0d4e8]/15 text-[#444] dark:text-[#ccc] rounded-bl-sm"
                            }`}
                        >
                          {msg.content ? (
                            <span className="[&_strong]:font-semibold [&_em]:italic [&_strong]:text-[#0a0a0a] dark:[&_strong]:text-white">
                              {isLoading && msg === messages[messages.length - 1] ? (
                                <>
                                  <TypewriterText
                                    key={msg.id}
                                    text={msg.content}
                                    isStreaming
                                  />
                                  <span className="typing-cursor bg-[#3b82f6] dark:bg-[#b0d4e8]" />
                                </>
                              ) : (
                                renderMessage(msg.content)
                              )}
                            </span>
                          ) : isLoading && msg === messages[messages.length - 1] ? (
                            <ThinkingIndicator />
                          ) : (
                            ""
                          )}
                        </div>
                      </motion.div>
                    ))}

                    {/* ─── Suggested follow-ups ──────────────── */}
                    {suggestions.length > 0 && !isLoading && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col gap-1.5 pl-9"
                      >
                        {suggestions.map((q) => (
                          <button
                            key={q}
                            onClick={() => sendMessage(q)}
                            className="text-sm text-left rounded-lg px-3.5 py-2
                              bg-[#3b82f6]/10 dark:bg-[#b0d4e8]/5
                              border border-[#3b82f6]/30 dark:border-[#b0d4e8]/30
                              text-[#3b82f6] dark:text-[#b0d4e8]
                              hover:bg-[#3b82f6]/20 dark:hover:bg-[#b0d4e8]/15
                              transition-all"
                          >
                            {q}
                          </button>
                        ))}
                      </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>
                )}

                {/* Input bar */}
                <form
                  onSubmit={handleSubmit}
                  className="border-t border-[#3b82f6]/20 dark:border-[#b0d4e8]/15 px-4 py-3 flex items-center gap-2 shrink-0"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    disabled={isLoading}
                    className="flex-1 bg-transparent text-sm text-[#333] dark:text-[#e0e0e0] placeholder-[#999] dark:placeholder-[#666] outline-none disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="p-2 rounded-lg text-[#3b82f6] dark:text-[#b0d4e8] hover:bg-[#3b82f6]/10 dark:hover:bg-[#b0d4e8]/10 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                    aria-label="Send message"
                  >
                    {isLoading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Send size={16} />
                    )}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
