---
id: 033
title: implement-multi-turn-tool-loop
stage: fix
date: 2026-01-03
surface: agent
model: gemini-2.0-flash-exp
feature: ai-todo-chat
branch: main
user: Iqra7
command: fix
labels: ["agent", "loop", "reasoning", "backend"]
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

"I found the task "Meeting" with ID ... I will now mark it as completed. it is saying this but not marked it really as completed"

## Response snapshot

The agent was failing to execute multi-step plans (e.g., Search -> Complete). The original implementation only supported a single turn of tool execution. The agent would perform the search, get the results, and then *say* it was going to complete the task, but the code exited before it could actually emit the second tool call (`complete_task`).

I refactored `backend/src/services/agent_service.py` to use a `while` loop (max 5 iterations). This allows the agent to:
1. Call `search_tasks`.
2. Receive the results.
3. Call `complete_task` based on those results.
4. Confirm completion to the user.

## Outcome

- ✅ Impact: Enabled complex, multi-step agent behaviors.
- 🧪 Tests: Manual verification needed (restart backend).
- 📁 Files: Modified `backend/src/services/agent_service.py`.
- 🔁 Next prompts: Verify complex chains like "delete all completed tasks".
- 🧠 Reflection: Agents require an execution loop, not just a single request-response cycle, to be truly autonomous.
