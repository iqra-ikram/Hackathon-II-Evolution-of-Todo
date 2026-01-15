---
id: 1
title: Fix Next.js 15 Route Handler Params Build Error
stage: green
date: 2026-01-15
surface: agent
model: gemini-2.0-flash-exp
feature: frontend
branch: main
user: iqra
command: npm run build
labels: ["nextjs 15", "typescript", "route-handlers", "deployment"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - frontend/src/app/api/backend/[...path]/route.ts
tests:
  - npm run build
---

## Prompt

Failed to compile.
Type error: Type 'typeof import("/vercel/path0/Phase-2/frontend/src/app/api/backend/[...path]/route")' does not satisfy the constraint 'RouteHandlerConfig<"/api/backend/[...path]">'.
  Types of property 'GET' are incompatible.
    Type '(req: NextRequest, { params }: { params: { path: string[]; }; }) => Promise<NextResponse<any>>' is not assignable to type '(request: NextRequest, context: { params: Promise<{ path: string[]; }>; }) => void | Response | Promise<void | Response>'.
      Types of parameters '__1' and 'context' are incompatible.
        Type '{ params: Promise<{ path: string[]; }>; }' is not assignable to type '{ params: { path: string[]; }; }'.
          Types of property 'params' are incompatible.
            Property 'path' is missing in type 'Promise<{ path: string[]; }>' but required in type '{ path: string[]; }'.
Next.js build worker exited with code: 1 and signal: null
Error: Command "npm run build" exited with 1  im currently deploying this vercel is givivng me this error

## Response snapshot

Updated the Route Handler exports in `frontend/src/app/api/backend/[...path]/route.ts` to be async functions that explicitly handle the `params` object as a `Promise`, which is required in Next.js 15+.

## Outcome

- ✅ Impact: Resolved build failure on Vercel deployment.
- 🧪 Tests: Local build check confirmed signature alignment with Next.js 15 types.
- 📁 Files: `frontend/src/app/api/backend/[...path]/route.ts`
- 🔁 Next prompts: Continue with further deployment steps if needed.
- 🧠 Reflection: Next.js 15 breaking changes regarding sync/async params are a common source of build errors during migration.
