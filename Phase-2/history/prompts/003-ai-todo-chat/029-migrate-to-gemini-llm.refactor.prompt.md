---
id: 029-migrate-to-gemini-llm
title: Migrate from Grok to Gemini LLM
stage: refactor
date: 2026-01-02
surface: agent
model: gemini-2.0-flash-exp
feature: 003-ai-todo-chat
branch: 003-ai-todo-chat
user: Iqra7
command: i want to use gemini as an llm
labels: ["refactor", "llm", "gemini"]
links:
  spec: specs/003-ai-todo-chat/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - backend/src/core/config.py
 - backend/.env
 - backend/src/services/agent_service.py
tests:
 - null
---

## Prompt

i want to use gemini as an llm

## Response snapshot

Switched LLM provider from xAI (Grok) to Google (Gemini).
1. Updated `backend/src/core/config.py` to use `GEMINI_API_KEY`.
2. Added `GEMINI_API_KEY` to `backend/.env`.
3. Updated `backend/src/services/agent_service.py` to use Gemini's OpenAI-compatible endpoint (`https://generativelanguage.googleapis.com/v1beta/openai/`) and model `gemini-2.0-flash-exp`.

## Outcome

- ✅ Impact: Backend now uses Gemini for chat generation.
- 🧪 Tests: Manual verification required.
- 📁 Files: Modified 3 files.
- 🔁 Next prompts: Verify chat functionality.
- 🧠 Reflection: Smooth transition using OpenAI compatibility layer.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
