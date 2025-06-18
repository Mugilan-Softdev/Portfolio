"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/skills");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data || !data.data || !Array.isArray(data.data)) {
          throw new Error("Invalid data format received from server");
        }

        setSkills(data.data);

        // Extract unique categories
        const uniqueCategories = [
          "All",
          ...new Set(data.data.map((skill) => skill.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching skills:", error);
        setError(error.message);
        setSkills([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const filteredSkills =
    skills && selectedCategory === "All"
      ? skills
      : skills.filter((skill) => skill.category === selectedCategory);

  return (
    <section id="skills" className="section-padding relative bg-gray-900">
      <div className="max-w-7xl mx-auto relative">
        <h2 className="heading text-center">Skills & Expertise</h2>
        <p className="subheading text-center">
          My technical toolkit for creating amazing web experiences
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">
            <p>Error loading skills: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        ) : filteredSkills && filteredSkills.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-lg ${
                      skill.color
                        ?.replace("text-", "bg-")
                        ?.replace("500", "500/20") || "bg-gray-500/20"
                    }`}
                  >
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-6 h-6 object-contain"
                      onError={(e) => {
                        e.target.src = "/file.svg"; // Fallback icon
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`text-xl font-semibold ${
                        skill.color || "text-gray-200"
                      }`}
                    >
                      {skill.name}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      {skill.category}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-8">
            No skills found for the selected category.
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
