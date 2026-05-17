/**
 * Email alert utilities for security events.
 *
 * Sends notifications via Resend when jailbreak attempts are detected.
 * Gracefully no-ops when RESEND_API_KEY is not configured.
 */

import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export interface JailbreakAlertPayload {
  message: string;
  ip: string;
  userAgent: string;
  matchedPattern: string;
}

/**
 * Send an email alert about a jailbreak attempt.
 *
 * Fire-and-forget: callers should not await this if they need to respond
 * quickly. Errors are caught and logged internally.
 */
export async function sendJailbreakAlert(
  payload: JailbreakAlertPayload,
): Promise<void> {
  if (!resend) return;

  const timestamp = new Date().toISOString();

  try {
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM || "contact@rahulgehlot.me",
      to: process.env.ALERT_TO || "rahulgehlot6044@gmail.com",
      subject: "🚨 Jailbreak attempt detected on portfolio",
      text: [
        `A jailbreak attempt was detected on your portfolio chatbot.`,
        ``,
        `Time:   ${timestamp}`,
        `IP:     ${payload.ip}`,
        `Agent:  ${payload.userAgent}`,
        `Pattern: ${payload.matchedPattern}`,
        ``,
        `Message:`,
        `"${payload.message}"`,
        ``,
        `---`,
        `Sent by rahulgehlot.me security monitor`,
      ].join("\n"),
    });

    if (error) {
      console.error("[alert] Resend send error:", error);
    }
  } catch (err) {
    console.error("[alert] Failed to send jailbreak alert:", err);
  }
}
