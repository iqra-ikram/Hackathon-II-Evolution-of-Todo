'use client';

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import StatCard from "@/components/dashboard/StatCard";
import TimelineCard from "@/components/dashboard/TimelineCard";
import ProductChartCard from "@/components/dashboard/ProductChartCard";
import { ChevronDown, LayoutGrid, Loader2 } from "lucide-react";
import { DashboardResponse } from "@/types/dashboard";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/data`);
              if (!res.ok) throw new Error("Failed to fetch dashboard data");
              const jsonData = await res.json();
              setData(jsonData);
          } catch (error) {
              console.error(error);
          } finally {
              setLoading(false);
          }
      };
      fetchData();
  }, []);

  if (loading || !data) {
      return (
          <div className="flex w-full h-screen bg-black items-center justify-center text-white">
              <Loader2 className="animate-spin mr-2" /> Loading Dashboard...
          </div>
      )
  }

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

            {/* Right Column (Timeline) - spans 5 cols */}
            <div className="lg:col-span-5 h-full">
                <TimelineCard data={data.timeline} />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}