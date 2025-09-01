"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    skills: 0,
    projects: 0,
    messages: 0,
    views: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch skills count
        const skillsRes = await fetch("/api/skills");
        if (!skillsRes.ok) throw new Error("Failed to fetch skills");
        const skillsData = await skillsRes.json();

        // Fetch views count
        const viewsRes = await fetch("/api/viewers");
        if (!viewsRes.ok) throw new Error("Failed to fetch views");
        const viewsData = await viewsRes.json();

        setStats((prev) => ({
          ...prev,
          skills: skillsData.data?.length || 0,
          views: viewsData.views || 0,
        }));
      } catch (error) {
        console.error("Error fetching stats:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };


      fetchStats();

  }, [session]);

  const statCards = [
    { name: "Total Skills", value: stats.skills, color: "bg-blue-500" },
    { name: "Portfolio Views", value: stats.views, color: "bg-green-500" },
    { name: "Projects", value: stats.projects, color: "bg-purple-500" },
    { name: "Messages", value: stats.messages, color: "bg-pink-500" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">
            Error loading dashboard
          </div>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {session?.user?.name}!
          </h1>
          <p className="text-gray-400 mt-1">
            Here's what's happening with your portfolio.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div
            key={stat.name}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
          >
            <div
              className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4 bg-opacity-20`}
            >
              <span
                className={`text-2xl ${stat.color.replace("bg-", "text-")}`}
              >
                {stat.value}
              </span>
            </div>
            <h3 className="text-lg font-medium text-white">{stat.name}</h3>
            <p className="text-gray-400 text-sm mt-1">Total count</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <p className="text-gray-300">Portfolio viewed by a new visitor</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <p className="text-gray-300">Skills updated</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/admin/skills"
              className="p-4 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition-colors text-center"
            >
              Add New Skill
            </Link>
            <Link
              href="/admin/projects"
              className="p-4 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition-colors text-center"
            >
              Add New Project
            </Link>
            <Link
              href="/admin/messages"
              className="p-4 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition-colors text-center"
            >
              View Messages
            </Link>

             <Link
              href="/admin/messages"
              className="p-4 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition-colors text-center"
            >
              Reference
            </Link>
             <Link
              href="/admin/messages"
              className="p-4 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition-colors text-center"
            >
              Libary
            </Link>
            <button className="p-4 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition-colors">
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

