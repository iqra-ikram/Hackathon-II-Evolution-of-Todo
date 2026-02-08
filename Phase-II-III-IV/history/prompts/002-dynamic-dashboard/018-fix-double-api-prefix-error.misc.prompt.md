---
id: "018"
title: "Fix Double API Prefix Error"
stage: "fix"
date: "2025-12-31"
surface: "agent"
model: "gemini-2.0-flash-exp"
feature: "dynamic-dashboard"
branch: "main"
user: "Iqra7"
command: "Fix 404 errors caused by double /api/api prefix in fetch calls"
labels:
  - "bugfix"
  - "frontend"
  - "api"
links:
  spec: "specs/002-dynamic-dashboard/spec.md"
  ticket: null
  adr: null
  pr: null
files:
  - "frontend/src/components/tasks/TaskList.tsx"
  - "frontend/src/components/tasks/CreateTaskForm.tsx"
  - "frontend/src/components/tasks/EditTaskModal.tsx"
tests: []
outcome: "Removed redundant '/api' prefix from fetchClient calls in task components. Verified fetchClient already appends the base API URL."
evaluation: "success"
---

# Prompt

Failed to load resource: the server responded with a status of 404 (Not Found) ... :8000/api/api/.../tasks

# Response

I have fixed the **404 Not Found** errors.

**Root Cause:**
The `fetchClient` utility in `frontend/src/lib/api.ts` was already appending the `API_URL` (which includes `/api`). The task components were *also* adding `/api` to the start of their requests, resulting in URLs like `http://localhost:8000/api/api/...`, which does not exist.

**Fix Applied:**
I removed the redundant `/api` prefix from the API calls in the following files:
*   `frontend/src/components/tasks/TaskList.tsx` (List, Toggle, Delete)
*   `frontend/src/components/tasks/CreateTaskForm.tsx` (Create)
*   `frontend/src/components/tasks/EditTaskModal.tsx` (Update)

**Verification:**
The application should now correctly make requests to `http://localhost:8000/api/{user_id}/tasks` and the 404 errors should be resolved.
