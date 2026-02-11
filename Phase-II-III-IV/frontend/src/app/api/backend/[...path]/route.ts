import { auth } from "@/lib/auth"; // Ensure this path is correct
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

const BACKEND_URL = process.env.INTERNAL_API_URL || "https://iqra7-todo-backend-phase2.hf.space/api";

async function proxy(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const path = (await params).path.join("/");
  const url = `${BACKEND_URL}/${path}`;

  if (!process.env.INTERNAL_API_URL) {
    console.warn(`[Proxy] ⚠️ INTERNAL_API_URL is not set. Falling back to default: ${BACKEND_URL}`);
  }

  console.log(`[Proxy] ----------------------------------------------------------------`);
  console.log(`[Proxy] Incoming request for: ${path}`);
  console.log(`[Proxy] Target URL: ${url}`);

  // 1. Verify Session using Better Auth (Node.js side)
  console.log(`[Proxy] Verifying session...`);
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    console.log("[Proxy] ⚠️ WARNING: No session found on server-side.");
    // TEMPORARY DEBUGGING: Allow request even if unauthorized to test connectivity
    // console.log("[Proxy] Unauthorized: No session");
    // return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  } else {
    console.log(`[Proxy] ✅ Session verified for user: ${session.user.email}`);
  }

  // 2. Prepare Headers for Backend
  const requestHeaders = new Headers(req.headers);
  if (session) {
    requestHeaders.set("X-User-Id", session.user.id);
  } else {
    requestHeaders.set("X-User-Id", "debug-user-id"); // Fallback for debug
  }

  // Remove the original auth cookie/header to prevent confusion in backend (optional)
  requestHeaders.delete("Authorization");
  requestHeaders.delete("Cookie");

  // 3. Forward Request
  try {
    const body = req.method !== "GET" && req.method !== "HEAD" ? await req.blob() : null;

    console.log(`[Proxy] Fetching ${url}...`);
    const res = await fetch(url, {
      method: req.method,
      headers: requestHeaders,
      body: body,
      // cache: "no-store",
    });
    console.log(`[Proxy] ✅ Backend response status: ${res.status}`);

    // 4. Return Backend Response
    const data = await res.text();
    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch {
      console.log("[Proxy] ⚠️ Failed to parse backend response as JSON. Raw data:", data.substring(0, 100));
      jsonData = data; // Fallback if not JSON
    }

    return NextResponse.json(jsonData, { status: res.status });
  } catch (error: any) {
    console.error("[Proxy] ❌ Proxy Fetch Error:", error);
    if (error.cause) {
      console.error("[Proxy] Error Cause:", error.cause);
    }
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxy(req, context);
}

export async function POST(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxy(req, context);
}

export async function PUT(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxy(req, context);
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxy(req, context);
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxy(req, context);
}
