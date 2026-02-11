import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // Get the origin from the request or use the default Vercel URL
    const origin = request.headers.get("origin");
    const allowedOrigin = origin || "https://hackathon-ii-evolution-of-todo-yoi6.vercel.app";

    // CORS headers
    response.headers.set("Access-Control-Allow-Origin", allowedOrigin);
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, PATCH");
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-User-Id");

    // Handle preflight requests
    if (request.method === "OPTIONS") {
        return new Response(null, {
            status: 204,
            headers: response.headers
        });
    }

    return response;
}

// Ensure it runs on API routes and other necessary paths
export const config = {
    matcher: "/api/:path*",
};
