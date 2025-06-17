import { NextResponse } from "next/server";
import skillModel from "../models/skillModel";
import dbConnect from "../config/dbConnect";

// Get all skills
export async function getSkills(req, res) {
  try {
    await dbConnect();
    const skills = await skillModel
      .find()
      .sort({ category: 1, proficiency: -1 });

    // If it's an API route request
    if (res) {
      return res.status(200).json({ success: true, data: skills });
    }
    // If it's a Route Handler request
    return NextResponse.json({ success: true, data: skills });
  } catch (error) {
    console.error("Error in getSkills:", error);
    if (res) {
      return res.status(500).json({ success: false, error: error.message });
    }
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
    const data = await request.json();
    const skill = await skillModel.create(data);
    return NextResponse.json({ success: true, data: skill });
  } catch (error) {
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
    const skill = await skillModel.findByIdAndDelete(params.id);

    if (!skill) {
      return NextResponse.json(
        { success: false, error: "Skill not found" },
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


