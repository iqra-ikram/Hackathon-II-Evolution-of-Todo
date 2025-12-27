# Tasks: Todo App Basic Features

**Input**: Design documents from `specs/001-todo-basic-features/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), data-model.md, contracts/cli-interface.md, research.md

**Tests**: No explicit request for TDD, but basic unit tests will be included in the polish phase for core logic.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story?] Description with file path`

## Phase 1: Setup (Project Initialization & Structure)

**Purpose**: Initialize the Python project and establish the basic directory structure.

- [x] T001 Create project root directory and `src/` folder.
- [x] T002 Initialize Python project with UV, including `pyproject.toml` for dependencies (`pytest`).
- [x] T003 Create `src/__init__.py`.
- [x] T004 Create `src/models/` directory.
- [x] T005 Create `src/models/__init__.py`.
- [x] T006 Create `tests/` directory.
- [x] T007 Create `tests/__init__.py`.
- [x] T008 Create `src/todo_app.py` as the main application entry point.

---

## Phase 2: Foundational (Core Data Model & Manager)

**Purpose**: Define the `Task` data model and implement the in-memory `TaskManager` for CRUD operations. This is a blocking prerequisite.

- [x] T009 [P] Define `Task` class in `src/models/task.py` with `id`, `title`, `description`, `is_complete` attributes.
- [x] T010 Implement `TaskManager` class in `src/task_manager.py` to handle in-memory storage, ID generation, and basic CRUD (add, get, update, delete) for `Task` objects.
- [x] T011 [P] Implement `generate_unique_id` method within `TaskManager` or as a helper.
- [x] T012 Add unit tests for `Task` model in `tests/test_task.py`.
- [x] T013 Add unit tests for `TaskManager` class (add/get operations) in `tests/test_task_manager.py`.

---

## Phase 3: User Story 1 - Add a new task (Priority: P1) 🎯 MVP

**Goal**: Enable users to add new tasks via the CLI.

**Independent Test**: User can run `python src/todo_app.py add "Task Title" -d "Task Description"` and then `python src/todo_app.py view` to see the added task.

### Tests for User Story 1

- [x] T014 [P] [US1] Write integration test for `todo add` command in `tests/cli/test_add.py` (ensure task is added and output is correct).

### Implementation for User Story 1

- [x] T015 [US1] Implement `add_task_command` function in `src/todo_app.py` to parse arguments for `add` command.
- [x] T016 [US1] Integrate `add_task_command` with `TaskManager.add_task` to create new tasks.
- [x] T017 [US1] Add error handling for missing `title` argument in `add` command.
- [x] T018 [US1] Provide success output for `add` command, including task ID and title.

---

## Phase 4: User Story 2 - View all tasks (Priority: P1)

**Goal**: Enable users to view all tasks currently in the todo list.

**Independent Test**: User can run `python src/todo_app.py view` and see all previously added tasks.

### Tests for User Story 2

- [x] T019 [P] [US2] Write integration test for `todo view` command in `tests/cli/test_view.py` (ensure all tasks are displayed correctly, handle empty list).

### Implementation for User Story 2

- [x] T020 [US2] Implement `view_tasks_command` function in `src/todo_app.py` to handle `view` command.
- [x] T021 [US2] Integrate `view_tasks_command` with `TaskManager.get_all_tasks` to retrieve tasks.
- [x] T022 [US2] Format and display task details (ID, title, description, status) in the CLI output.
- [x] T023 [US2] Handle output for an empty task list.

---

## Phase 5: User Story 3 - Mark a task as complete (Priority: P1)

**Goal**: Enable users to mark an existing task as complete.

**Independent Test**: User can run `python src/todo_app.py complete <task_id>` and then `python src/todo_app.py view` to confirm the task's status change.

### Tests for User Story 3

- [x] T024 [P] [US3] Write integration test for `todo complete` command in `tests/cli/test_complete.py` (ensure task is marked complete, handle task not found, already complete).

### Implementation for User Story 3

- [x] T025 [US3] Implement `complete_task_command` function in `src/todo_app.py` to handle `complete` command.
- [x] T026 [US3] Integrate `complete_task_command` with `TaskManager.mark_task_complete`.
- [x] T027 [US3] Add error handling for invalid task ID and provide success/info messages.

---

## Phase 6: User Story 4 - Update task details (Priority: P2)

**Goal**: Enable users to modify details of an existing task.

**Independent Test**: User can run `python src/todo_app.py update <task_id> -t "New Title" -d "New Description"` and then `python src/todo_app.py view` to confirm changes.

### Tests for User Story 4

- [x] T028 [P] [US4] Write integration test for `todo update` command in `tests/cli/test_update.py` (ensure task details are updated, handle task not found, partial updates).

### Implementation for User Story 4

