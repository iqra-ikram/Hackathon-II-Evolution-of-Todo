"use client";
import { Task } from "@/types";

interface TaskItemProps {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (task: Task) => void;
  onEdit: (task: Task) => void;
}

export default function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  return (
    <div className="flex items-center justify-between p-4 border rounded mb-2 shadow-sm">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.is_completed}
          onChange={() => onToggle(task)}
          className="h-5 w-5"
        />
        <div>
          <h3 className={`font-medium ${task.is_completed ? "line-through text-gray-500" : ""}`}>
            {task.title}
          </h3>
          {task.description && <p className="text-sm text-gray-600">{task.description}</p>}
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={() => onEdit(task)} className="text-blue-500 hover:underline">
          Edit
        </button>
        <button onClick={() => onDelete(task)} className="text-red-500 hover:underline">
          Delete
        </button>
      </div>
    </div>
  );
}
