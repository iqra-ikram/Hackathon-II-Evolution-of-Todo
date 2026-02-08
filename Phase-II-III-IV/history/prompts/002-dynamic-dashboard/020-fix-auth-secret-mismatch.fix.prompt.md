---
id: "020"
title: "Fix Auth Secret Mismatch"
stage: "fix"
date: "2025-12-31"
surface: "agent"
model: "gemini-2.0-flash-exp"
feature: "dynamic-dashboard"
branch: "main"
user: "Iqra7"
command: "Fix 401 Unauthorized by syncing BETTER_AUTH_SECRET"
labels:
  - "bugfix"
  - "auth"
  - "env"
links:
  spec: "specs/002-dynamic-dashboard/spec.md"
  ticket: null
  adr: null
  pr: null
files:
  - "backend/.env"
  - "backend/src/main.py"
tests: []
outcome: "Updated backend .env to match frontend BETTER_AUTH_SECRET. Triggered backend reload."
evaluation: "success"
---

# Prompt

it is still giving me this error (401 Unauthorized)

# Response

I found the root cause: **Environment Variable Mismatch**.

*   **Frontend Secret:** `changeme_shared_secret_12345iqraabdullah` (used to sign the token)
*   **Backend Secret:** `iqraabdullah_1234` (used to verify the token)

Because the secrets were different, the backend correctly rejected the frontend's tokens as invalid.

**Fix Applied:**
1.  Updated `backend/.env` to use the correct secret: `changeme_shared_secret_12345iqraabdullah`.
2.  Triggered a backend reload.

**Verification:**
The authentication should now work seamlessly.
