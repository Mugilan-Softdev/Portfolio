import { seedProjects } from "@/server/controllers/projectController";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  return seedProjects();
}
