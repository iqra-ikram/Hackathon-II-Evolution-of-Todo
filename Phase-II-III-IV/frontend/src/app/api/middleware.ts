import { NextResponse } from "next/server";

export function middleware(req: Request) {
  const res = NextResponse.next();

  // CORS headers
  res.headers.set("Access-Control-Allow-Origin", "https://hackathon-ii-evolution-of-todo-yoi6.vercel.app");
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.headers.set("Access-Control-Allow-Credentials", "true");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: res.headers });
  }

  return res;
}