- [x] T029 [US4] Implement `update_task_command` function in `src/todo_app.py` to handle `update` command.
- [x] T030 [US4] Integrate `update_task_command` with `TaskManager.update_task`.
- [x] T031 [US4] Add error handling for invalid task ID and cases where no update arguments are provided.
- [x] T032 [US4] Provide success output for `update` command.

---

## Phase 7: User Story 5 - Delete a task (Priority: P2)

**Goal**: Enable users to remove tasks from the todo list.

**Independent Test**: User can run `python src/todo_app.py delete <task_id>` and then `python src/todo_app.py view` to confirm the task's removal.

### Tests for User Story 5

- [x] T033 [P] [US5] Write integration test for `todo delete` command in `tests/cli/test_delete.py` (ensure task is deleted, handle task not found).

### Implementation for User Story 5

- [x] T034 [US5] Implement `delete_task_command` function in `src/todo_app.py` to handle `delete` command.
- [x] T035 [US5] Integrate `delete_task_command` with `TaskManager.delete_task`.
- [x] T036 [US5] Add error handling for invalid task ID and provide success output.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Finalize application structure, implement robust error handling, and ensure a clean entry point.

- [x] T037 Refactor `src/todo_app.py` to use `argparse` for robust CLI argument parsing across all commands.
- [x] T038 Implement a clear main entry point (`if __name__ == "__main__":`) in `src/todo_app.py` to dispatch commands.
- [x] T039 Review and standardize error messages and success outputs across all CLI commands.
- [x] T040 Ensure `TaskManager` handles concurrent access if applicable (though for CLI, less critical, but good practice).
- [x] T041 Add a `README.md` file with setup and usage instructions.

---

## Dependencies & Execution Order

### Phase Dependencies

-   **Setup (Phase 1)**: No dependencies - can start immediately.
-   **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories.
-   **User Stories (Phase 3-7)**: All depend on Foundational phase completion.
    *   User Stories are prioritized: P1 (Add, View, Complete) should be implemented before P2 (Update, Delete).
    *   Within P1, Add is foundational for View and Complete. View is crucial for verification.
-   **Polish (Phase 8)**: Depends on all core user stories being functional.

### Within Each User Story

-   Tests (if included) MUST be written and FAIL before implementation.
-   CLI command parsing and argument handling before integration with `TaskManager`.

### Parallel Opportunities

-   **Phase 1**: T003-T008 are [P] opportunities (different files, no direct dependencies among them).
-   **Phase 2**: T009 and T011 can be [P] as they involve separate aspects of `Task` and `TaskManager` internal logic. T012 and T013 (tests) can be [P] once `Task` and `TaskManager` are initially defined.
-   **User Stories Phases (Phase 3-7)**: Test writing tasks (e.g., T014, T019) can be done in parallel for different stories. Implementation tasks within a story generally follow a sequential flow from command parsing to manager integration.
-   **Phase 8**: T037, T038, T039 can be [P].

---

## Implementation Strategy

### MVP First (User Story 1 + 2 + 3)

1.  Complete Phase 1: Setup.
2.  Complete Phase 2: Foundational.
3.  Complete Phase 3: User Story 1 (Add).
4.  Complete Phase 4: User Story 2 (View).
5.  Complete Phase 5: User Story 3 (Mark Complete).
6.  **STOP and VALIDATE**: Test Add, View, and Mark Complete independently. This forms a functional core MVP.

### Incremental Delivery

1.  Complete Setup + Foundational → Foundation ready.
2.  Add User Story 1 (Add) → Test independently → Deploy/Demo (can now add tasks!).
3.  Add User Story 2 (View) → Test independently → Deploy/Demo (can now add and view tasks!).
4.  Add User Story 3 (Mark Complete) → Test independently → Deploy/Demo (full P1 MVP!).
5.  Add User Story 4 (Update) → Test independently → Deploy/Demo.
6.  Add User Story 5 (Delete) → Test independently → Deploy/Demo.
7.  Finally, complete Phase 8: Polish & Cross-Cutting Concerns.

### Parallel Team Strategy

With multiple developers:

1.  Team completes Setup + Foundational together.
2.  Once Foundational is done:
    *   Developer A: User Story 1 (Add) + User Story 2 (View)
    *   Developer B: User Story 3 (Mark Complete) + User Story 4 (Update)
    *   Developer C: User Story 5 (Delete)
    *   Another Developer: Works on test coverage, polish, and documentation.
3.  Stories complete and integrate independently as much as possible.

---

## Notes

-   [P] tasks = different files, no dependencies.
-   [Story] label maps task to specific user story for traceability.
-   Each user story should be independently completable and testable.
-   Verify tests fail before implementing.
-   Commit after each task or logical group.
-   Stop at any checkpoint to validate story independently.
-   Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence.
