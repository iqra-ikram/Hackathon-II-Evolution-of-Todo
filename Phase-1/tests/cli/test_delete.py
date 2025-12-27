# tests/cli/test_delete.py

import pytest
from tests.cli.test_helpers import run_cli_command, setup_test_db

def test_delete_task_success():
    setup_test_db()
    # Add a task to delete
    add_result = run_cli_command(["add", "Task to Delete"])
    task_id = int(add_result.stdout.split("ID: ")[1].split('\n')[0].strip())

    # Delete the task
    delete_result = run_cli_command(["delete", str(task_id)])
    assert delete_result.returncode == 0
    assert f"Task ID {task_id} deleted." in delete_result.stdout

    # Verify by viewing tasks (should not be present)
    view_result = run_cli_command(["view"])
    assert "Task to Delete" not in view_result.stdout
    assert "No tasks found." in view_result.stdout # If it was the only task

def test_delete_task_not_found():
    setup_test_db()
    # Try to delete a non-existent task
    result = run_cli_command(["delete", "999"])
    assert result.returncode != 0
    assert "Error: Task with ID 999 not found." in result.stderr

def test_delete_task_invalid_id():
    setup_test_db()
    result = run_cli_command(["delete", "abc"])
    assert result.returncode != 0
    assert "Error: Invalid task ID. Must be an integer." in result.stderr
