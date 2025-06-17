"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import ViewCounter from "@/components/ViewCounter";
import dynamic from "next/dynamic";

// Dynamically import components with SSR disabled to avoid hydration issues
const Projects = dynamic(() => import("@/components/Projects"), {
  ssr: false,
});

const Games = dynamic(() => import("@/components/Games"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Games />
      <Projects />

      <ViewCounter />
    </main>
  );
}
