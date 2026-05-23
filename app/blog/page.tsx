import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, BookOpen, ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/ui/curtain-theme-toggle";
import { ResumeDropdown } from "@/components/ui/resume-dropdown";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Blog — Rahul Gehlot",
  description: "Articles about building with AI, full-stack decisions, testing, and more.",
  alternates: {
    canonical: "https://rahulgehlot.me/blog",
  },
  openGraph: {
    title: "Blog — Rahul Gehlot",
    description: "Articles about building with AI, full-stack decisions, and more.",
    images: [{ url: "/og?subtitle=Blog", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og?subtitle=Blog"],
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen text-foreground font-sans selection:bg-[#006d77]/20">
      {/* Top Bar */}
      <header className="w-full px-6 md:px-10 py-6 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} /> Rahul
          </Link>
          <span className="text-muted-foreground/50">/</span>
          <span className="text-sm font-medium text-foreground">Blog</span>
        </div>
        <div className="flex items-center gap-3">
          <ResumeDropdown />
          <ThemeToggle variant="icon" defaultTheme="dark" />
        </div>
      </header>

      <main className="mx-auto max-w-[920px] px-4 sm:px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Blog</h1>
          <p className="text-sm text-muted-foreground">
            Articles about building with AI, full-stack decisions, and the ideas that don&rsquo;t fit in a tweet.
          </p>
        </div>

        <hr className="border-border mb-10" />

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen size={48} className="text-muted-foreground/20 mx-auto mb-6" />
            <p className="text-sm text-muted-foreground/60">
              No posts yet. I&rsquo;m working on it.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block p-5 bg-white dark:bg-card border border-border rounded-xl shadow-sm hover:border-[#006d77]/40 hover:shadow-md transition-all"
              >
                <h2 className="text-lg font-semibold text-foreground group-hover:text-[#006d77] dark:group-hover:text-[#4fd1c5] transition-colors mb-2">
                  {post.title}
                </h2>
                {post.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {post.description}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  {post.date && (
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {post.date}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {post.readTime}
                  </span>
                  <span className="flex items-center gap-1 text-[#006d77] dark:text-[#4fd1c5] font-medium ml-auto">
                    Read <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
