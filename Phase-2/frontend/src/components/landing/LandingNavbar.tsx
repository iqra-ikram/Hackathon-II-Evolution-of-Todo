"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowRight, User } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const LandingNavbar = () => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const handleLogout = async () => {
      await authClient.signOut({
          fetchOptions: {
              onSuccess: () => {
                  router.push("/login");
              },
          },
      });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 backdrop-blur-md bg-black/50 border-b border-white/5">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
            <span className="font-bold text-black text-lg tracking-tighter">INI</span>
        </div>
        <span className="text-xl font-bold text-white tracking-wide hidden sm:block">Check Box</span>
      </Link>

      {/* Links */}
      <div className="hidden md:flex items-center space-x-8">
        <Link href="#features" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">Features</Link>
        <Link href="#pricing" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">Pricing</Link>
        <Link href="#about" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">About</Link>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center space-x-4">
        {isPending ? (
            <div className="h-9 w-24 bg-white/10 rounded-full animate-pulse"></div>
        ) : session ? (
            <>
                <Link 
                    href="/dashboard" 
                    className="flex items-center space-x-2 bg-[#A3E635] hover:bg-[#8CD520] text-black px-5 py-2.5 rounded-full text-sm font-bold transition-all transform hover:scale-105"
                >
                    <span>Dashboard</span>
                    <ArrowRight size={16} />
                </Link>
                <Link href="/profile" className="flex items-center justify-center w-10 h-10 rounded-full bg-[#111111] border border-[#252525] text-white hover:border-[#A3E635] transition-colors">
                     {session.user.image ? (
                         <img src={session.user.image} alt="Profile" className="w-full h-full rounded-full object-cover" />
                     ) : (
                         <User size={18} />
                     )}
                </Link>
            </>
        ) : (
            <>
                <Link href="/login" className="text-sm font-medium text-white hover:text-neutral-300 transition-colors">
                  Log in
                </Link>
                <Link 
                    href="/signup" 
                    className="flex items-center space-x-2 bg-white text-black px-5 py-2.5 rounded-full text-sm font-bold hover:bg-neutral-200 transition-all"
                >
                  <span>Get Started</span>
                </Link>
            </>
        )}
      </div>
    </nav>
  );
};

export default LandingNavbar;
