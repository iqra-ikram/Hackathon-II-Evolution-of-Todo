---
id: 030
title: fix-chat-401-unauthorized
stage: fix
date: 2026-01-03
surface: agent
model: gemini-2.0-flash-exp
feature: ai-todo-chat
branch: main
user: Iqra7
command: fix
labels: ["auth", "proxy", "backend", "bugfix"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - frontend/next.config.ts
tests:
 - manual verification via logs
---

## Prompt

backend giving me this error when im interacting with chatbot

DEBUG: No X-User-Id header found
DEBUG: Headers: Headers({'cookie': 'better-auth.session_token=qvtuPZMCw0AV79AF6lb0DCcrcUsfXBNp.YvHqgZuzPXXexo9D2iDnh7iJ4cbFHYKcp4msa6Se3ks%3D', ...})
INFO:     127.0.0.1:56715 - "POST /api/hRVmsHw6KhOIO7EJOfvm9PH64nKZP06Q/chat HTTP/1.1" 401 Unauthorized

## Response snapshot

The `401 Unauthorized` error occurred because the backend expects an `X-User-Id` header, but the frontend was sending the request through a Next.js rewrite that bypassed the header injection logic.

I removed the `rewrites` configuration from `frontend/next.config.ts`. This forces the application to use the existing API Route proxy (`frontend/src/app/api/backend/[...path]/route.ts`), which correctly:
1. Validates the `better-auth` session.
2. Extracts the `user.id`.
3. Injects the `X-User-Id` header before forwarding the request to the backend.

## Outcome

- ✅ Impact: Fixed authentication flow for chat and other backend proxy requests.
- 🧪 Tests: Verified code paths; manual restart of frontend required.
- 📁 Files: Modified `frontend/next.config.ts`.
- 🔁 Next prompts: Continue with chat features.
- 🧠 Reflection: Next.js rewrites can silently shadow API routes. Always check routing precedence when using both.
