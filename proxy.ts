/**
 * Edge middleware - rate limiting for /api/chat.
 *
 * Uses a simple in-memory sliding-window counter.
 * On Vercel Hobby (single-region default) this is sufficient.
 * For multi-region deployments, replace with @upstash/ratelimit.
 *
 * Limits: 10 requests per IP per 60-second window.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ─── Rate limiter state ─────────────────────────────────────────────
// Map<IP, { count: number; windowStart: number }>
const windows = new Map<string, { count: number; windowStart: number }>();

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 10;

// Cleanup old entries every 5 minutes to prevent memory leaks
let lastCleanup = Date.now();
const CLEANUP_INTERVAL = 5 * 60_000;

function cleanupExpired(): void {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  for (const [ip, entry] of windows) {
    if (now - entry.windowStart > WINDOW_MS) {
      windows.delete(ip);
    }
  }
}

export function proxy(request: NextRequest) {
  // Only apply to chat API
  if (!request.nextUrl.pathname.startsWith("/api/chat")) {
    return NextResponse.next();
  }

  // Skip rate limiting for OPTIONS (CORS preflight)
  if (request.method === "OPTIONS") {
    return NextResponse.next();
  }

  // Extract client IP
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "anonymous";

  const now = Date.now();
  cleanupExpired();

  let entry = windows.get(ip);

  // No existing entry or window expired - start new window
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    windows.set(ip, { count: 1, windowStart: now });
    return NextResponse.next();
  }

  // Within window - check count
  if (entry.count >= MAX_REQUESTS) {
    const retryAfter = Math.ceil((entry.windowStart + WINDOW_MS - now) / 1000);
    return new NextResponse(
      JSON.stringify({
        error: `Rate limit exceeded. Try again in ${retryAfter}s.`,
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(retryAfter),
        },
      }
    );
  }

  entry.count++;
  return NextResponse.next();
}

export const config = {
  matcher: "/api/chat",
};
