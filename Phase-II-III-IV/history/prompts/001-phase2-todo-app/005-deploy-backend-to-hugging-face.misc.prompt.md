---
id: "001"
title: "Deploy Backend to Hugging Face"
stage: "misc"
date: "2026-02-09"
surface: "agent"
model: "gemini-2.0-flash-thinking-exp"
feature: "001-phase2-todo-app"
branch: "main"
user: "Iqra7"
command: "deploy backend"
labels: ["deployment", "huggingface", "backend"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml: |
  - backend/Dockerfile
tests_yaml: |
  - null
---

# Prompt

ok now do very imp thing is that deploy my backend on hugging face using mcp server create a new space and then deploy it

# Response

Deployed backend to Hugging Face Space `Iqra7/todo-backend-phase2`.
- Updated `backend/Dockerfile` to listen on port 7860.
- Created Space via CLI.
- Pushed code (excluding `.env` and `__pycache__`).
- Identified required secrets: `DATABASE_URL`, `BETTER_AUTH_SECRET`, `GEMINI_API_KEY`.
