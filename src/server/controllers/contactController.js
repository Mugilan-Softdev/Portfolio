import { NextResponse } from "next/server";
import Contact from "../models/contactModel";
import dbConnect from "../config/dbConnect";

// Get all messages (admin only)
export async function getMessages(req, res) {
  try {
    await dbConnect();
    const messages = await Contact.find().sort({ createdAt: -1 });

    if (res) {
      return res.status(200).json({ success: true, data: messages });
    }
    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    console.error("Error in getMessages:", error);
    if (res) {
      return res.status(500).json({ success: false, error: error.message });
    }
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Create a new message
export async function createMessage(request) {
  try {
    await dbConnect();
    const data = await request.json();
    const { name, email, message } = data;

    // Validate the data
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Please fill in all fields" },
        { status: 400 }
      );
    }

    const newMessage = await Contact.create({
      name,
      email,
      message,
    });

    return NextResponse.json(
      { success: true, message: "Message sent successfully", data: newMessage },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in createMessage:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500 }
    );
  }
}

// Delete a message (admin only)
export async function deleteMessage(request, { params }) {
  try {
    await dbConnect();
    const message = await Contact.findByIdAndDelete(params.id);

    if (!message) {
      return NextResponse.json(
        { success: false, error: "Message not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Message deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in deleteMessage:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete message" },
      { status: 500 }
    );
  }
}
