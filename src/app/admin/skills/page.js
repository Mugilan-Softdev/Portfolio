"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function SkillsManagement() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingSkill, setEditingSkill] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    icon: "code",
    color: "text-blue-500",
  });

  // Available options
  const iconOptions = ["code", "brush", "server", "database", "cloud"];
  const colorOptions = [
    "text-blue-500",
    "text-green-500",
    "text-red-500",
    "text-yellow-500",
    "text-purple-500",
    "text-pink-500",
    "text-indigo-500",
  ];
  const categoryOptions = [
    "Frontend",
    "Backend",
    "Database",
    "DevOps",
    "Design",
    "Tools",
  ];

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/skills");
      if (!res.ok) throw new Error("Failed to fetch skills");
      const data = await res.json();
      setSkills(data.data || []);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load skills");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingSkill
        ? `/api/skills?id=${editingSkill._id}`
        : "/api/skills";
      const method = editingSkill ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save skill");

      toast.success(editingSkill ? "Skill updated!" : "Skill added!");
      setFormData({
        name: "",
        category: "",
        icon: "code",
        color: "text-blue-500",
      });
      setEditingSkill(null);
      fetchSkills();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      icon: skill.icon,
      color: skill.color,
    });
  };

  const handleDelete = async (skillId) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;

    try {
      const res = await fetch(`/api/skills?id=${skillId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete skill");

      toast.success("Skill deleted!");
      fetchSkills();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
        <button
          onClick={fetchSkills}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Skills Management</h1>
        {skills.length === 0 && (
          <button
            onClick={async () => {
              try {
                const res = await fetch("/api/skills/seed", {
                  method: "POST",
                });
                if (!res.ok) throw new Error("Failed to seed skills");

                toast.success("Initial skills added successfully!");
                fetchSkills();
              } catch (err) {
                toast.error(err.message);
              }
            }}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add Initial Skills
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">
          {editingSkill ? "Edit Skill" : "Add New Skill"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-gray-700 text-white rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full bg-gray-700 text-white rounded p-2"
                required
              >
                <option value="">Select Category</option>
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Icon</label>
              <select
                value={formData.icon}
                onChange={(e) =>
                  setFormData({ ...formData, icon: e.target.value })
                }
                className="w-full bg-gray-700 text-white rounded p-2"
                required
              >
                {iconOptions.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Color</label>
              <select
                value={formData.color}
                onChange={(e) =>
                  setFormData({ ...formData, color: e.target.value })
                }
                className="w-full bg-gray-700 text-white rounded p-2"
                required
              >
                {colorOptions.map((color) => (
                  <option key={color} value={color}>
                    {color.replace("text-", "").replace("-500", "")}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            {editingSkill && (
              <button
                type="button"
                onClick={() => {
                  setEditingSkill(null);
                  setFormData({
                    name: "",
                    category: "",
                    icon: "code",
                    color: "text-blue-500",
                  });
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {editingSkill ? "Update Skill" : "Add Skill"}
            </button>
          </div>
        </form>
      </div>

      {/* Skills List */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Skills List</h2>
        <div className="grid grid-cols-1 gap-4">
          {skills.map((skill) => (
            <div
              key={skill._id}
              className="flex items-center justify-between bg-gray-700 p-4 rounded"
            >
              <div className="flex items-center gap-4">
                <div className={`text-2xl ${skill.color}`}>
                  <i className={`fas fa-${skill.icon}`}></i>
                </div>
                <div>
                  <h3 className="text-white font-medium">{skill.name}</h3>
                  <p className="text-gray-400 text-sm">{skill.category}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(skill)}
                  className="p-2 text-blue-500 hover:text-blue-400"
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  onClick={() => handleDelete(skill._id)}
                  className="p-2 text-red-500 hover:text-red-400"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
          {skills.length === 0 && (
            <p className="text-gray-400 text-center py-4">No skills found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
