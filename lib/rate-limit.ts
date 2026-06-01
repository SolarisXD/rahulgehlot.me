/**
 * In-memory cooldown limiter for the contact form.
 *
 * After a successful submission, the same IP must wait
 * COOLDOWN_MS before sending another message.
 *
 * NOTE: In-memory only - resets on server restart / cold start.
 * For a portfolio this is adequate. If you need persistence
 * across deploys, swap in a DB (e.g. Supabase).
 */

const COOLDOWN_MS = 60_000; // 60 seconds

interface CooldownEntry {
  /** Timestamp (ms) of the last successful submission */
  lastSubmission: number;
}

const store = new Map<string, CooldownEntry>();

/**
 * Check whether `key` (typically IP) may submit now.
 *
 * Returns:
 * - `{ allowed: true }` if no active cooldown.
 * - `{ allowed: false, retryAfter }` with the remaining wait in seconds.
 */
export function checkCooldown(key: string): {
  allowed: boolean;
  retryAfter: number | null;
} {
  const entry = store.get(key);
  if (!entry) return { allowed: true, retryAfter: null };

  const elapsed = Date.now() - entry.lastSubmission;

  if (elapsed >= COOLDOWN_MS) {
    // Cooldown expired - clean up and allow
    store.delete(key);
    return { allowed: true, retryAfter: null };
  }

  const remaining = Math.ceil((COOLDOWN_MS - elapsed) / 1000);
  return { allowed: false, retryAfter: remaining };
}

/**
 * Record a successful submission for `key`.
 * Starts the cooldown timer.
 */
export function recordSubmission(key: string): void {
  store.set(key, { lastSubmission: Date.now() });
}

/** The cooldown duration in seconds (for the client to display). */
export const COOLDOWN_SECONDS = Math.ceil(COOLDOWN_MS / 1000);
