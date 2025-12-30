"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await authClient.signIn.email({
      email,
      password,
    }, {
      onSuccess: () => {
        router.push("/dashboard");
      },
      onError: (ctx) => {
        alert(ctx.error.message);
      },
    });
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4 max-w-sm mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold">Login</h2>
      <div>
        <label className="block text-sm">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
      </div>
      <button type="submit" className="bg-green-500 text-white p-2 w-full rounded">
        Login
      </button>
    </form>
  );
}
