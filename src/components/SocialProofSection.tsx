import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles, CheckCircle2 } from 'lucide-react';
import avenixLogo from '../assets/images/avenix_logo_transparent.svg';

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
  highlightMetric: string;
}

const TESTIMONIAL_ITEMS: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Sarah M.',
    role: 'Creative Director',
    company: 'Lumina Digital Studios',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=320&q=80',
    rating: 5,
    quote:
      'AVENIX transformed our campaign completely. The AI-generated cinematography was indistinguishable from an eight-figure commercial shoot. Turnaround was breathtakingly fast.',
    highlightMetric: '+3.8M Impressions',
  },
  {
    id: 'test-2',
    name: 'David K.',
    role: 'Founder & CEO',
    company: 'Apex Dynamics',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=320&q=80',
    rating: 5,
    quote:
      'Goodluck transformed our luxury fragrance launch. The cinematic fluidity and zero-gravity realism he delivered in days would have taken a traditional VFX studio months and triple the budget.',
    highlightMetric: '4.2x ROAS Growth',
  },
  {
    id: 'test-3',
    name: 'Elena R.',
    role: 'Chief Brand Officer',
    company: 'Kaelen Spatial Audio',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=320&q=80',
    rating: 5,
    quote:
      'Working with Ogunleye Goodluck was an eye-opener. He operates like a veteran film director who happens to command the frontier of AI tools. Seamless communication, uncompromising taste.',
    highlightMetric: '62% Pre-Sales in 48h',
  },
  {
    id: 'test-4',
    name: 'Marcus Vance',
    role: 'Head of Growth Marketing',
    company: 'Aura Botanica & Wellness',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=320&q=80',
    rating: 5,
    quote:
      'His sense of lighting and editorial restraint sets him leagues apart from generic AI prompts. Every single frame felt like an art-directed Vogue commercial.',
    highlightMetric: '2.4x Higher Paid ROAS',
  },
];

