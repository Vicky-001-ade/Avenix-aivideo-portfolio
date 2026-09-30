import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Users,
  ShieldCheck,
  Globe,
  ArrowRight,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import avenixLogo from '../assets/images/avenix_logo_transparent.svg';
import cinematicSocialProofBg from '../assets/images/cinematic_social_proof_bg_1790741317584.jpg';

interface SocialProofCard {
  id: string;
  orderIndex: number;
  title: string;
  category: string;
  image: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  quote: string;
  highlightBadge?: string;
  isCenterFeatured?: boolean;
}

const SOCIAL_PROOF_CARDS: SocialProofCard[] = [
  {
    id: 'card-1-fashion',
    orderIndex: 0,
    title: 'Fashion Campaign',
    category: 'Luxury Brand Visuals',
    image:
      'https://res.cloudinary.com/tl7exdl8/image/upload/v1790441255/Model_walking_through_concrete_r__20260926174653_tyqdss.jpg',
    name: 'Daniel K.',
    role: 'YouTuber / Content Creator',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80',
    rating: 5,
    quote:
      'Avenix has completely changed how I create content. The visuals are next level and hold viewer retention from the very first frame!',
    highlightBadge: 'Retention +68%',
  },
  {
    id: 'card-2-arch',
    orderIndex: 1,
    title: 'Architectural Showcase',
    category: 'Real Estate Visualization',
    image:
      'https://res.cloudinary.com/tl7exdl8/image/upload/v1790441141/Modern_architectural_villa_at_night_20260926174504_rzntjo.jpg',
    name: 'Sarah L.',
    role: 'Brand Marketer',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80',
    rating: 5,
    quote:
      'Incredible quality and speed! Avenix made our campaign vision a reality with breathtaking detail. Highly recommend!',
    highlightBadge: 'Fast Delivery',
  },
  {
    id: 'card-3-worldbuilding',
    orderIndex: 2,
    title: 'Cinematic World Building',
    category: 'Premium AI Production',
    image:
      'https://res.cloudinary.com/tl7exdl8/image/upload/v1790442940/hero_cinematic_visual_1790332675440.jpg_20260926181515_xyoodn.jpg',
    name: 'James T.',
    role: 'Filmmaker',
    avatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&q=80',
    rating: 5,
    quote:
      'The AI visuals from Avenix are absolutely mind-blowing. It feels like my imagination has no limits now — every frame looks like a blockbuster studio production.',
    highlightBadge: 'Featured Showcase',
    isCenterFeatured: true,
  },
  {
    id: 'card-4-watch',
    orderIndex: 3,
    title: 'Luxury Product Launch',
    category: 'Commercial Advertising',
    image:
      'https://res.cloudinary.com/tl7exdl8/image/upload/v1790440788/Luxury_mechanical_wristwatch_on___20260926173825_mbodwz.jpg',
    name: 'Priya S.',
    role: 'Creative Director',
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&q=80',
    rating: 5,
    quote:
      'Avenix delivers cinematic quality with zero hassle. It’s the perfect tool for modern luxury brands and creators.',
    highlightBadge: 'Commercial 8K',
  },
  {
    id: 'card-5-beauty',
    orderIndex: 4,
    title: 'Beauty & Skincare Campaign',
    category: 'Product Marketing',
    image:
      'https://res.cloudinary.com/tl7exdl8/image/upload/v1790441438/Serum_bottle_on_reflective_surface_20260926175016_s2bnpv.jpg',
    name: 'Olamide R.',
    role: 'Digital Artist',
    avatar:
      'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=240&q=80',
    rating: 5,
    quote:
      'The level of detail and realism is incredible. Avenix has become an essential part of my creative process.',
    highlightBadge: 'Photorealistic',
  },
];

const STATS_DATA = [
  {
    id: 'stat-projects',
    value: '500+',
    label: 'Projects Delivered',
    sublabel: 'Bespoke AI Campaigns & Films',
    icon: Layers,
  },
  {
    id: 'stat-brands',
    value: '50+',
    label: 'Brands & Businesses',
    sublabel: 'Trust Avenix Worldwide',
    icon: Users,
  },
  {
    id: 'stat-satisfaction',
    value: '98%',
    label: 'Client Satisfaction',
    sublabel: 'Rated Exceptional Quality',
    icon: ShieldCheck,
  },
  {
    id: 'stat-countries',
    value: '20+',
    label: 'Countries Reached',
    sublabel: 'Global Creative Footprint',
    icon: Globe,
  },
  {
    id: 'stat-rating',
    value: '4.9/5',
    label: 'Average Rating',
    sublabel: 'Based on 500+ Reviews',
    icon: Star,
  },
];

