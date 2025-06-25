"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import ViewCounter from "@/components/ViewCounter";
import UnderDevelopment from "@/components/UnderDevelopment";
import dynamic from "next/dynamic";

// Dynamically import components with SSR disabled to avoid hydration issues
const Projects = dynamic(() => import("@/components/Projects"), {
  ssr: false,
});

const Games = dynamic(() => import("@/components/Games"), {
  ssr: false,
});

export default function Home() {
  useEffect(() => {
    // Handle hash navigation after page load
    const handleScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          const headerHeight = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    };

    // Try scrolling multiple times to handle dynamic content
    setTimeout(handleScroll, 100);
    setTimeout(handleScroll, 500);
    setTimeout(handleScroll, 1000);

    // Also handle browser back/forward navigation
    window.addEventListener("hashchange", handleScroll);
    return () => window.removeEventListener("hashchange", handleScroll);
  }, []);

  return (
    <>
      <UnderDevelopment />
      <Navbar />

      <main className="scroll-smooth">
        <Hero />
        <About />
        <Skills />
        <Games />
        <Projects />
        <ViewCounter />
      </main>
    </>
  );
}
