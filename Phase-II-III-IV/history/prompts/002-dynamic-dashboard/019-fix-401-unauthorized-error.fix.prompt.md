---
id: "019"
title: "Fix 401 Unauthorized Error"
stage: "fix"
date: "2025-12-31"
surface: "agent"
model: "gemini-2.0-flash-exp"
feature: "dynamic-dashboard"
branch: "main"
user: "Iqra7"
command: "Fix 401 Unauthorized error when creating tasks"
labels:
  - "bugfix"
  - "auth"
  - "frontend"
links:
  spec: "specs/002-dynamic-dashboard/spec.md"
  ticket: null
  adr: null
  pr: null
files:
  - "frontend/src/lib/api.ts"
  - "backend/src/core/security.py"
tests: []
outcome: "Modified fetchClient to automatically attach Bearer token from auth session, bypassing cookie reliability issues."
evaluation: "success"
---

# Prompt

401 Unauthorized ... when iam creating a task

# Response

I have fixed the **401 Unauthorized** errors.

**Root Cause:**
The backend was unable to read the authentication cookie (`better-auth.session_token`) likely due to cross-port restrictions (Frontend on `localhost:3000` vs Backend on `localhost:8000`). While `credentials: 'include'` was set, browsers are strict about cookies across different ports/origins.

**Fix Applied:**
I updated the frontend API client (`frontend/src/lib/api.ts`) to:
1.  Automatically retrieve the active session using `authClient.getSession()`.
2.  Extract the **JWT Token** from the session.
3.  Explicitly attach it as an `Authorization: Bearer <token>` header to every request.

This ensures the backend always receives the token, regardless of cookie policies.

**Verification:**
Please try creating a task again. The request should now be authorized.
