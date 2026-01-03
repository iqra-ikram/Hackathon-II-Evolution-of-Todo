"use client";
import React from 'react';
import LandingContent from '@/components/landing/LandingContent';
import LoginForm from '@/components/auth/LoginForm';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export default function LandingPage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
     return (
        <div className="flex h-screen w-full items-center justify-center bg-black text-white">
            <Loader2 className="animate-spin mr-2" /> Loading...
        </div>
     );
  }

  // If Logged In: Show Website (Interactive)
  if (session) {
      return <LandingContent />;
  }

  // If Not Logged In: Show Website (Blurred) + Login Overlay
  return (
    <div className="relative h-screen w-full bg-black overflow-hidden">
      {/* Blurred Background Content */}
      <div className="absolute inset-0 filter blur-md pointer-events-none select-none opacity-50 transform scale-[1.02]">
        <LandingContent />
      </div>

      {/* Login Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-50 p-4 bg-black/40 backdrop-blur-[2px]">
        <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
            <div className="flex justify-center mb-8">
                 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                    <span className="font-bold text-black text-2xl tracking-tighter">NI</span>
                 </div>
            </div>
            
            <LoginForm />

            <div className="mt-8 text-center bg-black/50 p-4 rounded-xl backdrop-blur-md border border-white/5">
                <p className="text-neutral-400 text-sm">
                  New here?{" "}
                  <Link href="/signup" className="text-white hover:text-[#A3E635] transition-colors font-bold underline decoration-[#A3E635]/50 hover:decoration-[#A3E635]">
                    Create an account
                  </Link>
                </p>
                <p className="text-xs text-neutral-600 mt-2">
                    Access to the platform requires authentication.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}