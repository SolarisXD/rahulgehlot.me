import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Briefcase, ChevronRight, CheckCircle2, ChevronDown, Mail, Star, ExternalLink, GitBranch, Globe } from "lucide-react";
import { ThemeToggle } from "@/components/ui/curtain-theme-toggle";
import { ResumeDropdown } from "@/components/ui/resume-dropdown";
import { JsonLd } from "@/components/json-ld";
import { certifications } from "@/content/education";
import { skillsContent } from "@/content/skills";

export const metadata: Metadata = {
  title: "About Rahul Gehlot - Full-stack & AI Developer",
  alternates: {
    canonical: "https://rahulgehlot.me/about",
  },
  openGraph: {
    title: "About Rahul Gehlot - Full-stack & AI Developer",
    description:
      "B.Tech CSE at VIT Bhopal. Building full-stack web apps & ML systems - Hisaab Pro, Skillence, and more.",
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
            Hisaab Pro is an offline-first double-entry accounting system I built and shipped to real clients. Skillence is a career platform with a custom PyTorch model and a pure NumPy inference layer I wrote to cut backend deployment crashes to near-zero. I write a lot of tests &mdash; Hisaab Pro has 475 Jest tests, not because someone told me to, but because client financial data has no room for silent bugs.
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
              { q: "Do you write tests?", a: "Absolutely. Hisaab Pro has 475 Jest tests. I write tests because silently wrong business logic is worse than visible crashes - especially for financial data." },
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a href="https://linkedin.com/in/rahulgehlot" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-card border border-border rounded-full text-sm font-medium hover:border-[#006d77] hover:text-[#006d77] shadow-sm transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <a href="https://medium.com/@rahulgehlotxsd" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-card border border-border rounded-full text-sm font-medium hover:border-[#006d77] hover:text-[#006d77] shadow-sm transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.21 0A4.201 4.201 0 0 0 0 4.21v15.58A4.201 4.201 0 0 0 4.21 24h15.58A4.201 4.201 0 0 0 24 19.79v-1.093c-.137.013-.278.02-.422.02-2.577 0-4.027-2.146-4.09-4.832a7.592 7.592 0 0 1 .022-.708c.093-1.186.475-2.241 1.105-3.022a3.885 3.885 0 0 1 1.395-1.1c.468-.237 1.127-.367 1.664-.367h.023c.101 0 .202.004.303.01V4.211A4.201 4.201 0 0 0 19.79 0Zm.198 5.583h4.165l3.588 8.435 3.59-8.435h3.864v.146l-.019.004c-.705.16-1.063.397-1.063 1.254h-.003l.003 10.274c.06.676.424.885 1.063 1.03l.02.004v.145h-4.923v-.145l.019-.005c.639-.144.994-.353 1.054-1.03V7.267l-4.745 11.15h-.261L6.15 7.569v9.445c0 .857.358 1.094 1.063 1.253l.02.004v.147H4.405v-.147l.019-.004c.705-.16 1.065-.397 1.065-1.253V6.987c0-.857-.358-1.094-1.064-1.254l-.018-.004zm19.25 3.668c-1.086.023-1.733 1.323-1.813 3.124H24V9.298a1.378 1.378 0 0 0-.342-.047Zm-1.862 3.632c-.1 1.756.86 3.239 2.204 3.634v-3.634z" />
              </svg>
              Medium
            </a>
            <a href="https://dev.to/rahulgehlot" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-card border border-border rounded-full text-sm font-medium hover:border-[#006d77] hover:text-[#006d77] shadow-sm transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.3zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.66-2.52.74-.04c.4-.02.73 0 .73.04 0 .14-1.67 6.38-1.8 6.68z" />
              </svg>
              Dev.to
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

      <JsonLd
        id="schema-faq"
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Are you available for freelance or full-time work?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Open to internships, freelance projects, and full-time roles after graduating July 2026. I build full-stack web apps and ML systems.",
              },
            },
            {
              "@type": "Question",
              name: "What's your preferred stack?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Backend: Node.js, Express, FastAPI, SQLite, MongoDB. Frontend: React, Next.js, Tailwind CSS. ML: PyTorch (training), custom NumPy inference (production), Gemini API for AI features.",
              },
            },
            {
              "@type": "Question",
              name: "Do you write tests?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Absolutely. Hisaab Pro has 475 Jest tests. I write tests because silently wrong business logic is worse than visible crashes - especially for financial data.",
              },
            },
          ],
        }}
      />
    </div>
  );
}
