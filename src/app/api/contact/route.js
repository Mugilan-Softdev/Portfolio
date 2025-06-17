import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, message } = data;

    // Validate the data
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please fill in all fields" },
        { status: 400 }
      );
    }

    // Here you would typically send the email using your preferred email service
    // For example, using nodemailer, SendGrid, or any other email service
    // For now, we'll just log the data
    console.log("Contact form submission:", { name, email, message });

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in contact form:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
