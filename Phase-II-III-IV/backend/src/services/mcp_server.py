import logging
import json
from uuid import UUID
from typing import Any, List, Dict
from contextvars import ContextVar
from sqlmodel import Session
from mcp.server import Server
import mcp.types as types
from src.core.database import engine
from src.services.task_service import TaskService
from src.models.task import TaskCreate, TaskUpdate

logger = logging.getLogger(__name__)

# Context variable to store user_id for the current request
user_id_var: ContextVar[str] = ContextVar("user_id")

class TodoMCPServer:
    def __init__(self):
        self.name = "todo-mcp-server"
        self.server = Server(self.name)
        self._register_handlers()

    def _register_handlers(self):
        @self.server.list_tools()
        async def list_tools() -> list[types.Tool]:
            return await self.get_tools()

        @self.server.call_tool()
        async def call_tool(name: str, arguments: Any) -> list[types.TextContent | types.ImageContent | types.EmbeddedResource]:
            return await self.execute_tool(name, arguments)

    async def get_tools(self) -> list[types.Tool]:
        return [
            types.Tool(
                name="add_task",
                description="Create a new task for the user.",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string",
                            "description": "The title of the task"
                        },
                        "description": {
                            "type": "string",
                            "description": "Optional description of the task"
                        }
                    },
                    "required": ["title"]
                }
            ),
            types.Tool(
                name="list_tasks",
                description="List tasks for the user with optional status filter.",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "status": {
                            "type": "string",
                            "enum": ["pending", "completed", "all"],
                            "description": "Filter tasks by status (default: all)"
                        }
                    }
                }
            ),
            types.Tool(
                name="search_tasks",
                description="Search for tasks by title or description to find their IDs.",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "query": {
                            "type": "string",
                            "description": "The search query (e.g., task name)"
                        }
                    },
                    "required": ["query"]
                }
            ),
            types.Tool(
                name="complete_task",
                description="Mark a task as completed.",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "task_id": {
                            "type": "string",
                            "description": "The ID of the task to complete"
                        }
                    },
                    "required": ["task_id"]
                }
            ),
            types.Tool(
                name="update_task",
                description="Update a task's details.",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "task_id": {
                            "type": "string",
                            "description": "The ID of the task to update"
                        },
                        "title": {
                            "type": "string",
                            "description": "New title"
                        },
                        "description": {
                            "type": "string",
                            "description": "New description"
                        }
                    },
                    "required": ["task_id"]
                }
            ),
            types.Tool(
                name="delete_task",
                description="Delete a task permanently.",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "task_id": {
                            "type": "string",
                            "description": "The ID of the task to delete"
                        }
                    },
                    "required": ["task_id"]
                }
            )
        ]

    async def execute_tool(self, name: str, arguments: Any) -> list[types.TextContent | types.ImageContent | types.EmbeddedResource]:
        logger.info(f"Calling tool: {name} with args: {arguments}")
        
        try:
            user_id = user_id_var.get()
        except LookupError:
            raise ValueError("User context missing")

        with Session(engine) as session:
            task_service = TaskService(session)

            if name == "add_task":
                title = arguments.get("title")
                description = arguments.get("description")
                
                if not title:
                    raise ValueError("Title is required")

                task_create = TaskCreate(title=title, description=description)
                created_task = task_service.create_task(task_create, user_id)
                
                return [
                    types.TextContent(
                        type="text",
                        text=f"Task created successfully: ID {created_task.id} - {created_task.title}"
                    )
                ]

            elif name == "list_tasks":
                status = arguments.get("status", "all")
                tasks = task_service.list_tasks(user_id)
                
                if status == "pending":
                    tasks = [t for t in tasks if not t.is_completed]
                elif status == "completed":
                    tasks = [t for t in tasks if t.is_completed]
                
                if not tasks:
                    return [types.TextContent(type="text", text="No tasks found.")]
                
                task_list = "\n".join([f"- [{ 'x' if t.is_completed else ' ' }] {t.title} (ID: {t.id})" for t in tasks])
                return [
                    types.TextContent(
                        type="text",
                        text=f"Your tasks:\n{task_list}"
                    )
                ]

            elif name == "search_tasks":
                query = arguments.get("query")
                if not query:
                    raise ValueError("Query is required")
                
                tasks = task_service.search_tasks(query, user_id)
                if not tasks:
                    return [types.TextContent(type="text", text=f"No tasks found matching '{query}'.")]
                
                task_list = "\n".join([f"- [{ 'x' if t.is_completed else ' ' }] {t.title} (ID: {t.id})" for t in tasks])
                return [
                    types.TextContent(
                        type="text",
                        text=f"Found tasks matching '{query}':\n{task_list}"
                    )
                ]

            elif name == "complete_task":
                task_id_str = arguments.get("task_id")
                try:
                    task_id = UUID(task_id_str)
                except ValueError:
                    return [types.TextContent(type="text", text="Invalid Task ID format.")]

                updated = task_service.update_task(task_id, user_id, TaskUpdate(is_completed=True))
                if not updated:
                    return [types.TextContent(type="text", text="Task not found.")]
                
                return [types.TextContent(type="text", text=f"Task '{updated.title}' marked as completed.")]

            elif name == "update_task":
                task_id_str = arguments.get("task_id")
                try:
                    task_id = UUID(task_id_str)
                except ValueError:
                    return [types.TextContent(type="text", text="Invalid Task ID format.")]

                task_update = TaskUpdate(
                    title=arguments.get("title"),
                    description=arguments.get("description")
                )
                updated = task_service.update_task(task_id, user_id, task_update)
                if not updated:
                    return [types.TextContent(type="text", text="Task not found.")]
                
                return [types.TextContent(type="text", text=f"Task '{updated.title}' updated.")]

            elif name == "delete_task":
                task_id_str = arguments.get("task_id")
                try:
                    task_id = UUID(task_id_str)
                except ValueError:
                    return [types.TextContent(type="text", text="Invalid Task ID format.")]

                success = task_service.delete_task(task_id, user_id)
                if not success:
                    return [types.TextContent(type="text", text="Task not found.")]
                
                return [types.TextContent(type="text", text="Task deleted successfully.")]
        
        raise ValueError(f"Tool {name} not found")

# Singleton instance
mcp_server = TodoMCPServer()
