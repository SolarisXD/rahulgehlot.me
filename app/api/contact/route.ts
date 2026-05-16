import { Resend } from "resend";

export const runtime = "nodejs";

// Basic email validation
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

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

    // ─── Validation ─────────────────────────────────────────
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return Response.json({ error: "Name is required" }, { status: 400 });
    }
    if (name.length > 100) {
      return Response.json(
        { error: "Name must be under 100 characters" },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !isValidEmail(email)) {
      return Response.json({ error: "A valid email is required" }, { status: 400 });
    }
    if (email.length > 200) {
      return Response.json(
        { error: "Email must be under 200 characters" },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }
    if (message.length > 5000) {
      return Response.json(
        { error: "Message must be under 5000 characters" },
        { status: 400 }
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
        { error: "Failed to send message. Please email me directly at rahulgehlot6044@gmail.com" },
        { status: 500 }
      );
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return Response.json(
      { error: "Something went wrong. Please email me directly at rahulgehlot6044@gmail.com" },
      { status: 500 }
    );
  }
}
