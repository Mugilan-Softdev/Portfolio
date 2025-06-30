const About = () => {
  return (
    <section id="about" className="py-20 bg-[#0B1120]">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <h2 className="heading text-center">About Me</h2>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left column - Personal description */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-6 backdrop-blur-sm border border-gray-700">
              <p className="text-lg text-gray-300 leading-relaxed">
                I am a passionate Full Stack Developer with a deep love for
                creating innovative web solutions. My journey in tech has been
                driven by curiosity and a constant desire to learn and grow.
              </p>
              <div className="mt-4 flex gap-4 flex-wrap">
                <span className="px-3 py-1 bg-blue-500/20 rounded-full text-blue-300 text-sm">
                  Problem Solver
                </span>
                <span className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-300 text-sm">
                  Team Player
                </span>
                <span className="px-3 py-1 bg-pink-500/20 rounded-full text-pink-300 text-sm">
                  Quick Learner
                </span>
              </div>
            </div>

            {/* Timeline section */}
            <div className="relative pl-8 space-y-8 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:via-purple-500 before:to-pink-500">
              <div className="relative">
                <div className="absolute -left-10 top-2 w-4 h-4 rounded-full bg-blue-500"></div>
                <div className="card">
                  <h3 className="text-xl font-semibold text-blue-400">
                    Full Stack Development
                  </h3>
                  <p className="text-gray-400">Ability Coding</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Mastered MERN stack development, building real-world
                    projects and learning industry best practices.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-10 top-2 w-4 h-4 rounded-full bg-purple-500"></div>
                <div className="card">
                  <h3 className="text-xl font-semibold text-purple-400">
                    Master of Computer Applications
                  </h3>
                  <p className="text-gray-400">
                    Advanced Computing and Development
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Deepened my understanding of computer science principles and
                    advanced software development.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-10 top-2 w-4 h-4 rounded-full bg-pink-500"></div>
                <div className="card">
                  <h3 className="text-xl font-semibold text-pink-400">
                    Bachelor of Computer Applications
                  </h3>
                  <p className="text-gray-400">Computer Science Fundamentals</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Built a strong foundation in programming and computer
                    science concepts.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Stats and interests */}
          <div className="space-y-6">
            <div className="card backdrop-blur-sm border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 gradient-text">
                What I Do
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-200">
                      Web Development
                    </h4>
                    <p className="text-sm text-gray-400">
                      Building responsive and dynamic web applications using
                      modern technologies.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-200">
                      Database Design
                    </h4>
                    <p className="text-sm text-gray-400">
                      Creating efficient and scalable database structures for
                      applications.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-200">
                      API Development
                    </h4>
                    <p className="text-sm text-gray-400">
                      Designing and implementing RESTful APIs for seamless
                      integration.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interests/Hobbies section */}
            <div className="card backdrop-blur-sm border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 gradient-text">
                Beyond Coding
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-gray-800/50">
                  <p className="text-gray-300">Continuous Learning</p>
                </div>
                <div className="p-4 rounded-lg bg-gray-800/50">
                  <p className="text-gray-300">Problem Solving</p>
                </div>
                <div className="p-4 rounded-lg bg-gray-800/50">
                  <p className="text-gray-300">Tech Communities</p>
                </div>
                <div className="p-4 rounded-lg bg-gray-800/50">
                  <p className="text-gray-300">Open Source</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
