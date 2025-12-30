import React from "react";
import { MoreHorizontal } from "lucide-react";
import { TimelineData } from "@/types/dashboard";

interface TimelineCardProps {
    data: TimelineData;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ data }) => {
  const { dates, items, total_projects } = data;

  const getColor = (cat: string) => {
      if (cat === 'customer') return 'bg-[#A3E635]';
      if (cat === 'product') return 'bg-[#F97316]';
      return 'bg-white';
  }

  return (
    <div className="flex flex-col p-6 bg-[#111111] rounded-[32px] h-full w-full relative">
       {/* Header */}
       <div className="flex items-center justify-between mb-6">
        <h3 className="text-white font-bold text-sm tracking-wide uppercase">
          PROJECTS TIMELINE
        </h3>
        <button className="text-neutral-500 hover:text-white">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Chart Area */}
      <div className="flex-1 flex relative mt-2">
        {/* Y-Axis Dates */}
        <div className="flex flex-col justify-between h-[85%] text-[10px] text-neutral-500 font-medium py-2 pr-4 border-r border-dashed border-neutral-800">
            {dates.map((date) => (
                <span key={date} className="leading-none">{date}</span>
            ))}
        </div>

        {/* Grid & Bars Container */}
        <div className="flex-1 relative h-[85%] ml-4">
            {/* Vertical Grid Lines */}
             <div className="absolute inset-0 flex justify-between pointer-events-none">
                 {[0, 5, 10, 15, 20, 25, 30].map(val => (
                     <div key={val} className="h-full border-r border-dashed border-neutral-800 last:border-0 relative">
                        {/* X-Axis Labels at bottom */}
                         <span className="absolute -bottom-8 -left-1 text-[10px] text-neutral-500">{val}</span>
                     </div>
                 ))}
             </div>

             {/* Bars */}
             <div className="absolute inset-0 flex flex-col justify-between py-1">
                {items.map((bar) => (
                    <div 
                        key={bar.id} 
                        className={`absolute h-8 rounded-full ${getColor(bar.category)} flex items-center justify-between px-1.5 shadow-lg`}
                        style={{ 
                            left: `${bar.start_percent}%`, 
                            width: `${bar.width_percent}%`, 
                            top: `${bar.day_index * 11.5}%` // Approximate vertical spacing
                        }}
                    >
                        {/* Left Icon/Content */}
                        <div className="flex items-center">
                            {bar.avatars ? (
                                <div className="flex -space-x-1.5">
                                    <div className="w-5 h-5 rounded-full bg-neutral-800 border border-white overflow-hidden"><img src="https://ui-avatars.com/api/?background=random&name=A" /></div>
                                    <div className="w-5 h-5 rounded-full bg-neutral-800 border border-white overflow-hidden"><img src="https://ui-avatars.com/api/?background=random&name=B" /></div>
                                    <div className="w-5 h-5 rounded-full bg-neutral-800 border border-white overflow-hidden"><img src="https://ui-avatars.com/api/?background=random&name=C" /></div>
                                </div>
                            ) : (
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${bar.category === 'web' ? 'bg-blue-500 text-white' : 'bg-black text-white'}`}>
                                    {bar.icon}
                                </div>
                            )}
                        </div>

                        {/* Value */}
                        <span className={`text-[10px] font-bold mr-2 text-black`}>
                            {bar.value}
                        </span>
                    </div>
                ))}
             </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center space-x-6 mt-8">
        <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#A3E635] ring-2 ring-[#A3E635] ring-opacity-20"></div>
            <span className="text-white text-[10px] font-medium">Customer</span>
        </div>
        <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#F97316] ring-2 ring-[#F97316] ring-opacity-20"></div>
            <span className="text-white text-[10px] font-medium">Product</span>
        </div>
        <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-white ring-2 ring-white ring-opacity-20"></div>
            <span className="text-white text-[10px] font-medium">Web</span>
        </div>
        <div className="ml-auto text-neutral-500 text-[10px]">
            Total: <span className="text-white font-bold">{total_projects}</span>
        </div>
      </div>
    </div>
  );
};

export default TimelineCard;