const TITLE_PARTICLES = [
  { top: '12%', left: '16%', size: 3, delay: '0s', duration: '4s' },
  { top: '22%', left: '84%', size: 3.5, delay: '0.8s', duration: '4.8s' },
  { top: '78%', left: '14%', size: 3, delay: '1.6s', duration: '4.2s' },
  { top: '82%', left: '86%', size: 3, delay: '0.4s', duration: '5s' },
  { top: '8%', left: '50%', size: 2.5, delay: '1.2s', duration: '3.6s' },
  { top: '92%', left: '50%', size: 3, delay: '2s', duration: '4.6s' },
];

export const SocialProofSection: React.FC = () => {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageTrackRef = useRef<HTMLDivElement | null>(null);

  // Progressive card entrance reveal (1 -> 2 -> 3 -> 4 -> 5)
  const [revealedCount, setRevealedCount] = useState<number>(5);
  const [hasEntered, setHasEntered] = useState<boolean>(true);

  // Continuous horizontal scroll progress (0.0 = Card 1 ... 2.0 = Center Card 3 ... 4.0 = Card 5)
  // Default to Card 3 (index 2) active center
  const targetProgressRef = useRef<number>(2);
  const currentProgressRef = useRef<number>(2);
  const [smoothProgress, setSmoothProgress] = useState<number>(2);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(2);
  const [stepWidth, setStepWidth] = useState<number>(330);

  // Touch drag tracking for mobile & tablet horizontal swipe
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchStartProgressRef = useRef<number>(2);

  // Measure viewport to set optimal horizontal spacing across Desktop, Tablet, and Mobile
  useEffect(() => {
    const updateDimensions = () => {
      const vw = window.innerWidth;
      if (vw >= 1280) {
        setStepWidth(340);
      } else if (vw >= 1024) {
        setStepWidth(300);
      } else if (vw >= 768) {
        setStepWidth(280);
      } else {
        setStepWidth(Math.min(300, Math.max(250, vw * 0.78)));
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Preload all 5 Cloudinary card images on mount for immediate crisp rendering
  useEffect(() => {
    SOCIAL_PROOF_CARDS.forEach((card) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = card.image;
    });
  }, []);

  // Sequential entrance reveal when section enters viewport
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasEntered(true);
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, []);

  // Smooth 60fps requestAnimationFrame inertia loop connecting scroll input to horizontal card motion
  useEffect(() => {
    let rafId = 0;

    const tick = () => {
      const target = targetProgressRef.current;
      const current = currentProgressRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.0015) {
        const next = current + diff * 0.14;
        currentProgressRef.current = next;
        setSmoothProgress(next);

        const rounded = Math.max(0, Math.min(4, Math.round(next)));
        setActiveCardIndex((prev) => (prev !== rounded ? rounded : prev));
      } else if (current !== target) {
        currentProgressRef.current = target;
        setSmoothProgress(target);
        const rounded = Math.max(0, Math.min(4, Math.round(target)));
        setActiveCardIndex((prev) => (prev !== rounded ? rounded : prev));
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Convert vertical page scroll inside the pinned runway into horizontal card progress (0 -> 4)
  useEffect(() => {
    const syncScrollToHorizontalCards = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight || 800;

      if (rect.top < viewportH * 0.85 && rect.bottom > 0) {
        setHasEntered(true);
      }

      const totalPinnedRunway = Math.max(1, el.offsetHeight - viewportH);
      const scrolledInside = -rect.top;

      if (scrolledInside <= 0) {
        targetProgressRef.current = 0;
        return;
      }

      if (scrolledInside >= totalPinnedRunway) {
        targetProgressRef.current = 4;
        setRevealedCount(5);
        return;
      }

      // Buffer so start and end cards have a comfortable focal stop
      const entryBuffer = totalPinnedRunway * 0.05;
      const activeRunway = totalPinnedRunway * 0.9;
      const normalized = Math.max(
        0,
        Math.min(1, (scrolledInside - entryBuffer) / Math.max(1, activeRunway))
      );

      const nextTarget = normalized * 4; // Maps 0..1 -> Card 0..Card 4
      targetProgressRef.current = nextTarget;

      const stepReveal = Math.min(5, Math.max(1, Math.ceil(normalized * 5 + 0.5)));
      setRevealedCount((prev) => Math.max(prev, stepReveal));
    };

    syncScrollToHorizontalCards();
    window.addEventListener('scroll', syncScrollToHorizontalCards, { passive: true });
    window.addEventListener('resize', syncScrollToHorizontalCards);
    return () => {
      window.removeEventListener('scroll', syncScrollToHorizontalCards);
      window.removeEventListener('resize', syncScrollToHorizontalCards);
    };
  }, []);

  // Support trackpad/wheel horizontal delta inside the stage
  useEffect(() => {
    const stageEl = stageTrackRef.current;
    if (!stageEl) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 4) {
        const atStart = targetProgressRef.current <= 0.02 && e.deltaX < 0;
        const atEnd = targetProgressRef.current >= 3.98 && e.deltaX > 0;
        if (!atStart && !atEnd) {
          e.preventDefault();
          window.scrollBy({ top: e.deltaX * 1.35, behavior: 'auto' });
        }
      }
    };

    stageEl.addEventListener('wheel', handleWheel, { passive: false });
    return () => stageEl.removeEventListener('wheel', handleWheel);
  }, []);

  // Navigate to specific card index (0..4)
  const scrollToCardIndex = (index: number) => {
    const clamped = Math.max(0, Math.min(4, index));
    targetProgressRef.current = clamped;
    setActiveCardIndex(clamped);

    const el = sectionRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const sectionTopDoc = window.scrollY + rect.top;
    const viewportH = window.innerHeight || 800;
    const totalPinnedRunway = Math.max(1, el.offsetHeight - viewportH);

    if (rect.top <= 100 && rect.bottom >= viewportH - 100) {
      const entryBuffer = totalPinnedRunway * 0.05;
      const activeRunway = totalPinnedRunway * 0.9;
      const targetScrollY = sectionTopDoc + entryBuffer + (clamped / 4) * activeRunway;
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    }
  };

  const handleSelectCard = (index: number) => {
    scrollToCardIndex(index);
  };

  const handlePrevCard = () => {
    const nextIdx = Math.max(0, activeCardIndex - 1);
    scrollToCardIndex(nextIdx);
  };

  const handleNextCard = () => {
    const nextIdx = Math.min(SOCIAL_PROOF_CARDS.length - 1, activeCardIndex + 1);
    scrollToCardIndex(nextIdx);
  };

  // Touch handlers for mobile & tablet horizontal drag
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) return;
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    touchStartProgressRef.current = targetProgressRef.current;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const dx = touchStartXRef.current - e.touches[0].clientX;
    const dy = touchStartYRef.current - e.touches[0].clientY;

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) {
      const deltaCards = dx / (stepWidth * 0.85);
      const nextProg = Math.max(0, Math.min(4, touchStartProgressRef.current + deltaCards));
      targetProgressRef.current = nextProg;
    }
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null) return;
    touchStartXRef.current = null;
    touchStartYRef.current = null;
    const snapped = Math.max(0, Math.min(4, Math.round(targetProgressRef.current)));
    scrollToCardIndex(snapped);
  };

  const handleJoinClick = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      aria-label="Social Proof — Trusted by Creators. Proven by Results."
      className="relative transition-colors min-h-[260vh] md:min-h-[290vh] lg:min-h-[320vh]"
      style={{
        backgroundColor: 'transparent',
      }}
    >
      {/* Self-contained keyframes for standalone cinematic title shimmer, energy aura pulse, light rays, and particles */}
      <style>{`
        @keyframes titleEnergyPulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.55;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.08);
            opacity: 0.92;
          }
        }
        @keyframes titleRayGlow {
          0%, 100% {
            opacity: 0.4;
            transform: translate(-50%, -50%) scaleX(0.92);
          }
          50% {
            opacity: 0.82;
            transform: translate(-50%, -50%) scaleX(1.06);
          }
        }
        @keyframes titleShimmerSweep {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes titleParticlePulse {
          0%, 100% {
            transform: translateY(0px) scale(0.9);
            opacity: 0.35;
          }
          50% {
            transform: translateY(-5px) scale(1.15);
            opacity: 0.95;
          }
        }
      `}</style>

      {/* Sticky Pinned Showcase Stage */}
      <div
        className="sticky top-0 h-screen h-[100dvh] flex flex-col justify-between pt-12 sm:pt-14 lg:pt-16 pb-3 sm:pb-5 overflow-hidden"
        style={{ overflowX: 'clip', overflowY: 'visible' }}
      >
        {/* =================================================================
            CINEMATIC STUDIO BACKDROP MATCHING REFERENCE IMAGE
            (Cinema camera rig silhouette on left, futuristic twilight skyline,
             glowing cybernetic female profile on right, dark navy luxury center)
            ================================================================= */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden z-0 select-none"
        >
          {/* Photorealistic Panoramic Studio Artwork Backdrop */}
          <img
            src={cinematicSocialProofBg}
            alt=""
            decoding="async"
            className="w-full h-full object-cover object-center opacity-40 sm:opacity-50 lg:opacity-60 transition-opacity duration-700"
            style={{
              filter: theme === 'dark' ? 'contrast(1.08) brightness(0.92)' : 'contrast(0.95) brightness(1.15)',
            }}
          />

          {/* Deep Dark Cinematic Vignette Overlays for High Contrast Readability */}
          <div
            className="absolute inset-0"
            style={{
              background:
                theme === 'dark'
                  ? 'radial-gradient(ellipse 90% 70% at 50% 48%, rgba(4, 11, 24, 0.42) 0%, rgba(3, 8, 18, 0.88) 65%, #030712 100%)'
                  : 'radial-gradient(ellipse 90% 70% at 50% 48%, rgba(248, 251, 254, 0.55) 0%, rgba(240, 246, 253, 0.90) 65%, #F0F6FD 100%)',
            }}
          />

          {/* Top & Bottom Atmospheric Fade Gradients */}
          <div
            className="absolute inset-x-0 top-0 h-32 sm:h-40 pointer-events-none"
            style={{
              background:
                theme === 'dark'
                  ? 'linear-gradient(180deg, #030712 0%, rgba(3, 7, 18, 0.85) 45%, transparent 100%)'
                  : 'linear-gradient(180deg, #F8FAFC 0%, rgba(248, 250, 252, 0.85) 45%, transparent 100%)',
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-32 sm:h-40 pointer-events-none"
            style={{
              background:
                theme === 'dark'
                  ? 'linear-gradient(0deg, #030712 0%, rgba(3, 7, 18, 0.85) 45%, transparent 100%)'
                  : 'linear-gradient(0deg, #F8FAFC 0%, rgba(248, 250, 252, 0.85) 45%, transparent 100%)',
            }}
          />

          {/* Volumetric Center Cyan Glow */}
          <div
            className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[980px] h-[520px] rounded-full blur-[170px]"
            style={{
              background:
                theme === 'dark'
                  ? 'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.18) 0%, rgba(22, 119, 255, 0.08) 50%, transparent 75%)'
                  : 'radial-gradient(ellipse at center, rgba(42, 140, 255, 0.12) 0%, transparent 70%)',
            }}
          />
        </div>

        {/* Content Container */}
        <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 md:px-8 relative z-10 flex flex-col justify-between flex-1 min-h-0">
          {/* =================================================================
              1. STANDALONE CINEMATIC HERO-STYLE HEADER
              Floats freely and independently above the testimonial showcase with
              generous breathing room, ambient pulsing energy aura, holographic
              rays, floating cyan particles, and shimmering animated gradient.
              ================================================================= */}
          <div
            className={`max-w-5xl w-full mx-auto text-center mt-1 sm:mt-2 mb-6 sm:mb-8 lg:mb-11 relative z-30 shrink-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              hasEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {/* Ambient Energy Aura & Holographic Rays Behind the Title */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -top-10 -bottom-10 overflow-visible flex items-center justify-center -z-10 select-none"
            >
              {/* Soft Animated Pulsing Energy Halo */}
              <div
                className="absolute w-[440px] sm:w-[640px] lg:w-[820px] h-[190px] sm:h-[260px] rounded-full blur-[75px] sm:blur-[95px] pointer-events-none"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background:
                    theme === 'dark'
                      ? 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(56, 189, 248, 0.28) 0%, rgba(22, 119, 255, 0.12) 48%, transparent 75%)'
                      : 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(42, 140, 255, 0.18) 0%, rgba(92, 169, 255, 0.08) 50%, transparent 75%)',
                  animation: 'titleEnergyPulse 5.5s ease-in-out infinite',
                }}
              />

              {/* Ambient Horizontal Light Ray Flare */}
              <div
                className="absolute w-[600px] sm:w-[840px] lg:w-[1040px] h-[40px] sm:h-[52px] rounded-full blur-[35px] sm:blur-[48px] pointer-events-none"
                style={{
                  top: '52%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background:
                    theme === 'dark'
                      ? 'linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.48) 50%, transparent 100%)'
                      : 'linear-gradient(90deg, transparent 0%, rgba(42, 140, 255, 0.35) 50%, transparent 100%)',
                  animation: 'titleRayGlow 6s ease-in-out infinite',
                }}
              />

              {/* Floating Ambient Light Particles */}
              {TITLE_PARTICLES.map((pt, pIdx) => (
                <span
                  key={pIdx}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    top: pt.top,
                    left: pt.left,
                    width: `${pt.size}px`,
                    height: `${pt.size}px`,
                    backgroundColor: theme === 'dark' ? '#7DD3FC' : '#2A8CFF',
                    boxShadow:
                      theme === 'dark'
                        ? '0 0 10px 2px rgba(56, 189, 248, 0.85)'
                        : '0 0 8px 1px rgba(42, 140, 255, 0.55)',
                    animation: `titleParticlePulse ${pt.duration} ease-in-out ${pt.delay} infinite`,
                  }}
                />
              ))}
            </div>

            {/* Top Center Official AVENIX Transparent Brand Logo */}
            <div className="flex justify-center mb-2.5 sm:mb-3">
              <img
                src={avenixLogo}
                alt="AVENIX"
                className="h-6 sm:h-7 md:h-8 w-auto object-contain select-none opacity-95 drop-shadow-[0_0_20px_rgba(56,189,248,0.45)] transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Eyebrow Label: — SOCIAL PROOF — with Wide Spacing & Neon Cyan Glow */}
            <div className="inline-flex items-center justify-center gap-3 sm:gap-4 mb-2.5 sm:mb-3.5">
              <span
                className="w-8 sm:w-12 h-[1.5px] rounded-full shrink-0 shadow-[0_0_8px_rgba(56,189,248,0.7)]"
                style={{
                  background:
                    theme === 'dark'
                      ? 'linear-gradient(90deg, transparent 0%, #38BDF8 100%)'
                      : 'linear-gradient(90deg, transparent 0%, #2A8CFF 100%)',
                }}
              />
              <span
                className="text-[11px] sm:text-xs uppercase tracking-[0.36em] font-semibold font-mono-tech whitespace-nowrap"
                style={{
                  color: theme === 'dark' ? '#7DD3FC' : '#1D74DF',
                  filter: theme === 'dark' ? 'drop-shadow(0 0 10px rgba(56, 189, 248, 0.75))' : 'none',
                }}
              >
                SOCIAL PROOF
              </span>
              <span
                className="w-8 sm:w-12 h-[1.5px] rounded-full shrink-0 shadow-[0_0_8px_rgba(56,189,248,0.7)]"
                style={{
                  background:
                    theme === 'dark'
                      ? 'linear-gradient(90deg, #38BDF8 0%, transparent 100%)'
                      : 'linear-gradient(90deg, #2A8CFF 0%, transparent 100%)',
                }}
              />
            </div>

            {/* Main Heading: Trusted by Creators. Proven by Results. */}
            <h2
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[58px] font-extrabold tracking-[-0.025em] leading-[1.08] max-w-4xl mx-auto"
            >
              <span
                className="inline-block bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    theme === 'dark'
                      ? 'linear-gradient(90deg, #FFFFFF 0%, #E0F2FE 20%, #38BDF8 40%, #FFFFFF 55%, #7DD3FC 75%, #FFFFFF 100%)'
                      : 'linear-gradient(90deg, #0F172A 0%, #1E3A8A 25%, #2563EB 50%, #0F172A 75%, #1D4ED8 100%)',
                  backgroundSize: '200% auto',
                  animation: 'titleShimmerSweep 7s ease-in-out infinite',
                  filter:
                    theme === 'dark'
                      ? 'drop-shadow(0 0 28px rgba(56, 189, 248, 0.42))'
                      : 'drop-shadow(0 2px 10px rgba(37, 99, 235, 0.15))',
                }}
              >
                Trusted by Creators. Proven by Results.
              </span>
            </h2>

            {/* Subtitle: Real projects. Real transformations. Real impact. */}
            <p
              className="text-sm sm:text-base md:text-[17px] font-medium tracking-[0.015em] max-w-xl mx-auto mt-2.5 sm:mt-3.5 leading-relaxed"
              style={{
                color: theme === 'dark' ? '#93C5FD' : '#1D74DF',
                textShadow:
                  theme === 'dark' ? '0 0 16px rgba(56, 189, 248, 0.35)' : 'none',
              }}
            >
              Real projects. Real transformations. Real impact.
            </p>
          </div>

          {/* =================================================================
              2. HORIZONTAL 5-CARD CAROUSEL SHOWCASE (Center Card Featured & Glowing)
              ================================================================= */}
          <div
            ref={stageTrackRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative w-full h-[315px] sm:h-[340px] lg:h-[360px] xl:h-[375px] flex items-center justify-center overflow-visible select-none my-auto"
          >
            {SOCIAL_PROOF_CARDS.map((card, idx) => {
              const isRevealed = revealedCount >= idx + 1;

              // Distance from current scroll-driven focal center (0..4)
              const relativeOffset = idx - smoothProgress;
              const absDist = Math.abs(relativeOffset);

              // Focus weight: 1.0 when active center, falling off on sides
              const focusWeight = Math.max(0, 1 - absDist);
              const isFocusedCard = activeCardIndex === idx;

              // Horizontal translation along the stage
              const translateX = relativeOffset * stepWidth;

              // Arch lift for active center card
              const archLiftY = -focusWeight * 14 + Math.min(2, absDist) * 5;
              const entranceY = isRevealed ? 0 : 36;
              const translateY = entranceY + archLiftY;

              // Smooth scale: 1.08 for center, stepping down on sides
              const baseScale = 1.08 - Math.min(absDist, 1) * 0.12 - Math.max(0, absDist - 1) * 0.08;
              const scale = isRevealed ? Math.max(0.78, baseScale) : 0.85;

              // Opacity falloff
              const computedOpacity = !isRevealed
                ? 0
                : absDist <= 2.2
                ? Math.max(0.45, 1 - absDist * 0.22)
                : Math.max(0.12, 0.55 - (absDist - 2) * 0.35);

              // zIndex: center card sits on top
              const zIndex = Math.round(50 - absDist * 12);

              return (
                <article
                  key={card.id}
                  onClick={() => handleSelectCard(idx)}
                  style={{
                    transform: `translate3d(${translateX.toFixed(1)}px, ${translateY.toFixed(
                      1
                    )}px, 0) scale(${scale.toFixed(3)})`,
                    opacity: computedOpacity,
                    zIndex,
                    transition: isRevealed
                      ? 'opacity 350ms ease, border-color 350ms ease, box-shadow 350ms ease'
                      : 'transform 650ms cubic-bezier(0.16, 1, 0.3, 1), opacity 650ms ease',
                  }}
                  className={`group absolute w-[265px] sm:w-[290px] lg:w-[315px] xl:w-[330px] h-[325px] sm:h-[350px] lg:h-[365px] xl:h-[380px] rounded-[22px] overflow-hidden backdrop-blur-2xl border cursor-pointer select-none flex flex-col justify-between will-change-[transform,opacity] transition-all duration-300 ${
                    isFocusedCard
                      ? theme === 'dark'
                        ? 'bg-gradient-to-b from-[#081730]/95 via-[#061226]/95 to-[#030A18]/98 border-[#38BDF8] shadow-[0_24px_70px_rgba(0,0,0,0.92),0_0_45px_rgba(56,189,248,0.48),inset_0_1px_2px_rgba(255,255,255,0.25)]'
                        : 'bg-white/98 border-[#2A8CFF] shadow-[0_24px_60px_rgba(42,140,255,0.28),0_0_36px_rgba(42,140,255,0.30)]'
                      : theme === 'dark'
                      ? 'bg-[#061022]/85 border-white/10 hover:border-sky-400/40 shadow-[0_16px_40px_rgba(0,0,0,0.75)]'
                      : 'bg-[#FCFDFE]/92 border-[#DCE5F0] hover:border-[#2A8CFF]/50 shadow-[0_14px_35px_rgba(15,23,42,0.10)]'
                  }`}
                >
                  {/* Top Specular Neon Highlight Bar on Active Center Card */}
                  {isFocusedCard && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-4 top-0 h-[2px] z-30 overflow-hidden rounded-full"
                    >
                      <div className="w-full h-full bg-gradient-to-r from-transparent via-sky-300 to-transparent shadow-[0_0_14px_#38BDF8]" />
                    </div>
                  )}

                  {/* Cybernetic HUD Corner Brackets on Active / Hovered Card */}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute top-2 left-2 w-3.5 h-3.5 rounded-tl-[12px] border-t-2 border-l-2 z-30 transition-opacity duration-300 ${
                      isFocusedCard ? 'border-sky-300 opacity-100' : 'border-sky-400/60 opacity-0 group-hover:opacity-100'
                    }`}
                  />
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute top-2 right-2 w-3.5 h-3.5 rounded-tr-[12px] border-t-2 border-r-2 z-30 transition-opacity duration-300 ${
                      isFocusedCard ? 'border-sky-300 opacity-100' : 'border-sky-400/60 opacity-0 group-hover:opacity-100'
                    }`}
                  />
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute bottom-2 left-2 w-3.5 h-3.5 rounded-bl-[12px] border-b-2 border-l-2 z-30 transition-opacity duration-300 ${
                      isFocusedCard ? 'border-sky-300 opacity-100' : 'border-sky-400/60 opacity-0 group-hover:opacity-100'
                    }`}
                  />
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute bottom-2 right-2 w-3.5 h-3.5 rounded-br-[12px] border-b-2 border-r-2 z-30 transition-opacity duration-300 ${
                      isFocusedCard ? 'border-sky-300 opacity-100' : 'border-sky-400/60 opacity-0 group-hover:opacity-100'
                    }`}
                  />

                  {/* Top Featured Cinematic Project Image */}
                  <div className="relative w-full h-[140px] sm:h-[155px] lg:h-[165px] xl:h-[175px] overflow-hidden shrink-0">
                    <img
                      src={card.image}
                      alt={card.title}
                      decoding="async"
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Gradient Dissolve from Image into Dark Glass Card Body */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          theme === 'dark'
                            ? isFocusedCard
                              ? 'linear-gradient(180deg, rgba(8, 23, 48, 0.05) 0%, rgba(6, 18, 38, 0.50) 65%, #061226 100%)'
                              : 'linear-gradient(180deg, rgba(6, 16, 34, 0.08) 0%, rgba(6, 16, 34, 0.60) 65%, #061022 100%)'
                            : 'linear-gradient(180deg, rgba(15, 23, 42, 0.04) 0%, rgba(252, 253, 254, 0.65) 68%, #FCFDFE 100%)',
                      }}
                    />

                    {/* Top Floating Category Badge */}
                    <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full backdrop-blur-md bg-black/45 border border-white/15 text-[9.5px] font-mono-tech text-sky-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38BDF8]" />
                      <span className="truncate max-w-[170px]">{card.category}</span>
                    </div>

                    {/* Top Right Highlight Tag */}
                    {card.highlightBadge && (
                      <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1 px-2 py-0.5 rounded-full backdrop-blur-md bg-sky-500/20 border border-sky-400/40 text-[9px] font-mono-tech font-semibold text-white shadow-[0_0_12px_rgba(56,189,248,0.3)]">
                        <span>{card.highlightBadge}</span>
                      </div>
                    )}
                  </div>

                  {/* Card Content: Avatar, Name, Role, Rating & Testimonial Quote */}
                  <div className="relative z-10 flex-1 flex flex-col justify-between -mt-6 px-4 sm:px-5 pb-3.5 sm:pb-4">
                    <div>
                      {/* Creator Profile Row */}
                      <div className="flex items-center gap-3 mb-2.5">
                        <div
                          className={`relative rounded-full overflow-hidden shrink-0 border-2 w-10 h-10 sm:w-11 sm:h-11 ${
                            isFocusedCard
                              ? 'border-sky-400 shadow-[0_0_16px_rgba(56,189,248,0.55)]'
                              : 'border-white/20'
                          }`}
                        >
                          <img
                            src={card.avatar}
                            alt={card.name}
                            decoding="async"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover object-center"
                          />
                        </div>

                        <div className="min-w-0">
                          <h3
                            className="font-display font-bold tracking-tight truncate text-sm sm:text-[15px]"
                            style={{ color: theme === 'dark' ? '#FFFFFF' : '#0F172A' }}
                          >
                            {card.name}
                          </h3>
                          <p
                            className="truncate text-[11px] font-medium"
                            style={{ color: theme === 'dark' ? '#94A3B8' : '#64748B' }}
                          >
                            {card.role}
                          </p>

                          {/* 5-Star Rating */}
                          <div
                            className="flex items-center gap-1 mt-0.5"
                            aria-label={`${card.rating} out of 5 stars`}
                          >
                            {Array.from({ length: card.rating }).map((_, sIdx) => (
                              <Star
                                key={sIdx}
                                className={`w-3 h-3 fill-current ${
                                  theme === 'dark'
                                    ? 'text-sky-400 drop-shadow-[0_0_6px_rgba(56,189,248,0.7)]'
                                    : 'text-[#2A8CFF]'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Testimonial Quote Text */}
                      <blockquote
                        className="font-normal leading-relaxed text-xs sm:text-[12.5px] line-clamp-3"
                        style={{
                          color:
                            theme === 'dark'
                              ? isFocusedCard
                                ? '#F1F5F9'
                                : '#CBD5E1'
                              : isFocusedCard
                              ? '#0F172A'
                              : '#334155',
                        }}
                      >
                        "{card.quote}"
                      </blockquote>
                    </div>

                    {/* Bottom Project Title Accent & Indicator */}
                    <div
                      aria-hidden="true"
                      className="mt-2 pt-2 border-t flex items-center justify-between text-[10px] font-mono-tech uppercase tracking-[0.18em]"
                      style={{
                        borderColor:
                          theme === 'dark'
                            ? 'rgba(255, 255, 255, 0.08)'
                            : 'rgba(42, 140, 255, 0.15)',
                        color: theme === 'dark' ? '#64748B' : '#94A3B8',
                      }}
                    >
                      <span className="truncate max-w-[180px] font-semibold text-slate-300">
                        {card.title}
                      </span>
                      <span style={{ color: theme === 'dark' ? '#38BDF8' : '#1D74DF' }}>
                        0{idx + 1} // 05
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* =================================================================
              3. CAROUSEL NAVIGATION CONTROLS (Arrows & Glowing Pill Dots)
              ================================================================= */}
          <div
            className={`flex items-center justify-center gap-4 shrink-0 my-1 sm:my-2 transition-all duration-700 ${
              hasEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            {/* Prev Button */}
            <button
              type="button"
              onClick={handlePrevCard}
              aria-label="Previous testimonial"
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                theme === 'dark'
                  ? 'border-white/20 bg-white/5 text-slate-200 hover:border-sky-400 hover:text-sky-300 hover:bg-sky-500/15'
                  : 'border-[#CBD8E8] bg-white text-[#1E293B] hover:border-[#2A8CFF] hover:text-[#2A8CFF] shadow-sm'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Dot Indicators */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Select testimonial">
              {SOCIAL_PROOF_CARDS.map((c, idx) => {
                const active = activeCardIndex === idx;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleSelectCard(idx)}
                    aria-label={`Highlight ${c.name} - ${c.title}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      active
                        ? theme === 'dark'
                          ? 'w-7 bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.9)]'
                          : 'w-7 bg-[#2A8CFF] shadow-[0_0_10px_rgba(42,140,255,0.6)]'
                        : theme === 'dark'
                        ? 'w-2 bg-white/25 hover:bg-white/45'
                        : 'w-2 bg-[#CBD8E8] hover:bg-[#94A3B8]'
                    }`}
                  />
                );
              })}
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNextCard}
              aria-label="Next testimonial"
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                theme === 'dark'
                  ? 'border-white/20 bg-white/5 text-slate-200 hover:border-sky-400 hover:text-sky-300 hover:bg-sky-500/15'
                  : 'border-[#CBD8E8] bg-white text-[#1E293B] hover:border-[#2A8CFF] hover:text-[#2A8CFF] shadow-sm'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* =================================================================
              4. FUTURISTIC STATISTICS BAR (Matching Reference Image)
              ================================================================= */}
          <div
            className={`mt-1 sm:mt-2 shrink-0 rounded-[22px] border backdrop-blur-2xl px-4 py-3 sm:px-6 sm:py-3.5 relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              hasEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            } ${
              theme === 'dark'
                ? 'bg-[#050E22]/88 border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_36px_rgba(22,119,255,0.2)]'
                : 'bg-white/92 border-[#DCE5F0] shadow-[0_16px_40px_rgba(15,23,42,0.08),0_0_28px_rgba(42,140,255,0.12)]'
            }`}
          >
            {/* Top Subtle Specular Edge Glow */}
            <div
              aria-hidden="true"
              className="absolute inset-x-12 top-0 h-[1px] pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.75) 50%, transparent 100%)',
              }}
            />

            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-12 gap-3 lg:gap-4 items-center">
              {/* 5 Core Trust Metrics */}
              <div className="col-span-2 md:col-span-5 lg:col-span-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-2">
                {STATS_DATA.map((stat, sIdx) => {
                  const IconComp = stat.icon;
                  return (
                    <div
                      key={stat.id}
                      className={`flex items-center gap-2.5 sm:gap-3 ${
                        sIdx > 0
                          ? theme === 'dark'
                            ? 'lg:border-l lg:border-white/10 lg:pl-3 xl:pl-4'
                            : 'lg:border-l lg:border-[#DCE5F0] lg:pl-3 xl:pl-4'
                          : ''
                      }`}
                    >
                      {/* Futuristic Icon Badge */}
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-300 hover:scale-105 ${
                          theme === 'dark'
                            ? 'bg-sky-500/10 border-sky-400/30 text-sky-400 shadow-[0_0_16px_rgba(56,189,248,0.22)]'
                            : 'bg-[#EBF4FF] border-[#2A8CFF]/30 text-[#2A8CFF]'
                        }`}
                      >
                        <IconComp className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                      </div>

                      <div className="min-w-0">
                        <div
                          className="font-display text-lg sm:text-xl lg:text-[22px] font-extrabold tracking-tight tabular-nums leading-tight"
                          style={{ color: theme === 'dark' ? '#FFFFFF' : '#0F172A' }}
                        >
                          {stat.value}
                        </div>
                        <div
                          className="text-[9.5px] sm:text-[10px] font-mono-tech uppercase tracking-[0.12em] font-semibold truncate"
                          style={{ color: theme === 'dark' ? '#7DD3FC' : '#1D74DF' }}
                        >
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Callout Accent ("Join the Creators Choosing Avenix") */}
              <div
                className={`col-span-2 lg:col-span-2 hidden lg:flex items-center justify-end border-l pl-4 ${
                  theme === 'dark' ? 'border-white/10' : 'border-[#DCE5F0]'
                }`}
              >
                <button
                  type="button"
                  onClick={handleJoinClick}
                  className="group text-right inline-flex flex-col items-end cursor-pointer"
                >
                  <span
                    className="text-xs italic font-medium leading-snug transition-colors group-hover:text-white"
                    style={{ color: theme === 'dark' ? '#BAE6FD' : '#1D74DF' }}
                  >
                    Join the Creators
                  </span>
                  <span
                    className="mt-0.5 inline-flex items-center gap-1.5 text-[10px] font-mono-tech uppercase tracking-[0.16em] font-semibold"
                    style={{ color: theme === 'dark' ? '#38BDF8' : '#2A8CFF' }}
                  >
                    <span>Choosing Avenix</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
