import { auth } from "@/lib/auth"; // Ensure this path is correct
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

const BACKEND_URL = process.env.INTERNAL_API_URL || "http://127.0.0.1:8000/api";

async function proxy(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const path = (await params).path.join("/");
  const url = `${BACKEND_URL}/${path}`;

  // 1. Verify Session using Better Auth (Node.js side)
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // 2. Prepare Headers for Backend
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("X-User-Id", session.user.id);
  // Remove the original auth cookie/header to prevent confusion in backend (optional)
  requestHeaders.delete("Authorization");
  requestHeaders.delete("Cookie");

  // 3. Forward Request
  try {
    const body = req.method !== "GET" && req.method !== "HEAD" ? await req.blob() : null;

    const res = await fetch(url, {
      method: req.method,
      headers: requestHeaders,
      body: body,
      // cache: "no-store",
    });

    // 4. Return Backend Response
    const data = await res.text();
    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch {
      jsonData = data; // Fallback if not JSON
    }

    return NextResponse.json(jsonData, { status: res.status });
  } catch (error) {
    console.error("Proxy Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
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
