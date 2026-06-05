"use client";

import { copy } from "@/content/copy";
import { Briefcase, FolderGit2, Mail, Bot } from "lucide-react";

export default function About() {
  return (
    <div className="flex flex-col items-center text-center w-full max-w-3xl mx-auto space-y-12">

      {/* Block 1 (Header/Intro) */}
      <div className="space-y-2">
        <p className="text-2xl md:text-[28px] font-medium text-muted-foreground/80 leading-snug tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-semibold">
            B.Tech CSE student at Vellore Institute of Technology, Bhopal
          </span>{" "}
        </p>
        <p className="text-2xl md:text-[28px] font-medium text-muted-foreground/80 leading-snug tracking-tight">
          I build full-stack web apps and machine learning systems.
        </p>
      </div>

      {/* Block 2 (The Details/Context) */}
      <div className="max-w-2xl">
        <p className="text-sm md:text-base font-medium text-muted-foreground/50 leading-relaxed">
          Sometimes separately, increasingly together. Hisaab Pro is an offline accounting system I built and shipped to real clients. Skillence is a career platform with a custom PyTorch model and a pure NumPy inference layer I wrote to cut backend deployment crashes to near-zero.
        </p>
      </div>

      {/* Block 3 (The Impact/Tests) */}
      <div className="space-y-3">
        <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
          I write a lot of tests.
        </h3>
        <p className="text-xl md:text-2xl font-medium text-muted-foreground/80">
          Because silent bugs in business logic are worse than visible crashes.
        </p>
        <p className="text-xl md:text-2xl font-bold pt-1 max-w-2xl mx-auto">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 leading-snug">
            I build automated test suites for critical paths—especially when dealing with client financial data or medical triage rules. That instinct follows me into everything.
          </span>
        </p>
      </div>

      {/* Block 4 (Action Buttons) */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        <a href="#experience" className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-background/50 hover:bg-white/5 transition-colors text-sm font-medium text-muted-foreground hover:text-foreground">
          <Briefcase size={16} /> My path
        </a>
        <a href="#projects" className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-background/50 hover:bg-white/5 transition-colors text-sm font-medium text-muted-foreground hover:text-foreground">
          <FolderGit2 size={16} /> What I build
        </a>
        <a href="#contact" className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-background/50 hover:bg-white/5 transition-colors text-sm font-medium text-muted-foreground hover:text-foreground">
          <Mail size={16} /> Let's talk
        </a>
        <button
          onClick={() => window.dispatchEvent(new Event("open-chat"))}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 hover:opacity-90 transition-opacity text-sm font-bold text-white shadow-[0_0_20px_rgba(34,211,238,0.2)]"
        >
          <Bot size={16} /> Ask me
        </button>
      </div>

    </div>
  );
}
