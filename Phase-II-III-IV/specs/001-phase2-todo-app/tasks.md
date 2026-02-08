---
description: "Task list for Phase II Todo Full-Stack Web Application"
---

# Tasks: Phase II Todo Full-Stack Web Application

**Input**: Design documents from `specs/001-phase2-todo-app/`
**Prerequisites**: plan.md, spec.md, data-model.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Initialize backend project structure in `backend/`
- [x] T002 Configure Python venv and install FastAPI, SQLModel, Uvicorn in `backend/requirements.txt`
- [x] T003 Initialize frontend project structure (Next.js 16) in `frontend/`
- [x] T004 [P] Configure linting and formatting for Backend (Ruff) in `backend/pyproject.toml`
- [x] T005 [P] Configure linting and formatting for Frontend (ESLint/Prettier) in `frontend/package.json`

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T006 Setup Neon DB connection and SQLModel engine in `backend/src/core/database.py`
- [x] T007 [P] Implement global exception handlers in `backend/src/main.py`
- [x] T008 [P] Configure CORS middleware in `backend/src/main.py`
- [x] T009 [P] Create shared types/interfaces in `frontend/src/types/index.ts`
- [x] T010 [P] Setup global API client wrapper (fetch) in `frontend/src/lib/api.ts`
- [x] T011 [P] Configure environment variable loading in `backend/src/core/config.py` and `frontend/next.config.js`

## Phase 3: User Story 1 - User Signup & Login (Priority: P1) 🎯 MVP

**Goal**: Users must be able to create an account and log in securely to access their private task list.

**Independent Test**: Can be tested by signing up a new user via API/UI and verifying a JWT is issued.

### Implementation for User Story 1

- [x] T012 [US1] Install and configure Better Auth in `frontend/src/lib/auth.ts`
- [x] T013 [US1] Create Auth UI components (Signup/Login forms) in `frontend/src/components/auth/`
- [x] T014 [US1] Implement JWT verification middleware in `backend/src/core/security.py`
- [x] T015 [US1] Create Protected Route wrapper component in `frontend/src/components/ProtectedRoute.tsx`
- [x] T016 [US1] Create User Context/Provider in `frontend/src/context/AuthContext.tsx`
- [x] T017 [US1] Verify Auth flow end-to-end (Signup -> Login -> Backend verification)

## Phase 4: User Story 2 - Create & List Tasks (Priority: P1)

**Goal**: Authenticated users can create new tasks and view their own list of tasks.

**Independent Test**: Verify POST /tasks creates a record visible only to the creator via GET /tasks.

### Implementation for User Story 2

- [x] T018 [US2] Create Task SQLModel entity in `backend/src/models/task.py`
- [x] T019 [US2] Implement TaskService (create, list with filter) in `backend/src/services/task_service.py`
- [x] T020 [US2] Implement POST /api/{user_id}/tasks endpoint in `backend/src/api/routes/tasks.py`
- [x] T021 [US2] Implement GET /api/{user_id}/tasks endpoint in `backend/src/api/routes/tasks.py`
- [x] T022 [US2] Create TaskList UI component in `frontend/src/components/tasks/TaskList.tsx`
- [x] T023 [US2] Create CreateTaskForm UI component in `frontend/src/components/tasks/CreateTaskForm.tsx`
- [x] T024 [US2] Integrate Task API calls in `frontend/src/app/dashboard/page.tsx`

## Phase 5: User Story 3 - Update & Complete Tasks (Priority: P2)

**Goal**: Users can edit task details and toggle their completion status.

**Independent Test**: Create task -> Update it -> Verify change; Toggle complete -> Verify status.

### Implementation for User Story 3

- [x] T025 [US3] Add update/toggle logic to TaskService in `backend/src/services/task_service.py`
- [x] T026 [US3] Implement PUT /api/{user_id}/tasks/{id} endpoint in `backend/src/api/routes/tasks.py`
- [x] T027 [US3] Implement PATCH /api/{user_id}/tasks/{id}/complete endpoint in `backend/src/api/routes/tasks.py`
- [x] T028 [US3] Add Edit Task UI modal/form in `frontend/src/components/tasks/EditTaskModal.tsx`
- [x] T029 [US3] Add Toggle Completion interaction in `frontend/src/components/tasks/TaskItem.tsx`

## Phase 6: User Story 4 - Delete Tasks (Priority: P3)

**Goal**: Users can permanently remove tasks they no longer need.

**Independent Test**: Create task -> Delete it -> Verify it's gone from list.

### Implementation for User Story 4

- [x] T030 [US4] Add delete logic to TaskService in `backend/src/services/task_service.py`
- [x] T031 [US4] Implement DELETE /api/{user_id}/tasks/{id} endpoint in `backend/src/api/routes/tasks.py`
- [x] T032 [US4] Add Delete confirmation UI in `frontend/src/components/tasks/TaskItem.tsx`

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T033 [P] Update documentation (README.md) with setup instructions
- [ ] T034 Perform final security review (JWT validation, SQL injection checks)
- [ ] T035 Optimize Dockerfile for production (if applicable) or Vercel/Render config
- [ ] T036 Run full end-to-end manual test suite

## Dependencies & Execution Order

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Phase 1. Blocks all US phases.
- **US1 (Auth)**: Blocks US2, US3, US4 (need auth to test isolation).
- **US2 (Create/List)**: Blocks US3, US4 (need tasks to update/delete).
- **US3 (Update)**: Independent of US4.
- **US4 (Delete)**: Independent of US3.

## Implementation Strategy

1. **MVP**: Complete Phases 1, 2, 3, and 4 (Auth + Create/List). Deploy/Verify.
2. **Increment 1**: Add Phase 5 (Update/Complete).
3. **Increment 2**: Add Phase 6 (Delete).
4. **Finalize**: Phase 7.
