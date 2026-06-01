/**
 * Shared validation utilities for the contact form.
 *
 * Used on both client (field-level feedback) and server (submission guard).
 */

/* ── Constants ─────────────────────────────────────────── */

export const NAME_MAX = 100;
export const EMAIL_MAX = 200;
export const MESSAGE_MAX = 5000;

/**
 * Common disposable / throwaway email domains.
 * Kept deliberately small - covers the most abused domains
 * without needing a 5 000-entry blacklist.
 */
const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "tempmail.com",
  "10minutemail.com",
  "throwaway.email",
  "yopmail.com",
  "sharklasers.com",
  "trashmail.com",
  "maildrop.cc",
  "getairmail.com",
  "fakeinbox.com",
  "emailondeck.com",
  "dispostable.com",
  "mailnator.com",
  "temp-mail.org",
  "tempmail.net",
  "mailexpire.com",
  "mytemp.email",
  "mailtemp.org",
  "discard.email",
]);

/* ── Validators ────────────────────────────────────────── */

export type ValidationResult =
  | { valid: true; error: null }
  | { valid: false; error: string };

/**
 * Validate a name field.
 */
export function validateName(value: string): ValidationResult {
  const trimmed = value.trim();

  if (trimmed.length === 0) {
    return { valid: false, error: "Name is required" };
  }

  if (trimmed.length > NAME_MAX) {
    return {
      valid: false,
      error: `Name must be under ${NAME_MAX} characters`,
    };
  }

  return { valid: true, error: null };
}

/**
 * Basic email format regex (RFC 5322 simplified - sufficient for contact forms).
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Validate an email address.
 * Checks: blank, length, format, disposable domain.
 */
export function validateEmail(value: string): ValidationResult {
  const trimmed = value.trim();

  if (trimmed.length === 0) {
    return { valid: false, error: "Email is required" };
  }

  if (trimmed.length > EMAIL_MAX) {
    return {
      valid: false,
      error: `Email must be under ${EMAIL_MAX} characters`,
    };
  }

  if (!EMAIL_REGEX.test(trimmed)) {
    return { valid: false, error: "Enter a valid email address" };
  }

  // Extract domain and check against disposable list
  const domain = trimmed.split("@")[1]?.toLowerCase();
  if (domain && DISPOSABLE_DOMAINS.has(domain)) {
    return {
      valid: false,
      error: "Temporary email addresses aren't accepted - use a real one",
    };
  }

  return { valid: true, error: null };
}

/**
 * Validate a message body.
 */
export function validateMessage(value: string): ValidationResult {
  const trimmed = value.trim();

  if (trimmed.length === 0) {
    return { valid: false, error: "Message is required" };
  }

  if (trimmed.length > MESSAGE_MAX) {
    return {
      valid: false,
      error: `Message must be under ${MESSAGE_MAX} characters`,
    };
  }

  return { valid: true, error: null };
}
