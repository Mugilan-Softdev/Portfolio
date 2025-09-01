import { NextResponse } from "next/server";
import projectModel from "../models/projectModel";
import dbConnect from "../config/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Get all projects
export async function getProjects(req, res) {
  try {
    await dbConnect();
    const projects = await projectModel
      .find()
      .sort({ featured: -1, order: 1, createdAt: -1 });

    if (res) {
      return res.status(200).json({ success: true, data: projects });
    }
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error("Error in getProjects:", error);
    if (res) {
      return res.status(500).json({ success: false, error: error.message });
    }
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Get a single project
export async function getProject(request, { params }) {
  try {
    await dbConnect();

    const project = await projectModel.findById(params.id);

    if (!project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Create a new project
export async function createProject(request) {
  try {
    await dbConnect();
    const validation = await getServerSession(authOptions);

    if (validation?.user?.role !== "admin") {
      return NextResponse.json("sorry your not allowed to add project");
    }
    const data = await request.json();
    const project = await projectModel.create(data);
    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Update a project
export async function updateProject(request, { params }) {
  try {
    await dbConnect();

    const validation = await getServerSession(authOptions);

    if (validation?.user?.role !== "admin") {
      return NextResponse.json("sorry your not allowed to update project");
    }
    const data = await request.json();
    const project = await projectModel.findByIdAndUpdate(params.id, data, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Delete a project
export async function deleteProject({ params }) {
  try {
    await dbConnect();
    const validation = await getServerSession(authOptions);

    if (validation?.user?.role !== "admin") {
      return NextResponse.json("sorry your not allowed to delete project");
    }
    const project = await projectModel.findByIdAndDelete(params.id);

    if (!project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Seed initial projects
export async function seedProjects(req, res) {
  try {
    await dbConnect();
    const validation = await getServerSession(authOptions);

    if (validation?.user?.role !== "admin") {
      return NextResponse.json("sorry your not allowed to change the position of the project");
    }
    const existingProjects = await projectModel.find();

    if (existingProjects.length > 0) {
      if (res) {
        return res.status(400).json({
          success: false,
          message: "Projects already exist",
        });
      }
      return NextResponse.json(
        { success: false, message: "Projects already exist" },
        { status: 400 }
      );
    }

    const initialProjects = [
      {
        title: "Portfolio Website",
        description:
          "A modern portfolio website built with Next.js and TailwindCSS, featuring a clean design, dark mode, and admin dashboard.",
        image: "/projects/portfolio.png",
        technologies: ["Next.js", "TailwindCSS", "Framer Motion", "MongoDB"],
        liveUrl: "https://portfolio.example.com",
        githubUrl: "https://github.com/username/portfolio",
        category: "Web Development",
        featured: true,
        order: 1,
      },
      {
        title: "E-commerce Platform",
        description:
          "Full-stack e-commerce platform with product management, cart functionality, and secure payments.",
        image: "/projects/ecommerce.png",
        technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
        liveUrl: "https://shop.example.com",
        githubUrl: "https://github.com/username/ecommerce",
        category: "Full Stack",
        featured: true,
        order: 2,
      },
      {
        title: "Task Management App",
        description:
          "A mobile-first task management application with real-time updates and team collaboration features.",
        image: "/projects/tasks.png",
        technologies: ["React Native", "Firebase", "Redux"],
        liveUrl: "https://tasks.example.com",
        githubUrl: "https://github.com/username/tasks",
        category: "Mobile",
        featured: false,
        order: 3,
      },
    ];

    await projectModel.insertMany(initialProjects);

    if (res) {
      return res.status(201).json({
        success: true,
        message: "Initial projects added successfully",
        data: initialProjects,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Initial projects added successfully",
      data: initialProjects,
    });
  } catch (error) {
    console.error("Error in seedProjects:", error);
    if (res) {
      return res.status(500).json({ success: false, error: error.message });
    }
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
