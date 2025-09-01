import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "@/server/controllers/skillController";

export async function GET(request) {
  return getSkills(request);
}

export async function POST(request) {
  return createSkill(request);
}

export async function PUT(request) {
  return updateSkill(request);
}

export async function DELETE(request) {
  return deleteSkill(request);
}
