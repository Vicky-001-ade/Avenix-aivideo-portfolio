import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  FileText,
  Image as ImageIcon,
  Video,
  ChevronRight,
  Play,
  Cloud,
  Sparkles,
  Wand2,
  Scan,
} from 'lucide-react';
import avenixLogo from '../assets/images/avenix_logo_transparent.svg';
import step01VisionImg from '../assets/images/process_step01_vision_1790463558887.jpg';
import step02EngineImg from '../assets/images/process_step02_engine_1790463568991.jpg';
import step03DeliverImg from '../assets/images/process_step03_deliver_1790463579796.jpg';

const AMBIENT_PARTICLES = [
  { top: '12%', left: '6%', size: 4, delay: '0s', duration: '6.5s' },
  { top: '18%', left: '92%', size: 4.5, delay: '1.4s', duration: '7.2s' },
  { top: '82%', left: '9%', size: 3.5, delay: '2.1s', duration: '5.8s' },
  { top: '78%', left: '90%', size: 4, delay: '0.7s', duration: '6.9s' },
  { top: '46%', left: '50%', size: 3, delay: '1.9s', duration: '6.1s' },
];

export const ProcessSection: React.FC = () => {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);

  // Progressive scroll reveal state: 0 -> 1 (Step 01) -> 2 (Step 02) -> 3 (Step 03)
  const [revealedStepCount, setRevealedStepCount] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(false);

  // Interactive states inside the futuristic cards
  const [selectedInputMode, setSelectedInputMode] = useState<'text' | 'image' | 'video'>('text');
  const [activePipelineMod, setActivePipelineMod] = useState(0);

  // Observe section entrance and trigger sequential Step 01 -> Step 02 -> Step 03 reveal
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHeaderVisible(true);
          }
        });
      },
      { threshold: 0.14 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!headerVisible) return;

    const t1 = window.setTimeout(() => setRevealedStepCount((p) => Math.max(p, 1)), 120);
    const t2 = window.setTimeout(() => setRevealedStepCount((p) => Math.max(p, 2)), 380);
    const t3 = window.setTimeout(() => setRevealedStepCount((p) => Math.max(p, 3)), 640);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [headerVisible]);

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-label="From Concept To Screen — 3-Step AI Workflow"
      className="py-24 md:py-32 relative overflow-hidden transition-colors"
      style={{
        backgroundColor: 'transparent',
        backgroundImage:
          theme === 'dark'
            ? 'linear-gradient(180deg, rgba(6, 13, 26, 0) 0%, rgba(7, 17, 38, 0.80) 16%, rgba(5, 13, 30, 0.92) 50%, rgba(7, 17, 38, 0.80) 84%, rgba(6, 13, 26, 0) 100%)'
            : 'linear-gradient(180deg, rgba(247, 250, 253, 0) 0%, rgba(233, 243, 254, 0.78) 16%, rgba(226, 239, 253, 0.88) 50%, rgba(233, 243, 254, 0.78) 84%, rgba(247, 250, 253, 0) 100%)',
      }}
    >
      {/* Ambient Atmospheric Blue Lighting Behind Cards */}
      {theme === 'dark' && (
        <>
          <div
            aria-hidden="true"
            className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1160px] h-[680px] pointer-events-none rounded-full blur-[175px]"
            style={{
              background:
                'radial-gradient(ellipse 68% 55% at 50% 50%, rgba(22, 119, 255, 0.18) 0%, rgba(56, 189, 248, 0.08) 45%, transparent 82%)',
            }}
          />
          <div
            aria-hidden="true"
            className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] pointer-events-none rounded-full blur-[130px]"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.16) 0%, transparent 70%)',
            }}
          />
        </>
      )}

      {theme === 'light' && (
        <div
          aria-hidden="true"
          className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1080px] h-[640px] pointer-events-none rounded-full blur-[165px]"
          style={{
            background:
              'radial-gradient(ellipse 66% 54% at 50% 50%, rgba(42, 140, 255, 0.12) 0%, rgba(92, 169, 255, 0.06) 48%, transparent 82%)',
          }}
        />
      )}

      {/* Minimal Floating Ambient Energy Particles */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        {AMBIENT_PARTICLES.map((p, idx) => (
          <span
            key={idx}
            className="absolute rounded-full animate-pulse"
            style={{
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: p.delay,
              animationDuration: p.duration,
              backgroundColor: theme === 'dark' ? '#38BDF8' : '#2A8CFF',
              boxShadow:
                theme === 'dark'
                  ? '0 0 14px 2px rgba(56, 189, 248, 0.75)'
                  : '0 0 10px 1px rgba(42, 140, 255, 0.45)',
              opacity: theme === 'dark' ? 0.5 : 0.32,
            }}
          />
        ))}
      </div>

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        {/* ===================================================================
            SECTION HEADER: AVENIX Emblem, Eyebrow, Title & Subtitle
            =================================================================== */}
        <div
          className={`max-w-3xl mx-auto text-center mb-14 md:mb-16 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Centered AVENIX Logo Mark */}
          <div className="flex justify-center mb-3">
            <img
              src={avenixLogo}
              alt="AVENIX"
              className="h-7 sm:h-8 w-auto object-contain select-none opacity-90 drop-shadow-[0_0_16px_rgba(56,189,248,0.28)]"
            />
          </div>

          {/* Eyebrow: — HOW IT WORKS — */}
          <div className="inline-flex items-center gap-3.5 mb-4">
            <span
              className="w-8 sm:w-11 h-[1.5px] rounded-full"
              style={{
                background:
                  theme === 'dark'
                    ? 'linear-gradient(90deg, transparent 0%, #38BDF8 100%)'
                    : 'linear-gradient(90deg, transparent 0%, #2A8CFF 100%)',
              }}
            />
            <span
              className="text-[11px] sm:text-xs uppercase tracking-[0.32em] font-semibold font-mono-tech"
              style={{ color: theme === 'dark' ? '#7DD3FC' : '#1D74DF' }}
            >
              HOW IT WORKS
            </span>
            <span
              className="w-8 sm:w-11 h-[1.5px] rounded-full"
              style={{
                background:
                  theme === 'dark'
                    ? 'linear-gradient(90deg, #38BDF8 0%, transparent 100%)'
                    : 'linear-gradient(90deg, #2A8CFF 0%, transparent 100%)',
              }}
            />
          </div>

          {/* Main Section Title */}
          <h2
            className="font-display text-3xl sm:text-5xl md:text-[54px] font-extrabold tracking-tight leading-[1.08]"
            style={{ color: theme === 'dark' ? '#FFFFFF' : '#111827' }}
          >
            From{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  theme === 'dark'
                    ? 'linear-gradient(90deg, #60A5FA 0%, #38BDF8 50%, #BAE6FD 100%)'
                    : 'linear-gradient(90deg, #1D74DF 0%, #2A8CFF 50%, #5CA9FF 100%)',
              }}
            >
              Concept
            </span>{' '}
            To{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  theme === 'dark'
                    ? 'linear-gradient(90deg, #38BDF8 0%, #60A5FA 55%, #BAE6FD 100%)'
                    : 'linear-gradient(90deg, #2A8CFF 0%, #1D74DF 55%, #5CA9FF 100%)',
              }}
            >
              Screen
            </span>
          </h2>

          {/* Subtitle */}
          <p
            className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-4 font-normal leading-relaxed"
            style={{ color: theme === 'dark' ? '#CBD5E1' : '#334155' }}
          >
            Watch ideas evolve into cinematic AI visuals through a streamlined creative process.
          </p>
        </div>

        {/* ===================================================================
            3-STEP PROCESS SHOWCASE GRID: [ STEP 01 ] → [ STEP 02 ] → [ STEP 03 ]
            =================================================================== */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8 xl:gap-9 items-stretch">
          {/* Desktop Connecting Neon Chevron Arrow 1 (Between Step 01 & Step 02) */}
          <div
            aria-hidden="true"
            className={`hidden lg:flex items-center justify-center absolute top-1/2 left-[33.333%] -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none transition-all duration-700 ${
              revealedStepCount >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border ${
                theme === 'dark'
                  ? 'bg-[#07142B]/90 border-sky-400/55 text-sky-300 shadow-[0_0_24px_rgba(56,189,248,0.65)]'
                  : 'bg-white/95 border-[#2A8CFF]/60 text-[#2A8CFF] shadow-[0_0_20px_rgba(42,140,255,0.35)]'
              }`}
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>

          {/* Desktop Connecting Neon Chevron Arrow 2 (Between Step 02 & Step 03) */}
          <div
            aria-hidden="true"
            className={`hidden lg:flex items-center justify-center absolute top-1/2 left-[66.666%] -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none transition-all duration-700 ${
              revealedStepCount >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border ${
                theme === 'dark'
                  ? 'bg-[#07142B]/90 border-sky-400/55 text-sky-300 shadow-[0_0_24px_rgba(56,189,248,0.65)]'
                  : 'bg-white/95 border-[#2A8CFF]/60 text-[#2A8CFF] shadow-[0_0_20px_rgba(42,140,255,0.35)]'
              }`}
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>

          {/* =================================================================
              STEP 01 CARD: "Share Your Vision"
              ================================================================= */}
          <article
            style={{
              transitionDuration: '760ms',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className={`group relative rounded-[26px] p-6 sm:p-7 backdrop-blur-xl border flex flex-col justify-between overflow-hidden transition-all will-change-[transform,opacity] ${
              revealedStepCount >= 1
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-12 scale-[0.95]'
            } ${
              theme === 'dark'
                ? 'bg-[#071124]/86 border-sky-400/30 hover:border-sky-400/75 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.88),0_0_36px_-10px_rgba(22,119,255,0.22)] hover:shadow-[0_30px_70px_-12px_rgba(0,0,0,0.92),0_0_54px_-6px_rgba(56,189,248,0.38)] hover:-translate-y-2'
                : 'bg-[#FCFDFE]/95 border-[#2A8CFF]/35 hover:border-[#2A8CFF] shadow-[0_20px_50px_-15px_rgba(17,24,39,0.12),0_0_32px_-10px_rgba(42,140,255,0.16)] hover:shadow-[0_28px_64px_-12px_rgba(17,24,39,0.18),0_0_48px_-8px_rgba(42,140,255,0.28)] hover:-translate-y-2'
            }`}
          >
            {/* Top & Bottom Animated Holographic Specular Border Lines */}
            <div
              aria-hidden="true"
              className="absolute inset-x-6 top-0 h-[1.5px] z-20 pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.9) 35%, #FFFFFF 50%, rgba(56, 189, 248, 0.9) 65%, transparent 100%)',
                boxShadow: '0 0 16px rgba(56, 189, 248, 0.85)',
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-10 bottom-0 h-[1.5px] z-20 pointer-events-none opacity-50 group-hover:opacity-95 transition-opacity duration-500"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(22, 119, 255, 0.85) 50%, transparent 100%)',
                boxShadow: '0 0 14px rgba(22, 119, 255, 0.75)',
              }}
            />

            {/* Futuristic Corner Brackets */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-2.5 left-2.5 w-4 h-4 rounded-tl-[14px] border-t-2 border-l-2 border-sky-400/60 group-hover:border-sky-300 z-20 transition-colors"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-2.5 right-2.5 w-4 h-4 rounded-tr-[14px] border-t-2 border-r-2 border-sky-400/60 group-hover:border-sky-300 z-20 transition-colors"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-2.5 left-2.5 w-4 h-4 rounded-bl-[14px] border-b-2 border-l-2 border-sky-400/60 group-hover:border-sky-300 z-20 transition-colors"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-2.5 right-2.5 w-4 h-4 rounded-br-[14px] border-b-2 border-r-2 border-sky-400/60 group-hover:border-sky-300 z-20 transition-colors"
            />

            {/* Step 01 Top Header Lockup */}
            <div>
              <div className="flex items-center gap-3.5 mb-3">
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center font-display text-base font-extrabold shrink-0 border-2 transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-sky-500/15 border-sky-400 text-sky-300 shadow-[0_0_20px_rgba(56,189,248,0.45)] group-hover:shadow-[0_0_28px_rgba(56,189,248,0.75)]'
                      : 'bg-[#EBF4FF] border-[#2A8CFF] text-[#1D74DF] shadow-[0_0_16px_rgba(42,140,255,0.25)]'
                  }`}
                >
                  01
                </div>
                <h3
                  className="font-display text-xl sm:text-2xl font-extrabold tracking-tight"
                  style={{ color: theme === 'dark' ? '#FFFFFF' : '#111827' }}
                >
                  Share Your Vision
                </h3>
              </div>

              <p
                className="text-xs sm:text-sm font-normal leading-relaxed mb-5"
                style={{ color: theme === 'dark' ? '#CBD5E1' : '#334155' }}
              >
                Provide your concept, product, brand idea, script, reference image, or creative
                direction.
              </p>

              {/* Modality Input Selector Pills: [ Text ] | [ Image ] | [ Video ] */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                {[
                  { id: 'text', label: 'Text', icon: FileText },
                  { id: 'image', label: 'Image', icon: ImageIcon },
                  { id: 'video', label: 'Video', icon: Video },
                ].map((item) => {
                  const IconComp = item.icon;
                  const active = selectedInputMode === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedInputMode(item.id as 'text' | 'image' | 'video')}
                      className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border text-xs font-mono-tech font-semibold transition-all duration-200 cursor-pointer ${
                        active
                          ? theme === 'dark'
                            ? 'bg-sky-500/20 border-sky-400/80 text-white shadow-[0_0_16px_rgba(56,189,248,0.35)]'
                            : 'bg-[#EBF4FF] border-[#2A8CFF] text-[#111827] shadow-sm'
                          : theme === 'dark'
                          ? 'bg-white/[0.03] border-white/10 text-slate-300 hover:border-sky-400/40 hover:text-white'
                          : 'bg-white border-[#DCE5F0] text-[#475569] hover:border-[#2A8CFF]/45 hover:text-[#111827]'
                      }`}
                    >
                      <IconComp
                        className={`w-3.5 h-3.5 ${
                          theme === 'dark' ? 'text-sky-400' : 'text-[#2A8CFF]'
                        }`}
                      />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 01 Visual Stage: Photorealistic Futuristic Creative Workspace */}
            <div className="relative pt-2 pb-3 flex flex-col justify-end">
              <div className="relative z-10 rounded-2xl overflow-hidden border border-sky-400/45 bg-[#040B1A] shadow-[0_14px_34px_rgba(0,0,0,0.78),0_0_28px_rgba(56,189,248,0.22)]">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={step01VisionImg}
                    alt="Photorealistic futuristic creative workspace with holographic UI panels, script interface, concept sketches, and AI prompt input system"
                    referrerPolicy="no-referrer"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#040B1A]/65 via-transparent to-transparent"
                  />
                </div>
              </div>

              {/* Glowing Futuristic Pedestal Base */}
              <div
                aria-hidden="true"
                className="mt-3 mx-auto w-[88%] h-3 rounded-full"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.55) 0%, rgba(22, 119, 255, 0.20) 55%, transparent 80%)',
                  boxShadow: '0 0 24px rgba(56, 189, 248, 0.5)',
                }}
              />
            </div>
          </article>

          {/* =================================================================
              STEP 02 CARD: "AI Creation Engine" (Center Visual Focal Point)
              ================================================================= */}
          <article
            style={{
              transitionDuration: '760ms',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className={`group relative rounded-[26px] p-6 sm:p-7 backdrop-blur-xl border flex flex-col justify-between overflow-hidden transition-all will-change-[transform,opacity] ${
              revealedStepCount >= 2
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-12 scale-[0.95]'
            } ${
              theme === 'dark'
                ? 'bg-[#08152E]/92 border-sky-400/75 hover:border-sky-300 shadow-[0_28px_75px_-12px_rgba(0,0,0,0.92),0_0_56px_-8px_rgba(56,189,248,0.42)] hover:shadow-[0_34px_85px_-10px_rgba(0,0,0,0.95),0_0_72px_-4px_rgba(56,189,248,0.58)] hover:-translate-y-2.5'
                : 'bg-white/98 border-[#2A8CFF] shadow-[0_26px_64px_-12px_rgba(17,24,39,0.18),0_0_48px_-8px_rgba(42,140,255,0.30)] hover:shadow-[0_32px_74px_-10px_rgba(17,24,39,0.22),0_0_60px_-6px_rgba(42,140,255,0.42)] hover:-translate-y-2.5'
            }`}
          >
            {/* Enhanced Centerpiece Top & Bottom Neon Specular Strips */}
            <div
              aria-hidden="true"
              className="absolute inset-x-4 top-0 h-[2px] z-20 pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.95) 30%, #FFFFFF 50%, rgba(56, 189, 248, 0.95) 70%, transparent 100%)',
                boxShadow: '0 0 20px rgba(56, 189, 248, 0.95)',
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-6 bottom-0 h-[1.5px] z-20 pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.9) 50%, transparent 100%)',
                boxShadow: '0 0 18px rgba(56, 189, 248, 0.85)',
              }}
            />

            {/* Luminous Corner Brackets */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-2.5 left-2.5 w-4.5 h-4.5 rounded-tl-[14px] border-t-2 border-l-2 border-sky-300 z-20"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-2.5 right-2.5 w-4.5 h-4.5 rounded-tr-[14px] border-t-2 border-r-2 border-sky-300 z-20"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-2.5 left-2.5 w-4.5 h-4.5 rounded-bl-[14px] border-b-2 border-l-2 border-sky-300 z-20"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-2.5 right-2.5 w-4.5 h-4.5 rounded-br-[14px] border-b-2 border-r-2 border-sky-300 z-20"
            />

            {/* Step 02 Top Header Lockup */}
            <div>
              <div className="flex items-center gap-3.5 mb-3">
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center font-display text-base font-extrabold shrink-0 border-2 transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-sky-500/25 border-sky-300 text-white shadow-[0_0_24px_rgba(56,189,248,0.65)]'
                      : 'bg-[#2A8CFF] border-[#2A8CFF] text-white shadow-[0_0_20px_rgba(42,140,255,0.40)]'
                  }`}
                >
                  02
                </div>
                <h3
                  className="font-display text-xl sm:text-2xl font-extrabold tracking-tight"
                  style={{ color: theme === 'dark' ? '#FFFFFF' : '#111827' }}
                >
                  AI Creation Engine
                </h3>
              </div>

              <p
                className="text-xs sm:text-sm font-normal leading-relaxed mb-4"
                style={{ color: theme === 'dark' ? '#E2E8F0' : '#334155' }}
              >
                Our advanced AI workflow transforms concepts into cinematic visuals with precision,
                speed, and creative intelligence.
              </p>
            </div>

            {/* Step 02 Centerpiece Visual Stage: Photorealistic AI Generation Core */}
            <div className="relative my-1 rounded-2xl overflow-hidden bg-[#040B1A] border border-sky-400/55 shadow-[0_16px_38px_rgba(0,0,0,0.82),0_0_36px_rgba(56,189,248,0.35)]">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={step02EngineImg}
                  alt="Photorealistic AI generation core with floating holographic displays, visual generation system, and blue neural network data streams"
                  referrerPolicy="no-referrer"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#040B1A]/60 via-transparent to-transparent"
                />
              </div>
            </div>

            {/* Bottom 4 AI Processing Capability Tiles */}
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2 mt-3">
              {[
                { label: 'Text to Video', icon: Scan },
                { label: 'Image to Video', icon: ImageIcon },
                { label: 'Style Transfer', icon: Wand2 },
                { label: 'High Resolution', badge: '4K' },
              ].map((mod, mIdx) => {
                const IconComp = mod.icon;
                const isModActive = activePipelineMod === mIdx;
                return (
                  <button
                    key={mod.label}
                    type="button"
                    onClick={() => setActivePipelineMod(mIdx)}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                      isModActive
                        ? theme === 'dark'
                          ? 'bg-sky-500/20 border-sky-400 text-white shadow-[0_0_16px_rgba(56,189,248,0.35)]'
                          : 'bg-[#EBF4FF] border-[#2A8CFF] text-[#111827]'
                        : theme === 'dark'
                        ? 'bg-white/[0.03] border-white/10 text-slate-300 hover:border-sky-400/45'
                        : 'bg-white border-[#DCE5F0] text-[#475569] hover:border-[#2A8CFF]/45'
                    }`}
                  >
                    {mod.badge ? (
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-mono-tech font-extrabold border ${
                          theme === 'dark'
                            ? 'border-sky-400 text-sky-300 bg-sky-500/15'
                            : 'border-[#2A8CFF] text-[#1D74DF] bg-[#EBF4FF]'
                        }`}
                      >
                        {mod.badge}
                      </span>
                    ) : (
                      IconComp && (
                        <IconComp
                          className={`w-4 h-4 ${
                            theme === 'dark' ? 'text-sky-400' : 'text-[#2A8CFF]'
                          }`}
                        />
                      )
                    )}
                    <span className="mt-1.5 text-[9.5px] font-medium leading-tight line-clamp-1">
                      {mod.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </article>

          {/* =================================================================
              STEP 03 CARD: "Deliver & Publish"
              ================================================================= */}
          <article
            style={{
              transitionDuration: '760ms',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className={`group relative rounded-[26px] p-6 sm:p-7 backdrop-blur-xl border flex flex-col justify-between overflow-hidden transition-all will-change-[transform,opacity] md:col-span-2 lg:col-span-1 ${
              revealedStepCount >= 3
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-12 scale-[0.95]'
            } ${
              theme === 'dark'
                ? 'bg-[#071124]/86 border-sky-400/30 hover:border-sky-400/75 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.88),0_0_36px_-10px_rgba(22,119,255,0.22)] hover:shadow-[0_30px_70px_-12px_rgba(0,0,0,0.92),0_0_54px_-6px_rgba(56,189,248,0.38)] hover:-translate-y-2'
                : 'bg-[#FCFDFE]/95 border-[#2A8CFF]/35 hover:border-[#2A8CFF] shadow-[0_20px_50px_-15px_rgba(17,24,39,0.12),0_0_32px_-10px_rgba(42,140,255,0.16)] hover:shadow-[0_28px_64px_-12px_rgba(17,24,39,0.18),0_0_48px_-8px_rgba(42,140,255,0.28)] hover:-translate-y-2'
            }`}
          >
            {/* Top & Bottom Animated Holographic Specular Border Lines */}
            <div
              aria-hidden="true"
              className="absolute inset-x-6 top-0 h-[1.5px] z-20 pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.9) 35%, #FFFFFF 50%, rgba(56, 189, 248, 0.9) 65%, transparent 100%)',
                boxShadow: '0 0 16px rgba(56, 189, 248, 0.85)',
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-10 bottom-0 h-[1.5px] z-20 pointer-events-none opacity-50 group-hover:opacity-95 transition-opacity duration-500"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(22, 119, 255, 0.85) 50%, transparent 100%)',
                boxShadow: '0 0 14px rgba(22, 119, 255, 0.75)',
              }}
            />

            {/* Futuristic Corner Brackets */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-2.5 left-2.5 w-4 h-4 rounded-tl-[14px] border-t-2 border-l-2 border-sky-400/60 group-hover:border-sky-300 z-20 transition-colors"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-2.5 right-2.5 w-4 h-4 rounded-tr-[14px] border-t-2 border-r-2 border-sky-400/60 group-hover:border-sky-300 z-20 transition-colors"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-2.5 left-2.5 w-4 h-4 rounded-bl-[14px] border-b-2 border-l-2 border-sky-400/60 group-hover:border-sky-300 z-20 transition-colors"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-2.5 right-2.5 w-4 h-4 rounded-br-[14px] border-b-2 border-r-2 border-sky-400/60 group-hover:border-sky-300 z-20 transition-colors"
            />

            {/* Step 03 Top Header Lockup */}
            <div>
              <div className="flex items-center gap-3.5 mb-3">
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center font-display text-base font-extrabold shrink-0 border-2 transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-sky-500/15 border-sky-400 text-sky-300 shadow-[0_0_20px_rgba(56,189,248,0.45)] group-hover:shadow-[0_0_28px_rgba(56,189,248,0.75)]'
                      : 'bg-[#EBF4FF] border-[#2A8CFF] text-[#1D74DF] shadow-[0_0_16px_rgba(42,140,255,0.25)]'
                  }`}
                >
                  03
                </div>
                <h3
                  className="font-display text-xl sm:text-2xl font-extrabold tracking-tight"
                  style={{ color: theme === 'dark' ? '#FFFFFF' : '#111827' }}
                >
                  Deliver & Publish
                </h3>
              </div>

              <p
                className="text-xs sm:text-sm font-normal leading-relaxed mb-5"
                style={{ color: theme === 'dark' ? '#CBD5E1' : '#334155' }}
              >
                Receive polished, production-ready visuals optimized for marketing, branding,
                social media, and advertising.
              </p>
            </div>

            {/* Step 03 Visual Stage: Photorealistic Cinematic Publishing Dashboard */}
            <div className="flex flex-col justify-end">
              <div className="rounded-2xl overflow-hidden border border-sky-400/45 bg-[#040B1A] shadow-[0_14px_34px_rgba(0,0,0,0.78),0_0_28px_rgba(56,189,248,0.22)] relative">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={step03DeliverImg}
                    alt="Photorealistic cinematic publishing dashboard with large 4K AI visual display, export controls, social media distribution, and cloud publishing system"
                    referrerPolicy="no-referrer"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#040B1A]/65 via-transparent to-transparent"
                  />
                </div>
              </div>

              {/* Social Platform Badges & Cloud Delivery Bar */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  {/* YouTube Badge */}
                  <span
                    title="YouTube Ready"
                    className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-transform hover:scale-105 ${
                      theme === 'dark'
                        ? 'bg-white/[0.04] border-white/12'
                        : 'bg-white border-[#DCE5F0] shadow-xs'
                    }`}
                  >
                    <span className="w-4 h-3 rounded-[4px] bg-[#FF0000] flex items-center justify-center">
                      <Play className="w-2 h-2 fill-white text-white ml-0.5" />
                    </span>
                  </span>

                  {/* TikTok Badge */}
                  <span
                    title="TikTok Ready"
                    className={`w-8 h-8 rounded-xl border flex items-center justify-center font-display text-xs font-extrabold transition-transform hover:scale-105 ${
                      theme === 'dark'
                        ? 'bg-white/[0.04] border-white/12 text-white'
                        : 'bg-white border-[#DCE5F0] text-[#111827] shadow-xs'
                    }`}
                    style={{
                      textShadow: '-1px -1px 0 #25F4EE, 1px 1px 0 #FE2C55',
                    }}
                  >
                    ♪
                  </span>

                  {/* Instagram Badge */}
                  <span
                    title="Instagram Ready"
                    className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-transform hover:scale-105 ${
                      theme === 'dark'
                        ? 'bg-white/[0.04] border-white/12'
                        : 'bg-white border-[#DCE5F0] shadow-xs'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-[5px] flex items-center justify-center text-white"
                      style={{
                        background:
                          'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
                      }}
                    >
                      <span className="w-2 h-2 rounded-full border border-white" />
                    </span>
                  </span>

                  {/* X Badge */}
                  <span
                    title="X / Twitter Ready"
                    className={`w-8 h-8 rounded-xl border flex items-center justify-center font-display text-xs font-bold transition-transform hover:scale-105 ${
                      theme === 'dark'
                        ? 'bg-white/[0.04] border-white/12 text-white'
                        : 'bg-white border-[#DCE5F0] text-[#111827] shadow-xs'
                    }`}
                  >
                    𝕏
                  </span>
                </div>

                {/* Cloud Delivery Indicator */}
                <div
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[10px] font-mono-tech font-medium ${
                    theme === 'dark'
                      ? 'bg-white/[0.04] border-sky-400/30 text-sky-200'
                      : 'bg-[#F0F7FF] border-[#2A8CFF]/35 text-[#1D74DF]'
                  }`}
                >
                  <Cloud className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span className="truncate">or Save to Cloud</span>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* ===================================================================
            BOTTOM FORMULA SIGNATURE BAR (Reference-Inspired)
            =================================================================== */}
        <div
          className={`mt-12 md:mt-14 flex items-center justify-center gap-3 sm:gap-4 text-center transition-all duration-700 ${
            revealedStepCount >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span
            className="hidden sm:inline-block w-10 md:w-14 h-[1.5px] rounded-full"
            style={{
              background:
                theme === 'dark'
                  ? 'linear-gradient(90deg, transparent 0%, #38BDF8 100%)'
                  : 'linear-gradient(90deg, transparent 0%, #2A8CFF 100%)',
            }}
          />
          <div className="inline-flex items-center flex-wrap justify-center gap-2 sm:gap-3 text-[10.5px] sm:text-xs font-mono-tech uppercase tracking-[0.28em] font-semibold">
            <span style={{ color: theme === 'dark' ? '#CBD5E1' : '#334155' }}>YOUR VISION</span>
            <span style={{ color: theme === 'dark' ? '#38BDF8' : '#2A8CFF' }}>+</span>
            <span style={{ color: theme === 'dark' ? '#CBD5E1' : '#334155' }}>OUR AI</span>
            <span style={{ color: theme === 'dark' ? '#38BDF8' : '#2A8CFF' }}>=</span>
            <span
              className="inline-flex items-center gap-1.5"
              style={{ color: theme === 'dark' ? '#7DD3FC' : '#1D74DF' }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>CINEMATIC REALITY</span>
            </span>
          </div>
          <span
            className="hidden sm:inline-block w-10 md:w-14 h-[1.5px] rounded-full"
            style={{
              background:
                theme === 'dark'
                  ? 'linear-gradient(90deg, #38BDF8 0%, transparent 100%)'
                  : 'linear-gradient(90deg, #2A8CFF 0%, transparent 100%)',
            }}
          />
        </div>
      </div>
    </section>
  );
};

