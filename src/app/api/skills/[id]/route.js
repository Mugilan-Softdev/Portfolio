import { NextResponse } from "next/server";
import dbConnect from "@/server/config/dbConnect";
import Skill from "@/server/models/skillModel";

// Get a single skill
export async function GET(request, { params }) {
  try {
    await dbConnect();
    const skill = await Skill.findById(params.id);

    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    return NextResponse.json({ data: skill });
  } catch (error) {
    console.error("Error fetching skill:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Update a skill
export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const body = await request.json();

    const updatedSkill = await Skill.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updatedSkill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    return NextResponse.json({ data: updatedSkill });
  } catch (error) {
    console.error("Error updating skill:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Delete a skill
export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const deletedSkill = await Skill.findByIdAndDelete(params.id);

    if (!deletedSkill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    return NextResponse.json({ data: deletedSkill });
  } catch (error) {
    console.error("Error deleting skill:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
