---
id: 031-debug-chat-500-error
title: Debug Chat 500 Error
stage: fix
date: 2026-01-03
surface: agent
model: gemini-2.0-flash-exp
feature: 003-ai-todo-chat
branch: 003-ai-todo-chat
user: Iqra7
command: backend give me this error 500 Internal Server Error
labels: ["fix", "debug", "logging"]
links:
  spec: specs/003-ai-todo-chat/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - backend/src/api/routes/chat.py
 - backend/src/services/agent_service.py
tests:
 - null
---

## Prompt

2026-01-03 00:10:37,399 INFO sqlalchemy.engine.Engine ROLLBACK
INFO:     ::1:0 - "POST /api/.../chat HTTP/1.1" 500 Internal Server Error

## Response snapshot

Added detailed exception printing to `backend/src/api/routes/chat.py` and debug logging to `backend/src/services/agent_service.py` to trace the cause of the 500 error (likely LLM call failure).

## Outcome

- ✅ Impact: Backend logs will now show the actual python stack trace and LLM error.
- 🧪 Tests: None (debug instrumentation).
- 📁 Files: Modified 2 files.
- 🔁 Next prompts: Read the new logs provided by the user.
- 🧠 Reflection: Blind debugging requires maximizing visibility.

## Evaluation notes (flywheel)

- Failure modes observed: Swallowed exceptions in API.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
