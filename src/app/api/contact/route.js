import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import {
  getMessages,
  createMessage,
} from "@/server/controllers/contactController";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    return getMessages();
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  return createMessage(request);
}
