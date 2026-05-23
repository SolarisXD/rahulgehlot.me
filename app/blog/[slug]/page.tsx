import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { ThemeToggle } from "@/components/ui/curtain-theme-toggle";
import { ResumeDropdown } from "@/components/ui/resume-dropdown";
import { BlogPostRenderer } from "@/components/blog-post";
import { getPostBySlug, getAllPosts } from "@/lib/blog";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} — Rahul Gehlot`,
    description: post.description || `Blog post by Rahul Gehlot about ${post.title.toLowerCase()}`,
    alternates: {
      canonical: `https://rahulgehlot.me/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} — Rahul Gehlot`,
      description: post.description,
      images: [{ url: `/og?subtitle=${encodeURIComponent(post.title)}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      images: [`/og?subtitle=${encodeURIComponent(post.title)}`],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen text-foreground font-sans selection:bg-[#006d77]/20">
      {/* Top Bar */}
      <header className="w-full px-6 md:px-10 py-6 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-3">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} /> Blog
          </Link>
          <span className="text-muted-foreground/50">/</span>
          <span className="text-sm font-medium text-foreground truncate max-w-[200px]">
            {post.title}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <ResumeDropdown />
          <ThemeToggle variant="icon" defaultTheme="dark" />
        </div>
      </header>

      <main className="mx-auto max-w-[820px] px-4 sm:px-6 py-12">
        {/* Post Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-foreground">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {post.date && (
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {post.date}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {post.readTime}
            </span>
          </div>
        </div>

        <hr className="border-border mb-10" />

        {/* Post Content */}
        <BlogPostRenderer content={post.content} />
      </main>
    </div>
  );
}
