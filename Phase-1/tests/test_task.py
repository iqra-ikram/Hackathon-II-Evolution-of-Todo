# tests/test_task.py

import pytest
from src.models.task import Task

def test_task_creation_valid():
    task = Task(id=1, title="Test Task", description="A description")
    assert task.id == 1
    assert task.title == "Test Task"
    assert task.description == "A description"
    assert task.is_complete is False

def test_task_creation_no_description():
    task = Task(id=2, title="Another Task")
    assert task.id == 2
    assert task.title == "Another Task"
    assert task.description == ""
    assert task.is_complete is False

def test_task_creation_completed():
    task = Task(id=3, title="Completed Task", is_complete=True)
    assert task.id == 3
    assert task.title == "Completed Task"
    assert task.description == ""
    assert task.is_complete is True

def test_task_creation_empty_title_raises_error():
    with pytest.raises(ValueError, match="Title cannot be empty."):
        Task(id=4, title="")
    with pytest.raises(ValueError, match="Title cannot be empty."):
        Task(id=5, title="   ")

def test_task_creation_invalid_id_raises_error():
    with pytest.raises(ValueError, match="Task ID must be a positive integer."):
        Task(id=0, title="Zero ID")
    with pytest.raises(ValueError, match="Task ID must be a positive integer."):
        Task(id=-1, title="Negative ID")
    with pytest.raises(ValueError, match="Task ID must be a positive integer."):
        Task(id="abc", title="Invalid ID Type") # type: ignore

def test_task_to_dict():
    task = Task(id=1, title="Test Task", description="Desc", is_complete=True)
    expected_dict = {
        "id": 1,
        "title": "Test Task",
        "description": "Desc",
        "is_complete": True
    }
    assert task.to_dict() == expected_dict

def test_task_from_dict():
    data = {
        "id": 1,
        "title": "Test Task",
        "description": "Desc",
        "is_complete": True
    }
    task = Task.from_dict(data)
    assert task.id == 1
    assert task.title == "Test Task"
    assert task.description == "Desc"
    assert task.is_complete is True

def test_task_from_dict_missing_fields_raises_error():
    data = {"id": 1, "title": "Test"}
    with pytest.raises(ValueError, match="Missing required fields for Task from dict."):
        Task.from_dict(data)

def test_task_equality():
    task1 = Task(id=1, title="Task A")
    task2 = Task(id=1, title="Task A")
    task3 = Task(id=2, title="Task B")
    assert task1 == task2
    assert task1 != task3

def test_task_repr():
    task_incomplete = Task(id=1, title="Buy groceries", description="Milk, eggs")
    task_complete = Task(id=2, title="Read book", is_complete=True)
    assert repr(task_incomplete) == "[ ] 1: Buy groceries - Milk, eggs"
    assert repr(task_complete) == "[✓] 2: Read book - "
