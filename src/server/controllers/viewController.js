import { NextResponse } from "next/server";
import viewModel from "../models/viewModel";
import dbConnect from "../config/dbConnect";

export async function createViewers(request) {
  try {
    await dbConnect();

    // Get the IP address from x-forwarded-for or fallback to request.ip
    const forwarded = request.headers.get("x-forwarded-for");
    let ip = forwarded ? forwarded.split(",")[0].trim() : request.ip || "::1"; // Fallback to loopback if no IP found

    // If the IP is still the loopback address "::1", set it to "127.0.0.1"
    if (ip === "::1") ip = "127.0.0.1";

    // ✅ Check if IP already exists
    const existingViewer = await viewModel.findOne({ ip });
    if (existingViewer) {
      return NextResponse.json(
        { message: "Visitor already recorded", ip, existing: true },
        { status: 200 }
      );
    }

    // ✅ Save the IP to the database
    const viewData = new viewModel({ ip });
    await viewData.save();

    return NextResponse.json(
      { message: "Visitor recorded", ip, existing: false },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error saving view", error: error.message },
      { status: 500 }
    );
  }
}



export async function getViewers() {
  try {
    await dbConnect();
    const data = await viewModel.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
