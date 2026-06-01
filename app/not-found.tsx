import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* Large 404 */}
        <h1 className="text-[10rem] sm:text-[12rem] font-mono font-bold leading-none tracking-tighter text-[#9CBEDF] select-none">
          404
        </h1>

        {/* Message */}
        <p className="mt-4 text-lg sm:text-xl text-foreground">
          Not found - the page you&apos;re looking for doesn&apos;t exist.
        </p>

        {/* Subdued hint */}
        <p className="mt-2 text-sm text-muted">
          It may have been moved, deleted, or never existed at all.
        </p>

        {/* Home link */}
        <Link
          href="/"
          className="mt-8 inline-block px-6 py-3 rounded-lg border border-border text-foreground hover:bg-[#9CBEDF] hover:text-[#1b1b1e] transition-colors duration-200 font-medium"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
