import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ui/curtain-theme-toggle";
import { ResumeDropdown } from "@/components/ui/resume-dropdown";

export const metadata: Metadata = {
  title: "Privacy Policy - Rahul Gehlot",
  alternates: {
    canonical: "https://rahulgehlot.me/privacy",
  },
  openGraph: {
    title: "Privacy Policy - Rahul Gehlot",
    description: "Privacy policy for Rahul Gehlot's personal portfolio.",
    images: [{ url: "/og?subtitle=Privacy+Policy", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og?subtitle=Privacy+Policy"],
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen text-foreground font-sans selection:bg-[#006d77]/20">

      {/* Top Bar */}
      <header className="w-full px-6 md:px-10 py-6 mb-10 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={16} /> Rahul
          </Link>
          <span className="text-muted-foreground/50">/</span>
          <span className="text-sm font-medium text-foreground">Privacy</span>
        </div>
        <div className="flex items-center gap-3">
          <ResumeDropdown />
          <ThemeToggle variant="icon" defaultTheme="dark" />
        </div>
      </header>

      <main className="mx-auto max-w-[720px] px-4 sm:px-6 pb-24">
        <div className="text-left mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">Last updated: May 2026</p>
        </div>

        <hr className="border-border mb-10 mt-2" />

        <div className="space-y-10 text-base text-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Data Collected</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Contact form.</strong> Name, email, and message you submit. Sent via Resend and stored briefly for delivery.</li>
              <li><strong>Visitor count.</strong> An anonymous counter incremented once per session on your first page load.</li>
              <li><strong>Chat.</strong> Messages you send to the AI assistant are processed via Google Gemini and may be logged for improvement.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Cookies &amp; Storage</h2>
            <p>
              This site uses <code className="text-accent">localStorage</code> to remember whether you&rsquo;ve been
              counted as a visitor and to enforce a 60-second cooldown on the contact form. No third-party cookies
              are used for tracking or advertising.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Third-Party Services</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Supabase</strong> - visitor count storage and RAG knowledge base embeddings.</li>
              <li><strong>Resend</strong> - delivers contact form submissions via email.</li>
              <li><strong>Google AI (Gemini)</strong> - powers the portfolio chat assistant.</li>
              <li><strong>Langfuse</strong> - optional observability for chat interactions (no personal data collected).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Data Retention</h2>
            <p>
              Contact form submissions are forwarded via email and are not stored in a database. Chat logs may be
              retained by Langfuse if the feature is enabled. You can request deletion at any time.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Your Rights</h2>
            <p>
              You may request access to or deletion of any personal data I hold. Reach out at{" "}
              <a href="mailto:rahulgehlot6044@gmail.com" className="text-accent underline underline-offset-2">
                rahulgehlot6044@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
