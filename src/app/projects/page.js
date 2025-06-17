"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session } = useSession();

  const categories = [
    "All",
    "Web Development",
    "Full Stack",
    "Mobile",
    "UI/UX",
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const response = await fetch("/api/projects");
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch projects");
      }

      setProjects(result.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-500 text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">My Projects</h1>
          <p className="text-gray-400 text-lg mb-8">
            Explore my latest work and side projects
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                {project.featured && (
                  <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-sm">
                    Featured
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs font-medium bg-gray-700 text-gray-300 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-400 transition-colors"
                  >
                    Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    View Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredProjects.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            No projects found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
