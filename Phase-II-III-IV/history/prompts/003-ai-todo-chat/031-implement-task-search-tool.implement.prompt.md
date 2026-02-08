---
id: 031
title: implement-task-search-tool
stage: implement
date: 2026-01-03
surface: agent
model: gemini-2.0-flash-exp
feature: ai-todo-chat
branch: main
user: Iqra7
command: implement
labels: ["mcp", "tools", "backend", "ux"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - backend/src/services/task_service.py
 - backend/src/services/mcp_server.py
 - backend/src/services/agent_service.py
tests:
 - manual verification
---

## Prompt

"all the things are working great one minor problem is that when im saying chatbot to mark as completed at any task it is saying this do the meeting task mark as completed I need the task ID for the "meeting" task to mark it as completed. Could you please provide the task ID?"

## Response snapshot

The agent was unable to resolve task names to IDs because it lacked a search capability. I implemented a new `search_tasks` tool and updated the system prompt.

1.  **Backend Service:** Added `search_tasks(query, owner_id)` to `TaskService`.
2.  **MCP Server:** Registered `search_tasks` tool exposing the new service method.
3.  **Agent Prompt:** Updated instructions to explicitly tell the agent to search for tasks by name before attempting actions requiring an ID.

## Outcome

- ✅ Impact: The chatbot can now intelligently handle natural language requests like "mark meeting as done" by looking up the ID automatically.
- 🧪 Tests: Manual verification needed (restart backend).
- 📁 Files: Modified `TaskService`, `MCPServer`, and `AgentService`.
- 🔁 Next prompts: Monitor agent performance on ambiguous searches.
- 🧠 Reflection: Giving agents "search" capabilities is crucial for natural ID resolution.
