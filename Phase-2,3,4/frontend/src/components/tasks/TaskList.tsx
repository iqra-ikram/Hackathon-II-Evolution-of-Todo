"use client";
import { useEffect, useState } from "react";
import { fetchClient } from "@/lib/api";
import { Task } from "@/types";
import { useAuth } from "@/context/AuthContext";
import TaskItem from "./TaskItem";
import EditTaskModal from "./EditTaskModal";

export default function TaskList() {
  const { data: session } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const loadTasks = async () => {
    if (!session?.user?.id) return;
    try {
      const data = await fetchClient(`/${session.user.id}/tasks`);
      setTasks(data);
    } catch (e) {
      console.error("Failed to load tasks", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
        loadTasks();
    }
  }, [session]);

  const handleToggle = async (task: Task) => {
    if (!session?.user?.id) return;
    try {
        await fetchClient(`/${session.user.id}/tasks/${task.id}/complete`, {
            method: 'PATCH'
        });
        // Optimistic update
        setTasks(tasks.map(t => t.id === task.id ? { ...t, is_completed: !t.is_completed } : t));
    } catch (error) {
        console.error("Failed to toggle task", error);
        loadTasks(); // Revert on error
    }
  };

  const handleDelete = async (task: Task) => {
    if (!session?.user?.id) return;
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
        await fetchClient(`/${session.user.id}/tasks/${task.id}`, {
            method: 'DELETE'
        });
        setTasks(tasks.filter(t => t.id !== task.id));
    } catch (error) {
        console.error("Failed to delete task", error);
    }
  };

  if (loading) return <div className="text-white text-center py-10">Loading tasks...</div>;

  return (
    <div className="space-y-1">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={setEditingTask}
        />
      ))}
      {tasks.length === 0 && (
          <div className="text-center py-10">
              <p className="text-neutral-500 mb-2">No tasks found</p>
              <p className="text-neutral-600 text-sm">Use the form to create your first task</p>
          </div>
      )}

      {editingTask && (
        <EditTaskModal 
            task={editingTask} 
            isOpen={!!editingTask} 
            onClose={() => setEditingTask(null)}
            onTaskUpdated={() => {
                loadTasks();
                setEditingTask(null);
            }}
        />
      )}
    </div>
  );
}