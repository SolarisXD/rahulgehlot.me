import fs from "node:fs";
import path from "node:path";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  content: string;
};

const BLOGS_DIR = path.join(process.cwd(), "Docs", "Blogs");

/**
 * Parse YAML frontmatter (between `---` delimiters) from markdown content.
 */
function parseFrontmatter(
  content: string,
): { title: string; description: string; date: string; body: string } {
  const lines = content.split("\n");

  // Check if file starts with ---
  if (lines[0]?.trim() !== "---") {
    // No frontmatter — fall back to heading-based extraction
    const title = extractTitle(content);
    const description = extractDescription(content);
    return { title, description, date: "", body: content };
  }

  let endIndex = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === "---") {
      endIndex = i;
      break;
    }
  }

  if (endIndex === -1) {
    // Unclosed frontmatter — treat entire file as body
    return { title: "", description: "", date: "", body: content };
  }

  const frontmatterLines = lines.slice(1, endIndex);
  const body = lines.slice(endIndex + 1).join("\n").trim();

  const fields: Record<string, string> = {};
  for (const line of frontmatterLines) {
    const match = line.match(/^(\w+):\s*(.+)/);
    if (match) {
      fields[match[1].toLowerCase()] = match[2].trim();
    }
  }

  return {
    title: fields.title ?? extractTitle(body),
    description: fields.description ?? extractDescription(body),
    date: fields.date ?? "",
    body,
  };
}

function extractTitle(content: string): string {
  const match = content.match(/^# (.+)/m);
  return match ? match[1].trim() : "";
}

function extractDescription(content: string): string {
  const lines = content.split("\n");
  let foundHeading = false;
  for (const line of lines) {
    if (line.startsWith("# ")) {
      foundHeading = true;
      continue;
    }
    if (foundHeading && line.trim().startsWith(">")) {
      return line.trim().replace(/^>\s*/, "");
    }
    if (foundHeading && line.trim() && !line.startsWith(">") && !line.startsWith("---")) {
      return line.trim();
    }
  }
  return "";
}

function parseReadTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return `${minutes} min read`;
}

/**
 * Get all blog posts sorted by date (newest first).
 */
export function getAllPosts(): Omit<BlogPost, "content">[] {
  const files: string[] = [];

  try {
    if (fs.existsSync(BLOGS_DIR)) {
      const entries = fs.readdirSync(BLOGS_DIR);
      for (const entry of entries) {
        if (entry.endsWith(".md")) {
          files.push(entry);
        }
      }
    }
  } catch {
    return [];
  }

  const posts = files
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const fullPath = path.join(BLOGS_DIR, file);
      const content = fs.readFileSync(fullPath, "utf-8");
      const { title, description, date, body } = parseFrontmatter(content);
      const readTime = parseReadTime(body || content);

      return { slug, title, description, date, readTime };
    })
    .sort((a, b) => {
      // Sort by date descending — files without dates go last
      if (a.date && b.date) return b.date.localeCompare(a.date);
      if (a.date) return -1;
      if (b.date) return 1;
      return 0;
    });

  return posts;
}

/**
 * Get a single blog post by slug.
 */
export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOGS_DIR, `${slug}.md`);

  try {
    if (!fs.existsSync(filePath)) return null;
    const content = fs.readFileSync(filePath, "utf-8");
    const { title, description, date, body } = parseFrontmatter(content);
    const readTime = parseReadTime(body || content);

    return { slug, title, description, date, readTime, content: body || content };
  } catch {
    return null;
  }
}
