# Implementation Tasks: Intelligent Todo Agent (Grok + MCP)

**Branch**: `003-ai-todo-chat` | **Spec**: [spec.md](spec.md) | **Plan**: [plan.md](plan.md)

## Phase 1: Setup
*Goal: Initialize environment and dependencies for Grok and MCP integration.*

- [x] T001 Install Backend dependencies (openai, mcp) in `backend/requirements.txt`
- [x] T002 Update Backend Environment configuration for `GROK_API_KEY` in `backend/src/core/config.py`
- [x] T003 Install Frontend dependencies (ai) in `frontend/package.json`
- [x] T004 Create `Conversation` and `Message` models in `backend/src/models/chat.py`
- [x] T005 [P] Create Database Migrations for Chat models in `backend/alembic/versions/`

## Phase 2: Foundation
*Goal: Build the core Stateless Chat and Agent infrastructure.*

- [x] T006 Implement basic MCP Server structure in `backend/src/services/mcp_server.py`
- [x] T007 Implement Agent Service initialized with Grok configuration in `backend/src/services/agent_service.py`
- [x] T008 Implement Chat Service logic (persistence/context retrieval) in `backend/src/services/chat_service.py`
- [x] T009 Create Chat API Router in `backend/src/api/routes/chat.py`
- [x] T010 Register Chat Router in `backend/src/main.py`

## Phase 3: User Story 1 - Add Task via Chat
*Goal: Enable users to create tasks using natural language.*
*Priority: P1 | Test: Send "Remind me to buy milk", verify task creation.*

- [x] T011 [US1] Implement `add_task` MCP tool in `backend/src/services/mcp_server.py`
- [x] T012 [US1] Update Agent Service to register `add_task` tool in `backend/src/services/agent_service.py`
- [x] T013 [P] [US1] Implement `ChatInterface` component using Vercel AI SDK in `frontend/src/components/chat/ChatInterface.tsx`
- [x] T014 [P] [US1] Create Chat Page in `frontend/src/app/dashboard/chat/page.tsx`
- [x] T015 [US1] Integrate Chat UI with Backend API in `frontend/src/lib/chat-api.ts`

## Phase 4: User Story 2 - List and Filter Tasks
*Goal: Enable users to query their tasks.*
*Priority: P1 | Test: Ask "What is pending?", verify filtered list.*

- [x] T016 [US2] Implement `list_tasks` MCP tool (with status filter) in `backend/src/services/mcp_server.py`
- [x] T017 [US2] Register `list_tasks` tool with Agent in `backend/src/services/agent_service.py`
- [x] T018 [US2] Update System Prompt to handle list formatting in `backend/src/services/agent_service.py`

## Phase 5: User Story 3 - Complete Task
*Goal: Enable users to mark tasks as done.*
*Priority: P2 | Test: "Mark task 5 as done", verify completion.*

- [x] T019 [US3] Implement `complete_task` MCP tool in `backend/src/services/mcp_server.py`
- [x] T020 [US3] Register `complete_task` tool with Agent in `backend/src/services/agent_service.py`

## Phase 6: User Story 4 - Update and Delete Tasks
*Goal: Enable task modification and removal.*
*Priority: P3 | Test: "Delete task 2", verify removal.*

- [x] T021 [US4] Implement `update_task` MCP tool in `backend/src/services/mcp_server.py`
- [x] T022 [US4] Implement `delete_task` MCP tool in `backend/src/services/mcp_server.py`
- [x] T023 [US4] Register `update_task` and `delete_task` tools in `backend/src/services/agent_service.py`

## Phase 7: Polish & Security
*Goal: Ensure robustness, security, and final cleanup.*

- [x] T024 Verify User Isolation in all MCP tools (manual audit) in `backend/src/services/mcp_server.py`
- [x] T025 Add error handling for Tool execution failures in `backend/src/services/agent_service.py`
- [x] T026 Add persistence verification test in `backend/tests/test_chat_persistence.py`

## Dependencies
- Phase 1 & 2 must complete before Phase 3.
- Phases 3-6 are sequential feature additions but can be parallelized if backend/frontend teams split work (Backend T011, Frontend T013).

## Implementation Strategy
- **MVP**: Complete Phase 3 (Add Task). This proves the full stack: Frontend -> Backend -> Agent -> Grok -> MCP -> DB.
- **Iterative**: Add tools one by one in subsequent phases.