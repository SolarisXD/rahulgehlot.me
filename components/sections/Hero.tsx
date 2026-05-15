"use client";

import { BadgeCheck, Star, GitFork } from "lucide-react";
import Link from "next/link";
import { copy } from "@/content/copy";
import { GooeyText } from "@/components/ui/gooey-text-morphing";

export default function Hero() {

  const handlePrimaryCta = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 w-full pt-10">

      {/* Background glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      {/* Left: Avatar */}
      <div className="relative shrink-0 group">
        {/* Outer glowing ring */}
        <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-400 to-purple-500 p-1 shadow-[0_0_40px_rgba(34,211,238,0.2)] transition-transform duration-500 group-hover:scale-[1.02]">
          {/* Inner image container */}
          <div className="w-full h-full rounded-full bg-orange-400 border-4 border-background overflow-hidden relative">
            {/* If you add an actual image, use Next/Image here. Fallback to initials for now */}
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-300 to-orange-500 text-white font-bold text-5xl shadow-inner">
              RG
            </div>
          </div>
        </div>

        {/* Verified Badge */}
        <div className="absolute bottom-2 right-2 bg-blue-500 rounded-full p-1.5 border-[4px] border-background flex items-center justify-center shadow-lg">
          <BadgeCheck size={24} className="text-white fill-white stroke-blue-500" />
        </div>
      </div>

      {/* Right: Content */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left z-10 pt-2 md:pt-4 w-full">

        {/* Greeting */}
        <p className="text-xl text-white/80 font-medium mb-3">
          Hi, I'm <Link href="/about" className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-purple-400 font-bold hover:opacity-80 transition-opacity">@Rahul</Link>,
        </p>

        {/* Main Headline */}
        <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.15] mb-6 flex flex-col w-full">
          <div className="relative w-full h-[3.5rem] sm:h-[4.5rem] md:h-[5rem] mb-2 flex">
            <GooeyText
              texts={copy.hero.roles}
              morphTime={1.5}
              cooldownTime={2.5}
              className="w-full h-full"
              textClassName="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-purple-400 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 whitespace-nowrap pb-2"
            />
          </div>
          <span className="text-white">
            who ships web apps
          </span>
          <span className="text-white mt-2 inline-block">
            with Next.js <span className="text-white/60 font-light mx-1">+</span> AI <span className="text-white/60 font-light mx-1">+</span> Polish
          </span>
        </h1>

        {/* Badges row */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
          <span className="px-4 py-1.5 rounded-full border border-white/20 bg-black/20 backdrop-blur-sm text-sm font-medium text-white shadow-sm">
            Full-Stack
          </span>
          <span className="px-4 py-1.5 rounded-full border border-white/20 bg-black/20 backdrop-blur-sm text-sm font-medium text-white shadow-sm">
            AI Integrator
          </span>

          {/* Action pill / Github pill */}
          <button
            onClick={handlePrimaryCta}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-300/50 bg-cyan-300/20 hover:bg-cyan-300/30 transition-all text-sm font-medium text-white group"
          >
            <GitFork size={16} className="text-cyan-300" />
            {copy.hero.primaryCta}
            <span className="flex items-center gap-1 text-yellow-400 ml-1 opacity-90 group-hover:opacity-100 transition-opacity">
              <Star size={14} className="fill-yellow-400 stroke-yellow-400" /> 10
            </span>
          </button>

          {/* Secondary CTA */}
          <button
            onClick={() => window.dispatchEvent(new Event("open-chat"))}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-black/20 hover:bg-white/10 transition-all text-sm font-medium text-white group"
          >
            {copy.hero.secondaryCta}
          </button>
        </div>
      </div>
    </div>
  );
}
