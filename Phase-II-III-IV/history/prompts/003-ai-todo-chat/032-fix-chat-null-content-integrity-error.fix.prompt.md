---
id: 032
title: fix-chat-null-content-integrity-error
stage: fix
date: 2026-01-03
surface: agent
model: gemini-2.0-flash-exp
feature: ai-todo-chat
branch: main
user: Iqra7
command: fix
labels: ["database", "sqlalchemy", "bugfix", "llm"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - backend/src/services/agent_service.py
tests:
 - manual verification via logs
---

## Prompt

"sqlalchemy.exc.IntegrityError: (psycopg2.errors.NotNullViolation) null value in column "content" of relation "message" violates not-null constraint"

## Response snapshot

The LLM (Gemini via OpenAI compatibility) sometimes returns `None` for `content` when it makes a tool call, or in other edge cases. The `Message` model in the database has a `NOT NULL` constraint on `content`.

I modified `backend/src/services/agent_service.py` to ensure that `content` is never `None`:
1. Checked the initial `response_message.content` and defaulted to `""` if None.
2. Checked the `second_response` (after tool execution) and defaulted to `""` if None.

## Outcome

- ✅ Impact: Prevented 500 errors when the LLM returns structured data (tool calls) without text content.
- 🧪 Tests: Manual verification needed (restart backend).
- 📁 Files: Modified `backend/src/services/agent_service.py`.
- 🔁 Next prompts: Monitor for empty bubbles in UI (frontend might need to handle empty content gracefully).
- 🧠 Reflection: Always sanitize LLM outputs before persisting to strict schemas.
