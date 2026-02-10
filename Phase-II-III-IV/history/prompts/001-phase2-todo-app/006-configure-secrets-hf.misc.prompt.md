---
id: "002"
title: "Configure Secrets for Hugging Face Space"
stage: "misc"
date: "2026-02-09"
surface: "agent"
model: "gemini-2.0-flash-thinking-exp"
feature: "001-phase2-todo-app"
branch: "main"
user: "Iqra7"
command: "set secrets"
labels: ["huggingface", "secrets", "configuration"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml: |
  - .gemini/tmp/set_secrets.py
tests_yaml: |
  - null
---

# Prompt

Runtime Error 
Exit code: 1. Reason: ng(self.app)
...
pydantic_core._pydantic_core.ValidationError: 3 validation errors for Settings
DATABASE_URL
...

# Response

Identified that the application failed to start due to missing environment variables.
- Read local `backend/.env` to retrieve secrets.
- Created and ran a script to set `DATABASE_URL`, `BETTER_AUTH_SECRET`, and `GEMINI_API_KEY` on the Hugging Face Space `Iqra7/todo-backend-phase2`.
- Secrets configured successfully.
