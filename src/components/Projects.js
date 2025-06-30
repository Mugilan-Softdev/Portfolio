"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/projects");

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const result = await response.json();
      console.log("Fetched projects:", result);

      if (!result.data || result.data.length === 0) {
        setError("No projects found");
        return;
      }

      // First try to get featured projects
      let projectsToShow = result.data
        .filter((project) => project.featured)
        .slice(0, 3);

      // If no featured projects, show all projects
      if (projectsToShow.length === 0) {
        projectsToShow = result.data.slice(0, 3);
      }

      setProjects(projectsToShow);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSeedProjects = async () => {
    try {
      const response = await fetch("/api/projects/seed", {
        method: "POST",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to seed projects");
      }

      toast.success("Projects seeded successfully!");
      fetchProjects(); // Refresh the projects list
    } catch (err) {
      console.error("Error seeding projects:", err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-[#0B1120]">
        <div className="max-w-7xl mx-auto relative">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-20 bg-[#0B1120]">
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <h2 className="heading">Featured Projects</h2>
            <p className="text-red-500 mb-8">{error}</p>
            <button
              onClick={handleSeedProjects}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Sample Projects
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-[#0B1120]">
      <div className="max-w-7xl mx-auto relative px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mb-4">
          Featured Projects
        </h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
          Check out some of my latest work
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-colors"
            >
              <div className="relative aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <div className="flex gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                      >
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                      >
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2 line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs font-medium bg-gray-700 text-gray-300 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies?.length > 3 && (
                    <span className="px-2 py-1 text-xs font-medium bg-gray-700 text-gray-300 rounded">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
