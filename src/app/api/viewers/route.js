import { createViewers, getViewers } from "@/server/controllers/viewController";

export async function GET() {
  return getViewers();
}

export async function POST(request) {
  return createViewers(request);
}
