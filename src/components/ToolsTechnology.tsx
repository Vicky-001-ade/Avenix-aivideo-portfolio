import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import avenixLogo from '../assets/images/avenix_logo_transparent.svg';
import {
  Check,
  Star,
  ArrowRight,
  Zap,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface PricingTier {
  id: string;
  badge: string;
  popularLabel?: string;
  pricePrefix?: string;
  priceMain: string;
  priceFullText: string;
  description: string;
  features: string[];
  ctaText: string;
  isPopular?: boolean;
}

const PRICING_TIERS: PricingTier[] = [
  {
    id: 'basic',
    badge: 'BASIC',
    pricePrefix: 'Starting From',
    priceMain: '$50',
    priceFullText: 'Starting From $50',
    description: 'Perfect for individuals and small projects.',
    features: [
      'AI Image Generation',
      'Basic AI Video Creation',
      'Up to 30 Seconds Video Length',
      'Standard Resolution Export',
      'Basic Color Enhancement',
      'Social Media Ready Format',
      'Fast Delivery',
    ],
    ctaText: 'Start Your Project',
    isPopular: false,
  },
  {
    id: 'standard',
    badge: 'STANDARD',
    popularLabel: 'MOST POPULAR',
    pricePrefix: 'Starting From',
    priceMain: '$200',
    priceFullText: 'Starting From $200',
    description: 'The ideal package for brands and creators.',
    features: [
      'Everything in Basic',
      'Cinematic AI Video Production',
      'Advanced Prompt Engineering',
      'Up to 60 Seconds Video Length',
      'Professional Editing',
      'Enhanced Visual Effects',
      'Brand-Focused Storytelling',
      'High Resolution Export',
      'Priority Delivery',
    ],
    ctaText: 'Choose Standard',
    isPopular: true,
  },
  {
    id: 'premium',
    badge: 'PREMIUM',
    priceMain: '$300+',
    priceFullText: '$300+',
    description: 'Built for businesses, campaigns, and premium productions.',
    features: [
      'Everything in Standard',
      'Fully Customized AI Visual Production',
      'Cinematic Story Development',
      'Advanced Motion Graphics',
      'Commercial-Grade Visuals',
      'Premium Sound Integration',
      'Multiple Revisions',
      'Ultra High Resolution Export',
      'Dedicated Project Support',
      'Priority Production Workflow',
    ],
    ctaText: 'Go Premium',
    isPopular: false,
  },
];

export const ToolsTechnology: React.FC = () => {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [revealedCards, setRevealedCards] = useState<number>(0);

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
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!headerVisible) return;

    const t1 = window.setTimeout(() => setRevealedCards(1), 140);
    const t2 = window.setTimeout(() => setRevealedCards(2), 300);
    const t3 = window.setTimeout(() => setRevealedCards(3), 460);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [headerVisible]);

  const handleSelectPackage = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="tools"
      className="py-24 md:py-32 border-y relative overflow-hidden transition-colors"
      style={{
        backgroundColor:
          theme === 'dark' ? '#040914' : 'rgba(240, 246, 253, 0.88)',
        borderColor:
          theme === 'dark' ? 'rgba(56, 189, 248, 0.14)' : '#DCE5F0',
      }}
    >
      {/* Subtle Keyframe Animations for Futuristic Energy Lines */}
      <style>{`
        @keyframes pricingEdgePulse {
          0%, 100% {
            opacity: 0.55;
            transform: translateX(-14%);
          }
          50% {
            opacity: 1;
            transform: translateX(14%);
          }
        }
        @keyframes popularCardAura {
          0%, 100% {
            box-shadow: 0 28px 70px rgba(0, 0, 0, 0.85), 0 0 38px rgba(56, 189, 248, 0.34), inset 0 1px 2px rgba(255, 255, 255, 0.25);
          }
          50% {
            box-shadow: 0 32px 82px rgba(0, 0, 0, 0.9), 0 0 54px rgba(56, 189, 248, 0.52), inset 0 1px 2px rgba(255, 255, 255, 0.35);
          }
        }
      `}</style>

      {/* Atmospheric Studio Lighting, Holographic Grid & Floor Reflections */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Top-center cerulean spotlight */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[980px] h-[520px] rounded-full blur-[150px]"
          style={{
            background:
              theme === 'dark'
                ? 'radial-gradient(ellipse at center, rgba(22, 119, 255, 0.24) 0%, rgba(56, 189, 248, 0.1) 45%, transparent 75%)'
                : 'radial-gradient(ellipse at center, rgba(42, 140, 255, 0.14) 0%, transparent 70%)',
          }}
        />

        {/* Center behind-Standard-card intense cerulean aura */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[640px] rounded-full blur-[155px]"
          style={{
            background:
              theme === 'dark'
                ? 'radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, rgba(22, 119, 255, 0.12) 45%, transparent 72%)'
                : 'radial-gradient(circle, rgba(42, 140, 255, 0.15) 0%, transparent 70%)',
          }}
        />

        {/* Bottom surface reflection plane */}
        <div
          className="absolute bottom-0 inset-x-0 h-48"
          style={{
            background:
              theme === 'dark'
                ? 'linear-gradient(to top, rgba(14, 165, 233, 0.09) 0%, rgba(7, 16, 34, 0.02) 60%, transparent 100%)'
                : 'linear-gradient(to top, rgba(42, 140, 255, 0.06) 0%, transparent 100%)',
          }}
        />

        {/* Architectural perspective grid */}
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(56, 189, 248, 0.85) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.85) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 md:mb-20 transition-all duration-700 ease-out ${
            headerVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Top AVENIX Studio Emblem + flanking lines with Tagline */}
          <div className="flex items-center justify-center gap-3 sm:gap-5 mb-5">
            <span
              aria-hidden="true"
              className="h-[1px] w-10 sm:w-20 md:w-28"
              style={{
                background:
                  theme === 'dark'
                    ? 'linear-gradient(90deg, transparent 0%, rgba(125, 211, 252, 0.75) 100%)'
                    : 'linear-gradient(90deg, transparent 0%, rgba(29, 116, 223, 0.6) 100%)',
              }}
            />
            <div className="inline-flex items-center gap-2">
              <img
                src={avenixLogo}
                alt=""
                aria-hidden="true"
                className="w-4 h-4 object-contain"
              />
              <span
                className="text-[11px] sm:text-xs font-mono-tech uppercase tracking-[0.28em] font-semibold"
                style={{ color: theme === 'dark' ? '#BAE6FD' : '#1D74DF' }}
              >
                SIMPLE • TRANSPARENT • SCALABLE
              </span>
            </div>
            <span
              aria-hidden="true"
              className="h-[1px] w-10 sm:w-20 md:w-28"
              style={{
                background:
                  theme === 'dark'
                    ? 'linear-gradient(90deg, rgba(125, 211, 252, 0.75) 0%, transparent 100%)'
                    : 'linear-gradient(90deg, rgba(29, 116, 223, 0.6) 0%, transparent 100%)',
              }}
            />
          </div>

          {/* Main Section Title */}
          <h2
            className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.08]"
            style={{
              color: theme === 'dark' ? '#FFFFFF' : '#0F172A',
              textWrap: 'balance',
            }}
          >
            Flexible Pricing{' '}
            <span
              className={
                theme === 'dark'
                  ? 'bg-gradient-to-r from-[#60A5FA] via-[#38BDF8] to-[#BAE6FD] bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(56,189,248,0.38)]'
                  : 'bg-gradient-to-r from-[#1D74DF] via-[#2A8CFF] to-[#38BDF8] bg-clip-text text-transparent'
              }
            >
              For Every Vision
            </span>
          </h2>

          {/* Subtitle */}
          <p
            className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto"
            style={{ color: theme === 'dark' ? '#E2E8F0' : '#334155' }}
          >
            Choose the level that matches your project goals and transform your
            ideas into cinematic AI visuals.
          </p>
        </div>

        {/* 3-Column Futuristic Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-7 xl:gap-8 items-stretch">
          {PRICING_TIERS.map((tier, idx) => {
            const isRevealed = revealedCards >= idx + 1;
            const isPopular = Boolean(tier.isPopular);

            // Tablet 2-row arrangement: let the 3rd card span nicely on md screens
            const tabletSpanClass =
              idx === 2 ? 'md:col-span-2 lg:col-span-1 md:max-w-xl md:mx-auto lg:max-w-none w-full' : 'w-full';

            return (
              <div
                key={tier.id}
                className={`relative flex flex-col transition-all duration-700 ease-out ${tabletSpanClass} ${
                  isRevealed
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                } ${isPopular ? 'lg:-my-4 z-20' : 'z-10'}`}
              >
                {/* Floating "MOST POPULAR" Pill Badge on Standard Card */}
                {isPopular && tier.popularLabel && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30">
                    <div
                      className="inline-flex items-center gap-1.5 px-5 py-1.5 rounded-full text-[11px] font-mono-tech font-bold uppercase tracking-[0.2em] border"
                      style={{
                        background:
                          'linear-gradient(90deg, #7DD3FC 0%, #38BDF8 50%, #BAE6FD 100%)',
                        color: '#031126',
                        borderColor: '#E0F2FE',
                        boxShadow:
                          '0 0 24px rgba(56, 189, 248, 0.85), 0 4px 12px rgba(0, 0, 0, 0.5)',
                      }}
                    >
                      <Star className="w-3.5 h-3.5 fill-current text-[#031126]" />
                      <span>{tier.popularLabel}</span>
                    </div>
                  </div>
                )}

                {/* Main Glassmorphism Pricing Card */}
                <div
                  className={`group/card relative flex-1 flex flex-col justify-between rounded-[26px] sm:rounded-[30px] p-7 sm:p-8 xl:p-9 backdrop-blur-2xl transition-all duration-500 ease-out hover:-translate-y-2 ${
                    isPopular
                      ? theme === 'dark'
                        ? 'bg-gradient-to-b from-[#0E2347]/92 via-[#091731]/95 to-[#050D1F]/98 border-2 border-sky-300/85 hover:border-sky-200'
                        : 'bg-gradient-to-b from-white via-[#F4F9FF] to-[#EBF4FF] border-2 border-[#2A8CFF] shadow-[0_28px_70px_rgba(42,140,255,0.24)]'
                      : theme === 'dark'
                      ? 'bg-gradient-to-b from-[#0B172E]/82 via-[#071022]/88 to-[#050B18]/92 border border-sky-400/35 hover:border-sky-300/75 shadow-[0_22px_55px_rgba(0,0,0,0.78),0_0_26px_rgba(22,119,255,0.14),inset_0_1px_1px_rgba(255,255,255,0.15)] hover:shadow-[0_28px_68px_rgba(0,0,0,0.86),0_0_42px_rgba(56,189,248,0.28),inset_0_1px_2px_rgba(255,255,255,0.25)]'
                      : 'bg-white/90 border border-[#2A8CFF]/35 hover:border-[#2A8CFF]/75 shadow-[0_18px_48px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_60px_rgba(42,140,255,0.18)]'
                  }`}
                  style={
                    isPopular && theme === 'dark'
                      ? {
                          animation: 'popularCardAura 5s ease-in-out infinite',
                        }
                      : undefined
                  }
                >
                  {/* Animated Top Neon Energy Line */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-8 top-0 h-[1.5px] overflow-hidden rounded-full"
                  >
                    <div
                      className="w-full h-full"
                      style={{
                        background: isPopular
                          ? 'linear-gradient(90deg, transparent 0%, rgba(186, 230, 253, 1) 50%, transparent 100%)'
                          : 'linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.85) 50%, transparent 100%)',
                        boxShadow: '0 0 16px rgba(56, 189, 248, 0.9)',
                        animation: 'pricingEdgePulse 5.5s ease-in-out infinite',
                      }}
                    />
                  </div>

                  {/* Subtle Holographic Top-Left Reflection Sheen */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-[26px] sm:rounded-[30px] opacity-60 group-hover/card:opacity-95 transition-opacity duration-500"
                    style={{
                      background: isPopular
                        ? 'radial-gradient(circle at 20% 0%, rgba(56, 189, 248, 0.20) 0%, transparent 55%)'
                        : 'radial-gradient(circle at 20% 0%, rgba(56, 189, 248, 0.12) 0%, transparent 50%)',
                    }}
                  />

                  {/* Dynamic Futuristic Corner Brackets */}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 rounded-tl-lg transition-all duration-300 group-hover/card:w-6 group-hover/card:h-6 ${
                      isPopular ? 'border-sky-300' : 'border-sky-400/70'
                    }`}
                  />
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 rounded-tr-lg transition-all duration-300 group-hover/card:w-6 group-hover/card:h-6 ${
                      isPopular ? 'border-sky-300' : 'border-sky-400/70'
                    }`}
                  />
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 rounded-bl-lg transition-all duration-300 group-hover/card:w-6 group-hover/card:h-6 ${
                      isPopular ? 'border-sky-300' : 'border-sky-400/70'
                    }`}
                  />
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 rounded-br-lg transition-all duration-300 group-hover/card:w-6 group-hover/card:h-6 ${
                      isPopular ? 'border-sky-300' : 'border-sky-400/70'
                    }`}
                  />

                  {/* Top Content Block: Tier Badge, Description, Price & Features */}
                  <div className="relative z-10">
                    {/* Package Tier Header */}
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span
                        className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight"
                        style={{
                          color: theme === 'dark' ? '#FFFFFF' : '#0F172A',
                        }}
                      >
                        {tier.badge}
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-mono-tech font-bold uppercase tracking-[0.22em] border ${
                          isPopular
                            ? theme === 'dark'
                              ? 'bg-sky-400/20 border-sky-300/60 text-sky-200'
                              : 'bg-[#2A8CFF]/15 border-[#2A8CFF]/50 text-[#1D74DF]'
                            : theme === 'dark'
                            ? 'bg-white/[0.05] border-white/15 text-sky-300'
                            : 'bg-slate-100 border-slate-300 text-slate-700'
                        }`}
                      >
                        TIER 0{idx + 1}
                      </span>
                    </div>

                    {/* Short Description */}
                    <p
                      className="text-sm sm:text-[15px] font-normal leading-relaxed min-h-[42px]"
                      style={{
                        color: theme === 'dark' ? '#CBD5E1' : '#475569',
                      }}
                    >
                      {tier.description}
                    </p>

                    {/* Price Block */}
                    <div
                      className="mt-5 pb-6 border-b"
                      style={{
                        borderColor:
                          theme === 'dark'
                            ? 'rgba(56, 189, 248, 0.2)'
                            : 'rgba(42, 140, 255, 0.2)',
                      }}
                    >
                      {tier.pricePrefix ? (
                        <div>
                          <div
                            className="text-xs font-mono-tech uppercase tracking-[0.2em] font-semibold mb-1"
                            style={{
                              color: theme === 'dark' ? '#7DD3FC' : '#1D74DF',
                            }}
                          >
                            {tier.pricePrefix}
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span
                              className={`font-display text-5xl sm:text-6xl font-extrabold tracking-tight ${
                                isPopular && theme === 'dark'
                                  ? 'bg-gradient-to-r from-[#7DD3FC] via-[#38BDF8] to-[#FFFFFF] bg-clip-text text-transparent drop-shadow-[0_0_22px_rgba(56,189,248,0.45)]'
                                  : ''
                              }`}
                              style={
                                !(isPopular && theme === 'dark')
                                  ? {
                                      color:
                                        theme === 'dark' ? '#FFFFFF' : '#0F172A',
                                    }
                                  : undefined
                              }
                            >
                              {tier.priceMain}
                            </span>
                            <span
                              className="text-xs font-mono-tech uppercase tracking-[0.16em]"
                              style={{
                                color: theme === 'dark' ? '#94A3B8' : '#64748B',
                              }}
                            >
                              / project
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div
                            className="text-xs font-mono-tech uppercase tracking-[0.2em] font-semibold mb-1"
                            style={{
                              color: theme === 'dark' ? '#7DD3FC' : '#1D74DF',
                            }}
                          >
                            Custom Production
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span
                              className="font-display text-5xl sm:text-6xl font-extrabold tracking-tight"
                              style={{
                                color: theme === 'dark' ? '#FFFFFF' : '#0F172A',
                              }}
                            >
                              {tier.priceMain}
                            </span>
                            <span
                              className="text-xs font-mono-tech uppercase tracking-[0.16em]"
                              style={{
                                color: theme === 'dark' ? '#94A3B8' : '#64748B',
                              }}
                            >
                              / bespoke scope
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Included Services List */}
                    <div className="mt-6">
                      <div
                        className="text-[11px] font-mono-tech uppercase tracking-[0.22em] font-semibold mb-4"
                        style={{
                          color: theme === 'dark' ? '#94A3B8' : '#64748B',
                        }}
                      >
                        INCLUDED SERVICES
                      </div>

                      <ul className="space-y-3.5">
                        {tier.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-3 text-sm sm:text-[15px] leading-snug"
                          >
                            <span
                              className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 border"
                              style={{
                                background: isPopular
                                  ? 'linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)'
                                  : 'rgba(14, 165, 233, 0.18)',
                                borderColor: isPopular
                                  ? '#BAE6FD'
                                  : 'rgba(56, 189, 248, 0.55)',
                                boxShadow: isPopular
                                  ? '0 0 12px rgba(56, 189, 248, 0.65)'
                                  : '0 0 8px rgba(56, 189, 248, 0.25)',
                              }}
                            >
                              <Check
                                className={`w-3 h-3 stroke-[2.75] ${
                                  isPopular
                                    ? 'text-[#031126]'
                                    : theme === 'dark'
                                    ? 'text-sky-300'
                                    : 'text-[#1D74DF]'
                                }`}
                              />
                            </span>
                            <span
                              className="font-medium"
                              style={{
                                color: theme === 'dark' ? '#F1F5F9' : '#1E293B',
                              }}
                            >
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Call-To-Action Button */}
                  <div className="relative z-10 mt-8 pt-4">
                    <button
                      type="button"
                      onClick={handleSelectPackage}
                      className={`w-full py-4 px-6 rounded-2xl font-display text-sm sm:text-base font-bold tracking-wide flex items-center justify-center gap-2.5 cursor-pointer transition-all duration-300 active:scale-[0.98] group/btn ${
                        isPopular
                          ? 'text-[#031126] border border-sky-200'
                          : theme === 'dark'
                          ? 'bg-[#08152C]/90 hover:bg-sky-500/20 text-white border border-sky-400/50 hover:border-sky-300 shadow-[0_0_20px_rgba(22,119,255,0.2)] hover:shadow-[0_0_30px_rgba(56,189,248,0.45)]'
                          : 'bg-[#F0F7FF] hover:bg-[#2A8CFF] text-[#0F172A] hover:text-white border border-[#2A8CFF]/45'
                      }`}
                      style={
                        isPopular
                          ? {
                              background:
                                'linear-gradient(90deg, #67E8F9 0%, #38BDF8 50%, #BAE6FD 100%)',
                              boxShadow:
                                '0 0 30px rgba(56, 189, 248, 0.65), inset 0 1px 1px rgba(255, 255, 255, 0.8)',
                            }
                          : undefined
                      }
                    >
                      <span>{tier.ctaText}</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>

                {/* Subtle Floor Neon Reflection Under Card */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none mx-auto mt-2 h-2.5 rounded-full blur-md transition-all duration-500 ${
                    isPopular ? 'w-4/5 opacity-85' : 'w-2/3 opacity-45'
                  }`}
                  style={{
                    background:
                      'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.75) 0%, rgba(22, 119, 255, 0.25) 60%, transparent 100%)',
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom Studio Guarantee & Value Bar */}
        <div
          className={`mt-14 md:mt-16 pt-8 border-t grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto transition-all duration-700 ease-out ${
            revealedCards >= 3
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
          style={{
            borderColor:
              theme === 'dark'
                ? 'rgba(56, 189, 248, 0.16)'
                : 'rgba(42, 140, 255, 0.18)',
          }}
        >
          {[
            {
              icon: Zap,
              title: 'Fast Turnaround',
              subtitle: 'Streamlined AI production workflow.',
            },
            {
              icon: ShieldCheck,
              title: 'Commercial Ready',
              subtitle: 'Built for brands, social & campaigns.',
            },
            {
              icon: Sparkles,
              title: 'Cinematic Quality',
              subtitle: 'Always tailored to your vision.',
            },
          ].map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-center justify-center sm:justify-start gap-3.5"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border shrink-0 ${
                    theme === 'dark'
                      ? 'bg-sky-500/10 border-sky-400/40 text-sky-300 shadow-[0_0_16px_rgba(56,189,248,0.25)]'
                      : 'bg-[#2A8CFF]/10 border-[#2A8CFF]/35 text-[#1D74DF]'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                </div>
                <div>
                  <div
                    className="font-display text-sm font-bold"
                    style={{
                      color: theme === 'dark' ? '#FFFFFF' : '#0F172A',
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    className="text-xs font-normal"
                    style={{
                      color: theme === 'dark' ? '#94A3B8' : '#64748B',
                    }}
                  >
                    {item.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

