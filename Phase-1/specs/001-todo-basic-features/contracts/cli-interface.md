# CLI Interface Contracts: Todo App Basic Features

This document describes the command-line interface (CLI) for the Todo App Basic Features, outlining the commands, arguments, and expected behavior for each of the core operations.

## Commands

### 1. Add Task

*   **Command**: `todo add`
*   **Description**: Adds a new task to the todo list.
*   **Arguments**:
    *   `<title>` (string, mandatory): The title of the new task.
    *   `--description`, `-d` (string, optional): A longer description for the task.
*   **Behavior**:
    *   Creates a new task with a unique ID, the provided title, and optional description.
    *   Defaults `is_complete` to `False`.
    *   Prints a success message including the new task's ID and title.
    *   Handles cases where `title` is missing (error message).

### 2. View Tasks

*   **Command**: `todo view`
*   **Description**: Displays all tasks currently in the todo list.
*   **Arguments**: None
*   **Behavior**:
    *   Lists all tasks, showing their ID, title, description (if present), and completion status.
    *   If no tasks exist, prints a message indicating an empty list.

### 3. Mark Task Complete

*   **Command**: `todo complete`
*   **Description**: Marks an existing task as complete.
*   **Arguments**:
    *   `<id>` (integer, mandatory): The unique ID of the task to mark complete.
*   **Behavior**:
    *   Finds the task by `id` and sets its `is_complete` attribute to `True`.
    *   Prints a success message.
    *   Handles cases where the `id` is not found (error message).
    *   Handles cases where the task is already complete (informational message).

### 4. Update Task

*   **Command**: `todo update`
*   **Description**: Modifies the title and/or description of an existing task.
*   **Arguments**:
    *   `<id>` (integer, mandatory): The unique ID of the task to update.
    *   `--title`, `-t` (string, optional): The new title for the task.
    *   `--description`, `-d` (string, optional): The new description for the task.
*   **Behavior**:
    *   Finds the task by `id`.
    *   Updates the `title` if `--title` is provided.
    *   Updates the `description` if `--description` is provided.
    *   Prints a success message.
    *   Handles cases where the `id` is not found (error message).
    *   Handles cases where neither `--title` nor `--description` is provided (informational message/error).

### 5. Delete Task

*   **Command**: `todo delete`
*   **Description**: Removes a task from the todo list.
*   **Arguments**:
    *   `<id>` (integer, mandatory): The unique ID of the task to delete.
*   **Behavior**:
    *   Finds the task by `id` and removes it from the list.
    *   Prints a success message.
    *   Handles cases where the `id` is not found (error message).
