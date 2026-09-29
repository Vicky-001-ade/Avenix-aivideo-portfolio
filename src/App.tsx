/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { CustomCursor } from './components/CustomCursor';
import { DarkThemeAmbientBackground } from './components/DarkThemeAmbientBackground';
import { LightThemeAmbientBackground } from './components/LightThemeAmbientBackground';
import { CinematicTextController } from './components/CinematicTextController';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AvenixSplashScreen } from './components/AvenixSplashScreen';
import { MarqueeStatement } from './components/MarqueeStatement';
import { FeaturedWork } from './components/FeaturedWork';
import { CinematicVideoShowcase } from './components/CinematicVideoShowcase';
import { AIVisualsGallery } from './components/AIVisualsGallery';
import { ProcessSection } from './components/ProcessSection';
import { AboutSection } from './components/AboutSection';
import { ToolsTechnology } from './components/ToolsTechnology';
import { SocialProofSection } from './components/SocialProofSection';
import { VisionToRealitySection } from './components/VisionToRealitySection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { VisualLightboxModal } from './components/VisualLightboxModal';
import { Project, AIVisual } from './types';
import { FEATURED_PROJECTS } from './data/portfolioData';

function AppContent() {
  const { currentPage } = useNavigation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedVisual, setSelectedVisual] = useState<AIVisual | null>(null);

  const handleOpenVideoReel = () => {
    const motionSection = document.getElementById('motion-showcase');
    if (motionSection) {
      motionSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInquireService = (_serviceTitle: string) => {
    const contactSection = document.getElementById('contact') || document.getElementById('testimonials');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Full-Screen Cinematic AVENIX Splash / Loading Screen */}
      <AvenixSplashScreen />

      <div className="relative min-h-screen selection:bg-blue-600 selection:text-white transition-colors duration-500">
        {/* Interactive atmospheric backgrounds (each active only in its respective theme) */}
        <DarkThemeAmbientBackground />
        <LightThemeAmbientBackground />
        <CinematicTextController />

        {/* Custom cursor for desktop */}
        <CustomCursor />

        {/* Global sticky navigation */}
        <Navbar />

        {/* Main page content sections */}
        <main className="relative z-10">
          {/* 1. Hero Section */}
          <HeroSection onOpenVideoReel={handleOpenVideoReel} />

          {/* Scrolling brand statement marquee */}
          <MarqueeStatement />

          {/* 2. Selected Work */}
          <FeaturedWork onSelectProject={(project) => setSelectedProject(project)} />

          {/* 3. Introduction Video Section ("Meet The Mind Behind Avenix") */}
          <CinematicVideoShowcase />

          {/* 4. AI Visuals Section */}
          <AIVisualsGallery onSelectVisual={(visual) => setSelectedVisual(visual)} />

          {/* 5. Social Proof Section ("Trusted by Visionaries. Powered by Imagination.") */}
          <SocialProofSection />

          {/* 6. From Concept To Screen ("Process") */}
          <ProcessSection />

          {/* 7. Meet The Founder */}
          <AboutSection />

          {/* 8. Pricing Section ("Flexible Pricing For Every Vision") */}
          <ToolsTechnology />

          {/* 9. Ready To Turn Your Vision Into Cinematic AI Reality Section */}
          <VisionToRealitySection />

          {/* 10. Final CTA Section ("Visual.") */}
          <FinalCTA />
        </main>

        {/* 11. Footer Section */}
        <Footer />

        {/* Modals */}
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onSelectProject={(proj) => setSelectedProject(proj)}
          allProjects={FEATURED_PROJECTS}
        />

        <VisualLightboxModal
          visual={selectedVisual}
          onClose={() => setSelectedVisual(null)}
        />
      </div>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </ThemeProvider>
  );
}
