import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Briefcase, ChevronRight, CheckCircle2, ChevronDown, Mail, Star, ExternalLink, GitBranch, Globe } from "lucide-react";
import { ThemeToggle } from "@/components/ui/curtain-theme-toggle";
import { ResumeDropdown } from "@/components/ui/resume-dropdown";
import { certifications } from "@/content/education";
import { skillsContent } from "@/content/skills";

export const metadata: Metadata = {
  title: "About Rahul Gehlot — Full-stack & AI Developer",
  openGraph: {
    title: "About Rahul Gehlot — Full-stack & AI Developer",
    description:
      "B.Tech CSE at VIT Bhopal. Building full-stack web apps & ML systems — Hisaab Pro, Skillence, and more.",
    images: [{ url: "/og?subtitle=About+Rahul+Gehlot", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og?subtitle=About+Rahul+Gehlot"],
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen text-foreground font-sans selection:bg-[#006d77]/20">

      {/* Top Bar */}
      <header className="w-full px-6 md:px-10 py-6 mb-10 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={16} /> Rahul
          </Link>
          <span className="text-muted-foreground/50">/</span>
          <span className="text-sm font-medium text-foreground">About</span>
        </div>
        <div className="flex items-center gap-3">
          <ResumeDropdown />
          <ThemeToggle variant="icon" defaultTheme="dark" />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 pb-24">

        {/* Header / Profile */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">
          <div className="w-24 h-24 shrink-0 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-400 to-purple-500 p-1 shadow-md">
            <div className="w-full h-full rounded-full border-2 border-background overflow-hidden relative">
              <Image
                src="/profile_pic.png"
                alt="Rahul Gehlot"
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
          </div>
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Rahul Gehlot</h1>
            <p className="text-sm font-medium text-muted-foreground mb-3 flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1">
              Builder <span className="text-[#006d77]">•</span> Applied AI Operator
              <span className="inline-flex items-center gap-1 bg-[#006d77]/10 text-[#006d77] px-2 py-0.5 rounded-full text-xs font-bold border border-[#006d77]/20">
                <Star size={10} className="fill-current" /> B.Tech CSE
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
            &ldquo;B.Tech CSE at VIT Bhopal. I build full-stack web apps and ML systems&mdash;sometimes separately, increasingly together.&rdquo;
          </p>
        </div>

        {/* Intro Text */}
        <div className="prose prose-sm dark:prose-invert max-w-none mb-12 text-muted-foreground leading-relaxed">
          <p>
            B.Tech CSE student at VIT Bhopal (AI-ML specialisation, graduating July 2026, CGPA 8.67). I build full-stack web apps and machine learning systems &mdash; sometimes separately, increasingly together.
          </p>
          <p>
            Hisaab Pro is an offline-first double-entry accounting system I built and shipped to real clients. Skillence is a career platform with a custom PyTorch model and a pure NumPy inference layer I wrote to cut backend deployment crashes to near-zero. I write a lot of tests &mdash; Hisaab Pro has 350+ Jest tests across 18 files, not because someone told me to, but because client financial data has no room for silent bugs.
          </p>
        </div>

        {/* Experience */}
        <section className="mb-12">
          <h2 className="flex items-center gap-2 text-xl font-bold text-[#006d77] dark:text-[#4fd1c5] mb-4">
            <Briefcase size={20} /> Experience
          </h2>
          <div className="space-y-3">
            {[
              { role: "Freelance Developer", company: "Hisaab Pro clients \u2014 Remote", date: "2026" },
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

        {/* Education */}
        <section className="mb-12">
          <h2 className="flex items-center gap-2 text-xl font-bold text-[#006d77] dark:text-[#4fd1c5] mb-4">
            <MapPin size={20} /> Education
          </h2>
          <div className="p-4 bg-white dark:bg-card border border-border rounded-xl shadow-sm">
            <h3 className="font-semibold text-foreground">B.Tech Computer Science &mdash; AI-ML Specialisation</h3>
            <p className="text-sm text-muted-foreground">VIT Bhopal University</p>
            <div className="mt-3 flex items-center gap-3">
              <span className="text-xs font-medium bg-[#006d77]/10 text-[#006d77] px-2.5 py-1 rounded-md border border-[#006d77]/20">CGPA: 8.67</span>
              <span className="text-xs font-medium text-muted-foreground">Graduating July 2026</span>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="mb-12">
          <h2 className="flex items-center gap-2 text-xl font-bold text-[#006d77] dark:text-[#4fd1c5] mb-4">
            <ExternalLink size={20} /> Projects
          </h2>
          <div className="space-y-3">
            {[
              { name: "Hisaab Pro", desc: "Offline-first double-entry accounting shipped to real clients", href: "https://github.com/SolarisXD/Hisaab-Pro" },
              { name: "Skillence", desc: "Career platform with ML recommendations & campus placement engine", href: "https://github.com/SolarisXD/Skillence" },
              { name: "SwapHub", desc: "Campus marketplace to buy, sell, donate, and rent items", href: "https://github.com/SolarisXD/SwapHub" },
              { name: "rahulgehlot.me", desc: "Personal portfolio website using NextJs, RAG, Langfuse", href: "https://github.com/SolarisXD/rahulgehlot.me" },
            ].map((proj, i) => (
              <a href={proj.href} key={i} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white dark:bg-card border border-border rounded-xl shadow-sm hover:border-[#006d77]/50 hover:shadow-md transition-all group">
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-[#006d77] transition-colors">{proj.name}</h3>
                  <p className="text-sm text-muted-foreground">{proj.desc}</p>
                </div>
                <ChevronRight size={18} className="text-muted-foreground group-hover:text-[#006d77] transform group-hover:translate-x-1 transition-all" />
              </a>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="mb-12">
          <h2 className="flex items-center gap-2 text-xl font-bold text-[#006d77] dark:text-[#4fd1c5] mb-4">
            <CheckCircle2 size={20} /> Certifications
          </h2>
          <div className="space-y-3">
            {certifications.map((cert) => {
              const Card = cert.link ? "a" : "div";
              return (
                <Card
                  key={cert.name}
                  href={cert.link}
                  target={cert.link ? "_blank" : undefined}
                  rel={cert.link ? "noopener noreferrer" : undefined}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white dark:bg-card border border-border rounded-xl shadow-sm hover:border-[#006d77]/40 transition-colors"
                >
                  <div>
                    <h3 className="font-semibold text-foreground">{cert.name}</h3>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  </div>
                  <div className="mt-2 sm:mt-0 text-xs font-medium text-muted-foreground">
                    {cert.year}
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-12">
          <h2 className="flex items-center gap-2 text-xl font-bold text-[#006d77] dark:text-[#4fd1c5] mb-4">
            <CheckCircle2 size={20} /> Skills
          </h2>

          <div className="p-4 bg-white dark:bg-card border border-border rounded-xl shadow-sm space-y-4">
            {skillsContent.techStack.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{group.title}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span key={item.label} className="text-xs font-medium px-2.5 py-1 bg-[#006d77]/10 text-[#006d77] dark:text-[#4fd1c5] rounded-full border border-[#006d77]/20">
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-12">
          <h2 className="flex items-center gap-2 text-xl font-bold text-[#006d77] dark:text-[#4fd1c5] mb-4">
            <CheckCircle2 size={20} /> Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {[
              { q: "Are you available for freelance or full-time work?", a: "Yes. Open to internships, freelance projects, and full-time roles after graduating July 2026. I build full-stack web apps and ML systems." },
              { q: "What's your preferred stack?", a: "Backend: Node.js, Express, FastAPI, SQLite, MongoDB. Frontend: React, Next.js, Tailwind CSS. ML: PyTorch (training), custom NumPy inference (production), Gemini API for AI features." },
              { q: "Do you write tests?", a: "Absolutely. Hisaab Pro has 350+ Jest tests across 18 files. I write tests because silently wrong business logic is worse than visible crashes — especially for financial data." },
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
            <a href="https://github.com/SolarisXD" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-card border border-border rounded-full text-sm font-medium hover:border-[#006d77] hover:text-[#006d77] shadow-sm transition-all">
              <GitBranch size={16} /> GitHub
            </a>
            <a href="https://linkedin.com/in/rahulgehlot" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-card border border-border rounded-full text-sm font-medium hover:border-[#006d77] hover:text-[#006d77] shadow-sm transition-all">
              <Briefcase size={16} /> LinkedIn
            </a>
            <a href="https://rahulgehlot.me" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-card border border-border rounded-full text-sm font-medium hover:border-[#006d77] hover:text-[#006d77] shadow-sm transition-all">
              <Globe size={16} /> Portfolio
            </a>
            <a href="mailto:rahulgehlot6044@gmail.com" className="flex items-center gap-2 px-5 py-2.5 bg-[#006d77] text-white border border-[#006d77] rounded-full text-sm font-medium hover:bg-[#005860] shadow-sm transition-all">
              <Mail size={16} /> Email Me
            </a>
          </div>
        </section>

      </main>
    </div>
  );
}
