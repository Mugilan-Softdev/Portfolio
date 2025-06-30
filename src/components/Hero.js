import Image from "next/image";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center section-padding pt-32">
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
            className="btn-primary"
          >
            Resume
          </a>
          <a
            href="#projects"
            className="btn-primary bg-gray-700 hover:bg-gray-600"
          >
            View Projects
          </a>
        </div>
        <div className="mt-12 relative">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="relative">
            <div className="animate-bounce">
              <a
                href="#about"
                className="text-gray-400 hover:text-white transition-colors"
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
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
