from typing import List
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from src.core.database import get_session
from src.core.security import get_current_user_id
from src.models.task import TaskRead, TaskCreate, TaskUpdate
from src.services.task_service import TaskService

router = APIRouter()

@router.post("/{user_id}/tasks", response_model=TaskRead, status_code=status.HTTP_201_CREATED)
def create_task(
    user_id: str,
    task_create: TaskCreate,
    session: Session = Depends(get_session),
    current_user_id: str = Depends(get_current_user_id)
):
    if user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Not authorized to create tasks for other users")
    
    service = TaskService(session)
    return service.create_task(task_create, user_id)

@router.get("/{user_id}/tasks", response_model=List[TaskRead])
def list_tasks(
    user_id: str,
    session: Session = Depends(get_session),
    current_user_id: str = Depends(get_current_user_id)
):
    if user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Not authorized to view other users tasks")
    
    service = TaskService(session)
    return service.list_tasks(user_id)

@router.put("/{user_id}/tasks/{task_id}", response_model=TaskRead)
def update_task(
    user_id: str,
    task_id: UUID,
    task_update: TaskUpdate,
    session: Session = Depends(get_session),
    current_user_id: str = Depends(get_current_user_id)
):
    if user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Forbidden")
    
    service = TaskService(session)
    task = service.update_task(task_id, user_id, task_update)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.delete("/{user_id}/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(
    user_id: str,
    task_id: UUID,
    session: Session = Depends(get_session),
    current_user_id: str = Depends(get_current_user_id)
):
    if user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Forbidden")
    
    service = TaskService(session)
    success = service.delete_task(task_id, user_id)
    if not success:
        raise HTTPException(status_code=404, detail="Task not found")
    return None

# Additional endpoint for toggle if needed specifically, but PUT covers it
@router.patch("/{user_id}/tasks/{task_id}/complete", response_model=TaskRead)
def complete_task(
    user_id: str,
    task_id: UUID,
    session: Session = Depends(get_session),
    current_user_id: str = Depends(get_current_user_id)
):
    if user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Forbidden")
    
    service = TaskService(session)
    # Toggle logic
    task = service.get_task(task_id, user_id)
    if not task:
         raise HTTPException(status_code=404, detail="Task not found")
    
    update_data = TaskUpdate(is_completed=not task.is_completed)
    return service.update_task(task_id, user_id, update_data)
