import React from "react";
import { MoreHorizontal } from "lucide-react";
import { ProductChartData } from "@/types/dashboard";

interface ProductChartCardProps {
    data: ProductChartData;
}

const ProductChartCard: React.FC<ProductChartCardProps> = ({ data }) => {
  const { columns, total } = data;

  // Helper to map type to color
  const getColor = (type: string) => {
      switch(type) {
          case 'valid': return 'bg-[#A3E635]';
          case 'invalid': return 'bg-[#F97316]';
          case 'resources': return 'bg-white';
          default: return 'bg-neutral-800';
      }
  }

  // Helper to normalize height roughly for visual consistency (mock scale)
  const getHeight = (val: number) => {
      if (val > 80) return 'h-16';
      if (val > 60) return 'h-14';
      if (val > 40) return 'h-12';
      if (val > 25) return 'h-10';
      return 'h-8';
  }

  return (
    <div className="flex flex-col p-6 bg-[#111111] rounded-[32px] h-full w-full relative">
       {/* Header */}
       <div className="flex items-center justify-between mb-8">
        <h3 className="text-white font-bold text-sm tracking-wide uppercase">
          PRODUCT
        </h3>
        <button className="text-neutral-500 hover:text-white">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Bar Chart Area */}
      <div className="flex-1 flex justify-between items-end px-2 space-x-2">
         {columns.map((col, idx) => (
             <div key={idx} className="flex flex-col space-y-3 items-center w-full">
                 {/* Top Segment */}
                 <div className={`w-full ${getHeight(col.segments[1].value)} ${getColor(col.segments[1].type)} rounded-full flex items-center justify-center`}>
                    <span className="text-[10px] font-bold text-black">{col.segments[1].value}</span>
                 </div>
                 {/* Dot Separator */}
                 <div className="w-1.5 h-1.5 bg-neutral-700 rounded-full"></div>
                 {/* Bottom Segment */}
                 <div className={`w-full ${getHeight(col.segments[0].value)} ${getColor(col.segments[0].type)} rounded-full flex items-center justify-center`}>
                    <span className="text-[10px] font-bold text-black">{col.segments[0].value}</span>
                 </div>
             </div>
         ))}
      </div>

       {/* Legend */}
       <div className="flex items-center space-x-6 mt-8">
        <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-white border-4 border-[#111111] outline outline-1 outline-neutral-500"></div>
            <span className="text-white text-[10px] font-medium">Resources</span>
        </div>
        <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-[#A3E635] border-4 border-[#111111] outline outline-1 outline-[#A3E635]"></div>
            <span className="text-white text-[10px] font-medium">Valid</span>
        </div>
        <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-[#F97316] border-4 border-[#111111] outline outline-1 outline-[#F97316]"></div>
            <span className="text-white text-[10px] font-medium">Invalid</span>
        </div>
        <div className="ml-auto text-neutral-500 text-[10px]">
            Total: <span className="text-white font-bold">{total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductChartCard;
