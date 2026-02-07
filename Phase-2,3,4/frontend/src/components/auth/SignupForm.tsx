"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await authClient.signUp.email({
      email,
      password,
      name,
    }, {
      onSuccess: () => {
        router.push("/");
      },
      onError: (ctx) => {
        setLoading(false);
        alert(ctx.error.message);
      },
    });
  };

  return (
    <div className="w-full bg-[#111111] border border-[#252525] rounded-[32px] p-8 shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white tracking-tight">Create Account</h2>
        <p className="text-neutral-500 text-sm mt-2">Get started with your dashboard</p>
      </div>

      <form onSubmit={handleSignup} className="space-y-5">
        <div>
          <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wide mb-2">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-[#252525] rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-[#A3E635] transition-colors"
            placeholder="John Doe"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wide mb-2">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-[#252525] rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-[#A3E635] transition-colors"
            placeholder="name@example.com"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wide mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-[#252525] rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-[#A3E635] transition-colors"
            placeholder="••••••••"
            required
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-[#A3E635] text-black font-bold py-3.5 rounded-xl hover:bg-[#b0f542] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
