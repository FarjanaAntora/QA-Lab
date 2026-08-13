import Contact from "@/components/sections/Contact";
import CV from "@/components/sections/CV";
import Engineering from "@/components/sections/Engineering";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import HowIThink from "@/components/sections/HowIThink";
import Me from "@/components/sections/Me";
import Projects from "@/components/sections/Projects";
import TheLab from "@/components/sections/TheLab";
import Toolbox from "@/components/sections/Toolbox";

export default function Home() {
  return (
    <main>
      <Hero />
      <Me />
      <Experience />
      <Toolbox />
      <Projects />
      <HowIThink />
      <TheLab />
      <Engineering />
      <CV />
      <Contact />
    </main>
  );
}
