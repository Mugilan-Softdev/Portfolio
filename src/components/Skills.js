"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/skills");

        if (!response.ok) {
          throw new Error("Failed to fetch skills");
        }

        const result = await response.json();
        setSkills(result.data);
      } catch (err) {
        console.error("Error fetching skills:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const categories = ["All", ...new Set(skills.map((skill) => skill.category))];

  const filteredSkills =
    selectedCategory === "All"
      ? skills
      : skills.filter((skill) => skill.category === selectedCategory);

  if (loading) {
    return null; // Using the main loader
  }

  if (error) {
    return (
      <section id="skills" className="section-padding relative">
        <div className="text-center text-red-500">
          <p>Error loading skills: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
          Skills & Expertise
        </h2>
        <p className="text-gray-400 text-center text-lg mb-12">
          My technical toolkit for creating amazing web experiences
        </p>

        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all
                ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-700/30 p-2">
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-8 h-8 object-contain group-hover:scale-110 transition-transform"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {skill.name}
                  </h3>
                  <p className="text-sm text-gray-400">{skill.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
