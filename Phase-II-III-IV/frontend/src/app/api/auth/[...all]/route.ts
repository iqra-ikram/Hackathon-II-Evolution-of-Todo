import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

const handlers = toNextJsHandler(auth);

function applyCors(request: NextRequest, response: Response) {
  const origin = request.headers.get("origin");
  const allowedOrigin = origin || "https://hackathon-ii-evolution-of-todo-yoi6.vercel.app";

  response.headers.set("Access-Control-Allow-Origin", allowedOrigin);
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Credentials", "true");
  return response;
}

export async function GET(request: NextRequest) {
  try {
    const res = await handlers.GET(request);
    return applyCors(request, res);
  } catch (error) {
    console.error("[Auth Debug] GET Error:", error);
    return applyCors(request, NextResponse.json({ error: "Internal Server Error" }, { status: 500 }));
  }
}

export async function POST(request: NextRequest) {
  try {
    const res = await handlers.POST(request);
    return applyCors(request, res);
  } catch (error) {
    console.error("[Auth Debug] POST Error:", error);
    return applyCors(request, NextResponse.json({ error: "Internal Server Error" }, { status: 500 }));
  }
}

// Handle preflight requests (OPTIONS)
export async function OPTIONS(request: NextRequest) {
  return applyCors(request, NextResponse.json({}, { status: 204 }));
}
