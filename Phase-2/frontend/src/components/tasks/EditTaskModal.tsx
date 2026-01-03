"use client";
import { useState } from "react";
import { Task } from "@/types";
import { fetchClient } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

interface EditTaskModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onTaskUpdated: () => void;
}

export default function EditTaskModal({ task, isOpen, onClose, onTaskUpdated }: EditTaskModalProps) {
  const { data: session } = useAuth();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) return;

    setIsSubmitting(true);
    try {
      await fetchClient(`/${session.user.id}/tasks/${task.id}`, {
        method: "PUT",
        body: JSON.stringify({ title, description, is_completed: task.is_completed }),
      });
      onTaskUpdated();
      onClose();
    } catch (error) {
      alert("Failed to update task");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#111111] border border-[#252525] p-8 rounded-[32px] w-full max-w-md shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-6">Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-neutral-400 text-xs font-medium mb-2 uppercase tracking-wide">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#252525] p-3 rounded-xl text-white focus:outline-none focus:border-[#A3E635] transition-colors"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-neutral-400 text-xs font-medium mb-2 uppercase tracking-wide">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#252525] p-3 rounded-xl text-white focus:outline-none focus:border-[#A3E635] transition-colors min-h-[100px]"
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-neutral-400 hover:text-white transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-[#A3E635] text-black font-bold rounded-xl hover:bg-[#b0f542] transition-colors disabled:opacity-50 text-sm"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
