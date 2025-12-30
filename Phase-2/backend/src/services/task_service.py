from typing import List, Optional
from uuid import UUID
from sqlmodel import Session, select
from src.models.task import Task, TaskCreate, TaskUpdate
from datetime import datetime, timezone

class TaskService:
    def __init__(self, session: Session):
        self.session = session

    def create_task(self, task_create: TaskCreate, owner_id: str) -> Task:
        task = Task.from_orm(task_create)
        task.owner_id = owner_id
        self.session.add(task)
        self.session.commit()
        self.session.refresh(task)
        return task

    def list_tasks(self, owner_id: str) -> List[Task]:
        statement = select(Task).where(Task.owner_id == owner_id)
        results = self.session.exec(statement)
        return results.all()

    def get_task(self, task_id: UUID, owner_id: str) -> Optional[Task]:
        statement = select(Task).where(Task.id == task_id, Task.owner_id == owner_id)
        return self.session.exec(statement).first()

    def update_task(self, task_id: UUID, owner_id: str, task_update: TaskUpdate) -> Optional[Task]:
        task = self.get_task(task_id, owner_id)
        if not task:
            return None
        
        task_data = task_update.dict(exclude_unset=True)
        for key, value in task_data.items():
            setattr(task, key, value)
        
        task.updated_at = datetime.now(timezone.utc)
        self.session.add(task)
        self.session.commit()
        self.session.refresh(task)
        return task

    def delete_task(self, task_id: UUID, owner_id: str) -> bool:
        task = self.get_task(task_id, owner_id)
        if not task:
            return False
        self.session.delete(task)
        self.session.commit()
        return True
