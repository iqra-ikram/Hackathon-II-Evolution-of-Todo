# tests/cli/test_view.py

import pytest
from tests.cli.test_helpers import run_cli_command, setup_test_db

def test_view_tasks_empty_list():
    setup_test_db()
    result = run_cli_command(["view"])
    assert result.returncode == 0
    assert "No tasks found." in result.stdout
    assert "ID" not in result.stdout

def test_view_tasks_single_task():
    setup_test_db()
    # Add a task first
    run_cli_command(["add", "Single Task", "-d", "Description for single task"])

    result = run_cli_command(["view"])
    assert result.returncode == 0
    assert "ID" in result.stdout
    assert "Title" in result.stdout
    assert "Description" in result.stdout
    assert "Status" in result.stdout
    assert "Single Task" in result.stdout
    assert "Description for single task" in result.stdout
    assert "[ ]" in result.stdout # Incomplete status

def test_view_tasks_multiple_tasks():
    setup_test_db()
    # Add multiple tasks
    run_cli_command(["add", "Task Alpha"])
    run_cli_command(["add", "Task Beta", "-d", "Beta desc"])
    run_cli_command(["add", "Task Gamma"])

    result = run_cli_command(["view"])
    assert result.returncode == 0
    assert "Task Alpha" in result.stdout
    assert "Task Beta" in result.stdout
    assert "Beta desc" in result.stdout
    assert "Task Gamma" in result.stdout
    assert "[ ]" in result.stdout # All should be incomplete initially
