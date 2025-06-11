import { createViewers, getViewers } from "@/server/controllers/viewController";

export async function GET(request) {
    return await getViewers(request);
}

export async function POST(request) {
    return await createViewers(request);
}