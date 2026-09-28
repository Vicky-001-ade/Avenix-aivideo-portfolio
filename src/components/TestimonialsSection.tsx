import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import avenixLogo from '../assets/images/avenix_logo_transparent.svg';
import workspaceSceneImg from '../assets/images/final_cta_workspace_scene_1790474393713.jpg';
import cardThumbCinema from '../assets/images/showcase_fashion_film_1790332700354.jpg';
import cardThumbFantasy from '../assets/images/central_ai_portal_world_hero_1790428500522.jpg';
import cardThumbSciFi from '../assets/images/visuals_futuristic_arch_1790332712746.jpg';
import cardThumbProduct from '../assets/images/beauty_serum_still_1790332774451.jpg';
import {
  ArrowRight,
  Sparkles,
  Zap,
  ShieldCheck,
  Compass,
  Eye,
} from 'lucide-react';

interface FloatingHoloCard {
  id: string;
  title: string;
  image: string;
  positionClass: string;
  floatDelay: string;
  floatDuration: string;
  parallaxFactor: number;
}

const FLOATING_HOLO_CARDS: FloatingHoloCard[] = [
  {
    id: 'ai-fashion-campaign',
    title: 'AI Fashion Campaign',
    image: cardThumbCinema,
    positionClass:
      'top-3 left-3 sm:top-5 sm:left-4 w-32 sm:w-40 md:w-44 -rotate-3',
    floatDelay: '0s',
    floatDuration: '6s',
    parallaxFactor: 1.1,
  },
  {
    id: 'futuristic-cityscape',
    title: 'Futuristic Cityscape',
    image: cardThumbFantasy,
    positionClass:
      'top-2 left-[37%] sm:top-3 sm:left-[38%] w-32 sm:w-40 md:w-44 -rotate-1 hidden sm:block',
    floatDelay: '1.2s',
    floatDuration: '6.8s',
    parallaxFactor: 1.4,
  },
  {
    id: 'architectural-visualization',
    title: 'Architectural Visualization',
    image: cardThumbSciFi,
    positionClass:
      'top-4 right-3 sm:top-5 sm:right-4 w-32 sm:w-40 md:w-44 rotate-2',
    floatDelay: '0.6s',
    floatDuration: '6.4s',
    parallaxFactor: 1.25,
  },
  {
    id: 'luxury-product-photography',
    title: 'Luxury Product Photography',
    image: cardThumbProduct,
    positionClass:
      'bottom-14 right-3 sm:bottom-16 sm:right-4 w-32 sm:w-40 md:w-44 rotate-1',
    floatDelay: '1.8s',
    floatDuration: '7.1s',
    parallaxFactor: 0.95,
  },
];

const INFO_STRIP_BADGES = [
  'AI Generated',
  'Photorealistic',
  'Commercial Quality',
  '8K Ready',
];

const TRUST_PILLARS = [
  {
    icon: Sparkles,
    line1: 'AI-Powered',
    line2: 'Creativity',
  },
  {
    icon: Zap,
    line1: 'Fast & Easy',
    line2: 'Workflow',
  },
  {
    icon: ShieldCheck,
    line1: 'Commercial-Grade',
    line2: 'Quality',
  },
  {
    icon: Compass,
    line1: 'Create Without',
    line2: 'Limits',
  },
];

