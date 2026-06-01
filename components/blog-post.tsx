import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import { CodeBlock, CodeBlockCode } from "@/components/ui/code-block";

type BlogPostProps = {
  content: string;
};

const components: Components = {
  h1: ({ children, ...props }) => (
    <h1 className="text-3xl font-bold tracking-tight mt-12 mb-4 text-foreground" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="text-2xl font-bold tracking-tight mt-10 mb-3 text-foreground" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="text-xl font-semibold mt-8 mb-2 text-foreground" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="text-base leading-relaxed mb-4 text-foreground/80" {...props}>
      {children}
    </p>
  ),
  a: ({ href, children, ...props }) => (
    <a
      href={href}
      className="text-[#006d77] dark:text-[#4fd1c5] underline underline-offset-2 hover:text-[#005860] dark:hover:text-[#3bb8ad] transition-colors"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }) => (
    <ul className="list-disc pl-6 mb-4 space-y-1.5 text-foreground/80" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal pl-6 mb-4 space-y-1.5 text-foreground/80" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="text-base leading-relaxed" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-4 border-[#006d77] dark:border-[#4fd1c5] pl-5 py-2 my-6 bg-[#006d77]/5 dark:bg-[#4fd1c5]/5 rounded-r-lg text-foreground/70 italic"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ className, children, ...props }) => {
    const code = String(children).replace(/\n$/, "");
    const language = className?.replace("language-", "") ?? "";
    const hasNewlines = code.includes("\n");

    if (!className && !hasNewlines) {
      return (
        <code
          className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-1.5 py-0.5 rounded text-sm font-mono"
          {...props}
        >
          {children}
        </code>
      );
    }

    return (
      <div className="my-6">
        <CodeBlock language={language} code={code}>
          <CodeBlockCode code={code} language={language} />
        </CodeBlock>
      </div>
    );
  },
  pre: ({ children }) => <>{children}</>,
  hr: () => <hr className="my-10 border-border" />,
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto my-6 rounded-xl border border-border">
      <table className="w-full text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-zinc-50 dark:bg-zinc-800/50" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }) => (
    <th className="text-left px-4 py-3 font-semibold text-foreground border-b border-border" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="px-4 py-3 text-foreground/80 border-b border-border last-of-type:border-b-0" {...props}>
      {children}
    </td>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => {
    let text = "";
    if (children) {
      if (typeof children === "string") {
        text = children;
      } else if (Array.isArray(children)) {
        text = children.map(child => typeof child === "string" || typeof child === "number" ? child : "").join("");
      }
    }
    const isBlockLabel = /^(CODE SNIPPET|SCREENSHOT)\s*\d+\s*(-|⁻)/.test(text.trim());
    return (
      <em
        className={`italic text-foreground/80 ${isBlockLabel ? "block text-center w-full my-2" : ""}`}
        {...props}
      >
        {children}
      </em>
    );
  },
  img: ({ src, alt }) => {
    const imgSrc = typeof src === "string" ? src : "";
    return (
      <span className="block my-6">
        <Image
          src={imgSrc}
          alt={alt ?? ""}
          width={0}
          height={0}
          sizes="100vw"
          className="rounded-xl border border-border w-full h-auto"
        />
      </span>
    );
  },
};

export function BlogPostRenderer({ content }: BlogPostProps) {
  return (
    <article className="max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
