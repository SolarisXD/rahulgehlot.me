"use client"

import { cn } from "@/lib/utils"
import React, { useState, useCallback, useSyncExternalStore } from "react"
import { codeToHtml } from "shiki"
import { Check, Copy } from "lucide-react"

export type CodeBlockProps = {
  children?: React.ReactNode
  language?: string
  code?: string
  className?: string
} & React.HTMLProps<HTMLDivElement>

function CodeBlock({ children, language, code, className, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    if (!code) return
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for non-secure contexts
      const textarea = document.createElement("textarea")
      textarea.value = code
      textarea.style.position = "fixed"
      textarea.style.opacity = "0"
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [code])

  return (
    <div
      className={cn(
        "not-prose flex w-full flex-col overflow-clip border rounded-xl",
        "border-border bg-white dark:bg-[#1b1b1e]",
        className
      )}
      {...props}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-zinc-50 dark:bg-black/20">
        <span className="text-xs font-mono text-muted-foreground/60 uppercase tracking-wider">
          {language || "code"}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground/60 hover:text-foreground transition-colors"
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? (
            <>
              <Check size={14} className="text-green-500" />
              Copied
            </>
          ) : (
            <>
              <Copy size={14} />
              Copy
            </>
          )}
        </button>
      </div>
      {children}
    </div>
  )
}

export type CodeBlockCodeProps = {
  code: string
  language?: string
  theme?: string
  className?: string
} & React.HTMLProps<HTMLDivElement>

function subscribeToDarkMode(callback: () => void) {
  const html = document.documentElement
  const observer = new MutationObserver(callback)
  observer.observe(html, { attributes: true, attributeFilter: ["class"] })
  return () => observer.disconnect()
}

function getDarkModeSnapshot() {
  return document.documentElement.classList.contains("dark")
}

function getDarkModeServerSnapshot() {
  return false
}

function CodeBlockCode({
  code,
  language = "tsx",
  theme = "github-light",
  className,
  ...props
}: CodeBlockCodeProps) {
  const isDark = useSyncExternalStore(subscribeToDarkMode, getDarkModeSnapshot, getDarkModeServerSnapshot)

  const [highlightedHtml, setHighlightedHtml] = React.useState<string | null>(null)

  React.useEffect(() => {
    async function highlight() {
      if (!code) {
        setHighlightedHtml("<pre><code></code></pre>")
        return
      }

      const resolvedTheme = isDark ? "github-dark" : theme
      const html = await codeToHtml(code, { lang: language, theme: resolvedTheme })
      setHighlightedHtml(html)
    }
    highlight()
  }, [code, language, theme, isDark])

  const classNames = cn(
    "code-scrollbar w-full overflow-x-auto text-[13px]",
    // Shiki adds inline bg, override it so our wrapper bg shows through
    "[&_pre]:!bg-transparent [&_pre]:px-4 [&_pre]:py-4",
    className
  )

  // SSR fallback: render plain code if not hydrated yet
  return highlightedHtml ? (
    <div
      className={classNames}
      dangerouslySetInnerHTML={{ __html: highlightedHtml }}
      {...props}
    />
  ) : (
    <div className={classNames} {...props}>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  )
}

export type CodeBlockGroupProps = React.HTMLAttributes<HTMLDivElement>

function CodeBlockGroup({
  children,
  className,
  ...props
}: CodeBlockGroupProps) {
  return (
    <div
      className={cn("flex items-center justify-between", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export { CodeBlockGroup, CodeBlockCode, CodeBlock }
