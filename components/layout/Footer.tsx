export default function Footer() {
  return (
    <footer className="py-8 text-center text-sm text-muted">
      <p>
        © 2026 DTxSD &nbsp;·&nbsp;
        <a
          href="https://github.com/..."
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          GitHub
        </a>
        &nbsp;·&nbsp;
        <a
          href="https://linkedin.com/in/..."
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          LinkedIn
        </a>
        &nbsp;·&nbsp;
        <span className="text-muted">Built with Next.js + Gemini</span>
      </p>
    </footer>
  );
}
