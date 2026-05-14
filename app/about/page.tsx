import Link from "next/link";
import { ArrowLeft, MapPin, Briefcase, ChevronRight, CheckCircle2, ChevronDown, Mail, Star, ExternalLink, GitBranch, Globe } from "lucide-react";
import { ThemeToggle } from "@/components/ui/curtain-theme-toggle";
import { ResumeDropdown } from "@/components/ui/resume-dropdown";

export default function AboutPage() {
  return (
    <div className="min-h-screen text-foreground font-sans selection:bg-[#006d77]/20">
      
      {/* Top Bar */}
      <header className="w-full px-6 md:px-10 py-6 mb-10 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={16} /> DTxSD
          </Link>
          <span className="text-muted-foreground/50">/</span>
          <span className="text-sm font-medium text-foreground">About</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 text-xs font-semibold px-2 py-1.5 rounded-md border border-border bg-white dark:bg-card hover:bg-muted/50 transition-colors hidden sm:flex">
            <span role="img" aria-label="UK flag">🇬🇧</span> EN
          </button>
          <ResumeDropdown />
          <ThemeToggle variant="icon" defaultTheme="dark" />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 pb-24">
        
        {/* Header / Profile */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">
          <div className="w-24 h-24 shrink-0 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-400 to-purple-500 p-1 shadow-md">
            <div className="w-full h-full rounded-full bg-orange-400 border-2 border-background flex items-center justify-center text-white font-bold text-3xl">
              DT
            </div>
          </div>
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Rahul Gehlot</h1>
            <p className="text-sm font-medium text-muted-foreground mb-3 flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1">
              Builder <span className="text-[#006d77]">•</span> Applied AI Operator
              <span className="inline-flex items-center gap-1 bg-[#006d77]/10 text-[#006d77] px-2 py-0.5 rounded-full text-xs font-bold border border-[#006d77]/20">
                <Star size={10} className="fill-current" /> Top Rated
              </span>
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><MapPin size={14} /> India</span>
              <span className="flex items-center gap-1.5"><Briefcase size={14} /> Open to work</span>
            </div>
          </div>
        </div>

        {/* Quote Section */}
        <div className="bg-[#006d77]/5 border-l-4 border-[#006d77] p-5 rounded-r-lg mb-10">
          <p className="text-lg italic font-medium text-[#006d77] dark:text-[#4fd1c5]">
            "Companies use AI to filter candidates, I just gave candidates AI to bypass the filters."
          </p>
        </div>

        {/* Intro Text */}
        <div className="prose prose-sm dark:prose-invert max-w-none mb-12 text-muted-foreground leading-relaxed">
          <p>
            B.Tech CSE student at VIT (graduating 2026, CGPA 8.60). I build production web apps and AI-powered tools. 
            For the past year I've been taking on freelance projects — I find local businesses without websites on Google Maps, 
            build a working demo without being asked, and pitch via WhatsApp. Most say yes.
          </p>
          <p>
            Right now I'm building Hisaab Pro — accounting software for small businesses that can't afford Tally.
          </p>
        </div>

        {/* Experience */}
        <section className="mb-12">
          <h2 className="flex items-center gap-2 text-xl font-bold text-[#006d77] dark:text-[#4fd1c5] mb-4">
            <Briefcase size={20} /> Experience
          </h2>
          <div className="space-y-3">
            {[
              { role: "Freelance Full Stack Developer", company: "Self-Employed", date: "2023 - Present" },
              { role: "AI Integrations Engineer Intern", company: "TechCorp", date: "Summer 2023" },
            ].map((exp, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white dark:bg-card border border-border rounded-xl shadow-sm hover:border-[#006d77]/30 transition-colors">
                <div>
                  <h3 className="font-semibold text-foreground">{exp.role}</h3>
                  <p className="text-sm text-muted-foreground">{exp.company}</p>
                </div>
                <div className="text-xs font-medium text-muted-foreground mt-2 sm:mt-0 bg-muted/50 px-3 py-1 rounded-full w-fit">
                  {exp.date}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mb-12">
          <h2 className="flex items-center gap-2 text-xl font-bold text-[#006d77] dark:text-[#4fd1c5] mb-4">
            <ExternalLink size={20} /> Projects
          </h2>
          <div className="space-y-3">
            {[
              { name: "Hisaab Pro", desc: "SaaS Accounting Software for small Indian businesses" },
              { name: "AI Resume Bypass", desc: "CLI tool that optimizes resumes against ATS filters" },
              { name: "Skillence", desc: "LMS platform for college clubs to host internal courses" },
            ].map((proj, i) => (
              <a href="#" key={i} className="flex items-center justify-between p-4 bg-white dark:bg-card border border-border rounded-xl shadow-sm hover:border-[#006d77]/50 hover:shadow-md transition-all group">
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-[#006d77] transition-colors">{proj.name}</h3>
                  <p className="text-sm text-muted-foreground">{proj.desc}</p>
                </div>
                <ChevronRight size={18} className="text-muted-foreground group-hover:text-[#006d77] transform group-hover:translate-x-1 transition-all" />
              </a>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-12">
          <h2 className="flex items-center gap-2 text-xl font-bold text-[#006d77] dark:text-[#4fd1c5] mb-4">
            <MapPin size={20} /> Education
          </h2>
          <div className="p-4 bg-white dark:bg-card border border-border rounded-xl shadow-sm">
            <h3 className="font-semibold text-foreground">B.Tech Computer Science and Engineering</h3>
            <p className="text-sm text-muted-foreground">Vellore Institute of Technology (VIT)</p>
            <div className="mt-3 flex items-center gap-3">
              <span className="text-xs font-medium bg-[#006d77]/10 text-[#006d77] px-2.5 py-1 rounded-md border border-[#006d77]/20">CGPA: 8.60</span>
              <span className="text-xs font-medium text-muted-foreground">Expected 2026</span>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-12">
          <h2 className="flex items-center gap-2 text-xl font-bold text-[#006d77] dark:text-[#4fd1c5] mb-4">
            <CheckCircle2 size={20} /> Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {[
              { q: "Are you available for freelance work?", a: "Yes, I am actively taking on freelance web development and AI integration projects." },
              { q: "What stack do you prefer?", a: "I build primarily with Next.js, Tailwind CSS, TypeScript, and Postgres. I integrate AI using OpenAI/Anthropic SDKs." },
            ].map((faq, i) => (
              <details key={i} className="group p-4 bg-white dark:bg-card border border-border rounded-xl shadow-sm [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between font-semibold cursor-pointer text-foreground">
                  {faq.q}
                  <ChevronDown size={18} className="text-muted-foreground group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Contact Links */}
        <section>
          <h2 className="flex items-center gap-2 text-xl font-bold text-[#006d77] dark:text-[#4fd1c5] mb-4">
            <Mail size={20} /> Contact & Social
          </h2>
          <div className="flex flex-wrap gap-3">
            <a href="#" className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-card border border-border rounded-full text-sm font-medium hover:border-[#006d77] hover:text-[#006d77] shadow-sm transition-all">
              <GitBranch size={16} /> GitHub
            </a>
            <a href="#" className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-card border border-border rounded-full text-sm font-medium hover:border-[#006d77] hover:text-[#006d77] shadow-sm transition-all">
              <Briefcase size={16} /> LinkedIn
            </a>
            <a href="#" className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-card border border-border rounded-full text-sm font-medium hover:border-[#006d77] hover:text-[#006d77] shadow-sm transition-all">
              <Globe size={16} /> Twitter
            </a>
            <a href="#" className="flex items-center gap-2 px-5 py-2.5 bg-[#006d77] text-white border border-[#006d77] rounded-full text-sm font-medium hover:bg-[#005860] shadow-sm transition-all">
              <Mail size={16} /> Email Me
            </a>
          </div>
        </section>

      </main>
    </div>
  );
}
