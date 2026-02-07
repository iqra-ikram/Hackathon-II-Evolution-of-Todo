'use client';

import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import ProfileForm from "@/components/profile/ProfileForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="flex w-full h-screen bg-black overflow-hidden font-sans">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <Header />

        {/* Scrollable Content Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          
          <div className="mb-6 flex items-center gap-4">
            <Link href="/dashboard" className="p-2 bg-[#111111] rounded-full text-neutral-400 hover:text-white transition-colors">
                <ArrowLeft size={20} />
            </Link>
            <h1 className="text-3xl font-bold text-white tracking-wide uppercase font-sans">
              My Profile
            </h1>
          </div>

          <ProfileForm />

        </div>
      </div>
    </div>
  );
}