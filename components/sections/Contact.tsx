"use client";

import { useState, type FormEvent } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { copy } from "@/content/copy";
import { Mail, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

type FormState = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setState("error");
        setErrorMsg(data.error || "Something went wrong.");
        return;
      }

      setState("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setState("error");
      setErrorMsg("Network error. Email me directly at rahulgehlot6044@gmail.com");
    }
  }

  return (
    <div>
      <SectionHeader label="Contact" heading={copy.contact.heading} icon={<Mail size={18} />} />
      <p className="text-base text-foreground/80 max-w-xl mb-6">
        {copy.contact.body}
      </p>

      {/* ─── Contact form ─────────────────────────────────── */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8 max-w-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={state === "loading" || state === "success"}
            className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 disabled:opacity-50"
          />
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={state === "loading" || state === "success"}
            className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 disabled:opacity-50"
          />
        </div>
        <textarea
          placeholder="Your message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          disabled={state === "loading" || state === "success"}
          className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 resize-y disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={state === "loading" || state === "success" || !name.trim() || !email.trim() || !message.trim()}
          className="inline-flex items-center gap-2 rounded-lg bg-accent text-white px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {state === "loading" ? (
            <Loader2 size={16} className="animate-spin" />
          ) : state === "success" ? (
            <CheckCircle2 size={16} />
          ) : (
            <Send size={16} />
          )}
          {state === "loading"
            ? "Sending..."
            : state === "success"
              ? "Sent!"
              : "Send message"}
        </button>

        {/* Status messages */}
        {state === "success" && (
          <p className="flex items-center gap-2 text-sm text-emerald-500">
            <CheckCircle2 size={16} />
            Message sent! I&rsquo;ll respond within a day.
          </p>
        )}
        {state === "error" && (
          <p className="flex items-center gap-2 text-sm text-red-500">
            <AlertCircle size={16} />
            {errorMsg}
          </p>
        )}
      </form>

      {/* ─── Social links ──────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-4">
        <a
          href="mailto:rahulgehlot6044@gmail.com"
          className="inline-flex items-center gap-2 rounded-lg bg-accent text-white px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Mail size={16} />
          {copy.contact.emailLabel}
        </a>
        <a
          href="https://github.com/SolarisXD"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:border-accent/50 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/rahulgehlot"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:border-accent/50 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          LinkedIn
        </a>
      </div>
    </div>
  );
}

