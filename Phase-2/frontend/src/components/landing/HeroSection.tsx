import React from 'react';
import Link from 'next/link';
import { ArrowRight, PlayCircle, CheckCircle2, Activity, Users, Search, Bell, BarChart2, PieChart } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-32 md:pt-48 md:pb-48 px-6 overflow-hidden bg-black selection:bg-[#A3E635] selection:text-black">
      {/* Refined Background - Subtle Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-[#A3E635] opacity-20 blur-[100px]"></div>
           <div className="absolute right-0 bottom-0 -z-10 h-[310px] w-[310px] rounded-full bg-[#F97316] opacity-10 blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-[#A3E635] hover:bg-white/10 transition-colors backdrop-blur-sm cursor-pointer">
          <span className="flex h-2 w-2 relative">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A3E635] opacity-75"></span>
             <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A3E635]"></span>
          </span>
          <span>Introducing V2.0</span>
          <ArrowRight size={14} className="ml-1" />
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-8 leading-[1.1]">
          Project management <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
             refined for speed.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
          Experience the next generation of task tracking. 
          Beautifully designed, blazingly fast, and built for high-performance teams.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Link 
            href="/dashboard" 
            className="h-12 px-8 rounded-full bg-[#A3E635] text-black font-semibold flex items-center gap-2 hover:bg-[#b2f04e] transition-all hover:scale-105 active:scale-95"
          >
            Get Started Free
            <ArrowRight size={18} />
          </Link>
          <button className="h-12 px-8 rounded-full bg-transparent border border-white/10 text-white font-medium flex items-center gap-2 hover:bg-white/5 transition-all">
            <PlayCircle size={18} />
            Watch Demo
          </button>
        </div>

        {/* High-Fidelity Mockup */}
        <div className="relative mx-auto max-w-5xl">
            {/* Glow behind mockup */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#A3E635]/20 to-[#F97316]/20 rounded-2xl blur-xl opacity-50"></div>
            
            <div className="relative rounded-xl border border-white/10 bg-[#0A0A0A] shadow-2xl overflow-hidden">
                {/* Window Controls */}
                <div className="h-12 border-b border-white/5 flex items-center px-4 gap-2 bg-[#0A0A0A]">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                    </div>
                    <div className="flex-1 text-center text-xs text-neutral-600 font-mono">dashboard.app.com</div>
                </div>

                {/* UI Content */}
                <div className="flex h-[600px] text-left">
                    {/* Sidebar */}
                    <div className="w-64 border-r border-white/5 bg-[#050505] p-4 hidden md:flex flex-col gap-6">
                        <div className="flex items-center gap-2 px-2">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-black font-bold">INI</div>
                            <span className="text-white font-bold">Check Box</span>
                        </div>
                        
                        <div className="space-y-1">
                            <div className="flex items-center gap-3 px-3 py-2 bg-white/5 rounded-lg text-white text-sm font-medium cursor-pointer">
                                <BarChart2 size={18} />
                                Dashboard
                            </div>
                            <div className="flex items-center gap-3 px-3 py-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg text-sm font-medium transition-colors cursor-pointer">
                                <Activity size={18} />
                                Activity
                            </div>
                             <div className="flex items-center gap-3 px-3 py-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg text-sm font-medium transition-colors cursor-pointer">
                                <PieChart size={18} />
                                Reports
                            </div>
                            <div className="flex items-center gap-3 px-3 py-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg text-sm font-medium transition-colors cursor-pointer">
                                <Users size={18} />
                                Team
                            </div>
                        </div>

                        <div className="mt-auto">
                            <div className="p-4 rounded-xl bg-gradient-to-br from-[#A3E635]/20 to-transparent border border-[#A3E635]/20">
                                <p className="text-xs text-[#A3E635] font-bold mb-1">Pro Plan</p>
                                <p className="text-xs text-neutral-400 mb-3">Your trial ends in 3 days.</p>
                                <button className="w-full py-1.5 bg-[#A3E635] text-black text-xs font-bold rounded hover:bg-[#92d326] transition-colors">Upgrade</button>
                            </div>
                        </div>
                    </div>

                    {/* Main Area */}
                    <div className="flex-1 bg-[#0A0A0A] p-6 overflow-hidden flex flex-col gap-6">
                        {/* Header */}
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-white">Overview</h2>
                                <p className="text-sm text-neutral-500">Welcome back, Alex</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-2 text-neutral-400 hover:text-white cursor-pointer"><Search size={20} /></div>
                                <div className="p-2 text-neutral-400 hover:text-white cursor-pointer"><Bell size={20} /></div>
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#A3E635] to-[#F97316]"></div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="p-5 rounded-2xl bg-[#111111] border border-white/5">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 rounded-lg bg-[#A3E635]/10 text-[#A3E635]"><Activity size={20} /></div>
                                    <span className="text-xs text-[#A3E635] bg-[#A3E635]/10 px-2 py-1 rounded-full">+12%</span>
                                </div>
                                <div className="text-2xl font-bold text-white mb-1">24</div>
                                <div className="text-sm text-neutral-500">Active Projects</div>
                            </div>
                            <div className="p-5 rounded-2xl bg-[#111111] border border-white/5">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 rounded-lg bg-[#F97316]/10 text-[#F97316]"><CheckCircle2 size={20} /></div>
                                    <span className="text-xs text-F97316] bg-[#F97316]/10 px-2 py-1 rounded-full">+5%</span>
                                </div>
                                <div className="text-2xl font-bold text-white mb-1">1,204</div>
                                <div className="text-sm text-neutral-500">Completed Tasks</div>
                            </div>
                             <div className="p-5 rounded-2xl bg-[#111111] border border-white/5">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500"><Users size={20} /></div>
                                    <span className="text-xs text-blue-500 bg-blue-500/10 px-2 py-1 rounded-full">+8%</span>
                                </div>
                                <div className="text-2xl font-bold text-white mb-1">84</div>
                                <div className="text-sm text-neutral-500">Team Members</div>
                            </div>
                        </div>

                        {/* Chart Area */}
                        <div className="flex-1 rounded-2xl bg-[#111111] border border-white/5 p-6 relative overflow-hidden flex flex-col">
                             <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-white">Productivity Trend</h3>
                                <div className="flex gap-2 items-center">
                                    <span className="w-2 h-2 rounded-full bg-[#A3E635]"></span>
                                    <span className="text-xs text-neutral-400">This Week</span>
                                </div>
                             </div>
                             
                             {/* CSS Bar Chart */}
                             <div className="flex-1 flex items-end justify-between gap-4">
                                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
                                    <div key={i} className="w-full bg-[#222] rounded-t-lg relative group overflow-hidden h-full flex items-end">
                                        <div 
                                            className="w-full bg-[#A3E635] opacity-80 rounded-t-lg transition-all duration-1000 group-hover:bg-[#b2f04e]" 
                                            style={{ height: `${h}%` }}
                                        ></div>
                                    </div>
                                ))}
                             </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        {/* Logos */}
        <div className="mt-20 border-t border-white/5 pt-10">
            <p className="text-sm text-neutral-500 font-medium mb-8 tracking-widest">TRUSTED BY INNOVATIVE TEAMS</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                {['Acme Corp', 'GlobalBank', 'Nebula', 'Sisyphus', 'AltShift'].map(name => (
                    <span key={name} className="text-xl md:text-2xl font-bold text-white font-mono cursor-default hover:text-[#A3E635] transition-colors">{name}</span>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
