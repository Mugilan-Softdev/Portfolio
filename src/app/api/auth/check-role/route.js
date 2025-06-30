export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import dbConnect from "@/server/config/dbConnect";
import User from "@/server/models/userModel";

export async function POST(request) {
  try {
    await dbConnect();
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    return NextResponse.json({ role: user.role }, { status: 200 });
  } catch (error) {
    console.error("Check role error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
