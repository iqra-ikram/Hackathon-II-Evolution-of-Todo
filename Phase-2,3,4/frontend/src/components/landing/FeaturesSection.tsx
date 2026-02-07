import React from 'react';
import { BarChart3, Users, Zap, Shield, Layers, Command } from 'lucide-react';

const features = [
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    desc: "Monitor your team's performance with live data updates and custom visualizations.",
    color: "text-[#A3E635]",
    bg: "bg-[#A3E635]/10"
  },
  {
    icon: Users,
    title: "Team Collaboration",
    desc: "Seamlessly work together with built-in chat, comments, and role-based permissions.",
    color: "text-[#F97316]",
    bg: "bg-[#F97316]/10"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Built on a modern stack ensuring <100ms response times for every interaction.",
    color: "text-white",
    bg: "bg-white/10"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    desc: "Bank-grade encryption and SOC2 compliance out of the box.",
    color: "text-[#A3E635]",
    bg: "bg-[#A3E635]/10"
  },
  {
    icon: Layers,
    title: "Project Timeline",
    desc: "Visual Gantt charts to keep your roadmap on track and stakeholders informed.",
    color: "text-[#F97316]",
    bg: "bg-[#F97316]/10"
  },
  {
    icon: Command,
    title: "Keyboard First",
    desc: "Navigate the entire interface without ever touching your mouse.",
    color: "text-white",
    bg: "bg-white/10"
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 px-6 relative bg-black">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Everything you need <br/> to <span className="text-[#A3E635]">scale faster.</span>
            </h2>
            <p className="text-neutral-400 max-w-xl mx-auto">
                Powerful features wrapped in a stunning interface. Designed for teams who care about the details.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div 
                key={idx} 
                className="group p-8 rounded-[32px] bg-[#111111] border border-neutral-900 hover:border-neutral-700 transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${feature.bg}`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#A3E635] transition-colors">
                {feature.title}
              </h3>
              <p className="text-neutral-400 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
