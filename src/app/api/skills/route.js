import { getSkills, createSkill } from "@/server/controllers/skillController";

export async function GET() {
  return getSkills();
}

export async function POST(request) {
  return createSkill(request);
}
