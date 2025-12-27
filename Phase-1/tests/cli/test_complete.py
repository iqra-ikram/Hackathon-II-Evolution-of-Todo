# tests/cli/test_complete.py

import pytest
from tests.cli.test_helpers import run_cli_command, setup_test_db

def test_complete_task_success():
    setup_test_db()
    # Add a task to complete
    add_result = run_cli_command(["add", "Task to Complete"])
    task_id = int(add_result.stdout.split("ID: ")[1].split('\n')[0].strip())

    # Complete the task
    complete_result = run_cli_command(["complete", str(task_id)])
    assert complete_result.returncode == 0
    assert f"Task ID {task_id} marked as complete." in complete_result.stdout

    # Verify by viewing tasks
    view_result = run_cli_command(["view"])
    assert "x" in view_result.stdout

def test_complete_task_not_found():
    setup_test_db()
    # Try to complete a non-existent task
    result = run_cli_command(["complete", "999"])
    assert result.returncode != 0
    assert "Error: Task with ID 999 not found." in result.stderr

def test_complete_task_already_complete():
    setup_test_db()
    # Add a task
    add_result = run_cli_command(["add", "Already Complete"])
    task_id = int(add_result.stdout.split("ID: ")[1].split('\n')[0].strip())

    # Complete it once
    run_cli_command(["complete", str(task_id)])

    # Try to complete it again
    result = run_cli_command(["complete", str(task_id)])
    assert result.returncode == 0
    assert f"Task ID {task_id} is already complete." in result.stdout

def test_complete_task_invalid_id():
    setup_test_db()
    result = run_cli_command(["complete", "abc"])
    assert result.returncode != 0
    assert "Error: Invalid task ID. Must be an integer." in result.stderr
