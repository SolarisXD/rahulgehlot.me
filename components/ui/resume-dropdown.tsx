"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FileText, MonitorSmartphone, ChevronDown } from "lucide-react";

export function ResumeDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-border bg-white dark:bg-card hover:bg-muted/50 transition-colors"
      >
        Resume <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-card border border-border rounded-xl shadow-lg p-1.5 z-50 animate-in fade-in slide-in-from-top-2">
          <Link
            href="/resume"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-muted/50 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <div className="p-1.5 bg-muted rounded-md shrink-0">
              <FileText size={16} className="text-muted-foreground" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-medium">View PDF</span>
              <span className="text-[11px] text-muted-foreground leading-tight">Standard printable format</span>
            </div>
          </Link>
          <Link
            href="/about"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-[#006d77]/5 transition-colors mt-1 group"
            onClick={() => setIsOpen(false)}
          >
            <div className="p-1.5 bg-[#006d77]/10 rounded-md shrink-0 group-hover:bg-[#006d77]/20 transition-colors">
              <MonitorSmartphone size={16} className="text-[#006d77]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-medium">Digital Resume</span>
              <span className="text-[11px] text-[#006d77]/80 leading-tight">Interactive @Rahul format</span>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
