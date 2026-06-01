/**
 * Langfuse observability client wrapper.
 *
 * Gracefully no-ops when Langfuse env vars are not configured.
 * Safe to call even without a Langfuse account - all calls are optional-chained.
 */

import { Langfuse } from "langfuse";

// Lazy singleton - Langfuse client is created once on first use.
let _client: Langfuse | null = null;

function createClient(): Langfuse | null {
  const publicKey = process.env.LANGFUSE_PUBLIC_KEY;
  const secretKey = process.env.LANGFUSE_SECRET_KEY;
  if (!publicKey || !secretKey) return null;

  return new Langfuse({
    publicKey,
    secretKey,
    baseUrl: process.env.LANGFUSE_BASE_URL || "https://jp.cloud.langfuse.com",
  });
}

/**
 * Get the Langfuse client (or null if not configured).
 */
export function getLangfuse(): Langfuse | null {
  if (_client === null) {
    _client = createClient();
  }
  return _client;
}

/**
 * Flush Langfuse with a timeout so auth errors don't block the response.
 */
export async function flushLangfuse(client: Langfuse | null): Promise<void> {
  if (!client) return;
  await Promise.race([
    client.flushAsync(),
    new Promise<void>((_, reject) =>
      setTimeout(() => reject(new Error("Langfuse flush timeout")), 2000)
    ),
  ]).catch(() => {
    // Silently ignore - observability failure shouldn't affect the user
  });
}

/**
 * Generate a short unique ID for traces / spans.
 */
export function shortId(): string {
  return Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7);
}
