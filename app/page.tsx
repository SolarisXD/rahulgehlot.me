import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Now from "@/components/sections/Now";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Process from "@/components/sections/Process";
import Projects from "@/components/sections/Projects";
import StackDecisions from "@/components/sections/StackDecisions";
import Skills from "@/components/sections/Skills";
import MicroOpinions from "@/components/sections/MicroOpinions";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import FloatingChat from "@/components/chat/FloatingChat";
import { BGPattern } from "@/components/bg-pattern";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Full-width Hero Container */}
      <div className="relative w-full bg-[radial-gradient(ellipse_at_50%_40%,_rgba(251,146,60,0.04)_0%,_rgba(34,211,238,0.03)_35%,_#ebeded_70%)] dark:bg-[radial-gradient(ellipse_at_50%_40%,_rgba(251,146,60,0.06)_0%,_rgba(34,211,238,0.04)_35%,_#1b1b1e_70%)] pt-16 lg:pt-0 overflow-hidden">
        <BGPattern
          variant="dots"
          mask="none"
          size={24}
          dotSize={1.2}
          fill="rgba(255,255,255,0.15)"
          className="opacity-100 absolute inset-0 z-0"
        />
        <div className="mx-auto max-w-[980px] px-4 sm:px-6 relative z-10">
          <section id="hero" className="py-20 sm:py-28">
            <Hero />
          </section>
        </div>
      </div>

      <main className="mx-auto max-w-[980px] px-4 sm:px-6">
        <section id="about" className="py-20 sm:py-28">
          <About />
        </section>
        <section id="now" className="py-20 sm:py-28">
          <Now />
        </section>
        <section id="experience" className="py-20 sm:py-28">
          <Experience />
        </section>
        <section id="education" className="py-20 sm:py-28">
          <Education />
        </section>
        <section id="process" className="py-20 sm:py-28">
          <Process />
        </section>
        <section id="projects" className="py-20 sm:py-28">
          <Projects />
        </section>
        <section id="stack" className="py-20 sm:py-28">
          <StackDecisions />
        </section>
        <section id="skills" className="py-20 sm:py-28">
          <Skills />
        </section>
        <section id="thinking" className="py-20 sm:py-28">
          <MicroOpinions />
        </section>
        <section id="blog" className="py-20 sm:py-28">
          <Blog />
        </section>
        <section id="contact" className="py-20 sm:py-28">
          <Contact />
        </section>
      </main>
      <Footer />
      <FloatingChat />
    </>
  );
}
