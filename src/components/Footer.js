"use client";

import { useState } from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { toast } from "react-hot-toast";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      toast.success("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="w-full bg-[#0B0F17] py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Contact Section */}
        <div>
          <h3 className="text-white text-xl font-medium mb-4">Contact</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-400">
              <MdEmail />
              <a
                href="mailto:mugilan.softdev@gmail.com"
                className="hover:text-white transition-colors"
              >
                mugilan.softdev@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <MdLocationOn />
              <span>Panruti</span>
            </div>
          </div>
        </div>

        {/* Connect Section */}
        <div>
          <h3 className="text-white text-xl font-medium mb-4">Connect</h3>
          <div className="flex gap-4">
            <a
              href="https://github.com/MugiRaja"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/mukilan-r-38609627a"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

        {/* Get in Touch Section */}
        <div className="md:col-span-2">
          <h3 className="text-white text-xl font-medium mb-4">Get in Touch</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#161B22] text-white rounded border border-gray-700 focus:outline-none focus:border-blue-500"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#161B22] text-white rounded border border-gray-700 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 bg-[#161B22] text-white rounded border border-gray-700 focus:outline-none focus:border-blue-500"
              required
            ></textarea>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800">
        <div className="text-gray-400 text-center">
          <p>© 2025 Mukilan R. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
