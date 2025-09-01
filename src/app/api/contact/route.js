import {
  getMessages,
  createMessage,
} from "@/server/controllers/contactController";

export async function GET(request) {
  return getMessages(request);
}

export async function POST(request) {
  return createMessage(request);
}
