import { NextResponse } from "next/server";
import skillModel from "../models/skillModel";
import dbConnect from "../config/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getSkills() {
  try {
    await dbConnect();
    const skills = await skillModel
      .find()
      .sort({ category: 1, proficiency: -1 });

    return NextResponse.json({ success: true, data: skills });
  } catch (error) {
    console.error("Error in getSkills:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Add a new skill
export async function createSkill(request) {
  try {
    await dbConnect();

    const validation = await getServerSession(authOptions);

    if (validation?.user?.role !== "admin") {
      return NextResponse.json("sorry your not allowed to add skill");
    }

    const data = await request.json();
    console.log("Creating skill with data:", data);

    // Validate required fields
    if (!data.name || !data.category || !data.icon) {
      console.error("Missing required fields");
      return NextResponse.json(
        {
          success: false,
          error:
            "Missing required fields: name, category, and icon are required",
        },
        { status: 400 }
      );
    }

    const skill = await skillModel.create(data);
    console.log("Skill created successfully:", skill);
    return NextResponse.json({ success: true, data: skill });
  } catch (error) {
    console.error("Error creating skill:", error);
    // Check for validation errors
    if (error.name === "ValidationError") {
      return NextResponse.json(
        { success: false, error: "Validation error: " + error.message },
        { status: 400 }
      );
    }
    // Check for duplicate key errors
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: "A skill with this name already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Update a skill
export async function updateSkill(request, { params }) {
  try {
    await dbConnect();

    const validation = await getServerSession(authOptions);

    if (validation?.user?.role !== "admin") {
      return NextResponse.json("sorry your not allowed to update the skill");
    }

    const data = await request.json();
    const skill = await skillModel.findByIdAndUpdate(params.id, data, {
      new: true,
      runValidators: true,
    });

    if (!skill) {
      return NextResponse.json(
        { success: false, error: "Skill not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: skill });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Delete a skill
export async function deleteSkill({ params }) {
  try {
    await dbConnect();

    const validation = await getServerSession(authOptions);

    if (validation?.user?.role !== "admin") {
      return NextResponse.json("sorry your not allowed to delete skill");
    }

    const skill = await skillModel.findByIdAndDelete(params.id);

    if (!skill) {
      return NextResponse.json(
        { success: false, error: "Skill not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: {} ,validation });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
