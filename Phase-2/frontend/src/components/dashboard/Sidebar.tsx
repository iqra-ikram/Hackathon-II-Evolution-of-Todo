import React from "react";
import { Heart, Calendar, Diamond, Settings, Plus } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="flex flex-col items-center justify-between w-20 h-screen py-8 bg-[#080808] border-r border-[#1a1a1a] flex-shrink-0 sticky top-0 left-0">
      {/* Logo */}
      <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full mb-12 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
        <span className="font-bold text-black text-xl tracking-tighter">NI</span>
      </div>

      {/* Navigation */}
      <div className="flex flex-col items-center space-y-4 flex-1">
        <button className="p-3.5 text-neutral-500 hover:text-white transition-all duration-300 rounded-2xl hover:bg-[#1a1a1a]">
          <Heart size={22} strokeWidth={2} />
        </button>
        <button className="p-3.5 text-white bg-[#1a1a1a] rounded-2xl transition-all duration-300 shadow-lg">
          <Calendar size={22} strokeWidth={2.5} />
        </button>
        <button className="p-3.5 text-neutral-500 hover:text-white transition-all duration-300 rounded-2xl hover:bg-[#1a1a1a]">
          <Diamond size={22} strokeWidth={2} />
        </button>
        <button className="p-3.5 text-neutral-500 hover:text-white transition-all duration-300 rounded-2xl hover:bg-[#1a1a1a]">
          <Settings size={22} strokeWidth={2} />
        </button>
      </div>

      {/* Add Button */}
      <button className="flex items-center justify-center w-12 h-12 text-white bg-[#1a1a1a] rounded-full hover:bg-[#252525] transition-all duration-300 shadow-md">
        <Plus size={24} />
      </button>
    </div>
  );
};

export default Sidebar;
