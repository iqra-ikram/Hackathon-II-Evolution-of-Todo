import React from "react";
import { MoreHorizontal } from "lucide-react";
import { StatCardData } from "@/types/dashboard";

interface StatCardProps {
  data: StatCardData;
  type: "line" | "dots";
}

const StatCard: React.FC<StatCardProps> = ({ data, type }) => {
  const { title, metric_1, metric_2 } = data;

  return (
    <div className="flex flex-col p-6 bg-[#111111] rounded-[32px] h-full w-full relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-neutral-400 font-semibold text-xs tracking-wider uppercase">
          {title}
        </h3>
        <button className="text-neutral-500 hover:text-white">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Stats Row */}
      <div className="flex items-start space-x-8 mb-8 z-10">
        <div>
            {/* Indicator */}
            <div className={`w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent mb-2 ${metric_1.trend === 'up' ? 'border-b-[6px] border-b-[#A3E635]' : 'border-t-[6px] border-t-[#F97316]'}`}></div>
            <p className="text-3xl font-bold text-white mb-1">
                {metric_1.value.toLocaleString()}%
            </p>
            <p className="text-[10px] text-neutral-500 font-medium">
                {metric_1.label}
            </p>
        </div>
        <div>
             {/* Indicator */}
             <div className={`w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent mb-2 ${metric_2.trend === 'up' ? 'border-b-[6px] border-b-[#A3E635]' : 'border-t-[6px] border-t-[#F97316]'}`}></div>
             <p className="text-3xl font-bold text-white mb-1">
                {metric_2.value.toLocaleString()}%
            </p>
             <p className="text-[10px] text-neutral-500 font-medium">
                {metric_2.label}
             </p>
        </div>
      </div>

      {/* Chart Visualizations */}
      <div className="mt-auto w-full h-24 relative">
        {type === "line" && (
            // Simple SVG Line Chart for 'Customer'
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 50">
                <path 
                    d="M0,40 Q10,40 15,35 T30,45 T45,30 T60,35 T75,25 T90,30 T100,35" 
                    fill="none" 
                    stroke="#A3E635" 
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className="opacity-90"
                />
                 <path 
                    d="M0,30 Q15,45 25,30 T40,25 T55,40 T70,35 T85,30 T100,20" 
                    fill="none" 
                    stroke="#F97316" 
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className="opacity-90"
                />
            </svg>
        )}

        {type === "dots" && (
            // Dot Matrix for 'Product'
            <div className="flex flex-col justify-end h-full space-y-1.5 w-full">
               {[...Array(4)].map((_, rowIdx) => (
                    <div key={rowIdx} className="flex justify-between items-center w-full">
                        {[...Array(14)].map((_, colIdx) => {
                             // Logic to vary colors based on position to mimic the image
                             let color = "bg-neutral-800"; // default grey
                             
                             // Random-ish pattern replication
                             if (rowIdx === 3) {
                                color = colIdx % 2 === 0 ? "bg-[#A3E635]" : "bg-[#F97316]"; // Bottom row mixed
                             } else if (rowIdx === 2) {
                                if (colIdx > 2 && colIdx < 11) color = colIdx % 3 === 0 ? "bg-[#A3E635]" : "bg-neutral-800";
                                if (colIdx > 11) color = "bg-[#F97316]";
                             } else if (rowIdx === 1) {
                                 if (colIdx > 11) color = "bg-[#A3E635]";
                             }

                             return (
                                <div key={colIdx} className={`w-2 h-2 rounded-full ${color}`}></div>
                             )
                        })}
                    </div>
               ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
