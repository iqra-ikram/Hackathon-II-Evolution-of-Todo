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
    <div className="flex items-center justify-between p-4 bg-[#1a1a1a] border border-[#252525] rounded-2xl mb-3 shadow-md hover:border-neutral-700 transition-colors group">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => onToggle(task)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${task.is_completed ? 'bg-[#A3E635] border-[#A3E635]' : 'border-neutral-600 hover:border-[#A3E635]'}`}
        >
          {task.is_completed && <span className="text-black font-bold text-xs">✓</span>}
        </button>
        <div>
          <h3 className={`font-medium text-sm transition-all ${task.is_completed ? "line-through text-neutral-500" : "text-white"}`}>
            {task.title}
          </h3>
          {task.description && <p className="text-xs text-neutral-500 mt-1">{task.description}</p>}
        </div>
      </div>
      <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => onEdit(task)} className="text-neutral-400 hover:text-white text-xs font-medium transition-colors">
          Edit
        </button>
        <button onClick={() => onDelete(task)} className="text-neutral-400 hover:text-red-500 text-xs font-medium transition-colors">
          Delete
        </button>
      </div>
    </div>
  );
}
