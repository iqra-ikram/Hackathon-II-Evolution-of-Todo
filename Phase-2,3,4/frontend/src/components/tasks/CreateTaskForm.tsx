"use client";
import { useState } from "react";
import { fetchClient } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function CreateTaskForm({ onTaskCreated }: { onTaskCreated?: () => void }) {
  const { data: session } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) return;

    setIsSubmitting(true);
    try {
      await fetchClient(`/${session.user.id}/tasks`, {
        method: "POST",
        body: JSON.stringify({ title, description }),
        // token: ...
      });
      setTitle("");
      setDescription("");
      if (onTaskCreated) onTaskCreated();
    } catch (error) {
      alert("Failed to create task");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-6 bg-[#111111] border border-[#1a1a1a] rounded-[32px] shadow-lg">
      <h3 className="font-bold text-white mb-4 uppercase tracking-wide text-sm">New Task</h3>
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full p-3 bg-[#1a1a1a] border border-[#252525] rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-[#A3E635] transition-colors text-sm"
          required
        />
      </div>
      <div className="mb-4">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          className="w-full p-3 bg-[#1a1a1a] border border-[#252525] rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-[#A3E635] transition-colors text-sm min-h-[80px]"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#A3E635] text-black font-bold py-3 rounded-xl hover:bg-[#b0f542] transition-colors disabled:opacity-50 text-sm"
      >
        {isSubmitting ? "Creating..." : "Add Task"}
      </button>
    </form>
  );
}
