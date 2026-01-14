"use client";
import React from 'react';
import LandingContent from '@/components/landing/LandingContent';
import SignupForm from '@/components/auth/SignupForm';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="relative h-screen w-full bg-black overflow-hidden">
      {/* Blurred Background Content */}
      <div className="absolute inset-0 filter blur-md pointer-events-none select-none opacity-50 transform scale-[1.02]">
        <LandingContent />
      </div>

      {/* Signup Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-50 p-4 bg-black/40 backdrop-blur-[2px]">
        <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
            <div className="flex justify-center mb-8">
                 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                    <span className="font-bold text-black text-2xl tracking-tighter">NI</span>
                 </div>
            </div>
            
            <SignupForm />

            <div className="mt-8 text-center bg-black/50 p-4 rounded-xl backdrop-blur-md border border-white/5">
                <p className="text-neutral-400 text-sm">
                  Already have an account?{" "}
                  <Link href="/" className="text-white hover:text-[#A3E635] transition-colors font-bold underline decoration-[#A3E635]/50 hover:decoration-[#A3E635]">
                    Log in
                  </Link>
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}