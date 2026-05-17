"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/curtain-theme-toggle";
import { ResumeDropdown } from "@/components/ui/resume-dropdown";
import { useActiveSection, useHydrated } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/* ── Section ID → nav item mapping ── */
const SECTION_MAP: Record<string, string> = {
  hero: "experience",
  about: "experience",
  now: "experience",
  experience: "experience",
  education: "education",
  process: "projects",
  projects: "projects",
  stack: "skills",
  skills: "skills",
  thinking: "thinking",
  contact: "contact",
};

const NAV_ITEMS = [
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },

  { id: "skills", label: "Skills & Stack" },
  { id: "thinking", label: "Sharing" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const activeSection = useActiveSection(SECTION_MAP);
  const hydrated = useHydrated();
  const [showNav, setShowNav] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* ── Show sidebar only when scrolled past hero ── */
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowNav(!entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const handleNav = useCallback((id: string) => {
    setMobileOpen(false);
    if (id === "contact") {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  /* ── Don't render until hydrated ── */
  if (!hydrated) return null;

  return (
    <div className="relative">
      {/* ── Desktop: vertical timeline sidebar ── */}
      <aside
        className={cn(
          "hidden lg:flex fixed left-0 inset-y-0 z-50 w-64 flex-col justify-center pl-10",
          "transition-opacity duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          showNav ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >

        {/* Timeline Nav */}
        <nav className="relative flex flex-col py-4">
          {/* Continuous vertical line track */}
          <div className="absolute left-[5px] top-[14px] bottom-[14px] w-[2px] bg-border z-0" />

          {/* Nav Items */}
          <div className="flex flex-col gap-6">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className="relative z-10 flex items-center gap-4 group text-left"
                >
                  {/* Node */}
                  <div
                    className={cn(
                      "w-3 h-3 rounded-full transition-all duration-300 ring-[6px] ring-background shrink-0",
                      isActive
                        ? "bg-[#006d77] border-0"
                        : "bg-background border-2 border-border group-hover:border-foreground/50"
                    )}
                  />
                  {/* Label */}
                  <span
                    className={cn(
                      "text-[15px] transition-colors",
                      isActive
                        ? "text-[#006d77] font-semibold"
                        : "text-foreground font-medium hover:text-foreground/80"
                    )}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      </aside>

      {/* ── Top right actions ── */}
      <div className="hidden lg:flex fixed top-6 right-6 z-50 items-center gap-3">
        <ResumeDropdown />
        <ThemeToggle variant="icon" defaultTheme="dark" />
      </div>

      {/* ── Mobile header ── */}
      <header
        className={cn(
          "lg:hidden fixed top-0 left-0 right-0 z-50",
          "flex items-center justify-between h-16 px-4",
          "bg-background/90 backdrop-blur-sm border-b border-border"
        )}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-semibold text-sm tracking-tight hover:text-accent transition-colors"
        >
          Rahul
        </button>
        <div className="flex items-center gap-2">
          <ResumeDropdown />
          <ThemeToggle variant="icon" defaultTheme="dark" />
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="p-2 text-muted hover:text-foreground transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-background flex flex-col pt-16">
          <nav className="flex flex-col items-center gap-6 px-4 mt-12">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={cn(
                  "text-sm font-medium tracking-wide transition-colors",
                  activeSection === item.id
                    ? "text-[#006d77]"
                    : "text-muted hover:text-foreground"
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
