"use client";

import { useRouter, usePathname } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleSectionClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-[#0B1120] py-20 "
    >
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Hi, I'm <span className="gradient-text">Mukilan Rajaram</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-8">
          Full Stack Developer | MERN Specialist
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://drive.google.com/file/d/1NFnPL5cRBGAL7gxg5A7KwwrJ5-LWXJxu/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            style={{ cursor: "pointer" }}
            className="btn-primary hover:cursor-pointer z-30"
          >
            Resume
          </a>
          <button
            onClick={() => handleSectionClick("projects")}
            style={{ cursor: "pointer" }}
            className="btn-primary bg-gray-700 hover:bg-gray-600 hover:cursor-pointer z-30"
          >
            View Projects
          </button>
        </div>
        <div className="mt-12 relative z-30">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="relative">
            <div className="animate-bounce z-50">
              <button
                onClick={() => handleSectionClick("about")}
                style={{ cursor: "pointer" }}
                className="text-gray-400 hover:text-white transition-colors hover:cursor-pointer z-50"
              >
                <span className="block text-sm mb-2">Scroll Down</span>
                <svg
                  className="w-6 h-6 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
