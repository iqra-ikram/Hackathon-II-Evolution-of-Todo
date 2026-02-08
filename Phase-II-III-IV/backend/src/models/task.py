import uuid
from datetime import datetime, timezone
from typing import Optional
from sqlmodel import Field, SQLModel

class TaskBase(SQLModel):
    title: str = Field(max_length=100)
    description: Optional[str] = Field(default=None, max_length=1000)
    is_completed: bool = Field(default=False)

class Task(TaskBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    owner_id: str = Field(index=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class TaskCreate(TaskBase):
    pass

class TaskRead(TaskBase):
    id: uuid.UUID
    owner_id: str
    created_at: datetime
    updated_at: datetime

class TaskUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    is_completed: Optional[bool] = None
