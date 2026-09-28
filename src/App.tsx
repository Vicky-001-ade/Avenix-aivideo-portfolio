/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
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
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { AboutSection } from './components/AboutSection';
import { ToolsTechnology } from './components/ToolsTechnology';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { VisualLightboxModal } from './components/VisualLightboxModal';
import { Project, AIVisual } from './types';
import { FEATURED_PROJECTS } from './data/portfolioData';

export default function App() {
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
    <ThemeProvider>
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
          {/* Hero */}
          <HeroSection onOpenVideoReel={handleOpenVideoReel} />

          {/* Scrolling brand statement marquee */}
          <MarqueeStatement />

          {/* Selected Work (Editorial Asymmetric Bento Masonry) */}
          <FeaturedWork onSelectProject={(project) => setSelectedProject(project)} />

          {/* Dedicated Cinematic Video Showcase */}
          <CinematicVideoShowcase />

          {/* AI Visuals Gallery (Separate from video work, varied aspect ratios) */}
          <AIVisualsGallery onSelectVisual={(visual) => setSelectedVisual(visual)} />

          {/* Services: What I Create */}
          <ServicesSection onInquireService={handleInquireService} />

          {/* Process: From Concept to Screen */}
          <ProcessSection />

          {/* About Section: AI Is The Tool. Story Is The Point. */}
          <AboutSection />

          {/* Tools & Technology: Creative Instruments */}
          <ToolsTechnology />

          {/* Testimonials */}
          <TestimonialsSection />

          {/* Dramatic Final Call-To-Action */}
          <FinalCTA />
        </main>

        {/* Footer */}
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
    </ThemeProvider>
  );
}
