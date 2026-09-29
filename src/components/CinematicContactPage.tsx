import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '../context/NavigationContext';
import {
  Mail,
  MessageCircle,
  Instagram,
  ArrowUpRight,
  ArrowLeft,
  Copy,
  Check,
  Sparkles,
  Send,
  CheckCircle2,
  X,
  Play,
  Layers,
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';
import avenixLogo from '../assets/images/avenix_logo_transparent.svg';
import studioWorkstationImg from '../assets/images/contact_cinematic_studio_1790618764613.jpg';

export const CinematicContactPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { navigateTo } = useNavigation();

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'AI Commercial & Video Reel',
    budget: '$5,000 - $15,000',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const nx = (e.clientX / window.innerWidth - 0.5) * 20;
      const ny = (e.clientY / window.innerHeight - 0.5) * 20;
      setMouseParallax({ x: nx, y: ny });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const copyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText('ogunleyegoodluck244@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsInquiryModalOpen(false);
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          projectType: 'AI Commercial & Video Reel',
          budget: '$5,000 - $15,000',
          message: '',
        });
      }, 2500);
    }, 1200);
  };

  return (
    <div
      ref={containerRef}
      className={`min-h-screen w-full relative overflow-x-hidden selection:bg-sky-500 selection:text-white transition-colors duration-500 ${
        theme === 'dark' ? 'bg-[#030814] text-white' : 'bg-[#F4F9FD] text-[#0F172A]'
      }`}
    >
      {/* =========================================================================
          ATMOSPHERIC BACKGROUND LIGHTING & GRADIENTS
          ========================================================================= */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        {/* Deep Cerulean Ambient Glow */}
        <div
          className="absolute -top-40 -left-40 w-[850px] h-[850px] rounded-full blur-[180px] opacity-70"
          style={{
            background:
              theme === 'dark'
                ? 'radial-gradient(circle, rgba(22, 119, 255, 0.28) 0%, rgba(56, 189, 248, 0.12) 45%, transparent 75%)'
                : 'radial-gradient(circle, rgba(42, 140, 255, 0.18) 0%, transparent 70%)',
          }}
        />

        {/* Center-Right Volumetric Atmosphere behind Workstation */}
        <div
          className="absolute top-1/3 -right-20 w-[950px] h-[750px] rounded-full blur-[190px] opacity-65"
          style={{
            background:
              theme === 'dark'
                ? 'radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, rgba(22, 119, 255, 0.15) 50%, transparent 80%)'
                : 'radial-gradient(circle, rgba(42, 140, 255, 0.14) 0%, transparent 70%)',
          }}
        />

        {/* Cybernetic Perspective Grid Texture */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(56, 189, 248, 0.9) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.9) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Ambient Top Laser Horizon */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-sky-400/60 to-transparent opacity-80" />
      </div>

      {/* =========================================================================
          TOP NAVIGATION HEADER
          ========================================================================= */}
      <header
        className={`sticky top-0 z-40 w-full backdrop-blur-xl border-b transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-[#030814]/85 border-white/10'
            : 'bg-white/85 border-[#DCE5F0]'
        }`}
      >
        <div className="max-w-[1520px] mx-auto px-5 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center group text-left focus:outline-none shrink-0 cursor-pointer"
            aria-label="AVENIX Homepage"
          >
            <img
              src={avenixLogo}
              alt="AVENIX"
              width={860}
              height={220}
              decoding="async"
              className="h-8 sm:h-9 w-auto object-contain select-none transition-all duration-300 ease-out group-hover:brightness-125 group-hover:drop-shadow-[0_0_16px_rgba(56,189,248,0.55)]"
            />
          </button>

          {/* Quick Nav Links (Return to Sections on Homepage) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            <button
              onClick={() => navigateTo('home', 'work')}
              className={`transition-colors hover:text-sky-400 cursor-pointer ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Work
            </button>
            <button
              onClick={() => navigateTo('home', 'motion-showcase')}
              className={`transition-colors hover:text-sky-400 cursor-pointer ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Motion Reel
            </button>
            <button
              onClick={() => navigateTo('home', 'visuals')}
              className={`transition-colors hover:text-sky-400 cursor-pointer ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              AI Visuals
            </button>
            <button
              onClick={() => navigateTo('home', 'services')}
              className={`transition-colors hover:text-sky-400 cursor-pointer ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Services
            </button>
            <button
              onClick={() => navigateTo('home', 'about')}
              className={`transition-colors hover:text-sky-400 cursor-pointer ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              About
            </button>
            <span
              className="text-sky-400 font-semibold px-2 py-0.5 rounded-md border border-sky-400/40 bg-sky-500/10 text-xs font-mono-tech uppercase tracking-wider"
            >
              Contact Active
            </span>
          </nav>

          {/* Actions: Return to Portfolio & Theme Switcher */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className={`p-2.5 rounded-full border transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                theme === 'dark'
                  ? 'border-white/15 bg-white/5 hover:border-sky-400/60 hover:bg-white/10 text-white'
                  : 'border-[#CBD8E8] bg-white/90 hover:border-sky-500/60 hover:bg-[#F2F7FD] text-[#111827]'
              }`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-sky-400 group-hover:rotate-45 transition-transform duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-[#2A8CFF] group-hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* Back to Home Button */}
            <button
              onClick={() => navigateTo('home')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono-tech font-semibold uppercase tracking-wider transition-all duration-300 border cursor-pointer active:scale-95 ${
                theme === 'dark'
                  ? 'bg-sky-500/10 border-sky-400/40 text-sky-300 hover:bg-sky-500/20 hover:border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                  : 'bg-white border-[#2A8CFF]/40 text-[#1D74DF] hover:bg-sky-50 shadow-sm'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          MAIN CONTACT HERO EXPERIENCE (Inspired by Uploaded References)
          ========================================================================= */}
      <main className="relative z-10 max-w-[1520px] mx-auto px-5 sm:px-8 lg:px-12 pt-8 sm:pt-12 lg:pt-14 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* =====================================================================
              LEFT SIDE: BRANDING, HEADLINE, SUPPORTING COPY & 4 CONTACT CARDS
              ===================================================================== */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Top Eyebrow with Glowing Accent Line */}
            <div className="flex items-center gap-3.5 mb-4 sm:mb-5">
              <span
                className="text-xs uppercase tracking-[0.32em] font-semibold font-mono-tech text-sky-400"
              >
                GET IN TOUCH
              </span>
              <span
                className="h-[1.5px] w-16 sm:w-24 bg-gradient-to-r from-sky-400 via-sky-300 to-transparent rounded-full shadow-[0_0_10px_#38BDF8]"
              />
            </div>

            {/* Main Headline with White-to-Cyan Gradient on "Extraordinary" */}
            <h1
              className="font-display text-[2.4rem] sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-extrabold tracking-tight leading-[1.08] mb-5 sm:mb-6"
              style={{
                color: theme === 'dark' ? '#FFFFFF' : '#0F172A',
                textWrap: 'balance',
              }}
            >
              Let's Create Something{' '}
              <span className="bg-gradient-to-r from-[#60A5FA] via-[#38BDF8] to-[#BAE6FD] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(56,189,248,0.55)]">
                Extraordinary
              </span>
            </h1>

            {/* Supporting Copy */}
            <div
              className={`text-sm sm:text-base lg:text-[17px] leading-relaxed mb-8 sm:mb-10 max-w-2xl space-y-2.5 font-normal ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              <p>
                Create cinematic AI visuals, product commercials, luxury brand content, concept
                art, and visual storytelling experiences.
              </p>
              <p>
                Whether you're launching a brand, promoting a product, or bringing an idea to
                life, let's build something unforgettable.
              </p>
            </div>

            {/* ===================================================================
                4 FUTURISTIC GLASSMORPHISM CONTACT CARDS (2x2 Grid)
                =================================================================== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-4.5 mb-8">
              {/* CARD 1: EMAIL */}
              <a
                href="mailto:ogunleyegoodluck244@gmail.com"
                className={`group/card relative rounded-2xl p-4.5 sm:p-5 border backdrop-blur-xl transition-all duration-300 ease-out flex items-center justify-between gap-3 cursor-pointer hover:-translate-y-1 ${
                  theme === 'dark'
                    ? 'bg-[#08152B]/75 border-sky-400/25 hover:border-sky-400/80 shadow-[0_12px_30px_rgba(0,0,0,0.65),0_0_20px_rgba(22,119,255,0.12)] hover:shadow-[0_18px_45px_rgba(0,0,0,0.85),0_0_30px_rgba(56,189,248,0.35)]'
                    : 'bg-white/90 border-[#CBD8E8] hover:border-[#2A8CFF] shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_32px_rgba(42,140,255,0.16)]'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-sky-500/15 border border-sky-400/40 flex items-center justify-center text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.25)] shrink-0 group-hover/card:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-wider font-semibold font-mono-tech text-sky-400">
                      Email Us
                    </div>
                    <div
                      className="text-xs sm:text-sm font-semibold truncate mt-0.5"
                      style={{ color: theme === 'dark' ? '#FFFFFF' : '#0F172A' }}
                    >
                      ogunleyegoodluck244@gmail.com
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={copyEmail}
                    title="Copy email to clipboard"
                    className="p-1.5 rounded-lg border border-white/10 hover:border-sky-400/60 bg-white/5 hover:bg-sky-500/20 text-slate-300 hover:text-white transition-colors"
                  >
                    {copiedEmail ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <ArrowUpRight className="w-4 h-4 text-sky-400/80 group-hover/card:text-sky-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-transform" />
                </div>
              </a>

              {/* CARD 2: WHATSAPP */}
              <a
                href="https://wa.me/message/6UEJD7UEULJJM1"
                target="_blank"
                rel="noopener noreferrer"
                className={`group/card relative rounded-2xl p-4.5 sm:p-5 border backdrop-blur-xl transition-all duration-300 ease-out flex items-center justify-between gap-3 cursor-pointer hover:-translate-y-1 ${
                  theme === 'dark'
                    ? 'bg-[#08152B]/75 border-sky-400/25 hover:border-sky-400/80 shadow-[0_12px_30px_rgba(0,0,0,0.65),0_0_20px_rgba(22,119,255,0.12)] hover:shadow-[0_18px_45px_rgba(0,0,0,0.85),0_0_30px_rgba(56,189,248,0.35)]'
                    : 'bg-white/90 border-[#CBD8E8] hover:border-[#2A8CFF] shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_32px_rgba(42,140,255,0.16)]'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.25)] shrink-0 group-hover/card:scale-105 transition-transform">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-wider font-semibold font-mono-tech text-emerald-400">
                      WhatsApp
                    </div>
                    <div
                      className="text-xs sm:text-sm font-semibold truncate mt-0.5"
                      style={{ color: theme === 'dark' ? '#FFFFFF' : '#0F172A' }}
                    >
                      +234 812 345 6789
                    </div>
                  </div>
                </div>

                <ArrowUpRight className="w-4 h-4 text-sky-400/80 group-hover/card:text-sky-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-transform shrink-0" />
              </a>

              {/* CARD 3: INSTAGRAM */}
              <a
                href="https://www.instagram.com/ogunleyegoodluck244/"
                target="_blank"
                rel="noopener noreferrer"
                className={`group/card relative rounded-2xl p-4.5 sm:p-5 border backdrop-blur-xl transition-all duration-300 ease-out flex items-center justify-between gap-3 cursor-pointer hover:-translate-y-1 ${
                  theme === 'dark'
                    ? 'bg-[#08152B]/75 border-sky-400/25 hover:border-sky-400/80 shadow-[0_12px_30px_rgba(0,0,0,0.65),0_0_20px_rgba(22,119,255,0.12)] hover:shadow-[0_18px_45px_rgba(0,0,0,0.85),0_0_30px_rgba(56,189,248,0.35)]'
                    : 'bg-white/90 border-[#CBD8E8] hover:border-[#2A8CFF] shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_32px_rgba(42,140,255,0.16)]'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-pink-500/15 border border-pink-400/40 flex items-center justify-center text-pink-400 shadow-[0_0_15px_rgba(244,114,182,0.25)] shrink-0 group-hover/card:scale-105 transition-transform">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-wider font-semibold font-mono-tech text-pink-400">
                      Instagram
                    </div>
                    <div
                      className="text-xs sm:text-sm font-semibold truncate mt-0.5"
                      style={{ color: theme === 'dark' ? '#FFFFFF' : '#0F172A' }}
                    >
                      @ogunleyegoodluck244
                    </div>
                  </div>
                </div>

                <ArrowUpRight className="w-4 h-4 text-sky-400/80 group-hover/card:text-sky-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-transform shrink-0" />
              </a>

              {/* CARD 4: BEHANCE */}
              <a
                href="https://www.behance.net/basiratbello"
                target="_blank"
                rel="noopener noreferrer"
                className={`group/card relative rounded-2xl p-4.5 sm:p-5 border backdrop-blur-xl transition-all duration-300 ease-out flex items-center justify-between gap-3 cursor-pointer hover:-translate-y-1 ${
                  theme === 'dark'
                    ? 'bg-[#08152B]/75 border-sky-400/25 hover:border-sky-400/80 shadow-[0_12px_30px_rgba(0,0,0,0.65),0_0_20px_rgba(22,119,255,0.12)] hover:shadow-[0_18px_45px_rgba(0,0,0,0.85),0_0_30px_rgba(56,189,248,0.35)]'
                    : 'bg-white/90 border-[#CBD8E8] hover:border-[#2A8CFF] shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_32px_rgba(42,140,255,0.16)]'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-400/40 flex items-center justify-center text-blue-400 shadow-[0_0_15px_rgba(56,189,248,0.25)] shrink-0 group-hover/card:scale-105 transition-transform font-bold font-serif text-lg">
                    Bē
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-wider font-semibold font-mono-tech text-blue-400">
                      Behance Portfolio
                    </div>
                    <div
                      className="text-xs sm:text-sm font-semibold truncate mt-0.5"
                      style={{ color: theme === 'dark' ? '#FFFFFF' : '#0F172A' }}
                    >
                      basiratbello
                    </div>
                  </div>
                </div>

                <ArrowUpRight className="w-4 h-4 text-sky-400/80 group-hover/card:text-sky-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-transform shrink-0" />
              </a>
            </div>

            {/* Interactive Option: Send a Direct Project Brief */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <button
                type="button"
                onClick={() => setIsInquiryModalOpen(true)}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-[#031126] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-[0_0_24px_rgba(56,189,248,0.65)] hover:shadow-[0_0_36px_rgba(56,189,248,0.85)]"
                style={{
                  background: 'linear-gradient(90deg, #7DD3FC 0%, #38BDF8 50%, #BAE6FD 100%)',
                }}
              >
                <Send className="w-4 h-4" />
                <span>Submit Direct Project Brief</span>
              </button>

              <span className={`text-xs font-mono-tech ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                Fast response within 24 hours
              </span>
            </div>

            {/* Bottom Innovation Strip (Inspired by reference bottom row) */}
            <div
              className={`pt-6 border-t flex flex-wrap items-center justify-between gap-4 text-xs font-mono-tech ${
                theme === 'dark' ? 'border-white/10 text-slate-400' : 'border-[#CBD8E8] text-slate-500'
              }`}
            >
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <span className="inline-flex items-center gap-1.5 text-sky-400 font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  <span>AI Innovation</span>
                </span>
                <span className="hidden sm:inline text-slate-600">|</span>
                <span className="inline-flex items-center gap-1.5">
                  <Play className="w-3 h-3 text-sky-400 fill-current" />
                  <span>Visual Storytelling</span>
                </span>
                <span className="hidden sm:inline text-slate-600">|</span>
                <span className="inline-flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-sky-400" />
                  <span>Creative Direction</span>
                </span>
              </div>

              <div className="tracking-widest uppercase text-[11px] text-sky-400/90 font-semibold flex items-center gap-2">
                <span className="w-8 h-[1px] bg-sky-400/40" />
                <span>BUILDING THE FUTURE OF VISUAL CONTENT.</span>
              </div>
            </div>
          </div>

          {/* =====================================================================
              RIGHT SIDE: PHOTOREALISTIC WORKSTATION SCENE & HOLOGRAPHIC PANELS
              ===================================================================== */}
          <div className="lg:col-span-6 relative">
            {/* Atmospheric Outer Frame */}
            <div
              className="relative rounded-3xl overflow-hidden border border-sky-400/45 bg-[#030A18] shadow-[0_24px_70px_rgba(0,0,0,0.85),0_0_45px_rgba(56,189,248,0.28)] transition-transform duration-500 ease-out"
              style={{
                transform: `translate3d(${mouseParallax.x * 0.4}px, ${mouseParallax.y * 0.4}px, 0)`,
              }}
            >
              {/* Studio Scene Image */}
              <div className="relative aspect-[16/11] sm:aspect-[16/10] overflow-hidden">
                <img
                  src={studioWorkstationImg}
                  alt="AVENIX AI Creative Director Studio Workstation"
                  referrerPolicy="no-referrer"
                  decoding="async"
                  fetchPriority="high"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                />

                {/* Subtle Cinematic Vignette */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030814]/90 via-transparent to-[#030814]/30"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#030814]/50 via-transparent to-transparent"
                />

                {/* "Your Vision Our Creativity" Calligraphy in Upper Right Atmosphere */}
                <div
                  className="absolute top-4 right-5 sm:top-7 sm:right-8 z-20 pointer-events-none select-none text-right"
                  style={{
                    fontFamily: "'Caveat', 'Playfair Display', cursive, sans-serif",
                  }}
                >
                  <div
                    className="text-2xl sm:text-3xl lg:text-4xl text-sky-200/90 font-bold tracking-wide italic transform -rotate-3"
                    style={{
                      textShadow:
                        '0 0 16px rgba(56, 189, 248, 0.95), 0 0 32px rgba(22, 119, 255, 0.75)',
                    }}
                  >
                    Your Vision <br />
                    <span className="text-white drop-shadow-[0_0_20px_#38BDF8]">
                      Our Creativity
                    </span>
                  </div>
                </div>

                {/* FLOATING HOLOGRAPHIC CARD 1: Audio / AI Waveform Card */}
                <div
                  className="absolute top-1/4 left-6 sm:left-12 z-20 pointer-events-none select-none backdrop-blur-xl bg-[#040D22]/80 border border-sky-400/50 rounded-2xl p-3 sm:p-3.5 shadow-[0_16px_36px_rgba(0,0,0,0.85),0_0_24px_rgba(56,189,248,0.35)] transition-transform duration-300"
                  style={{
                    transform: `translate3d(${mouseParallax.x * -0.6}px, ${mouseParallax.y * -0.6}px, 0)`,
                  }}
                >
                  {/* Waveform graphic */}
                  <div className="flex items-center gap-1 sm:gap-1.5 h-6 px-1 mb-2">
                    {[16, 24, 12, 28, 20, 32, 14, 26, 18, 30, 16, 22].map((height, i) => (
                      <span
                        key={i}
                        className="w-[2px] bg-gradient-to-t from-sky-500 to-cyan-300 rounded-full animate-pulse"
                        style={{
                          height: `${height}px`,
                          animationDelay: `${i * 90}ms`,
                          animationDuration: '1.2s',
                        }}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-3 text-[10px] sm:text-xs font-mono-tech text-sky-300 font-semibold">
                    <span>AI Generated</span>
                    <ChevronRight className="w-3.5 h-3.5 text-sky-400" />
                  </div>
                </div>

                {/* FLOATING HOLOGRAPHIC CARD 2: Ideas • Scripts • Visuals • Reality */}
                <div
                  className="absolute top-1/3 right-6 sm:right-14 z-20 pointer-events-none select-none backdrop-blur-xl bg-[#040D22]/80 border border-sky-400/50 rounded-2xl p-3 sm:p-3.5 shadow-[0_16px_36px_rgba(0,0,0,0.85),0_0_24px_rgba(56,189,248,0.35)] transition-transform duration-300"
                  style={{
                    transform: `translate3d(${mouseParallax.x * 0.8}px, ${mouseParallax.y * 0.8}px, 0)`,
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    {/* Glowing mini preview square */}
                    <div className="w-10 h-10 rounded-lg overflow-hidden border border-sky-400/40 relative shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-sky-400/30 to-blue-600/40" />
                      <div className="w-full h-full flex items-center justify-center text-sky-300 font-bold text-xs">
                        4K
                      </div>
                    </div>

                    <div className="text-[10px] sm:text-xs font-mono-tech leading-tight text-white font-medium">
                      <div>Ideas</div>
                      <div>Scripts</div>
                      <div className="text-sky-400 font-bold">Visuals</div>
                      <div>Reality</div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-sky-400 ml-1" />
                  </div>
                </div>

                {/* BOTTOM TELEMETRY BAR ON WORKSTATION */}
                <div className="absolute bottom-4 inset-x-4 sm:inset-x-6 z-20 flex items-center justify-between p-2.5 sm:p-3 rounded-xl backdrop-blur-xl bg-[#020713]/85 border border-sky-400/30 text-[10px] sm:text-xs font-mono-tech text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34D399]" />
                    <span className="font-semibold text-white">DIRECTOR STUDIO 01</span>
                    <span className="hidden sm:inline text-slate-500">•</span>
                    <span className="hidden sm:inline text-sky-300">ACTIVE DIRECTING</span>
                  </div>

                  <div className="flex items-center gap-3 text-sky-300">
                    <span className="text-[10px] uppercase font-bold tracking-wider">
                      OGUNLEYE GOODLUCK
                    </span>
                  </div>
                </div>
              </div>

              {/* Glowing Laser Border Trim */}
              <div className="absolute top-0 inset-x-12 h-[1.5px] bg-gradient-to-r from-transparent via-sky-400 to-transparent shadow-[0_0_12px_#38BDF8]" />
              <div className="absolute bottom-0 inset-x-12 h-[1.5px] bg-gradient-to-r from-transparent via-sky-400 to-transparent shadow-[0_0_12px_#38BDF8]" />
            </div>
          </div>
        </div>
      </main>

      {/* =========================================================================
          DIRECT PROJECT BRIEF MODAL (High-End Futuristic Glassmorphism Drawer)
          ========================================================================= */}
      {isInquiryModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-2xl bg-black/80 transition-all duration-300 animate-in fade-in"
        >
          <div
            className={`relative w-full max-w-xl rounded-3xl p-6 sm:p-8 border shadow-2xl overflow-hidden backdrop-blur-2xl transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-[#060F22]/95 border-sky-400/50 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(56,189,248,0.35)] text-white'
                : 'bg-white/95 border-[#CBD8E8] shadow-[0_25px_70px_rgba(15,23,42,0.18)] text-[#0F172A]'
            }`}
          >
            {/* Top Close Button */}
            <button
              onClick={() => setIsInquiryModalOpen(false)}
              aria-label="Close Project Brief Dialog"
              className="absolute top-5 right-5 p-2 rounded-full border border-white/10 hover:border-sky-400/60 bg-white/5 hover:bg-sky-500/20 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6 pr-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                <span className="text-xs uppercase font-mono-tech tracking-[0.24em] font-semibold text-sky-400">
                  CONFIDENTIAL INQUIRY
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
                Submit Your Project Brief
              </h2>
              <p
                className={`text-xs sm:text-sm mt-1 leading-relaxed ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                Describe your vision, timeline, and deliverables. Director Goodluck will personally review and respond with creative directions.
              </p>
            </div>

            {isSubmitted ? (
              <div className="py-12 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-sky-500/20 border border-sky-400/50 text-sky-400 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(56,189,248,0.5)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-xl font-bold mb-2">Project Brief Received!</h3>
                <p className="text-sm text-slate-300 max-w-sm">
                  Thank you! We've received your inquiry and will reach out to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono-tech uppercase tracking-wider font-semibold mb-1 text-sky-300">
                    Your Name / Brand
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alexander Vance / Obsidian Lux"
                    className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 focus:border-sky-400 focus:bg-white/10 text-sm focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-tech uppercase tracking-wider font-semibold mb-1 text-sky-300">
                    Direct Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@brand.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 focus:border-sky-400 focus:bg-white/10 text-sm focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-tech uppercase tracking-wider font-semibold mb-1 text-sky-300">
                      Project Type
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#09152B] focus:border-sky-400 text-sm focus:outline-none transition-colors"
                    >
                      <option value="AI Commercial & Video Reel">AI Commercial & Video Reel</option>
                      <option value="Luxury Product Visuals">Luxury Product Visuals</option>
                      <option value="Cinematic Storytelling & Short Film">Cinematic Storytelling</option>
                      <option value="Creative Direction & Consulting">Creative Direction</option>
                      <option value="Custom Project">Custom Project</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-tech uppercase tracking-wider font-semibold mb-1 text-sky-300">
                      Estimated Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#09152B] focus:border-sky-400 text-sm focus:outline-none transition-colors"
                    >
                      <option value="$2,500 - $5,000">$2,500 - $5,000</option>
                      <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                      <option value="$15,000 - $35,000">$15,000 - $35,000</option>
                      <option value="$35,000+">$35,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-tech uppercase tracking-wider font-semibold mb-1 text-sky-300">
                    Project Vision & Details
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the desired mood, audience, deliverables, and timeline..."
                    className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 focus:border-sky-400 focus:bg-white/10 text-sm focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl font-display text-sm font-bold uppercase tracking-wider text-[#031126] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer shadow-[0_0_24px_rgba(56,189,248,0.65)] hover:shadow-[0_0_36px_rgba(56,189,248,0.85)] disabled:opacity-50"
                    style={{
                      background: 'linear-gradient(90deg, #7DD3FC 0%, #38BDF8 50%, #BAE6FD 100%)',
                    }}
                  >
                    {isSubmitting ? 'Transmitting Brief...' : 'Send Project Brief to Studio'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
