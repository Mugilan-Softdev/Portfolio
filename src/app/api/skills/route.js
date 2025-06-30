import { getSkills, createSkill } from "@/server/controllers/skillController";

export async function GET() {
  return getSkills();
}

export async function POST(request) {
  try {
    return await createSkill(request);
  } catch (error) {
    console.error("Error in POST /api/skills:", error);
    return Response.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
