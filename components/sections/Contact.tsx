"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { copy } from "@/content/copy";
import {
  Mail,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react";
import {
  validateName,
  validateEmail,
  validateMessage,
} from "@/lib/validation";

type FormState = "idle" | "loading" | "success" | "error";

interface FieldErrors {
  name: string | null;
  email: string | null;
  message: string | null;
}

const COOLDOWN_S = 60;
const STORAGE_KEY = "contact_cooldown_until";

/** Read the persisted cooldown expiry timestamp (ms). */
function readCooldown(): number | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/** Persist cooldown so it survives refresh. */
function saveCooldown(until: number | null) {
  try {
    if (until === null) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(until));
    }
  } catch {
    // ignore
  }
}

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Silent cooldown — no UI change, just blocks submission
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);

  // Shown only when user tries to submit during cooldown
  const [cooldownWarning, setCooldownWarning] = useState<number | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Restore cooldown from localStorage on mount ──────────
  useEffect(() => {
    const saved = readCooldown();
    if (!saved) return;
    if (saved > Date.now()) {
      queueMicrotask(() => setCooldownUntil(saved));
    } else {
      saveCooldown(null);
    }
  }, []);

  // ── Live countdown ticker for the warning message ────────
  useEffect(() => {
    if (cooldownWarning === null) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((cooldownUntil! - Date.now()) / 1000));
      if (remaining <= 0) {
        clearInterval(timerRef.current!);
        timerRef.current = null;
        setCooldownUntil(null);
        setCooldownWarning(null);
        saveCooldown(null);
      } else {
        setCooldownWarning(remaining);
      }
    }, 500); // update twice a second for smoothness

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [cooldownWarning, cooldownUntil]);

  // ── Track touched fields for inline errors ───────────────
  const [touched, setTouched] = useState<Set<string>>(new Set());

  const fieldErrors: FieldErrors = {
    name: touched.has("name") ? validateName(name).error : null,
    email: touched.has("email") ? validateEmail(email).error : null,
    message: touched.has("message") ? validateMessage(message).error : null,
  };

  const hasVisibleError =
    fieldErrors.name !== null ||
    fieldErrors.email !== null ||
    fieldErrors.message !== null;

  const isLoadingOrSent = state === "loading" || state === "success";

  // ── Field-level validation on blur ───────────────────────
  function handleBlur(field: string) {
    setTouched((prev) => new Set(prev).add(field));
  }

  // ── Submit ───────────────────────────────────────────────
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setTouched(new Set(["name", "email", "message"]));

    const vName = validateName(name);
    const vEmail = validateEmail(email);
    const vMsg = validateMessage(message);
    if (!vName.valid || !vEmail.valid || !vMsg.valid) return;

    // ── Cooldown check ──────────────────────────────────
    if (cooldownUntil && cooldownUntil > Date.now()) {
      const remaining = Math.max(1, Math.ceil((cooldownUntil - Date.now()) / 1000));
      setCooldownWarning(remaining);
      return;
    }

    setState("loading");
    setErrorMsg("");
    setCooldownWarning(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          // Server says cooldown — use server's remaining time
          const retry = data.retryAfter ?? COOLDOWN_S;
          const until = Date.now() + retry * 1000;
          saveCooldown(until);
          setCooldownUntil(until);
          setCooldownWarning(retry);
        } else {
          setState("error");
          setErrorMsg(data.error || "Something went wrong.");
        }
        return;
      }

      // ── Success — start silent cooldown ───────────────
      setName("");
      setEmail("");
      setMessage("");
      setTouched(new Set());

      const until = Date.now() + COOLDOWN_S * 1000;
      saveCooldown(until);
      setCooldownUntil(until);
      setState("success");

      // Auto-dismiss success after 3s
      setTimeout(() => setState("idle"), 3000);
    } catch {
      setState("error");
      setErrorMsg(
        "Network error. Email me directly at rahulgehlot6044@gmail.com"
      );
    }
  }

  // ── Render ───────────────────────────────────────────────
  return (
    <div>
      <SectionHeader
        label="Contact"
        heading={copy.contact.heading}
        icon={<Mail size={18} />}
      />
      <p className="text-base text-foreground/80 max-w-xl mb-6">
        {copy.contact.body}
      </p>

      {/* ─── Cooldown warning — only shows when user tries too fast ── */}
      {cooldownWarning !== null && (
        <div className="mb-4 inline-flex rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-foreground">
          <p className="flex items-center gap-2">
            <Clock size={16} className="shrink-0 text-amber-500" />
            Please wait{" "}
            <span className="font-semibold tabular-nums">{cooldownWarning}s</span>{" "}
            before sending another message
          </p>
        </div>
      )}

      {/* ─── Contact form ───────────────────────────────── */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8 max-w-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name field */}
          <div>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => handleBlur("name")}
              required
              disabled={isLoadingOrSent}
              aria-invalid={fieldErrors.name !== null}
              className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 disabled:opacity-50 aria-invalid:border-red-500 aria-invalid:focus:ring-red-500/50"
            />
            {fieldErrors.name && (
              <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                <AlertCircle size={12} />
                {fieldErrors.name}
              </p>
            )}
          </div>

          {/* Email field */}
          <div>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur("email")}
              required
              disabled={isLoadingOrSent}
              aria-invalid={fieldErrors.email !== null}
              className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 disabled:opacity-50 aria-invalid:border-red-500 aria-invalid:focus:ring-red-500/50"
            />
            {fieldErrors.email && (
              <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                <AlertCircle size={12} />
                {fieldErrors.email}
              </p>
            )}
          </div>
        </div>

        {/* Message field */}
        <div>
          <textarea
            placeholder="Your message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onBlur={() => handleBlur("message")}
            required
            disabled={isLoadingOrSent}
            aria-invalid={fieldErrors.message !== null}
            className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 resize-y disabled:opacity-50 aria-invalid:border-red-500 aria-invalid:focus:ring-red-500/50"
          />
          {fieldErrors.message && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
              <AlertCircle size={12} />
              {fieldErrors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={
            isLoadingOrSent ||
            !name.trim() ||
            !email.trim() ||
            !message.trim() ||
            hasVisibleError
          }
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

      {/* ─── Social links ────────────────────────────────── */}
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
        <a
          href="https://medium.com/@rahulgehlotxsd"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:border-accent/50 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42zM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
          </svg>
          Medium
        </a>
        <a
          href="https://dev.to/rahulgehlot"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:border-accent/50 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 15.5H7.5V8.5H9v7m3.75-3.5h-1.5v2h2v1.5H9.75V8.5h4v1.5h-2.5v2h2.5v1.5zm6-.5v4h-1.5v-4h-1.25V10h4v1.5h-1.25z" />
          </svg>
          Dev.to
        </a>
      </div>
    </div>
  );
}
