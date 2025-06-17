import { seedSkills } from "@/server/controllers/skillController";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated and is admin
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Not authorized" },
        { status: 401 }
      );
    }

    // Forward the request to the controller
    const response = await new Promise((resolve) => {
      seedSkills(
        { method: "POST" },
        {
          status: (code) => ({
            json: (data) => resolve({ status: code, data }),
          }),
        }
      );
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error("Error in seed skills route:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
