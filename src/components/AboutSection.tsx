import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import avenixLogo from '../assets/images/avenix_logo_transparent.svg';
import { Sparkles, Eye, Compass, ArrowUpRight } from 'lucide-react';

const FOUNDER_IMAGE_URL =
  'https://res.cloudinary.com/tl7exdl8/image/upload/v1790470273/7516fc5e-a204-4567-acef-523d90e6c102.png_20260927014847_swt9wf.jpg';

interface StoryBlock {
  id: string;
  index: string;
  label: string;
  text: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STORY_BLOCKS: StoryBlock[] = [
  {
    id: 'beginning',
    index: '01',
    label: 'The Beginning',
    text: "Hey, I'm Goodluck, founder of AVENIX. I built this because I was fascinated by the power of AI to transform ideas into cinematic experiences. I wanted a faster, smarter way to create visuals that look premium without spending countless hours on traditional production workflows.",
    icon: Sparkles,
  },
  {
    id: 'vision',
    index: '02',
    label: 'The Vision',
    text: 'After exploring the rapid evolution of AI creativity, I realized there was an opportunity to combine storytelling, design, and artificial intelligence into one seamless process. AVENIX was created to help brands, creators, and businesses bring ambitious ideas to life through high-quality AI-generated visuals.',
    icon: Eye,
  },
  {
    id: 'commitment',
    index: '03',
    label: 'The Commitment',
    text: "AVENIX continues to evolve with new tools, better workflows, and more creative possibilities. I'm constantly refining the experience and exploring what's next. If you'd like to connect, collaborate, or share feedback, I'd love to hear from you.",
    icon: Compass,
  },
];

export const AboutSection: React.FC = () => {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

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
      { threshold: 0.16 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Keyframe definitions for subtle futuristic border & frame illumination */}
      <style>{`
        @keyframes founderBorderSweep {
          0%, 100% {
            opacity: 0.45;
            transform: translateX(-18%);
          }
          50% {
            opacity: 0.95;
            transform: translateX(18%);
          }
        }
        @keyframes founderPortraitPulse {
          0%, 100% {
            box-shadow: 0 0 28px rgba(22, 119, 255, 0.28), 0 0 56px rgba(56, 189, 248, 0.14);
          }
          50% {
            box-shadow: 0 0 40px rgba(56, 189, 248, 0.48), 0 0 76px rgba(22, 119, 255, 0.26);
          }
        }
      `}</style>

      {/* Ambient Atmospheric Cerulean Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute top-1/4 -left-24 w-[460px] h-[460px] rounded-full blur-[140px]"
          style={{
            background:
              theme === 'dark'
                ? 'radial-gradient(circle, rgba(22, 119, 255, 0.18) 0%, rgba(56, 189, 248, 0.05) 55%, transparent 75%)'
                : 'radial-gradient(circle, rgba(42, 140, 255, 0.12) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-10 -right-24 w-[480px] h-[480px] rounded-full blur-[150px]"
          style={{
            background:
              theme === 'dark'
                ? 'radial-gradient(circle, rgba(56, 189, 248, 0.16) 0%, rgba(22, 119, 255, 0.05) 55%, transparent 75%)'
                : 'radial-gradient(circle, rgba(29, 116, 223, 0.1) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-14 md:mb-16 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border mb-5 backdrop-blur-md bg-sky-500/[0.07] border-sky-400/30 shadow-[0_0_20px_rgba(56,189,248,0.18)]">
            <img
              src={avenixLogo}
              alt=""
              aria-hidden="true"
              className="w-4 h-4 object-contain"
            />
            <span
              className="text-[11px] font-mono-tech uppercase tracking-[0.28em] font-semibold"
              style={{ color: theme === 'dark' ? '#7DD3FC' : '#1D74DF' }}
            >
              FOUNDER STORY
            </span>
          </div>

          <h2
            className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.08]"
            style={{ color: theme === 'dark' ? '#FFFFFF' : '#0F172A' }}
          >
            Meet The{' '}
            <span
              className={
                theme === 'dark'
                  ? 'bg-gradient-to-r from-[#60A5FA] via-[#38BDF8] to-[#BAE6FD] bg-clip-text text-transparent drop-shadow-[0_0_26px_rgba(56,189,248,0.35)]'
                  : 'bg-gradient-to-r from-[#1D74DF] via-[#2A8CFF] to-[#38BDF8] bg-clip-text text-transparent'
              }
            >
              Founder
            </span>
          </h2>

          <p
            className="mt-4 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto"
            style={{ color: theme === 'dark' ? '#CBD5E1' : '#475569' }}
          >
            The creator behind AVENIX and the vision driving cinematic AI storytelling.
          </p>
        </div>

        {/* Premium Futuristic Glassmorphism Container */}
        <div
          className={`group/container relative rounded-[28px] sm:rounded-[34px] p-6 sm:p-9 md:p-12 lg:p-14 backdrop-blur-2xl transition-all duration-500 ease-out hover:-translate-y-1 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          } ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-[#0A162C]/90 via-[#071022]/92 to-[#040915]/95 border border-sky-400/35 shadow-[0_28px_80px_rgba(0,0,0,0.82),0_0_42px_rgba(22,119,255,0.18),inset_0_1px_1px_rgba(255,255,255,0.14)] hover:border-sky-300/65 hover:shadow-[0_36px_95px_rgba(0,0,0,0.88),0_0_64px_rgba(56,189,248,0.32),inset_0_1px_2px_rgba(255,255,255,0.22)]'
              : 'bg-gradient-to-br from-white/95 via-[#F8FBFF]/95 to-[#EEF5FF]/95 border border-[#2A8CFF]/35 shadow-[0_24px_64px_rgba(15,23,42,0.1),0_0_32px_rgba(42,140,255,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] hover:border-[#2A8CFF]/65 hover:shadow-[0_30px_76px_rgba(15,23,42,0.14),0_0_48px_rgba(42,140,255,0.22)]'
          }`}
          style={{ transitionDelay: '100ms' }}
        >
          {/* Top Animated Holographic Edge Highlight */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-10 top-0 h-[1.5px] overflow-hidden rounded-full"
          >
            <div
              className="w-full h-full"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.95) 50%, transparent 100%)',
                boxShadow: '0 0 18px rgba(56, 189, 248, 0.9)',
                animation: 'founderBorderSweep 6s ease-in-out infinite',
              }}
            />
          </div>

          {/* Bottom Animated Holographic Edge Highlight */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-16 bottom-0 h-[1px] overflow-hidden rounded-full"
          >
            <div
              className="w-full h-full"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(22, 119, 255, 0.85) 50%, transparent 100%)',
                boxShadow: '0 0 14px rgba(22, 119, 255, 0.8)',
                animation: 'founderBorderSweep 7.5s ease-in-out infinite reverse',
              }}
            />
          </div>

          {/* Futuristic Corner Accents (Top-Left, Top-Right, Bottom-Left, Bottom-Right) */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-3.5 left-3.5 w-6 h-6 border-t-2 border-l-2 border-sky-400/75 rounded-tl-xl transition-all duration-500 group-hover/container:w-8 group-hover/container:h-8 group-hover/container:border-sky-300"
            style={{ filter: 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.65))' }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-3.5 right-3.5 w-6 h-6 border-t-2 border-r-2 border-sky-400/75 rounded-tr-xl transition-all duration-500 group-hover/container:w-8 group-hover/container:h-8 group-hover/container:border-sky-300"
            style={{ filter: 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.65))' }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-3.5 left-3.5 w-6 h-6 border-b-2 border-l-2 border-sky-400/75 rounded-bl-xl transition-all duration-500 group-hover/container:w-8 group-hover/container:h-8 group-hover/container:border-sky-300"
            style={{ filter: 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.65))' }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-3.5 right-3.5 w-6 h-6 border-b-2 border-r-2 border-sky-400/75 rounded-br-xl transition-all duration-500 group-hover/container:w-8 group-hover/container:h-8 group-hover/container:border-sky-300"
            style={{ filter: 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.65))' }}
          />

          {/* Subtle Inner Holographic Grid Sheen */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[28px] sm:rounded-[34px] opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(56, 189, 248, 0.8) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.8) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />

          {/* Two-Column Content Grid (Mobile: Image first, Story below; Desktop: 5/7 split) */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-9 md:gap-12 lg:gap-14 items-center">
            {/* LEFT COLUMN: Large Professional Founder Portrait */}
            <div
              className={`lg:col-span-5 transition-all duration-700 ease-out ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '220ms' }}
            >
              <div className="relative mx-auto max-w-md lg:max-w-none group/image">
                {/* Ambient Cerulean Aura Behind Portrait */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-3 rounded-[28px] blur-2xl opacity-60 transition-opacity duration-500 group-hover/image:opacity-95"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 45%, rgba(56, 189, 248, 0.42) 0%, rgba(22, 119, 255, 0.25) 55%, transparent 80%)',
                  }}
                />

                {/* Outer Framed Portrait Vessel with Animated Blue Glow */}
                <div
                  className={`relative rounded-2xl sm:rounded-3xl p-1.5 sm:p-2 border transition-all duration-500 ${
                    theme === 'dark'
                      ? 'bg-gradient-to-b from-sky-400/25 via-[#071329] to-[#040B18] border-sky-400/50 group-hover/image:border-sky-300/90'
                      : 'bg-gradient-to-b from-sky-400/20 via-white to-[#EDF5FF] border-[#2A8CFF]/45 group-hover/image:border-[#2A8CFF]/85'
                  }`}
                  style={{
                    animation: 'founderPortraitPulse 5s ease-in-out infinite',
                  }}
                >
                  <div className="relative aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden bg-[#040915]">
                    <img
                      src={FOUNDER_IMAGE_URL}
                      alt="Goodluck — Founder of AVENIX"
                      referrerPolicy="no-referrer"
                      decoding="async"
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/image:scale-105"
                    />

                    {/* Soft Cinematic Lighting & Blue Highlight Overlay on Hover */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030712]/90 via-[#030712]/20 to-transparent"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-0 group-hover/image:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          'radial-gradient(circle at 50% 30%, rgba(56, 189, 248, 0.16) 0%, transparent 65%)',
                      }}
                    />

                    {/* Top-Right Studio Status Badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#050E20]/80 backdrop-blur-md border border-sky-400/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_#38BDF8]" />
                      <span className="text-[10px] font-mono-tech uppercase tracking-[0.2em] text-sky-200">
                        AVENIX STUDIO
                      </span>
                    </div>

                    {/* Bottom Founder Identity Plate */}
                    <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 p-4 rounded-xl backdrop-blur-md bg-[#050D1E]/80 border border-white/15 shadow-[0_10px_28px_rgba(0,0,0,0.65)]">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-[10px] font-mono-tech uppercase tracking-[0.24em] text-sky-400 font-semibold">
                            FOUNDER &amp; CREATIVE DIRECTOR
                          </div>
                          <div className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                            Goodluck
                          </div>
                        </div>
                        <img
                          src={avenixLogo}
                          alt=""
                          aria-hidden="true"
                          className="w-7 h-7 object-contain opacity-90 shrink-0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Three Premium Founder Story Narrative Blocks */}
            <div
              className={`lg:col-span-7 flex flex-col justify-center transition-all duration-700 ease-out ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '340ms' }}
            >
              <div className="space-y-5 sm:space-y-6">
                {STORY_BLOCKS.map((block, idx) => {
                  const IconComponent = block.icon;
                  return (
                    <div
                      key={block.id}
                      className={`group/block relative rounded-2xl p-5 sm:p-6 md:p-7 border transition-all duration-300 ${
                        theme === 'dark'
                          ? 'bg-[#071328]/75 border-sky-400/20 hover:border-sky-400/55 hover:bg-[#091832]/90 shadow-[0_12px_32px_rgba(0,0,0,0.45)] hover:shadow-[0_16px_38px_rgba(0,0,0,0.65),0_0_24px_rgba(56,189,248,0.16)]'
                          : 'bg-white/85 border-[#DCE7F5] hover:border-[#2A8CFF]/55 hover:bg-white shadow-[0_8px_24px_rgba(15,23,42,0.05)] hover:shadow-[0_14px_32px_rgba(42,140,255,0.12)]'
                      }`}
                      style={{
                        transitionDelay: `${idx * 80}ms`,
                      }}
                    >
                      {/* Left Vertical Cerulean Accent Bar */}
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-5 bottom-5 w-[3px] rounded-r-full transition-all duration-300 group-hover/block:top-3 group-hover/block:bottom-3"
                        style={{
                          background:
                            'linear-gradient(180deg, #38BDF8 0%, #1677FF 100%)',
                          boxShadow: '0 0 12px rgba(56, 189, 248, 0.75)',
                        }}
                      />

                      {/* Narrative Block Header */}
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="inline-flex items-center gap-2.5">
                          <span
                            className={`w-7 h-7 rounded-lg flex items-center justify-center border ${
                              theme === 'dark'
                                ? 'bg-sky-500/15 border-sky-400/35 text-sky-300'
                                : 'bg-sky-500/10 border-[#2A8CFF]/30 text-[#1D74DF]'
                            }`}
                          >
                            <IconComponent className="w-3.5 h-3.5" />
                          </span>
                          <span
                            className="font-mono-tech text-xs uppercase tracking-[0.22em] font-bold"
                            style={{
                              color: theme === 'dark' ? '#7DD3FC' : '#1D74DF',
                            }}
                          >
                            {block.label}
                          </span>
                        </div>

                        <span
                          className="font-mono-tech text-[11px] tracking-[0.2em] opacity-60"
                          style={{
                            color: theme === 'dark' ? '#94A3B8' : '#64748B',
                          }}
                        >
                          {block.index} / 03
                        </span>
                      </div>

                      {/* Narrative Paragraph */}
                      <p
                        className="text-base sm:text-[17px] leading-[1.75] font-normal"
                        style={{
                          color: theme === 'dark' ? '#E2E8F0' : '#1E293B',
                        }}
                      >
                        {block.text}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Subtle Personal Signature & Direct Connection Link */}
              <div
                className="mt-7 pt-5 border-t flex flex-wrap items-center justify-between gap-4"
                style={{
                  borderColor:
                    theme === 'dark'
                      ? 'rgba(56, 189, 248, 0.18)'
                      : 'rgba(42, 140, 255, 0.2)',
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_10px_#38BDF8]" />
                  <span
                    className="text-xs font-mono-tech uppercase tracking-[0.2em]"
                    style={{ color: theme === 'dark' ? '#94A3B8' : '#475569' }}
                  >
                    GOODLUCK — FOUNDER OF AVENIX
                  </span>
                </div>

                <a
                  href="#contact"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono-tech uppercase tracking-[0.18em] font-semibold border transition-all duration-300 group/cta ${
                    theme === 'dark'
                      ? 'bg-sky-500/15 border-sky-400/45 text-sky-200 hover:bg-sky-500/25 hover:border-sky-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.35)]'
                      : 'bg-[#2A8CFF]/10 border-[#2A8CFF]/40 text-[#1D74DF] hover:bg-[#2A8CFF]/20'
                  }`}
                >
                  <span>Connect &amp; Collaborate</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