export const SocialProofSection: React.FC = () => {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1); // Default to middle card (David K.) active

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
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIAL_ITEMS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === TESTIMONIAL_ITEMS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-24 md:py-32 relative overflow-hidden transition-colors"
      style={{
        backgroundColor: 'transparent',
      }}
    >
      {/* Atmospheric Background Lighting */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[170px]"
          style={{
            background:
              theme === 'dark'
                ? 'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.14) 0%, rgba(22, 119, 255, 0.06) 50%, transparent 75%)'
                : 'radial-gradient(ellipse at center, rgba(42, 140, 255, 0.1) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10 relative z-10">
        {/* Section Header Matching Reference */}
        <div
          className={`text-center max-w-3xl mx-auto mb-14 md:mb-20 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-4 sm:mb-5 backdrop-blur-md bg-sky-500/[0.08] border-sky-400/35 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span
              className="text-[11px] font-mono-tech uppercase tracking-[0.28em] font-semibold"
              style={{ color: theme === 'dark' ? '#7DD3FC' : '#1D74DF' }}
            >
              TESTIMONIALS
            </span>
          </div>

          {/* Main Headline */}
          <h2
            className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.12]"
            style={{ color: theme === 'dark' ? '#FFFFFF' : '#0F172A' }}
          >
            Trusted by Visionaries.{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  theme === 'dark'
                    ? 'linear-gradient(90deg, #60A5FA 0%, #38BDF8 55%, #BAE6FD 100%)'
                    : 'linear-gradient(90deg, #1D74DF 0%, #2A8CFF 55%, #38BDF8 100%)',
                filter:
                  theme === 'dark' ? 'drop-shadow(0 0 26px rgba(56, 189, 248, 0.4))' : 'none',
              }}
            >
              Powered by Imagination.
            </span>
          </h2>

          {/* Subtitle */}
          <p
            className="mt-4 text-sm sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto"
            style={{ color: theme === 'dark' ? '#CBD5E1' : '#475569' }}
          >
            Read how global brands and creators elevate their visual presence with AVENIX.
          </p>
        </div>

        {/* 3-Card Carousel Stage Matching Reference Layout */}
        <div className="relative">
          {/* Desktop & Tablet 3-Card Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center">
            {TESTIMONIAL_ITEMS.slice(0, 3).map((item, idx) => {
              const isCenterFeatured = idx === 1; // Center card (David K.) is elevated and featured in the reference

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`group relative rounded-[26px] p-7 sm:p-8 lg:p-9 transition-all duration-500 cursor-pointer select-none ${
                    isCenterFeatured
                      ? 'md:-translate-y-3 z-20 border-2'
                      : 'z-10 border'
                  } ${
                    theme === 'dark'
                      ? isCenterFeatured
                        ? 'bg-gradient-to-b from-[#081730]/95 via-[#061226]/95 to-[#030A18]/98 border-sky-400 shadow-[0_24px_70px_rgba(0,0,0,0.85),0_0_40px_rgba(56,189,248,0.35),inset_0_1px_2px_rgba(255,255,255,0.2)]'
                        : 'bg-[#061022]/85 border-white/10 hover:border-sky-400/40 shadow-[0_16px_45px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_55px_rgba(0,0,0,0.7)]'
                      : isCenterFeatured
                      ? 'bg-white border-[#2A8CFF] shadow-[0_24px_60px_rgba(42,140,255,0.22),0_0_30px_rgba(42,140,255,0.25)]'
                      : 'bg-[#FCFDFE] border-[#DCE5F0] hover:border-[#2A8CFF]/50 shadow-[0_14px_35px_rgba(15,23,42,0.08)]'
                  }`}
                >
                  {/* Glowing Top Specular Line for Center Featured Card */}
                  {isCenterFeatured && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-8 top-0 h-[2px] overflow-hidden rounded-full"
                    >
                      <div className="w-full h-full bg-gradient-to-r from-transparent via-sky-300 to-transparent shadow-[0_0_12px_#38BDF8]" />
                    </div>
                  )}

                  {/* 5 Gold Rating Stars */}
                  <div className="flex items-center gap-1.5 mb-5">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-amber-400 fill-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]"
                      />
                    ))}
                  </div>

                  {/* Quote Text */}
                  <blockquote
                    className={`text-sm sm:text-base leading-relaxed mb-7 font-normal ${
                      isCenterFeatured ? 'text-slate-100 sm:text-[17px]' : 'text-slate-300'
                    }`}
                    style={{
                      color:
                        theme === 'dark'
                          ? isCenterFeatured
                            ? '#F1F5F9'
                            : '#CBD5E1'
                          : isCenterFeatured
                          ? '#0F172A'
                          : '#334155',
                    }}
                  >
                    "{item.quote}"
                  </blockquote>

                  {/* Client Info Strip */}
                  <div className="flex items-center justify-between gap-4 pt-5 border-t border-white/10">
                    <div className="flex items-center gap-3.5">
                      <div className="relative">
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-sky-400/50 shadow-[0_0_12px_rgba(56,189,248,0.3)]"
                        />
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#050B16]" />
                      </div>
                      <div>
                        <div
                          className="font-display font-bold text-base tracking-tight"
                          style={{ color: theme === 'dark' ? '#FFFFFF' : '#0F172A' }}
                        >
                          {item.name}
                        </div>
                        <div
                          className="text-xs font-mono-tech leading-snug"
                          style={{ color: theme === 'dark' ? '#7DD3FC' : '#1D74DF' }}
                        >
                          {item.role}, {item.company}
                        </div>
                      </div>
                    </div>

                    <div className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-[10px] font-mono-tech font-semibold text-sky-300 shrink-0">
                      <CheckCircle2 className="w-3 h-3 text-sky-400" />
                      <span>{item.highlightMetric}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Carousel Pagination Dots Matching Screenshot */}
          <div className="flex items-center justify-center gap-2.5 mt-10 md:mt-12">
            {[0, 1, 2, 3].map((dotIdx) => {
              const isActive = dotIdx === 1; // 2nd dot active as shown in screenshot

              return (
                <button
                  key={dotIdx}
                  onClick={() => setActiveIndex(dotIdx)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'w-7 h-2 bg-sky-400 shadow-[0_0_12px_#38BDF8]'
                      : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
