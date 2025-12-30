import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const LandingNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 backdrop-blur-md bg-black/50 border-b border-white/5">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
            <span className="font-bold text-black text-lg tracking-tighter">INI</span>
        </div>
        <span className="text-xl font-bold text-white tracking-wide hidden sm:block">Check Box</span>
      </div>

      {/* Links - Hidden on mobile for simplicity in this MVP */}
      <div className="hidden md:flex items-center space-x-8">
        <Link href="#features" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">Features</Link>
        <Link href="#pricing" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">Pricing</Link>
        <Link href="#about" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">About</Link>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center space-x-4">
        <Link href="/login" className="text-sm font-medium text-white hover:text-neutral-300 transition-colors">
          Log in
        </Link>
        <Link 
            href="/dashboard" 
            className="flex items-center space-x-2 bg-[#A3E635] hover:bg-[#8CD520] text-black px-5 py-2.5 rounded-full text-sm font-bold transition-all transform hover:scale-105"
        >
          <span>Get Started</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </nav>
  );
};

export default LandingNavbar;
