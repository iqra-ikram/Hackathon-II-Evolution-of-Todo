import React from 'react';
import LandingNavbar from '@/components/landing/LandingNavbar';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import Footer from '@/components/landing/Footer';

export default function LandingContent() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#A3E635] selection:text-black">
      <LandingNavbar />
      
      <main>
        <HeroSection />
        <FeaturesSection />
      </main>

      <Footer />
    </div>
  );
}