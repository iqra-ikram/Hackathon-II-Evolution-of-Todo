# tests/cli/test_add.py

import pytest
from tests.cli.test_helpers import run_cli_command, setup_test_db

def test_add_task_success():
    setup_test_db()
    # Run 'todo add' command
    result = run_cli_command(["add", "Test Task", "--description", "This is a test description"])
    
    # Assert successful execution
    assert result.returncode == 0
    assert "Task 'Test Task' added with ID:" in result.stdout
    assert "This is a test description" in result.stdout

def test_add_task_no_description_success():
    setup_test_db()
    result = run_cli_command(["add", "Task without desc"])
    assert result.returncode == 0
    assert "Task 'Task without desc' added with ID:" in result.stdout
    assert "description" not in result.stdout

def test_add_task_empty_title_fails():
    setup_test_db()
    result = run_cli_command(["add", ""])
    assert result.returncode != 0
    assert "Error: Title cannot be empty." in result.stderr

def test_add_task_no_title_fails():
    setup_test_db()
    result = run_cli_command(["add"])
    assert result.returncode != 0
    assert "error: the following arguments are required: title" in result.stderr
