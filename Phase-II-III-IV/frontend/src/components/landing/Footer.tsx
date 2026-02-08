import React from 'react';
import Link from 'next/link';
import { Twitter, Github, Linkedin, Instagram, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand & Newsletter - Spans 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full">
                    <span className="font-bold text-black text-xs tracking-tighter">INI</span>
                </div>
                <span className="text-white font-bold tracking-wide text-lg">Check Box</span>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
              The precision project management tool for modern teams. Built for speed, designed for focus.
            </p>
            
            <div className="space-y-2 pt-2">
                <label htmlFor="email" className="text-xs font-bold text-white uppercase tracking-wider">Subscribe to newsletter</label>
                <div className="flex gap-2">
                    <input 
                        id="email"
                        type="email" 
                        placeholder="Enter your email" 
                        className="bg-[#111111] border border-white/10 text-white text-sm rounded-lg px-4 py-2.5 w-full focus:outline-none focus:border-[#A3E635] transition-colors placeholder:text-neutral-600"
                    />
                    <button className="bg-[#A3E635] hover:bg-[#8CD520] text-black rounded-lg px-3 py-2.5 transition-colors">
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-1">
            <h4 className="text-white font-bold mb-6">Product</h4>
            <ul className="space-y-4">
                <li><Link href="#" className="text-neutral-400 hover:text-[#A3E635] text-sm transition-colors">Features</Link></li>
                <li><Link href="#" className="text-neutral-400 hover:text-[#A3E635] text-sm transition-colors">Integrations</Link></li>
                <li><Link href="#" className="text-neutral-400 hover:text-[#A3E635] text-sm transition-colors">Pricing</Link></li>
                <li><Link href="#" className="text-neutral-400 hover:text-[#A3E635] text-sm transition-colors">Changelog</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h4 className="text-white font-bold mb-6">Resources</h4>
            <ul className="space-y-4">
                <li><Link href="#" className="text-neutral-400 hover:text-[#A3E635] text-sm transition-colors">Documentation</Link></li>
                <li><Link href="#" className="text-neutral-400 hover:text-[#A3E635] text-sm transition-colors">API Reference</Link></li>
                <li><Link href="#" className="text-neutral-400 hover:text-[#A3E635] text-sm transition-colors">Community</Link></li>
                <li><Link href="#" className="text-neutral-400 hover:text-[#A3E635] text-sm transition-colors">Help Center</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4">
                <li><Link href="#" className="text-neutral-400 hover:text-[#A3E635] text-sm transition-colors">About</Link></li>
                <li><Link href="#" className="text-neutral-400 hover:text-[#A3E635] text-sm transition-colors">Blog</Link></li>
                <li><Link href="#" className="text-neutral-400 hover:text-[#A3E635] text-sm transition-colors">Careers</Link></li>
                <li><Link href="#" className="text-neutral-400 hover:text-[#A3E635] text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

           <div className="lg:col-span-1">
            <h4 className="text-white font-bold mb-6">Legal</h4>
            <ul className="space-y-4">
                <li><Link href="#" className="text-neutral-400 hover:text-[#A3E635] text-sm transition-colors">Privacy</Link></li>
                <li><Link href="#" className="text-neutral-400 hover:text-[#A3E635] text-sm transition-colors">Terms</Link></li>
                <li><Link href="#" className="text-neutral-400 hover:text-[#A3E635] text-sm transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-neutral-500 text-sm">
                © 2024 Check Box Inc. All rights reserved.
            </div>
            
            <div className="flex items-center gap-6">
                <Link href="#" className="text-neutral-500 hover:text-white transition-colors">
                    <Twitter size={20} />
                </Link>
                <Link href="#" className="text-neutral-500 hover:text-white transition-colors">
                    <Github size={20} />
                </Link>
                <Link href="#" className="text-neutral-500 hover:text-white transition-colors">
                    <Linkedin size={20} />
                </Link>
                <Link href="#" className="text-neutral-500 hover:text-white transition-colors">
                    <Instagram size={20} />
                </Link>
            </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;