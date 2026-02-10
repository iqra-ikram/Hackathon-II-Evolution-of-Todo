---
id: "005"
title: "Fix JSON Parse Error in Fetch Client"
stage: "misc"
date: "2026-02-09"
surface: "agent"
model: "gemini-2.0-flash-thinking-exp"
feature: "001-phase2-todo-app"
branch: "main"
user: "Iqra7"
command: "fix json error"
labels: ["frontend", "bugfix", "api", "json"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml: |
  - frontend/src/lib/api.ts
  - frontend/debug-login.py
tests_yaml: |
  - null
---

# Prompt

2a6dfa09e117854e.js:1 SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON

﻿

 its giving me this error

# Response

Diagnosed `SyntaxError: Unexpected token '<'` as a result of `response.json()` failing on an HTML response.
- Verified local auth endpoint (`/api/auth/sign-in/email`) returns valid JSON even on error.
- Concluded error occurs during subsequent API calls (likely tasks fetch) returning HTML (404/500).
- Updated `frontend/src/lib/api.ts` to safely parse responses:
  - If status is not OK, reads text first.
  - Tries to parse JSON.
  - If parsing fails (HTML), logs the raw text to console and throws a descriptive error.
