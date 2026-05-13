"use client";

import { useState, useEffect, useRef } from "react";
import { copy } from "@/content/copy";

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % copy.hero.roles.length);
        setFading(false);
      }, 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handlePrimaryCta = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSecondaryCta = () => {
    window.dispatchEvent(new CustomEvent("open-chat"));
  };

  return (
    <div className="flex flex-col items-start gap-6">
      {/* Avatar */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-2xl font-bold">
        DT
      </div>

      {/* Greeting */}
      <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight leading-tight">
        {copy.hero.greeting}
      </h1>

      {/* Cycling role with crossfade */}
      <div ref={containerRef} className="h-8 overflow-hidden">
        <p
          className="text-lg sm:text-xl text-muted transition-all duration-300 ease-out"
          style={{
            opacity: fading ? 0 : 1,
            transform: fading ? "translateY(4px)" : "translateY(0)",
          }}
        >
          {copy.hero.roles[roleIndex]}
        </p>
      </div>

      {/* CTAs */}
      <div className="flex flex-wrap gap-3 mt-2">
        <button
          onClick={handlePrimaryCta}
          className="inline-flex items-center rounded-lg bg-accent text-white px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          {copy.hero.primaryCta}
        </button>
        <button
          onClick={handleSecondaryCta}
          className="inline-flex items-center rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:border-accent/50 transition-colors"
        >
          {copy.hero.secondaryCta}
        </button>
      </div>
    </div>
  );
}
