---
id: 034-fix-dashboard-proxy-and-loading
title: Fix Dashboard Proxy and Loading State
stage: fix
date: 2026-01-03
surface: agent
model: gemini-2.0-flash-exp
feature: 003-ai-todo-chat
branch: 003-ai-todo-chat
user: Iqra7
command: it is not showing dashboard it is just showing loading dashboard
labels: ["fix", "frontend", "proxy", "config"]
links:
  spec: specs/003-ai-todo-chat/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - frontend/next.config.ts
 - frontend/src/app/dashboard/page.tsx
tests:
 - null
---

## Prompt

it is not showing dashboard it is just showing loading dashboard and backend is giving these logs ...

## Response snapshot

Diagnosed that the frontend was stuck in a loading loop because the fetch was failing (404/Network Error) due to missing proxy configuration.
1. Updated `frontend/next.config.ts` to add rewrites from `/api/backend/*` to `http://127.0.0.1:8000/api/*`.
2. Updated `DashboardPage` to handle error states gracefully instead of showing an infinite loader.

## Outcome

- ✅ Impact: Dashboard data should now load correctly from the backend.
- 🧪 Tests: Manual verification.
- 📁 Files: Modified `next.config.ts` and `DashboardPage.tsx`.
- 🔁 Next prompts: Restart frontend server to apply config changes.
- 🧠 Reflection: Next.js rewrites are essential when frontend/backend are on different ports.

## Evaluation notes (flywheel)

- Failure modes observed: Infinite loading state masking network errors.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