export const TestimonialsSection: React.FC = () => {
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
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    setParallax({
      x: normX * 14,
      y: normY * 10,
    });
  };

  const handleMouseLeave = () => {
    setParallax({ x: 0, y: 0 });
  };

  const scrollToSection = (selector: string) => {
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-20 md:py-28 relative overflow-hidden"
    >
      {/* Keyframes for border light sweep, floating holographic cards, and glow pulse */}
      <style>{`
        @keyframes finalCtaBorderSweep {
          0% {
            transform: translateX(-110%);
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translateX(110%);
            opacity: 0;
          }
        }
        @keyframes finalCtaHoloFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-7px);
          }
        }
        @keyframes finalCtaGlowPulse {
          0%, 100% {
            opacity: 0.55;
          }
          50% {
            opacity: 0.95;
          }
        }
      `}</style>

      {/* Ambient Atmospheric Cerulean Backlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[560px] h-[560px] rounded-full blur-[150px]"
          style={{
            background:
              theme === 'dark'
                ? 'radial-gradient(circle, rgba(22, 119, 255, 0.22) 0%, rgba(56, 189, 248, 0.08) 55%, transparent 75%)'
                : 'radial-gradient(circle, rgba(42, 140, 255, 0.14) 0%, transparent 72%)',
          }}
        />
        <div
          className="absolute top-1/2 right-10 -translate-y-1/2 w-[620px] h-[520px] rounded-full blur-[160px]"
          style={{
            background:
              theme === 'dark'
                ? 'radial-gradient(circle, rgba(56, 189, 248, 0.24) 0%, rgba(22, 119, 255, 0.1) 50%, transparent 75%)'
                : 'radial-gradient(circle, rgba(29, 116, 223, 0.12) 0%, transparent 72%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        {/* Full-Width Futuristic Glassmorphism CTA Banner Container (28px-32px rounded corners) */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`group/cta relative rounded-[28px] sm:rounded-[32px] overflow-hidden backdrop-blur-2xl transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          } ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-[#08152C]/95 via-[#061124]/95 to-[#030914]/98 border border-sky-400/45 shadow-[0_32px_90px_rgba(0,0,0,0.86),0_0_50px_rgba(22,119,255,0.22),inset_0_1px_2px_rgba(255,255,255,0.18)] hover:border-sky-300/75 hover:shadow-[0_36px_100px_rgba(0,0,0,0.9),0_0_68px_rgba(56,189,248,0.34),inset_0_1px_2px_rgba(255,255,255,0.25)]'
              : 'bg-gradient-to-br from-[#091933] via-[#0B2144] to-[#07152E] border-2 border-[#38BDF8]/60 shadow-[0_30px_80px_rgba(15,23,42,0.28),0_0_45px_rgba(42,140,255,0.24)]'
          }`}
        >
          {/* Animated Top Border Light Sweep */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[2px] overflow-hidden z-30"
          >
            <div
              className="w-1/2 h-full"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.95) 45%, rgba(255, 255, 255, 0.95) 50%, rgba(56, 189, 248, 0.95) 55%, transparent 100%)',
                boxShadow: '0 0 20px rgba(56, 189, 248, 0.95)',
                animation: 'finalCtaBorderSweep 6.5s ease-in-out infinite',
              }}
            />
          </div>

          {/* Animated Bottom Border Light Sweep */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] overflow-hidden z-30"
          >
            <div
              className="w-1/2 h-full"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(22, 119, 255, 0.85) 50%, transparent 100%)',
                boxShadow: '0 0 16px rgba(56, 189, 248, 0.8)',
                animation:
                  'finalCtaBorderSweep 8s ease-in-out infinite reverse',
              }}
            />
          </div>

          {/* Futuristic Metallic HUD Corner Accents */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-3.5 left-3.5 w-6 h-6 border-t-2 border-l-2 border-sky-300/80 rounded-tl-xl z-30 transition-all duration-500 group-hover/cta:w-8 group-hover/cta:h-8"
            style={{ filter: 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.8))' }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-3.5 right-3.5 w-6 h-6 border-t-2 border-r-2 border-sky-300/80 rounded-tr-xl z-30 transition-all duration-500 group-hover/cta:w-8 group-hover/cta:h-8"
            style={{ filter: 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.8))' }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-3.5 left-3.5 w-6 h-6 border-b-2 border-l-2 border-sky-300/80 rounded-bl-xl z-30 transition-all duration-500 group-hover/cta:w-8 group-hover/cta:h-8"
            style={{ filter: 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.8))' }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-3.5 right-3.5 w-6 h-6 border-b-2 border-r-2 border-sky-300/80 rounded-br-xl z-30 transition-all duration-500 group-hover/cta:w-8 group-hover/cta:h-8"
            style={{ filter: 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.8))' }}
          />

          {/* Main 2-Column Layout: Left Side Content + Right Side Photorealistic Creative Workspace */}
          <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* LEFT SIDE CONTENT */}
            <div
              className={`lg:col-span-6 p-7 sm:p-10 md:p-12 lg:py-14 lg:pl-12 lg:pr-8 flex flex-col justify-between transition-all duration-700 ease-out ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '120ms' }}
            >
              {/* Brand Emblem & Eyebrow Tagline */}
              <div>
                <div className="inline-flex items-center gap-3 mb-5">
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/40 backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.25)]">
                    <img
                      src={avenixLogo}
                      alt="AVENIX"
                      className="w-4 h-4 object-contain"
                    />
                    <span className="font-display text-xs font-extrabold tracking-[0.22em] text-white">
                      AVENIX
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-mono-tech uppercase tracking-[0.26em] text-sky-300 font-semibold">
                    IDEAS • PROMPTS • CINEMATIC REALITY
                  </span>
                </div>

                {/* Large Bold Headline with Subtle Blue Glow on Highlighted Words */}
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl xl:text-[52px] font-extrabold tracking-tight text-white leading-[1.08]">
                  Ready to Turn Your Vision Into{' '}
                  <span
                    className="bg-gradient-to-r from-[#7DD3FC] via-[#38BDF8] to-[#BAE6FD] bg-clip-text text-transparent"
                    style={{
                      filter: 'drop-shadow(0 0 24px rgba(56, 189, 248, 0.42))',
                    }}
                  >
                    Cinematic AI Reality?
                  </span>
                </h2>

                {/* Supporting Text */}
                <p className="mt-5 text-sm sm:text-base md:text-[17px] text-slate-200/95 font-normal leading-relaxed max-w-xl">
                  From product commercials and luxury brand visuals to cinematic
                  storytelling and AI-generated content, Avenix transforms ideas
                  into stunning visual experiences.
                </p>

                {/* Primary & Secondary CTA Buttons with Glowing Hover Effects */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  {/* Primary CTA Button: "Start Your Project" */}
                  <button
                    type="button"
                    onClick={() => scrollToSection('#contact')}
                    className="group/primary relative inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full font-display text-sm sm:text-base font-bold text-[#031126] cursor-pointer transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                    style={{
                      background:
                        'linear-gradient(90deg, #7DD3FC 0%, #38BDF8 50%, #BAE6FD 100%)',
                      boxShadow:
                        '0 0 32px rgba(56, 189, 248, 0.65), inset 0 1px 2px rgba(255, 255, 255, 0.85)',
                    }}
                  >
                    <span>Start Your Project</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/primary:translate-x-1" />
                  </button>

                  {/* Secondary CTA Button: "View Portfolio" */}
                  <button
                    type="button"
                    onClick={() => scrollToSection('#work')}
                    className="group/secondary relative inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full font-display text-sm sm:text-base font-bold text-white bg-[#0A1936]/80 hover:bg-sky-500/20 border border-sky-400/55 hover:border-sky-300 backdrop-blur-md cursor-pointer transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-[0_0_22px_rgba(22,119,255,0.28)] hover:shadow-[0_0_34px_rgba(56,189,248,0.52)]"
                  >
                    <Eye className="w-4 h-4 text-sky-300 transition-transform duration-300 group-hover/secondary:scale-110" />
                    <span>View Portfolio</span>
                  </button>
                </div>
              </div>

              {/* Bottom Feature Strip (4 Studio Pillars) */}
              <div className="mt-10 pt-6 border-t border-sky-400/20 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {TRUST_PILLARS.map((pillar, idx) => {
                  const IconComp = pillar.icon;
                  return (
                    <div
                      key={pillar.line1}
                      className={`flex items-start gap-2.5 ${
                        idx > 0
                          ? 'sm:border-l sm:border-sky-400/15 sm:pl-3'
                          : ''
                      }`}
                    >
                      <IconComp className="w-4 h-4 text-sky-400 shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(56,189,248,0.75)]" />
                      <div className="text-[11px] sm:text-xs leading-tight text-slate-200 font-medium">
                        <div className="font-semibold text-white">
                          {pillar.line1}
                        </div>
                        <div className="text-sky-200/75 mt-0.5">
                          {pillar.line2}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT SIDE VISUAL AREA: Photorealistic Futuristic Creative Workspace + Floating Holographic Cards */}
            <div
              className={`lg:col-span-6 relative p-4 sm:p-6 lg:p-6 transition-all duration-700 ease-out ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '260ms' }}
            >
              <div className="relative rounded-2xl sm:rounded-[24px] overflow-hidden border border-sky-400/50 bg-[#030A18] shadow-[0_24px_60px_rgba(0,0,0,0.85),0_0_40px_rgba(56,189,248,0.28)]">
                {/* Main Photorealistic Workstation Scene with Soft Parallax */}
                <div className="relative aspect-[16/11] sm:aspect-[16/10] overflow-hidden">
                  <img
                    src={workspaceSceneImg}
                    alt="Futuristic AI creative studio workstation with large 4K display, camera equipment, modern skyline, and floating holographic visuals"
                    referrerPolicy="no-referrer"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-300 ease-out"
                    style={{
                      transform: `scale(1.05) translate3d(${parallax.x * -0.5}px, ${parallax.y * -0.5}px, 0)`,
                    }}
                  />

                  {/* Subtle Atmospheric Vignette & Left Edge Blend */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030914]/85 via-transparent to-[#030914]/35"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#051024]/70 to-transparent hidden lg:block"
                  />

                  {/* Floating Holographic Content Cards Around the Screen */}
                  {FLOATING_HOLO_CARDS.map((card) => (
                    <div
                      key={card.id}
                      className={`group/holo absolute z-20 ${card.positionClass}`}
                      style={{
                        animation: `finalCtaHoloFloat ${card.floatDuration} ease-in-out ${card.floatDelay} infinite`,
                      }}
                    >
                      <div
                        className="rounded-xl overflow-hidden p-1 backdrop-blur-md bg-[#06152D]/75 border border-sky-300/70 shadow-[0_12px_28px_rgba(0,0,0,0.75),0_0_20px_rgba(56,189,248,0.45)] transition-all duration-300 ease-out group-hover/holo:scale-105 group-hover/holo:border-sky-200 group-hover/holo:shadow-[0_16px_34px_rgba(0,0,0,0.85),0_0_28px_rgba(56,189,248,0.7)]"
                        style={{
                          transform: `translate3d(${parallax.x * card.parallaxFactor}px, ${parallax.y * card.parallaxFactor}px, 0)`,
                        }}
                      >
                        <div className="relative aspect-[16/10] rounded-lg overflow-hidden">
                          <img
                            src={card.image}
                            alt={card.title}
                            referrerPolicy="no-referrer"
                            decoding="async"
                            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover/holo:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#030B1A]/90 via-transparent to-transparent" />
                          <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center gap-1.5">
                            <span
                              aria-hidden="true"
                              className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38BDF8] shrink-0"
                            />
                            <span className="text-[9px] sm:text-[10px] font-mono-tech font-semibold text-white truncate drop-shadow">
                              {card.title}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Bottom Futuristic Information Strip */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-20 flex flex-wrap items-center justify-center sm:justify-between gap-1.5 sm:gap-2 px-3 py-2 rounded-xl backdrop-blur-md bg-[#051126]/85 border border-sky-400/45 shadow-[0_10px_28px_rgba(0,0,0,0.7)]">
                    {INFO_STRIP_BADGES.map((badge) => (
                      <span
                        key={badge}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-400/15 border border-sky-300/50 text-[9px] sm:text-[10px] font-mono-tech font-semibold tracking-wider text-sky-100 shadow-[0_0_12px_rgba(56,189,248,0.3)]"
                      >
                        <span
                          aria-hidden="true"
                          className="w-1.5 h-1.5 rounded-full bg-sky-300 shadow-[0_0_6px_#38BDF8]"
                          style={{
                            animation:
                              'finalCtaGlowPulse 3s ease-in-out infinite',
                          }}
                        />
                        <span>{badge}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

