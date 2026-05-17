import { Resend } from "resend";
import {
  checkCooldown,
  recordSubmission,
  COOLDOWN_SECONDS,
} from "@/lib/rate-limit";
import { validateName, validateEmail, validateMessage } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return Response.json(
        {
          error:
            "Contact form is not configured yet. Email me directly at rahulgehlot6044@gmail.com",
        },
        { status: 501 }
      );
    }

    const body = await req.json();
    const { name, email, message } = body;

    // ─── Field-level validation ─────────────────────────────
    const nameResult = validateName(name ?? "");
    if (!nameResult.valid) {
      return Response.json(
        { field: "name", error: nameResult.error },
        { status: 400 }
      );
    }

    const emailResult = validateEmail(email ?? "");
    if (!emailResult.valid) {
      return Response.json(
        { field: "email", error: emailResult.error },
        { status: 400 }
      );
    }

    const messageResult = validateMessage(message ?? "");
    if (!messageResult.valid) {
      return Response.json(
        { field: "message", error: messageResult.error },
        { status: 400 }
      );
    }

    // ─── Cooldown check ─────────────────────────────────────
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const { allowed, retryAfter } = checkCooldown(ip);

    if (!allowed) {
      return Response.json(
        {
          field: "form",
          error: `Please wait ${retryAfter}s before sending another message.`,
          retryAfter,
        },
        {
          status: 429,
          headers: { "X-Retry-After": String(retryAfter) },
        }
      );
    }

    // ─── Send via Resend ────────────────────────────────────
    const resend = new Resend(apiKey);
    const contactEmail = process.env.CONTACT_TO || "rahulgehlot6044@gmail.com";
    const senderName = name.trim();
    const senderEmail = email.trim();
    const messageText = message.trim();

    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM || "onboarding@resend.dev",
      to: contactEmail,
      replyTo: senderEmail,
      subject: `Portfolio contact: ${senderName}`,
      text: [
        `From: ${senderName} (${senderEmail})`,
        `---`,
        messageText,
        `---`,
        `Sent via rahulgehlot.me`,
      ].join("\n\n"),
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return Response.json(
        {
          error:
            "Failed to send message. Please email me directly at rahulgehlot6044@gmail.com",
        },
        { status: 500 }
      );
    }

    // ─── Record this submission for cooldown ─────────────────
    recordSubmission(ip);

    return Response.json({
      success: true,
      retryAfter: COOLDOWN_SECONDS,
    });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return Response.json(
      {
        error:
          "Something went wrong. Please email me directly at rahulgehlot6044@gmail.com",
      },
      { status: 500 }
    );
  }
}
