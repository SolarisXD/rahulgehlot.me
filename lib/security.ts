/**
 * Security utilities for the portfolio chatbot.
 *
 * - Input validation (length cap)
 * - Jailbreak pattern detection
 * - Canary token for system prompt leak detection
 */

export const MAX_INPUT_LENGTH = 500;

/**
 * Hidden token embedded in the system prompt.
 * If it appears in the model's output, the system prompt has leaked.
 */
export const CANARY_TOKEN = "PORTFOLIO_CANARY_a7f3e2";

/**
 * Patterns that indicate a jailbreak or prompt injection attempt.
 * Each pattern is case-insensitive.
 */
export const JAILBREAK_PATTERNS: RegExp[] = [
  /ignore\s+(all\s+)?(previous|above|prior)\s+(instructions|directions|rules)/i,
  /forget\s+(all\s+)?(previous|above|prior)\s+(instructions|directions|rules)/i,
  /disregard\s+(all\s+)?(previous|above|prior)\s+(instructions|directions|rules)/i,
  /you\s+are\s+(not\s+)?(bound\s+by|required\s+to\s+follow)\s+(your\s+)?(instructions|rules)/i,
  /new\s+instructions?\s*[:：]/i,
  /override\s+(all\s+)?(instructions|rules|system)/i,
  /\[system\]|\[assistant\]|\[user\]|\[INST\]|<\/?s>/i,
  /act\s+as\s+(if\s+you\s+are\s+)?( DAN| a\s+different\s+(AI|persona|character))/i,
  /you\s+(don'?t|do\s+not)\s+(have\s+to|need\s+to)\s+(follow|obey)/i,
  /reveal\s+(your\s+)?(system\s+)?prompt/i,
];

/**
 * Check a user message for jailbreak patterns.
 * Returns the source of the matched regex if detected, null otherwise.
 */
export function checkJailbreak(input: string): string | null {
  for (const pattern of JAILBREAK_PATTERNS) {
    if (pattern.test(input)) {
      return pattern.source;
    }
  }
  return null;
}

/**
 * Check whether the output contains the canary token (system prompt leak).
 */
export function containsCanary(output: string): boolean {
  return output.includes(CANARY_TOKEN);
}
