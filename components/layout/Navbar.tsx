"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { DarkModeToggle } from "@/components/ui/DarkModeToggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Now", href: "#now" },
  { label: "Work", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Thinking", href: "#thinking" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div
        className={cn(
          "mx-auto max-w-[860px] px-4 sm:px-6",
          "flex items-center justify-between h-16 transition-all duration-300",
          scrolled
            ? "backdrop-blur-md bg-background/80 border-b border-border"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={cn(
            "font-semibold text-sm tracking-tight transition-colors",
            scrolled ? "text-foreground hover:text-accent" : "text-foreground/70 hover:text-foreground"
          )}
        >
          DTxSD
        </button>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className={cn(
                "text-sm transition-colors",
                scrolled ? "text-muted hover:text-foreground" : "text-foreground/50 hover:text-foreground/80"
              )}
            >
              {link.label}
            </button>
          ))}
          <DarkModeToggle />
        </nav>

        {/* Mobile hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <DarkModeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-muted hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="sm:hidden bg-background/95 backdrop-blur-md border-b border-border">
          <nav className="flex flex-col px-4 pb-4 pt-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="text-left py-3 text-sm text-muted hover:text-foreground transition-colors border-b border-border/50 last:border-0"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
