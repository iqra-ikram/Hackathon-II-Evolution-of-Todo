# src/models/task.py

class Task:
    def __init__(self, id: int, title: str, description: str = "", is_complete: bool = False):
        if not isinstance(id, int) or id <= 0:
            raise ValueError("Task ID must be a positive integer.")
        if not isinstance(title, str) or not title.strip():
            raise ValueError("Title cannot be empty.")
        if not isinstance(description, str):
            raise ValueError("Task description must be a string.")
        if not isinstance(is_complete, bool):
            raise ValueError("Task is_complete must be a boolean.")

        self.id = id
        self.title = title.strip()
        self.description = description.strip()
        self.is_complete = is_complete

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "is_complete": self.is_complete
        }

    @classmethod
    def from_dict(cls, data: dict):
        if not all(k in data for k in ["id", "title", "is_complete"]):
            raise ValueError("Missing required fields for Task from dict.")
        return cls(
            id=data["id"],
            title=data["title"],
            description=data.get("description", ""),
            is_complete=data["is_complete"]
        )

    def __repr__(self):
        status = "✓" if self.is_complete else " "
        return f"[{status}] {self.id}: {self.title} - {self.description}"

    def __eq__(self, other):
        if not isinstance(other, Task):
            return NotImplemented
        return self.id == other.id
