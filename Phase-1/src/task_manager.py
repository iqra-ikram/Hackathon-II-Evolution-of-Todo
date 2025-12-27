# src/task_manager.py

import json
import os
from typing import List, Optional
from src.models.task import Task

class TaskManager:
    def __init__(self, db_file: Optional[str] = None):
        self._tasks: List[Task] = []
        self._next_id = 1
        self.db_file = db_file
        if self.db_file and os.path.exists(self.db_file):
            self._load_from_file()

    def _generate_unique_id(self) -> int:
        current_id = self._next_id
        self._next_id += 1
        return current_id

    def _save_to_file(self):
        if not self.db_file:
            return
        with open(self.db_file, 'w') as f:
            data = {
                "tasks": [task.__dict__ for task in self._tasks],
                "next_id": self._next_id
            }
            json.dump(data, f)

    def _load_from_file(self):
        if not self.db_file:
            return
        with open(self.db_file, 'r') as f:
            data = json.load(f)
            self._tasks = [Task(**task_data) for task_data in data.get("tasks", [])]
            self._next_id = data.get("next_id", 1)

    def add_task(self, title: str, description: str = "") -> Task:
        if not title:
            raise ValueError("Title cannot be empty.")
        
        task_id = self._generate_unique_id()
        new_task = Task(id=task_id, title=title, description=description)
        self._tasks.append(new_task)
        self._save_to_file()
        return new_task

    def get_task_by_id(self, task_id: int) -> Optional[Task]:
        return next((task for task in self._tasks if task.id == task_id), None)

    def get_all_tasks(self) -> List[Task]:
        return sorted(self._tasks, key=lambda task: task.id)

    def update_task(self, task_id: int, title: Optional[str] = None, description: Optional[str] = None, is_complete: Optional[bool] = None) -> Optional[Task]:
        task = self.get_task_by_id(task_id)
        if task:
            if title is not None:
                if not title.strip():
                    raise ValueError("Title cannot be empty.")
                task.title = title.strip()
            if description is not None:
                task.description = description.strip()
            if is_complete is not None:
                task.is_complete = is_complete
            self._save_to_file()
            return task
        return None

    def delete_task(self, task_id: int) -> bool:
        initial_len = len(self._tasks)
        self._tasks = [task for task in self._tasks if task.id != task_id]
        if len(self._tasks) < initial_len:
            self._save_to_file()
            return True
        return False

    def _reset_for_testing(self):
        """Resets the task manager for testing purposes."""
        self._tasks = []
        self._next_id = 1
        if self.db_file and os.path.exists(self.db_file):
            os.remove(self.db_file)
        self._save_to_file()
