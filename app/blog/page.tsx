import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

export default function BlogPage() {
  return (
    <div className="min-h-screen text-foreground font-sans flex flex-col items-center justify-center px-6">
      <Link
        href="/"
        className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={16} /> Back
      </Link>
      <BookOpen size={48} className="text-muted-foreground/20 mb-6" />
      <h1 className="text-3xl font-bold tracking-tight mb-3">Coming Soon</h1>
      <p className="text-sm text-muted-foreground/60 text-center max-w-md">
        I&rsquo;m working on articles about building with AI, full-stack decisions, and the ideas that don&rsquo;t fit in a tweet.
      </p>
    </div>
  );
}
