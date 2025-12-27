# tests/cli/test_update.py

import pytest
from tests.cli.test_helpers import run_cli_command, setup_test_db

def test_update_task_title_and_description():
    setup_test_db()
    # Add a task
    add_result = run_cli_command(["add", "Original Title", "-d", "Original Description"])
    task_id = int(add_result.stdout.split("ID: ")[1].split('\n')[0].strip())

    # Update the task
    update_result = run_cli_command(["update", str(task_id), "-t", "Updated Title", "-d", "Updated Description"])
    assert update_result.returncode == 0
    assert f"Task ID {task_id} updated." in update_result.stdout

    # Verify by viewing tasks
    view_result = run_cli_command(["view"])
    assert "Updated Title" in view_result.stdout
    assert "Updated Description" in view_result.stdout

def test_update_task_only_title():
    setup_test_db()
    # Add a task
    add_result = run_cli_command(["add", "Title Only Update", "-d", "Keep this description"])
    task_id = int(add_result.stdout.split("ID: ")[1].split('\n')[0].strip())

    # Update only the title
    update_result = run_cli_command(["update", str(task_id), "-t", "New Title Only"])
    assert update_result.returncode == 0
    assert f"Task ID {task_id} updated." in update_result.stdout

    # Verify by viewing tasks
    view_result = run_cli_command(["view"])
    assert "New Title Only" in view_result.stdout
    assert "Keep this description" in view_result.stdout

def test_update_task_only_description():
    setup_test_db()
    # Add a task
    add_result = run_cli_command(["add", "Title to Keep", "-d", "Description Only Update"])
    task_id = int(add_result.stdout.split("ID: ")[1].split('\n')[0].strip())

    # Update only the description
    update_result = run_cli_command(["update", str(task_id), "-d", "New Description Only"])
    assert update_result.returncode == 0
    assert f"Task ID {task_id} updated." in update_result.stdout

    # Verify by viewing tasks
    view_result = run_cli_command(["view"])
    assert "Title to Keep" in view_result.stdout
    assert "New Description Only" in view_result.stdout

def test_update_task_not_found():
    setup_test_db()
    result = run_cli_command(["update", "999", "-t", "Nonexistent"])
    assert result.returncode != 0
    assert "Error: Task with ID 999 not found." in result.stderr

def test_update_task_no_args_fails():
    setup_test_db()
    # Add a task
    add_result = run_cli_command(["add", "No Args"])
    task_id = int(add_result.stdout.split("ID: ")[1].split('\n')[0].strip())

    # Try to update without title or description
    result = run_cli_command(["update", str(task_id)])
    assert result.returncode != 0
    assert "Error: No update arguments provided. Use --title or --description." in result.stderr

def test_update_task_invalid_id():
    setup_test_db()
    result = run_cli_command(["update", "abc", "-t", "Invalid ID"])
    assert result.returncode != 0
    assert "Error: Invalid task ID. Must be an integer." in result.stderr

def test_update_task_empty_title_fails():
    setup_test_db()
    add_result = run_cli_command(["add", "Original"])
    task_id = int(add_result.stdout.split("ID: ")[1].split('\n')[0].strip())
    result = run_cli_command(["update", str(task_id), "-t", ""])
    assert result.returncode != 0
    assert "Error: Title cannot be empty." in result.stderr
