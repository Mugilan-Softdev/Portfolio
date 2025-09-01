import { NextResponse } from "next/server";
import viewModel from "../models/viewModel";
import dbConnect from "../config/dbConnect";


export async function createViewers(request) {
  try {
    await dbConnect();

    const forwarded = request.headers.get("x-forwarded-for");
    let ip = forwarded ? forwarded.split(",")[0].trim() : request.ip || "::1";

    if (ip === "::1") ip = "127.0.0.1";

    const existingViewer = await viewModel.findOne({ ip });
    if (existingViewer) {
      return NextResponse.json(
        { message: "Visitor already recorded", ip, existing: true },
        { status: 200 }
      );
    }

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

    const views = await viewModel.countDocuments();
    return NextResponse.json({ success: true, views });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
