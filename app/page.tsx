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
import Contact from "@/components/sections/Contact";
import FloatingChat from "@/components/chat/FloatingChat";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-[960px] px-4 sm:px-6">
        <section id="hero" className="py-20 sm:py-28">
          <Hero />
        </section>
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
        <section id="contact" className="py-20 sm:py-28">
          <Contact />
        </section>
      </main>
      <Footer />
      <FloatingChat />
    </>
  );
}
