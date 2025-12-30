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
      await fetchClient(`/api/${session.user.id}/tasks`, {
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
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded bg-gray-50">
      <h3 className="font-bold mb-2">New Task</h3>
      <div className="mb-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-2">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isSubmitting ? "Creating..." : "Add Task"}
      </button>
    </form>
  );
}
