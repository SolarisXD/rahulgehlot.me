import { SectionHeader } from "@/components/ui/SectionHeader";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function Blog() {
  const posts = getAllPosts();

  return (
    <div>
      <SectionHeader
        label="Sharing"
        heading="Thoughts & writing"
        icon={<BookOpen size={18} />}
        rightContent={
          <Link
            href="/blog"
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {posts.length > 0 ? `All posts (${posts.length})` : "Coming soon"} &rarr;
          </Link>
        }
      />
      {posts.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-card/50 p-12 text-center">
          <BookOpen size={32} className="mx-auto text-muted-foreground/30 mb-3" />
          <p className="text-sm text-muted-foreground/60">
            Articles on building, AI, and the ideas I&rsquo;m thinking about are on their way.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block p-4 bg-card border border-border rounded-xl hover:border-[#006d77]/30 hover:shadow-sm transition-all"
            >
              <h3 className="text-sm font-semibold text-foreground group-hover:text-[#006d77] dark:group-hover:text-[#4fd1c5] transition-colors mb-1">
                {post.title}
              </h3>
              {post.description && (
                <p className="text-xs text-muted-foreground/70 leading-relaxed line-clamp-2">
                  {post.description}
                </p>
              )}
              <div className="flex items-center gap-3 mt-2 text-[11px] text-muted-foreground/50">
                {post.date && <span>{post.date}</span>}
                <span>{post.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
