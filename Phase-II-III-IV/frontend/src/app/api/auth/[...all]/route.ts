import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

const handlers = toNextJsHandler(auth);

export async function GET(request: NextRequest, props: any) {
  console.log(`[Auth Debug] GET ${request.url}`);
  try {
    return await handlers.GET(request, props);
  } catch (error) {
    console.error("[Auth Debug] GET Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest, props: any) {
  console.log(`[Auth Debug] POST ${request.url}`);
  try {
    const response = await handlers.POST(request, props);
    console.log(`[Auth Debug] POST Response Status: ${response.status}`);
    return response;
  } catch (error) {
    console.error("[Auth Debug] POST Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}