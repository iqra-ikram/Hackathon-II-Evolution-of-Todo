# tests/test_task_manager.py

import pytest
from src.models.task import Task
from src.task_manager import TaskManager

def test_add_task():
    manager = TaskManager()
    task = manager.add_task("Buy groceries", "Milk, bread")
    assert task.id == 1
    assert task.title == "Buy groceries"
    assert task.description == "Milk, bread"
    assert task.is_complete is False
    assert len(manager.get_all_tasks()) == 1

def test_add_task_no_description():
    manager = TaskManager()
    task = manager.add_task("Read a book")
    assert task.id == 1
    assert task.title == "Read a book"
    assert task.description == ""
    assert task.is_complete is False
    assert len(manager.get_all_tasks()) == 1

def test_add_task_empty_title_raises_error():
    manager = TaskManager()
    with pytest.raises(ValueError, match="Title cannot be empty."):
        manager.add_task("")
    with pytest.raises(ValueError, match="Title cannot be empty."):
        manager.add_task("   ")

def test_get_task_by_id():
    manager = TaskManager()
    task1 = manager.add_task("Task 1")
    task2 = manager.add_task("Task 2")

    retrieved_task = manager.get_task_by_id(task1.id)
    assert retrieved_task == task1

    assert manager.get_task_by_id(999) is None

def test_get_all_tasks_empty():
    manager = TaskManager()
    assert manager.get_all_tasks() == []

def test_get_all_tasks_multiple():
    manager = TaskManager()
    task1 = manager.add_task("Task 1")
    task2 = manager.add_task("Task 2")
    task3 = manager.add_task("Task 3")

    all_tasks = manager.get_all_tasks()
    assert len(all_tasks) == 3
    assert all_tasks[0] == task1
    assert all_tasks[1] == task2
    assert all_tasks[2] == task3

def test_update_task():
    manager = TaskManager()
    task = manager.add_task("Old Title", "Old Description")

    updated_task = manager.update_task(task.id, title="New Title", description="New Description", is_complete=True)
    assert updated_task is not None
    assert updated_task.title == "New Title"
    assert updated_task.description == "New Description"
    assert updated_task.is_complete is True

    # Test partial update (only title)
    updated_task_partial = manager.update_task(task.id, title="Newer Title")
    assert updated_task_partial is not None
    assert updated_task_partial.title == "Newer Title"
    assert updated_task_partial.description == "New Description" # Description should remain unchanged

    # Test partial update (only description)
    updated_task_partial_desc = manager.update_task(task.id, description="Newer Description")
    assert updated_task_partial_desc is not None
    assert updated_task_partial_desc.title == "Newer Title" # Title should remain unchanged
    assert updated_task_partial_desc.description == "Newer Description"
    
    # Test partial update (only is_complete)
    updated_task_partial_complete = manager.update_task(task.id, is_complete=False)
    assert updated_task_partial_complete is not None
    assert updated_task_partial_complete.is_complete is False

def test_update_task_not_found():
    manager = TaskManager()
    assert manager.update_task(999, title="Nonexistent") is None

def test_delete_task():
    manager = TaskManager()
    task1 = manager.add_task("Task 1")
    task2 = manager.add_task("Task 2")

    assert manager.delete_task(task1.id) is True
    assert len(manager.get_all_tasks()) == 1
    assert manager.get_task_by_id(task1.id) is None

    assert manager.delete_task(task2.id) is True
    assert len(manager.get_all_tasks()) == 0

def test_delete_task_not_found():
    manager = TaskManager()
    manager.add_task("Task 1")
    assert manager.delete_task(999) is False
    assert len(manager.get_all_tasks()) == 1

def test_task_id_generation_sequential():
    manager = TaskManager()
    task1 = manager.add_task("First")
    task2 = manager.add_task("Second")
    task3 = manager.add_task("Third")
    assert task1.id == 1
    assert task2.id == 2
    assert task3.id == 3

def test_update_task_empty_title_raises_error():
    manager = TaskManager()
    task = manager.add_task("Original Title")
    with pytest.raises(ValueError, match="Title cannot be empty."):
        manager.update_task(task.id, title="")
    with pytest.raises(ValueError, match="Title cannot be empty."):
        manager.update_task(task.id, title="   ")
