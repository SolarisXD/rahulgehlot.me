import { SectionHeader } from "@/components/ui/SectionHeader";
import { BookOpen } from "lucide-react";
import Link from "next/link";

export default function Blog() {
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
            Coming soon &rarr;
          </Link>
        }
      />
      <div className="rounded-lg border border-dashed border-border bg-card/50 p-12 text-center">
        <BookOpen size={32} className="mx-auto text-muted-foreground/30 mb-3" />
        <p className="text-sm text-muted-foreground/60">
          Articles on building, AI, and the ideas I&rsquo;m thinking about are on their way.
        </p>
      </div>
    </div>
  );
}
