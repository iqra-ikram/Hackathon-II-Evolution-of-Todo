import React from "react";
import { Search, Box, BarChart3, MessageSquare } from "lucide-react";
import Image from "next/image";

const Header = () => {
  return (
    <div className="flex items-center justify-between w-full py-6 px-8 bg-[#080808]">
      {/* Left: Tabs */}
      <div className="flex items-center space-x-2">
        <button className="flex items-center space-x-2 px-6 py-3 bg-[#1a1a1a] text-white rounded-full transition-all duration-300 shadow-sm border border-[#252525]">
          <Box size={18} />
          <span className="font-semibold text-sm tracking-tight">Check Box</span>
        </button>
        <button className="flex items-center space-x-2 px-6 py-3 text-neutral-500 hover:text-white transition-all duration-300 rounded-full hover:bg-[#121212]">
          <BarChart3 size={18} />
          <span className="font-medium text-sm">Monitoring</span>
        </button>
        <button className="flex items-center space-x-2 px-6 py-3 text-neutral-500 hover:text-white transition-all duration-300 rounded-full hover:bg-[#121212]">
          <MessageSquare size={18} />
          <span className="font-medium text-sm">Support</span>
        </button>
        <button className="p-3 text-neutral-500 hover:text-white transition-all duration-300 rounded-full hover:bg-[#121212]">
          <Search size={20} />
        </button>
      </div>

      {/* Right: User Profile */}
      <div className="flex items-center space-x-5">
        <div className="text-right hidden sm:block">
          <p className="text-white font-bold text-sm tracking-tight">Bogdan Nikitin</p>
          <p className="text-neutral-500 text-[11px] font-medium">@Nixtio</p>
        </div>
        <div className="relative cursor-pointer transition-transform hover:scale-105">
          {/* Placeholder for Avatar */}
          <div className="w-11 h-11 rounded-full bg-neutral-800 overflow-hidden border-2 border-[#1a1a1a] shadow-md">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Bogdan" alt="User" />
          </div>
          {/* Notification Badge */}
          <div className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-5 h-5 bg-red-600 text-white text-[10px] font-bold rounded-full border-2 border-[#080808] animate-pulse">
            2
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
