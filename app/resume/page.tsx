"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ZoomIn, ZoomOut, Download } from "lucide-react";
import { ThemeToggle } from "@/components/ui/curtain-theme-toggle";
import { ResumeDropdown } from "@/components/ui/resume-dropdown";

export default function ResumePage() {
  const [zoom, setZoom] = useState(100);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 250));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50));

  return (
    <div className="min-h-screen flex flex-col text-foreground font-sans selection:bg-[#006d77]/20">
      
      {/* Top Bar */}
      <header className="w-full px-6 md:px-10 py-6 flex items-center justify-between border-b border-border shrink-0 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={16} /> Rahul
          </Link>
          <span className="text-muted-foreground/50">/</span>
          <span className="text-sm font-medium text-foreground">PDF Resume</span>
        </div>
        <div className="flex items-center gap-3">
          <ResumeDropdown />
          <ThemeToggle variant="icon" defaultTheme="dark" />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-stretch gap-4">
        
        {/* Custom Toolbar (Vertical on Desktop, Horizontal on Mobile) */}
        <div className="flex flex-row md:flex-col items-center justify-center gap-3 bg-white dark:bg-card border border-border rounded-xl p-3 shadow-sm h-fit shrink-0 w-full md:w-auto self-start sticky top-[100px]">
          
          <button 
            onClick={handleZoomIn}
            disabled={zoom >= 250}
            className="p-2.5 text-foreground bg-muted/30 hover:bg-muted/80 rounded-xl transition-colors disabled:opacity-50"
            title="Zoom In"
          >
            <ZoomIn size={20} />
          </button>

          <span className="text-[11px] font-bold text-muted-foreground w-10 text-center select-none">
            {zoom}%
          </span>

          <button 
            onClick={handleZoomOut}
            disabled={zoom <= 50}
            className="p-2.5 text-foreground bg-muted/30 hover:bg-muted/80 rounded-xl transition-colors disabled:opacity-50"
            title="Zoom Out"
          >
            <ZoomOut size={20} />
          </button>

          {/* Divider */}
          <div className="hidden md:block w-full h-[1px] bg-border my-1" />
          <div className="md:hidden w-[1px] h-8 bg-border mx-1" />

          <a 
            href="/resume.pdf" 
            download="Rahul-Gehlot-Resume.pdf"
            className="p-2.5 bg-[#006d77] text-white rounded-xl hover:bg-[#005860] transition-colors shadow-sm flex items-center justify-center"
            title="Download PDF"
          >
            <Download size={20} />
          </a>
        </div>

        {/* Iframe Container */}
        <div className="w-full h-[calc(100vh-140px)] rounded-xl overflow-hidden border border-border shadow-xl bg-white dark:bg-zinc-900 flex-1 relative bg-muted/20">
          <iframe 
            key={zoom}
            src={`/resume.pdf#toolbar=0&navpanes=0&scrollbar=0&zoom=${zoom}`}
            className="w-full h-full border-0 absolute inset-0"
            title="Resume PDF Viewer"
          />
        </div>

      </main>
    </div>
  );
}
