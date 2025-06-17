import {
  getProject,
  updateProject,
  deleteProject,
} from "@/server/controllers/projectController";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(request, { params }) {
  return getProject(request, { params });
}

export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  return updateProject(request, { params });
}

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  return deleteProject({ params });
}
