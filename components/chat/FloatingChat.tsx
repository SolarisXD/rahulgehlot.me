"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

const quickPrompts = [
  "What's your decision-making process?",
  "Tell me about Hisaab Pro's security design",
  "How do you find freelance clients?",
  "Are you available for work?",
];

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);

  // Listen for open-chat event from Hero CTA
  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener("open-chat", handler);
    return () => window.removeEventListener("open-chat", handler);
  }, []);

  return (
    <>
      {/* Launcher button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity"
          aria-label="Open chat"
        >
          <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-green-500 animate-pulse" />
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:w-[400px] h-[100dvh] sm:h-[560px] bg-background border border-border rounded-none sm:rounded-lg shadow-xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <p className="text-sm font-semibold">Ask me anything</p>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-muted hover:text-foreground transition-colors"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
            <p className="text-sm text-muted mb-4">
              Ask me about my projects, decisions, or availability.
            </p>

            {/* Quick prompts */}
            <div className="flex flex-col gap-2 w-full max-w-xs">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  className="text-sm text-left rounded-lg border border-border px-4 py-2.5 text-foreground/80 hover:border-accent/50 hover:text-foreground transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <p className="mt-6 text-xs text-muted">
              AI coming soon — email{" "}
              <a
                href="mailto:hello@yoursite.dev"
                className="text-accent hover:underline"
              >
                hello@yoursite.dev
              </a>{" "}
              in the meantime.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
