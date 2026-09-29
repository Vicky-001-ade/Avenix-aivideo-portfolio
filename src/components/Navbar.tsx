import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '../context/NavigationContext';
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react';
import avenixLogo from '../assets/images/avenix_logo_transparent.svg';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { currentPage, navigateTo } = useNavigation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (currentPage !== 'home') {
      navigateTo('home', id);
    } else {
      scrollToSection(id);
    }
  };

  const handleContactClick = () => {
    setMobileMenuOpen(false);
    navigateTo('contact');
  };

  const handleLogoClick = () => {
    setMobileMenuOpen(false);
    if (currentPage !== 'home') {
      navigateTo('home');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3 backdrop-blur-xl border-b shadow-sm'
            : 'py-5 bg-transparent border-b border-transparent'
        }`}
        style={{
          backgroundColor: isScrolled
            ? theme === 'dark'
              ? 'rgba(5, 7, 11, 0.82)'
              : 'rgba(248, 251, 254, 0.92)'
            : 'transparent',
          borderColor: isScrolled
            ? theme === 'dark'
              ? 'rgba(255, 255, 255, 0.08)'
              : '#DCE5F0'
            : 'transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Zone 1: Official Transparent AVENIX Brand Logo */}
          <button
            onClick={handleLogoClick}
            className="flex items-center group text-left focus:outline-none shrink-0 cursor-pointer"
            aria-label="AVENIX Homepage"
          >
            <img
              src={avenixLogo}
              alt="AVENIX"
              width={860}
              height={220}
              decoding="async"
              fetchPriority="high"
              className="h-7 sm:h-8 md:h-9 w-auto object-contain select-none transition-all duration-300 ease-out group-hover:brightness-115 group-hover:drop-shadow-[0_0_14px_rgba(56,189,248,0.48)]"
            />
          </button>

          {/* Zone 2: Navigation links matching reference image: Work, About, Process, Pricing, Testimonials */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button
              onClick={() => handleNavClick('work')}
              className={`transition-colors hover:underline underline-offset-8 cursor-pointer ${
                theme === 'dark' ? 'hover:text-blue-400' : 'hover:text-[#2A8CFF]'
              }`}
              style={{ color: theme === 'dark' ? '#E2E8F0' : '#1E293B' }}
            >
              Work
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`transition-colors hover:underline underline-offset-8 cursor-pointer ${
                theme === 'dark' ? 'hover:text-blue-400' : 'hover:text-[#2A8CFF]'
              }`}
              style={{ color: theme === 'dark' ? '#E2E8F0' : '#1E293B' }}
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('process')}
              className={`transition-colors hover:underline underline-offset-8 cursor-pointer ${
                theme === 'dark' ? 'hover:text-blue-400' : 'hover:text-[#2A8CFF]'
              }`}
              style={{ color: theme === 'dark' ? '#E2E8F0' : '#1E293B' }}
            >
              Process
            </button>
            <button
              onClick={() => handleNavClick('pricing')}
              className={`transition-colors hover:underline underline-offset-8 cursor-pointer ${
                theme === 'dark' ? 'hover:text-blue-400' : 'hover:text-[#2A8CFF]'
              }`}
              style={{ color: theme === 'dark' ? '#E2E8F0' : '#1E293B' }}
            >
              Pricing
            </button>
            <button
              onClick={() => handleNavClick('testimonials')}
              className={`transition-colors hover:underline underline-offset-8 cursor-pointer ${
                theme === 'dark' ? 'hover:text-blue-400' : 'hover:text-[#2A8CFF]'
              }`}
              style={{ color: theme === 'dark' ? '#E2E8F0' : '#1E293B' }}
            >
              Testimonials
            </button>
          </nav>

          {/* Zone 3: Primary action & Theme Toggle */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className={`p-2.5 rounded-full border transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                theme === 'dark'
                  ? 'border-white/10 bg-white/5 hover:border-blue-500/50 hover:bg-white/10 text-white'
                  : 'border-[#CBD8E8] bg-white/90 hover:border-[#2A8CFF]/60 hover:bg-[#F2F7FD] text-[#111827] shadow-xs'
              }`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-blue-400 group-hover:rotate-45 transition-transform duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-[#2A8CFF] group-hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* CTA Button Matching Reference Image: GET IN TOUCH */}
            <button
              onClick={() => scrollToSection('final-cta')}
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold uppercase tracking-wider font-mono-tech rounded-full text-white bg-blue-600 hover:bg-blue-500 shadow-[0_0_24px_rgba(22,119,255,0.45)] hover:shadow-[0_0_32px_rgba(56,189,248,0.65)] transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <span>GET IN TOUCH</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className={`md:hidden p-2.5 rounded-lg border transition-colors cursor-pointer ${
                theme === 'dark'
                  ? 'border-white/10 bg-white/5 text-white'
                  : 'border-[#CBD8E8] bg-white/90 text-[#111827]'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className={`fixed inset-0 z-30 md:hidden pt-24 px-8 pb-10 flex flex-col justify-between backdrop-blur-2xl transition-all duration-300 ${
            theme === 'dark' ? 'bg-[#05070B]/95 text-white' : 'bg-[#F7FAFD]/96 text-[#111827]'
          }`}
        >
          <div className="flex flex-col gap-6 py-8 border-t border-b"
            style={{
              borderColor: theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#DCE5F0',
            }}
          >
            <button
              onClick={() => handleNavClick('work')}
              className={`text-left font-display text-2xl font-bold transition-colors cursor-pointer ${
                theme === 'dark' ? 'hover:text-blue-400' : 'hover:text-[#2A8CFF]'
              }`}
            >
              Work
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`text-left font-display text-2xl font-bold transition-colors cursor-pointer ${
                theme === 'dark' ? 'hover:text-blue-400' : 'hover:text-[#2A8CFF]'
              }`}
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('process')}
              className={`text-left font-display text-2xl font-bold transition-colors cursor-pointer ${
                theme === 'dark' ? 'hover:text-blue-400' : 'hover:text-[#2A8CFF]'
              }`}
            >
              Process
            </button>
            <button
              onClick={() => handleNavClick('pricing')}
              className={`text-left font-display text-2xl font-bold transition-colors cursor-pointer ${
                theme === 'dark' ? 'hover:text-blue-400' : 'hover:text-[#2A8CFF]'
              }`}
            >
              Pricing
            </button>
            <button
              onClick={() => handleNavClick('testimonials')}
              className={`text-left font-display text-2xl font-bold transition-colors cursor-pointer ${
                theme === 'dark' ? 'hover:text-blue-400' : 'hover:text-[#2A8CFF]'
              }`}
            >
              Testimonials
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                scrollToSection('final-cta');
              }}
              className="w-full py-4 text-center font-bold uppercase tracking-wider font-mono-tech text-xs rounded-full text-white bg-blue-600 shadow-[0_0_24px_rgba(22,119,255,0.45)] cursor-pointer"
            >
              GET IN TOUCH
            </button>
            <div
              className={`flex items-center justify-between text-xs font-mono-tech ${
                theme === 'dark' ? 'text-slate-500' : 'text-[#475569]'
              }`}
            >
              <span>OGUNLEYE GOODLUCK</span>
              <span>AI VIDEO & VISUALS</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
