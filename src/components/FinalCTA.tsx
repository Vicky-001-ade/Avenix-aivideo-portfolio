import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import architectureBgImg from '../assets/images/final_cta_horizon_architecture_1790536413691.jpg';

const FLOATING_PARTICLES = [
  { top: '16%', left: '12%', size: 'w-1.5 h-1.5', duration: '6.2s', delay: '0s' },
  { top: '24%', left: '84%', size: 'w-2 h-2', duration: '7.4s', delay: '1.1s' },
  { top: '68%', left: '16%', size: 'w-1.5 h-1.5', duration: '6.8s', delay: '1.8s' },
  { top: '76%', left: '78%', size: 'w-1.5 h-1.5', duration: '5.9s', delay: '0.6s' },
  { top: '42%', left: '8%', size: 'w-1 h-1', duration: '7.1s', delay: '2.3s' },
  { top: '38%', left: '91%', size: 'w-1 h-1', duration: '6.5s', delay: '1.5s' },
];

export const FinalCTA: React.FC = () => {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [parallax, setParallax] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.18 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    setParallax({
      x: normX * 16,
      y: normY * 12,
    });
  };

  const handleMouseLeave = () => {
    setParallax({ x: 0, y: 0 });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 80;
      const elPos = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: elPos, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative py-28 md:py-36 overflow-hidden border-t bg-[#020712]"
      style={{
        borderColor:
          theme === 'dark' ? 'rgba(56, 189, 248, 0.22)' : 'rgba(42, 140, 255, 0.28)',
      }}
    >
      {/* Keyframes for edge light sweeps, ambient pulses, and floating particles */}
      <style>{`
        @keyframes closerEdgeSweep {
          0% {
            transform: translateX(-110%);
            opacity: 0;
          }
          25% {
            opacity: 1;
          }
          75% {
            opacity: 1;
          }
          100% {
            transform: translateX(110%);
            opacity: 0;
          }
        }
        @keyframes closerParticleFloat {
          0%, 100% {
            transform: translate3d(0, 0px, 0) scale(1);
            opacity: 0.35;
          }
          50% {
            transform: translate3d(0, -14px, 0) scale(1.3);
            opacity: 0.9;
          }
        }
        @keyframes closerAmbientPulse {
          0%, 100% {
            opacity: 0.55;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.9;
            transform: translate(-50%, -50%) scale(1.06);
          }
        }
        @keyframes closerStreakSlide {
          0% {
            transform: translateX(-30%) scaleX(0.7);
            opacity: 0;
          }
          50% {
            opacity: 0.75;
          }
          100% {
            transform: translateX(30%) scaleX(1.1);
            opacity: 0;
          }
        }
      `}</style>

      {/* Immersive Photorealistic Futuristic Digital Architecture Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <img
          src={architectureBgImg}
          alt=""
          referrerPolicy="no-referrer"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 ease-out"
          style={{
            transform: `scale(1.08) translate3d(${parallax.x * -0.7}px, ${parallax.y * -0.7}px, 0)`,
            filter: 'saturate(1.15) contrast(1.06)',
            opacity: theme === 'dark' ? 0.52 : 0.44,
          }}
        />

        {/* Deep Navy & Obsidian Atmospheric Vignette Overlay for High-Contrast Readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              theme === 'dark'
                ? 'radial-gradient(ellipse at center, rgba(4, 13, 30, 0.52) 0%, rgba(3, 9, 22, 0.84) 62%, rgba(2, 6, 15, 0.97) 100%)'
                : 'radial-gradient(ellipse at center, rgba(6, 19, 43, 0.65) 0%, rgba(4, 12, 28, 0.9) 70%, rgba(2, 8, 20, 0.96) 100%)',
          }}
        />

        {/* Subtle AI-Inspired Geometric Perspective Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(56, 189, 248, 0.24) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.24) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage:
              'radial-gradient(ellipse at center, rgba(0,0,0,0.9) 15%, transparent 75%)',
            WebkitMaskImage:
              'radial-gradient(ellipse at center, rgba(0,0,0,0.9) 15%, transparent 75%)',
          }}
        />

        {/* Pulsing Cerulean & Cyan Core Backlight */}
        <div
          className="absolute top-1/2 left-1/2 w-[780px] h-[480px] rounded-full blur-[145px]"
          style={{
            background:
              'radial-gradient(circle, rgba(22, 119, 255, 0.34) 0%, rgba(56, 189, 248, 0.22) 45%, transparent 75%)',
            animation: 'closerAmbientPulse 7s ease-in-out infinite',
          }}
        />

        {/* Floating Holographic Digital Light Streaks */}
        <div
          className="absolute top-[22%] left-[10%] w-72 h-[1.5px] bg-gradient-to-r from-transparent via-sky-400/70 to-transparent blur-[0.5px]"
          style={{ animation: 'closerStreakSlide 8s ease-in-out infinite' }}
        />
        <div
          className="absolute bottom-[20%] right-[10%] w-80 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent blur-[0.5px]"
          style={{
            animation: 'closerStreakSlide 9.5s ease-in-out 2s infinite reverse',
          }}
        />

        {/* Floating Luminous Particles */}
        {FLOATING_PARTICLES.map((particle, idx) => (
          <span
            key={idx}
            className={`absolute rounded-full bg-sky-300 ${particle.size} shadow-[0_0_12px_#38BDF8]`}
            style={{
              top: particle.top,
              left: particle.left,
              animation: `closerParticleFloat ${particle.duration} ease-in-out ${particle.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto px-5 sm:px-6 md:px-10 relative z-10">
        {/* Premium Futuristic Glassmorphic Conversion Container */}
        <div
          className={`group/closer relative rounded-[28px] sm:rounded-[36px] px-6 py-14 sm:px-12 sm:py-18 md:px-16 md:py-20 text-center overflow-hidden backdrop-blur-2xl transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{
            background:
              'linear-gradient(145deg, rgba(8, 22, 48, 0.82) 0%, rgba(5, 14, 32, 0.88) 55%, rgba(3, 9, 22, 0.94) 100%)',
            border: '1px solid rgba(56, 189, 248, 0.45)',
            boxShadow:
              '0 34px 95px rgba(0, 0, 0, 0.85), 0 0 60px rgba(22, 119, 255, 0.25), 0 0 24px rgba(56, 189, 248, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.2)',
            transform: `translate3d(${parallax.x * 0.25}px, ${parallax.y * 0.25}px, 0)`,
          }}
        >
          {/* Animated Top Edge Light Sweep */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[2px] overflow-hidden z-20"
          >
            <div
              className="w-1/2 h-full"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.95) 45%, rgba(255, 255, 255, 0.98) 50%, rgba(56, 189, 248, 0.95) 55%, transparent 100%)',
                boxShadow: '0 0 22px rgba(56, 189, 248, 0.95)',
                animation: 'closerEdgeSweep 6.5s ease-in-out infinite',
              }}
            />
          </div>

          {/* Animated Bottom Edge Light Sweep */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] overflow-hidden z-20"
          >
            <div
              className="w-1/2 h-full"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(22, 119, 255, 0.85) 45%, rgba(125, 211, 252, 0.95) 50%, rgba(22, 119, 255, 0.85) 55%, transparent 100%)',
                boxShadow: '0 0 18px rgba(56, 189, 248, 0.85)',
                animation: 'closerEdgeSweep 8s ease-in-out infinite reverse',
              }}
            />
          </div>

          {/* Internal Ambient Top Crown Reflection */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-48 rounded-full blur-[85px]"
            style={{
              background:
                'radial-gradient(circle, rgba(56, 189, 248, 0.28) 0%, rgba(22, 119, 255, 0.1) 55%, transparent 75%)',
            }}
          />

          {/* Subtle AI-Inspired Geometric Corner Nodes & Holographic Corner Accents */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-4 left-4 w-7 h-7 border-t-2 border-l-2 border-sky-300/85 rounded-tl-xl z-20 transition-all duration-500 group-hover/closer:w-9 group-hover/closer:h-9"
            style={{ filter: 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.85))' }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-4 right-4 w-7 h-7 border-t-2 border-r-2 border-sky-300/85 rounded-tr-xl z-20 transition-all duration-500 group-hover/closer:w-9 group-hover/closer:h-9"
            style={{ filter: 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.85))' }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-4 left-4 w-7 h-7 border-b-2 border-l-2 border-sky-300/85 rounded-bl-xl z-20 transition-all duration-500 group-hover/closer:w-9 group-hover/closer:h-9"
            style={{ filter: 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.85))' }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-4 right-4 w-7 h-7 border-b-2 border-r-2 border-sky-300/85 rounded-br-xl z-20 transition-all duration-500 group-hover/closer:w-9 group-hover/closer:h-9"
            style={{ filter: 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.85))' }}
          />

          {/* Subtle Geometric Side Hairlines */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-12 left-5 w-px bg-gradient-to-b from-transparent via-sky-400/25 to-transparent hidden sm:block"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-12 right-5 w-px bg-gradient-to-b from-transparent via-sky-400/25 to-transparent hidden sm:block"
          />

          {/* Eyebrow Indicator with Luminous Divider Lines */}
          <div
            className={`relative z-10 inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/40 backdrop-blur-md shadow-[0_0_24px_rgba(56,189,248,0.25)] mb-7 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <span
              aria-hidden="true"
              className="w-6 h-[1px] bg-gradient-to-r from-transparent to-sky-300 hidden sm:inline-block"
            />
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse shadow-[0_0_10px_#38BDF8]" />
            <span className="text-xs uppercase tracking-[0.28em] font-semibold font-mono-tech text-sky-300">
              Initiate Collaboration
            </span>
            <span
              aria-hidden="true"
              className="w-6 h-[1px] bg-gradient-to-l from-transparent to-sky-300 hidden sm:inline-block"
            />
          </div>

          {/* Main Headline */}
          <h2
            className={`relative z-10 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.06] text-white mb-6 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{
              textWrap: 'balance',
              transitionDelay: '180ms',
              textShadow: '0 8px 32px rgba(0, 0, 0, 0.65)',
            }}
          >
            Have An Idea? <br />
            <span
              className="bg-gradient-to-r from-[#60A5FA] via-[#38BDF8] to-[#BAE6FD] bg-clip-text text-transparent"
              style={{
                filter: 'drop-shadow(0 0 28px rgba(56, 189, 248, 0.45))',
              }}
            >
              Let's Turn It Into A Visual.
            </span>
          </h2>

          {/* Thin Luminous Center Divider Line */}
          <div
            aria-hidden="true"
            className={`relative z-10 mx-auto mb-6 h-[1.5px] w-28 sm:w-36 rounded-full bg-gradient-to-r from-transparent via-sky-400/85 to-transparent shadow-[0_0_14px_rgba(56,189,248,0.85)] transition-all duration-700 ${
              isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-50'
            }`}
            style={{ transitionDelay: '240ms' }}
          />

          {/* Subtext with High Contrast & Sharp Rendering */}
          <p
            className={`relative z-10 text-lg sm:text-xl md:text-[22px] font-normal max-w-2xl mx-auto mb-11 leading-relaxed text-slate-100/95 tracking-[0.01em] antialiased transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            From concept to cinematic final frame, let's create something worth watching.
          </p>

          {/* Primary & Secondary Action Buttons */}
          <div
            className={`relative z-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '380ms' }}
          >
            {/* Primary Button: "Start A Project" */}
            <button
              onClick={() => scrollTo('contact')}
              className="group/primary relative px-8 sm:px-9 py-4 sm:py-4.5 rounded-2xl font-mono-tech text-xs sm:text-sm uppercase tracking-[0.18em] font-bold text-[#031126] transition-all duration-300 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
              style={{
                background:
                  'linear-gradient(90deg, #7DD3FC 0%, #38BDF8 50%, #BAE6FD 100%)',
                boxShadow:
                  '0 14px 36px rgba(22, 119, 255, 0.48), 0 0 32px rgba(56, 189, 248, 0.65), inset 0 1px 2px rgba(255, 255, 255, 0.9)',
              }}
            >
              <span>Start A Project</span>
              <span className="w-6 h-6 rounded-full bg-[#031126]/15 flex items-center justify-center transition-transform duration-300 group-hover/primary:translate-x-0.5 group-hover/primary:-translate-y-0.5">
                <ArrowUpRight className="w-4 h-4 text-[#031126] transition-transform duration-300 group-hover/primary:translate-x-0.5 group-hover/primary:-translate-y-0.5" />
              </span>
            </button>

            {/* Secondary Button: "View My Work" */}
            <button
              onClick={() => scrollTo('work')}
              className="group/secondary relative px-8 sm:px-9 py-4 sm:py-4.5 rounded-2xl font-mono-tech text-xs sm:text-sm uppercase tracking-[0.18em] font-semibold text-white bg-[#091A38]/75 hover:bg-sky-500/20 border border-sky-400/50 hover:border-sky-300 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.55),0_0_22px_rgba(22,119,255,0.25),inset_0_1px_1px_rgba(255,255,255,0.18)] hover:shadow-[0_14px_38px_rgba(0,0,0,0.7),0_0_34px_rgba(56,189,248,0.55)]"
            >
              <span>View My Work</span>
              <span className="w-6 h-6 rounded-full bg-sky-400/15 border border-sky-300/40 flex items-center justify-center transition-all duration-300 group-hover/secondary:bg-sky-400/25 group-hover/secondary:border-sky-200">
                <ArrowDown className="w-3.5 h-3.5 text-sky-300 transition-transform duration-300 group-hover/secondary:translate-y-0.5" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
