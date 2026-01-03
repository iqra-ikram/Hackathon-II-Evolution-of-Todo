'use client';

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import StatCard from "@/components/dashboard/StatCard";
import ProductChartCard from "@/components/dashboard/ProductChartCard";
import { ChevronDown, LayoutGrid, Loader2 } from "lucide-react";
import { DashboardResponse } from "@/types/dashboard";
import CreateTaskForm from "@/components/tasks/CreateTaskForm";
import TaskList from "@/components/tasks/TaskList";
import { fetchClient } from "@/lib/api";
import ChatInterface from "@/components/chat/ChatInterface";
import { MessageSquare, X } from "lucide-react";

import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchClient('/dashboard/data'); // Use fetchClient!
        setData(res);
      } catch (error: any) {
        console.error(error);
        setError(error.message || "Failed to load dashboard data");
        if (error.message?.includes("401") || error.message?.includes("Unauthorized")) {
          router.push("/login"); // Force re-login
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  if (loading) {
    return (
      <div className="flex w-full h-screen bg-black items-center justify-center text-white">
        <Loader2 className="animate-spin mr-2" /> Loading Dashboard...
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex w-full h-screen bg-black items-center justify-center text-red-500 flex-col gap-4">
        <p>Error: {error || "No data available"}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="flex w-full h-screen bg-black overflow-hidden font-sans relative">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <Header />

        {/* Scrollable Content Area */}
        <div className="flex-1 p-8 overflow-y-auto">

          {/* Title and Filters Row */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-white tracking-wide uppercase font-sans">
              CHECK BOX
            </h1>

            <div className="flex items-center space-x-4">
              {/* Date Filter */}
              <button className="flex items-center space-x-2 bg-[#111111] px-5 py-2.5 rounded-full text-neutral-400 hover:text-white transition-colors border border-transparent hover:border-neutral-800">
                <span className="text-sm">Date: <span className="text-white">Now</span></span>
                <ChevronDown size={14} />
              </button>

              {/* Product Filter */}
              <button className="flex items-center space-x-2 bg-[#111111] px-5 py-2.5 rounded-full text-neutral-400 hover:text-white transition-colors border border-transparent hover:border-neutral-800">
                <span className="text-sm">Product: <span className="text-white">All</span></span>
                <ChevronDown size={14} />
              </button>

              {/* Profile Filter */}
              <button className="flex items-center space-x-2 bg-[#111111] px-5 py-2.5 rounded-full text-neutral-400 hover:text-white transition-colors border border-transparent hover:border-neutral-800">
                <span className="text-sm">Profile: <span className="text-white">Bogdan</span></span>
                <ChevronDown size={14} />
              </button>

              {/* View Toggle */}
              <button className="flex items-center justify-center w-10 h-10 bg-[#111111] rounded-full text-white hover:bg-neutral-800 transition-colors border border-neutral-800">
                <LayoutGrid size={18} />
              </button>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100%-80px)]">

            {/* Left Column (Stats + Product Chart) - spans 7 cols */}
            <div className="lg:col-span-7 flex flex-col gap-6 h-full">

              {/* Top Row: 2 Small Stat Cards */}
              <div className="grid grid-cols-2 gap-6 h-[45%]">
                <StatCard data={data.customer_stat} type="line" />
                <StatCard data={data.product_stat} type="dots" />
              </div>

              {/* Bottom Row: Large Product Bar Chart */}
              <div className="h-[55%]">
                <ProductChartCard data={data.product_chart} />
              </div>
            </div>

            {/* Right Column (Tasks) - spans 5 cols */}
            <div className="lg:col-span-5 h-full flex flex-col gap-6">
              <CreateTaskForm onTaskCreated={() => setRefreshKey(k => k + 1)} />
              <div className="bg-[#111111] rounded-[32px] p-6 flex-1 overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-bold text-sm tracking-wide uppercase">
                    YOUR TASKS
                  </h3>
                </div>
                <TaskList key={refreshKey} />
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Floating Chat Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className={`absolute bottom-8 right-8 w-16 h-16 rounded-full shadow-2xl z-50 flex items-center justify-center transition-all duration-500 transform hover:scale-110 active:scale-95 ${showChat ? 'bg-[#1a1a1a] border border-[#333]' : 'bg-[#A3E635] hover:shadow-[#A3E635]/20'
          }`}
      >
        {showChat ? (
          <X size={24} className="text-white" />
        ) : (
          <img src="/bot-icon.svg" alt="Chat" className="w-12 h-12 object-contain" />
        )}
      </button>

      {/* Floating Chat Window */}
      {showChat && (
        <div className="absolute bottom-28 right-8 w-[420px] h-[650px] bg-[#111111]/95 backdrop-blur-xl rounded-[32px] shadow-[0_0_50px_rgba(0,0,0,0.5)] z-40 overflow-hidden border border-[#1a1a1a] animate-in fade-in slide-in-from-bottom-5 duration-300">
          <ChatInterface />
        </div>
      )}
    </div>
  );
}